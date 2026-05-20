"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import {
  CheckCircle2,
  Download,
  Eye,
  FileWarning,
  Maximize2,
  RotateCcw,
  X
} from "lucide-react";
import { PageHeader } from "@/components/section-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type ReviewStatus = "待審核" | "審核中" | "需補件" | "已通過" | "已拒絕";
type RiskLevel = "低" | "中" | "高";
type DocumentStatus = "待審核" | "已通過" | "不清晰" | "缺失" | "需重新上傳";
type ReviewKind = "kyc" | "kyb";

type ReviewDocument = {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  status: DocumentStatus;
};

type BaseReviewCase = {
  id: string;
  submittedAt: string;
  status: ReviewStatus;
  riskLevel: RiskLevel;
  reviewer: string;
  remediationReason?: string;
  remediationDocuments?: string[];
  remediationRequestedAt?: string;
};

export type KycReviewCase = BaseReviewCase & {
  kind: "kyc";
  name: string;
  gender?: string;
  birthplace?: string;
  alias?: string;
  nationality: string;
  issuingCountry?: string;
  idNumber?: string;
  birthDate: string;
  cityAddress?: string;
  address?: string;
  email: string;
  phone: string;
  legalPerson?: string;
  enterpriseFullName?: string;
  highRiskContact?: string;
  highRiskCountries?: string;
  fundSource?: string;
  expectedAmount?: string;
  bankName?: string;
  bankCountry?: string;
  bankAddress?: string;
  beneficiaryName?: string;
  bankAccountNumber?: string;
  beneficiaryAddress?: string;
  swiftRoutingAba?: string;
  documents: ReviewDocument[];
};

export type KybReviewCase = BaseReviewCase & {
  kind: "kyb";
  companyName: string;
  incorporationCountry?: string;
  registrationNo: string;
  jurisdiction: string;
  companyType?: string;
  incorporationDate: string;
  principalPlace?: string;
  principalPlaceCountry?: string;
  companyWebsite?: string;
  businessAddress?: string;
  businessActivities?: string;
  regulatoryInvestigation?: string;
  highRiskContact?: string;
  highRiskCountries?: string;
  fundSource?: string;
  expectedAmount?: string;
  contactName?: string;
  contactTitle?: string;
  contactPhone?: string;
  contactEmail?: string;
  businessType?: string;
  businessDescription?: string;
  monthlyVolume?: string;
  payinRegions?: string;
  payoutRegions?: string;
  cryptoInvolved?: string;
  otcInvolved?: string;
  licensed?: string;
  bankName?: string;
  bankCountry?: string;
  bankAddress?: string;
  beneficiaryName?: string;
  bankAccountNumber?: string;
  beneficiaryAddress?: string;
  swiftRoutingAba?: string;
  responsibleFullName?: string;
  responsibleEmail?: string;
  responsibleJobTitle?: string;
  responsiblePhone?: string;
  beneficialOwners?: Array<{
    lastName: string;
    firstName: string;
    jobTitle: string;
    birthDate: string;
    residentialAddress: string;
    nationality: string;
    passportNumber: string;
    ownership: string;
  }>;
  directors: Array<{
    name: string;
    nationality: string;
    idDocument: string;
    ownership: string;
    uboInfo: string;
  }>;
  documents: ReviewDocument[];
};

const kycDefaults: KycReviewCase[] = [
  {
    kind: "kyc",
    id: "KYC-20260518-001",
    name: "陳雅雯",
    gender: "女",
    birthplace: "香港",
    alias: "Ava Chan",
    nationality: "加拿大",
    issuingCountry: "加拿大",
    idNumber: "CA-4829-1182",
    birthDate: "1992-08-14",
    cityAddress: "Toronto, 120 King Street West",
    address: "120 King Street West, Toronto, Canada",
    email: "ava.chan@example.com",
    phone: "+1 416 555 0198",
    legalPerson: "否",
    enterpriseFullName: "未提供",
    highRiskContact: "否",
    highRiskCountries: "未提供",
    fundSource: "薪金及投資收入",
    expectedAmount: "USD 80,000",
    bankName: "Royal Bank of Canada",
    bankCountry: "加拿大",
    bankAddress: "Toronto, Canada",
    beneficiaryName: "Ava Chan",
    bankAccountNumber: "CA-****-1182",
    beneficiaryAddress: "120 King Street West, Toronto, Canada",
    swiftRoutingAba: "ROYCCAT2",
    submittedAt: "2026-05-18 10:42",
    status: "待審核",
    riskLevel: "低",
    reviewer: "Maya Chen",
    documents: [
      { id: "kyc-doc-1", name: "身分證 / 護照", type: "身份文件", uploadedAt: "2026-05-18 10:40", status: "待審核" },
      { id: "kyc-doc-2", name: "三個月內地址證明", type: "地址證明", uploadedAt: "2026-05-18 10:40", status: "待審核" },
      { id: "kyc-doc-3", name: "三個月內銀行月結單", type: "銀行文件", uploadedAt: "2026-05-18 10:41", status: "待審核" },
      { id: "kyc-doc-4", name: "資金來源證明文件", type: "資金來源", uploadedAt: "2026-05-18 10:41", status: "待審核" }
    ]
  },
  {
    kind: "kyc",
    id: "KYC-20260517-004",
    name: "Luca Rossi",
    gender: "男",
    birthplace: "意大利",
    alias: "L. Rossi",
    nationality: "意大利",
    issuingCountry: "意大利",
    idNumber: "IT-7781-2044",
    birthDate: "1988-11-22",
    cityAddress: "Milan, Via Torino 12",
    address: "Via Torino 12, Milan, Italy",
    email: "luca.rossi@example.com",
    phone: "+39 02 5550 1199",
    legalPerson: "是",
    enterpriseFullName: "Rossi Studio SRL",
    highRiskContact: "否",
    highRiskCountries: "未提供",
    fundSource: "業務收入",
    expectedAmount: "EUR 45,000",
    bankName: "UniCredit",
    bankCountry: "意大利",
    bankAddress: "Milan, Italy",
    beneficiaryName: "Luca Rossi",
    bankAccountNumber: "IT-****-2044",
    beneficiaryAddress: "Via Torino 12, Milan, Italy",
    swiftRoutingAba: "UNCRITMM",
    submittedAt: "2026-05-17 16:18",
    status: "需補件",
    riskLevel: "中",
    reviewer: "Daniel Wong",
    remediationReason: "身份證明不清晰",
    remediationDocuments: ["身份證明文件正面"],
    remediationRequestedAt: "2026-05-18 09:20",
    documents: [
      { id: "kyc-doc-5", name: "身分證 / 護照", type: "身份文件", uploadedAt: "2026-05-17 16:10", status: "不清晰" },
      { id: "kyc-doc-6", name: "三個月內地址證明", type: "地址證明", uploadedAt: "2026-05-17 16:11", status: "已通過" },
      { id: "kyc-doc-7", name: "三個月內銀行月結單", type: "銀行文件", uploadedAt: "2026-05-17 16:12", status: "待審核" },
      { id: "kyc-doc-8", name: "資金來源證明文件", type: "資金來源", uploadedAt: "未上傳", status: "缺失" }
    ]
  }
];

const kybDefaults: KybReviewCase[] = [
  {
    kind: "kyb",
    id: "KYB-20260518-001",
    companyName: "Orbit Commerce Limited",
    incorporationCountry: "香港",
    registrationNo: "HK-73920184",
    jurisdiction: "香港",
    companyType: "私人股份有限公司",
    incorporationDate: "2022-04-18",
    principalPlace: "香港中環皇后大道中 88 號 23 樓",
    principalPlaceCountry: "香港",
    companyWebsite: "https://orbit.example",
    businessActivities: "跨境電商平台，為亞洲與北美市場提供 DTC 商品銷售及供應鏈付款。",
    businessAddress: "香港中環皇后大道中 88 號 23 樓",
    regulatoryInvestigation: "否",
    highRiskContact: "否",
    highRiskCountries: "未提供",
    fundSource: "商品銷售收入及股東資本",
    expectedAmount: "USD 1,200,000",
    contactName: "Daniel Wong",
    contactTitle: "財務總監",
    contactPhone: "+852 5123 8890",
    contactEmail: "daniel@orbit.example",
    businessType: "跨境電商",
    businessDescription: "為亞洲與北美市場提供 DTC 商品銷售及供應鏈付款。",
    monthlyVolume: "USD 1,200,000",
    payinRegions: "香港、加拿大、美國",
    payoutRegions: "中國內地、香港、歐盟",
    cryptoInvolved: "是",
    otcInvolved: "否",
    licensed: "否",
    bankName: "HSBC Hong Kong",
    bankCountry: "香港",
    bankAddress: "Central, Hong Kong",
    beneficiaryName: "Orbit Commerce Limited",
    bankAccountNumber: "HK-****-0184",
    beneficiaryAddress: "香港中環皇后大道中 88 號 23 樓",
    swiftRoutingAba: "HSBCHKHHHKH",
    responsibleFullName: "Daniel Wong",
    responsibleEmail: "daniel@orbit.example",
    responsibleJobTitle: "財務總監",
    responsiblePhone: "+852 5123 8890",
    beneficialOwners: [
      { lastName: "Wong", firstName: "Daniel", jobTitle: "董事", birthDate: "1984-04-18", residentialAddress: "香港中環", nationality: "香港", passportNumber: "P-883912", ownership: "40%" },
      { lastName: "Patel", firstName: "Ava", jobTitle: "董事", birthDate: "1986-09-21", residentialAddress: "London, UK", nationality: "英國", passportNumber: "P-447210", ownership: "32%" }
    ],
    submittedAt: "2026-05-18 11:16",
    status: "審核中",
    riskLevel: "中",
    reviewer: "Grace Lee",
    directors: [
      { name: "Daniel Wong", nationality: "香港", idDocument: "董事身份證明已上傳", ownership: "40%", uboInfo: "持股超過 25%" },
      { name: "Ava Patel", nationality: "英國", idDocument: "董事身份證明已上傳", ownership: "32%", uboInfo: "持股超過 25%" }
    ],
    documents: [
      { id: "kyb-doc-1", name: "註冊證明", type: "公司文件", uploadedAt: "2026-05-18 11:00", status: "待審核" },
      { id: "kyb-doc-2", name: "公司章程", type: "公司文件", uploadedAt: "2026-05-18 11:01", status: "待審核" },
      { id: "kyb-doc-3", name: "董事名單", type: "公司文件", uploadedAt: "2026-05-18 11:02", status: "待審核" },
      { id: "kyb-doc-4", name: "股東名單", type: "公司文件", uploadedAt: "2026-05-18 11:03", status: "待審核" },
      { id: "kyb-doc-5", name: "組織架構圖", type: "公司文件", uploadedAt: "2026-05-18 11:04", status: "待審核" },
      { id: "kyb-doc-6", name: "三個月內地址證明", type: "公司文件", uploadedAt: "2026-05-18 11:04", status: "待審核" },
      { id: "kyb-doc-7", name: "三個月內銀行月結單", type: "銀行文件", uploadedAt: "2026-05-18 11:05", status: "待審核" },
      { id: "kyb-doc-8", name: "資金來源證明文件", type: "資金來源", uploadedAt: "2026-05-18 11:06", status: "待審核" },
      { id: "kyb-doc-9", name: "董事及 25% 或以上最終實益股東護照", type: "董事及受益人文件", uploadedAt: "2026-05-18 11:07", status: "待審核" },
      { id: "kyb-doc-10", name: "董事及 25% 或以上最終實益股東三個月內地址證明", type: "董事及受益人文件", uploadedAt: "2026-05-18 11:08", status: "待審核" }
    ]
  },
  {
    kind: "kyb",
    id: "KYB-20260517-002",
    companyName: "Blue Harbor OTC Inc.",
    incorporationCountry: "加拿大",
    registrationNo: "CA-8829104",
    jurisdiction: "加拿大",
    companyType: "股份有限公司",
    incorporationDate: "2021-09-09",
    principalPlace: "55 Bay Street, Toronto, Canada",
    principalPlaceCountry: "加拿大",
    companyWebsite: "https://blueharbor.example",
    businessActivities: "提供企業數位資產流動性與大額穩定幣結算服務。",
    businessAddress: "55 Bay Street, Toronto, Canada",
    regulatoryInvestigation: "否",
    highRiskContact: "是",
    highRiskCountries: "高風險司法管轄區交易對手需補充說明",
    fundSource: "客戶交易收入及自有營運資金",
    expectedAmount: "USD 8,500,000",
    contactName: "Marcus Lee",
    contactTitle: "合規主管",
    contactPhone: "+1 647 555 0188",
    contactEmail: "compliance@blueharbor.example",
    businessType: "OTC / Digital Asset Business",
    businessDescription: "提供企業數位資產流動性與大額穩定幣結算服務。",
    monthlyVolume: "USD 8,500,000",
    payinRegions: "加拿大、美國、新加坡",
    payoutRegions: "加拿大、香港、歐盟",
    cryptoInvolved: "是",
    otcInvolved: "是",
    licensed: "申請中",
    bankName: "TD Canada Trust",
    bankCountry: "加拿大",
    bankAddress: "Toronto, Canada",
    beneficiaryName: "Blue Harbor OTC Inc.",
    bankAccountNumber: "CA-****-9104",
    beneficiaryAddress: "55 Bay Street, Toronto, Canada",
    swiftRoutingAba: "TDOMCATTTOR",
    responsibleFullName: "Marcus Lee",
    responsibleEmail: "compliance@blueharbor.example",
    responsibleJobTitle: "合規主管",
    responsiblePhone: "+1 647 555 0188",
    beneficialOwners: [
      { lastName: "Lee", firstName: "Marcus", jobTitle: "董事", birthDate: "1982-11-02", residentialAddress: "Toronto, Canada", nationality: "加拿大", passportNumber: "P-CA-77421", ownership: "55%" }
    ],
    submittedAt: "2026-05-17 14:05",
    status: "需補件",
    riskLevel: "高",
    reviewer: "Maya Chen",
    remediationReason: "缺少公司查冊報告",
    remediationDocuments: ["周年申報表 / 公司查冊報告", "牌照掃描件"],
    remediationRequestedAt: "2026-05-18 12:10",
    directors: [
      { name: "Marcus Lee", nationality: "加拿大", idDocument: "董事身份證明已上傳", ownership: "55%", uboInfo: "最終受益人" }
    ],
    documents: [
      { id: "kyb-doc-11", name: "註冊證明", type: "公司文件", uploadedAt: "2026-05-17 13:52", status: "已通過" },
      { id: "kyb-doc-12", name: "公司章程", type: "公司文件", uploadedAt: "2026-05-17 13:53", status: "待審核" },
      { id: "kyb-doc-13", name: "董事名單", type: "公司文件", uploadedAt: "2026-05-17 13:54", status: "待審核" },
      { id: "kyb-doc-14", name: "股東名單", type: "公司文件", uploadedAt: "未上傳", status: "缺失" },
      { id: "kyb-doc-15", name: "組織架構圖", type: "公司文件", uploadedAt: "2026-05-17 13:58", status: "已通過" },
      { id: "kyb-doc-16", name: "三個月內地址證明", type: "公司文件", uploadedAt: "2026-05-17 13:59", status: "待審核" },
      { id: "kyb-doc-17", name: "三個月內銀行月結單", type: "銀行文件", uploadedAt: "未上傳", status: "缺失" },
      { id: "kyb-doc-18", name: "資金來源證明文件", type: "資金來源", uploadedAt: "2026-05-17 14:00", status: "待審核" },
      { id: "kyb-doc-19", name: "董事及 25% 或以上最終實益股東護照", type: "董事及受益人文件", uploadedAt: "2026-05-17 14:01", status: "待審核" },
      { id: "kyb-doc-20", name: "董事及 25% 或以上最終實益股東三個月內地址證明", type: "董事及受益人文件", uploadedAt: "未上傳", status: "缺失" }
    ]
  }
];

const storageKeys: Record<ReviewKind, string> = {
  kyc: "7gg-admin-kyc-review-cases",
  kyb: "7gg-admin-kyb-review-cases"
};

function currentTimeText() {
  return new Date().toLocaleString("zh-HK", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
}

function readStoredCases<T>(kind: ReviewKind): T[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = window.localStorage.getItem(storageKeys[kind]);
    return saved ? JSON.parse(saved) as T[] : [];
  } catch {
    return [];
  }
}

function mergeCases<T extends { id: string }>(defaults: T[], stored: T[]) {
  const byId = new Map(defaults.map((item) => [item.id, item]));
  stored.forEach((item) => byId.set(item.id, item));
  return Array.from(byId.values());
}

function present(value?: string) {
  return value && value.trim() ? value : "未提供";
}

function persistCase<T extends { id: string }>(kind: ReviewKind, item: T) {
  const stored = readStoredCases<T>(kind);
  const next = [item, ...stored.filter((caseItem) => caseItem.id !== item.id)];
  window.localStorage.setItem(storageKeys[kind], JSON.stringify(next));
  window.dispatchEvent(new Event("7gg-verification-cases"));
}

export function appendVerificationCase(kind: ReviewKind, form: Record<string, string>) {
  if (typeof window === "undefined") return;
  const timestamp = Date.now();
  const submittedAt = currentTimeText();

  if (kind === "kyc") {
    const item: KycReviewCase = {
      kind: "kyc",
      id: `KYC-${timestamp}`,
      name: form.customerFullName || "新提交個人用戶",
      gender: form.gender || "待確認",
      birthplace: form.birthplace || "待確認",
      alias: form.otherNames || "未提供",
      nationality: form.nationality || "待確認",
      issuingCountry: form.issuingCountry || "待確認",
      idNumber: form.idNumber || "待確認",
      birthDate: form.birthDate || "待確認",
      cityAddress: form.cityAddress || "待確認",
      address: form.cityAddress || "待確認",
      email: form.email || "待確認",
      phone: form.phone || "待確認",
      legalPerson: form.legalPerson || "待確認",
      enterpriseFullName: form.enterpriseFullName || "未提供",
      highRiskContact: form.highRiskContact || "待確認",
      highRiskCountries: form.highRiskCountries || "未提供",
      fundSource: form.fundSource || "待確認",
      expectedAmount: form.expectedAmount || "待確認",
      bankName: form.bankName || "待確認",
      bankCountry: form.bankCountry || "待確認",
      bankAddress: form.bankAddress || "待確認",
      beneficiaryName: form.beneficiaryName || "待確認",
      bankAccountNumber: form.bankAccountNumber || "待確認",
      beneficiaryAddress: form.beneficiaryAddress || "待確認",
      swiftRoutingAba: form.swiftRoutingAba || "待確認",
      submittedAt,
      status: "待審核",
      riskLevel: "低",
      reviewer: "未分配",
      documents: [
        { id: `doc-${timestamp}-id`, name: "身分證 / 護照", type: "身份文件", uploadedAt: form.idPassport ? submittedAt : "未上傳", status: form.idPassport ? "待審核" : "缺失" },
        { id: `doc-${timestamp}-address`, name: "三個月內地址證明", type: "地址證明", uploadedAt: form.proofOfAddress ? submittedAt : "未上傳", status: form.proofOfAddress ? "待審核" : "缺失" },
        { id: `doc-${timestamp}-statement`, name: "三個月內銀行月結單", type: "銀行文件", uploadedAt: form.bankStatement ? submittedAt : "未上傳", status: form.bankStatement ? "待審核" : "缺失" },
        { id: `doc-${timestamp}-source`, name: "資金來源證明文件", type: "資金來源", uploadedAt: form.sourceOfFundsDoc ? submittedAt : "未上傳", status: form.sourceOfFundsDoc ? "待審核" : "缺失" }
      ]
    };
    persistCase("kyc", item);
    return;
  }

  let beneficialOwners: KybReviewCase["beneficialOwners"] = [];
  try {
    beneficialOwners = form.beneficialOwners ? JSON.parse(form.beneficialOwners) as KybReviewCase["beneficialOwners"] : [];
  } catch {
    beneficialOwners = [];
  }

  const item: KybReviewCase = {
    kind: "kyb",
    id: `KYB-${timestamp}`,
    companyName: form.companyFullName || "新提交企業",
    incorporationCountry: form.incorporationCountry || "待確認",
    registrationNo: form.registrationNo || "待確認",
    jurisdiction: form.incorporationCountry || "待確認",
    companyType: "待確認",
    incorporationDate: form.incorporationDate || "待確認",
    principalPlace: form.principalPlace || "待確認",
    principalPlaceCountry: form.principalPlaceCountry || "待確認",
    companyWebsite: form.companyWebsite || "不適用",
    businessAddress: form.principalPlace || "待確認",
    businessActivities: form.businessActivities || "待確認",
    regulatoryInvestigation: form.regulatoryInvestigation || "待確認",
    highRiskContact: form.highRiskContact || "待確認",
    highRiskCountries: form.highRiskCountries || "未提供",
    fundSource: form.fundSource || "待確認",
    expectedAmount: form.expectedAmount || "待確認",
    contactName: form.responsibleFullName || "待確認",
    contactTitle: form.responsibleJobTitle || "待確認",
    contactPhone: form.responsiblePhone || "待確認",
    contactEmail: form.responsibleEmail || "待確認",
    businessType: "待確認",
    businessDescription: form.businessActivities || "待確認",
    monthlyVolume: form.expectedAmount || "待確認",
    payinRegions: "待確認",
    payoutRegions: "待確認",
    cryptoInvolved: "待確認",
    otcInvolved: "待確認",
    licensed: "待確認",
    bankName: form.bankName || "待確認",
    bankCountry: form.bankCountry || "待確認",
    bankAddress: form.bankAddress || "待確認",
    beneficiaryName: form.beneficiaryName || "待確認",
    bankAccountNumber: form.bankAccountNumber || "待確認",
    beneficiaryAddress: form.beneficiaryAddress || "待確認",
    swiftRoutingAba: form.swiftRoutingAba || "待確認",
    responsibleFullName: form.responsibleFullName || "待確認",
    responsibleEmail: form.responsibleEmail || "待確認",
    responsibleJobTitle: form.responsibleJobTitle || "待確認",
    responsiblePhone: form.responsiblePhone || "待確認",
    beneficialOwners,
    submittedAt,
    status: "待審核",
    riskLevel: form.regulatoryInvestigation === "是" || form.highRiskContact === "是" ? "高" : "低",
    reviewer: "未分配",
    directors: (beneficialOwners && beneficialOwners.length ? beneficialOwners : []).map((owner) => ({
      name: `${owner.lastName}${owner.firstName}`,
      nationality: owner.nationality || "待確認",
      idDocument: owner.passportNumber || "待確認",
      ownership: owner.ownership || "待確認",
      uboInfo: owner.jobTitle || "待確認"
    })),
    documents: [
      { id: `doc-${timestamp}-incorporation`, name: "註冊證明", type: "公司文件", uploadedAt: form.certificateOfIncorporation ? submittedAt : "未上傳", status: form.certificateOfIncorporation ? "待審核" : "缺失" },
      { id: `doc-${timestamp}-articles`, name: "公司章程", type: "公司文件", uploadedAt: form.articles ? submittedAt : "未上傳", status: form.articles ? "待審核" : "缺失" },
      { id: `doc-${timestamp}-directors`, name: "董事名單", type: "公司文件", uploadedAt: form.directorsList ? submittedAt : "未上傳", status: form.directorsList ? "待審核" : "缺失" },
      { id: `doc-${timestamp}-shareholders`, name: "股東名單", type: "公司文件", uploadedAt: form.shareholdersList ? submittedAt : "未上傳", status: form.shareholdersList ? "待審核" : "缺失" },
      { id: `doc-${timestamp}-chart`, name: "組織架構圖", type: "公司文件", uploadedAt: form.organizationChart ? submittedAt : "未上傳", status: form.organizationChart ? "待審核" : "缺失" },
      { id: `doc-${timestamp}-address`, name: "三個月內地址證明", type: "公司文件", uploadedAt: form.proofOfAddress ? submittedAt : "未上傳", status: form.proofOfAddress ? "待審核" : "缺失" },
      { id: `doc-${timestamp}-statement`, name: "三個月內銀行月結單", type: "銀行文件", uploadedAt: form.bankStatement ? submittedAt : "未上傳", status: form.bankStatement ? "待審核" : "缺失" },
      { id: `doc-${timestamp}-source`, name: "資金來源證明文件", type: "資金來源", uploadedAt: form.sourceOfFundsDoc ? submittedAt : "未上傳", status: form.sourceOfFundsDoc ? "待審核" : "缺失" },
      { id: `doc-${timestamp}-passports`, name: "董事及 25% 或以上最終實益股東護照", type: "董事及受益人文件", uploadedAt: form.directorPassport ? submittedAt : "未上傳", status: form.directorPassport ? "待審核" : "缺失" },
      { id: `doc-${timestamp}-ubo-address`, name: "董事及 25% 或以上最終實益股東三個月內地址證明", type: "董事及受益人文件", uploadedAt: form.directorProofOfAddress ? submittedAt : "未上傳", status: form.directorProofOfAddress ? "待審核" : "缺失" }
    ]
  };
  persistCase("kyb", item);
}

function subscribeToVerificationCases(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("7gg-verification-cases", onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener("7gg-verification-cases", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getCasesSnapshot(kind: ReviewKind) {
  if (typeof window === "undefined") return "[]";
  return window.localStorage.getItem(storageKeys[kind]) ?? "[]";
}

function useCases<T extends BaseReviewCase & { id: string }>(kind: ReviewKind, defaults: T[]) {
  const storedSnapshot = useSyncExternalStore(
    subscribeToVerificationCases,
    () => getCasesSnapshot(kind),
    () => "[]"
  );

  const cases = useMemo(() => {
    try {
      return mergeCases(defaults, JSON.parse(storedSnapshot) as T[]);
    } catch {
      return defaults;
    }
  }, [defaults, storedSnapshot]);

  const updateCase = (id: string, patch: Partial<T>) => {
    const current = cases.find((item) => item.id === id);
    if (!current) return;
    persistCase(kind, { ...current, ...patch } as T);
  };

  return { cases, updateCase };
}

function statusBadge(status: ReviewStatus | DocumentStatus) {
  if (status === "已通過") return <Badge variant="success">{status}</Badge>;
  if (status === "已拒絕" || status === "不清晰" || status === "缺失") return <Badge variant="danger">{status}</Badge>;
  if (status === "審核中" || status === "需補件" || status === "需重新上傳") return <Badge variant="warning">{status}</Badge>;
  return <Badge variant="muted">{status}</Badge>;
}

function riskBadge(level: RiskLevel) {
  if (level === "高") return <Badge variant="danger">高</Badge>;
  if (level === "中") return <Badge variant="warning">中</Badge>;
  return <Badge variant="success">低</Badge>;
}

function InfoGrid({ items }: { items: Array<[string, string]> }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map(([label, value]) => (
        <div key={label} className="rounded-2xl border border-[color:var(--border-muted)] bg-[color:var(--control)] p-4">
          <p className="text-xs text-slateText-secondary">{label}</p>
          <p className="mt-2 font-medium">{value}</p>
        </div>
      ))}
    </div>
  );
}

type ActionMode = "通過審核" | "拒絕申請" | "要求補件";

function ReviewActionModal({
  mode,
  documents,
  onClose,
  onConfirm
}: {
  mode: ActionMode;
  documents: ReviewDocument[];
  onClose: () => void;
  onConfirm: (payload: { reason?: string; documents?: string[] }) => void;
}) {
  const [reason, setReason] = useState("");
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);

  const toggleDocument = (name: string) => {
    setSelectedDocuments((current) => (
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name]
    ));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{mode}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="關閉"><X className="h-4 w-4" /></Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {mode === "通過審核" ? (
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-slateText-secondary">
              確認資料與文件已完成審核，狀態將更新為「已通過」。
            </div>
          ) : null}

          {mode === "拒絕申請" ? (
            <label className="space-y-2">
              <span className="text-sm font-medium text-slateText-secondary">拒絕原因</span>
              <textarea
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                className="min-h-28 w-full rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--input-bg)] p-3 text-sm outline-none focus:border-gold-500/45 focus:ring-2 focus:ring-gold-500/15"
                placeholder="請填寫拒絕原因"
              />
            </label>
          ) : null}

          {mode === "要求補件" ? (
            <>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slateText-secondary">補件原因</span>
                <textarea
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  className="min-h-28 w-full rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--input-bg)] p-3 text-sm outline-none focus:border-gold-500/45 focus:ring-2 focus:ring-gold-500/15"
                  placeholder="例如：身份證明不清晰、缺少公司查冊報告、缺少董事文件、文件已過期"
                />
              </label>
              <div>
                <p className="mb-3 text-sm font-medium text-slateText-secondary">指定需重新上傳的文件</p>
                <div className="grid gap-2 md:grid-cols-2">
                  {documents.map((document) => (
                    <label key={document.id} className="flex items-center gap-2 rounded-xl border border-[color:var(--border-muted)] bg-[color:var(--control)] p-3 text-sm">
                      <input type="checkbox" checked={selectedDocuments.includes(document.name)} onChange={() => toggleDocument(document.name)} />
                      {document.name}
                    </label>
                  ))}
                </div>
              </div>
            </>
          ) : null}

          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={onClose}>取消</Button>
            <Button
              variant={mode === "拒絕申請" ? "danger" : "default"}
              onClick={() => onConfirm({ reason, documents: selectedDocuments })}
            >
              確認
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DocumentPreviewModal({
  document,
  onClose,
  onMarkBlur,
  onRequestUpload
}: {
  document: ReviewDocument;
  onClose: () => void;
  onMarkBlur: () => void;
  onRequestUpload: () => void;
}) {
  const [large, setLarge] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <Card className={`w-full ${large ? "max-w-6xl" : "max-w-4xl"}`}>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{document.name}</CardTitle>
            <p className="mt-1 text-sm text-slateText-secondary">{document.type} · {document.uploadedAt}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="關閉"><X className="h-4 w-4" /></Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`${large ? "min-h-[560px]" : "min-h-[360px]"} flex items-center justify-center rounded-2xl border border-gold-500/20 bg-[color:var(--control)] p-6`}>
            <div className="w-full max-w-xl rounded-2xl border border-gold-500/25 bg-[color:var(--card)] p-8 text-center shadow-gold">
              <p className="text-xs uppercase tracking-[0.24em] text-gold-300">7GG Pay 文件預覽</p>
              <p className="mt-6 text-2xl font-semibold">{document.name}</p>
              <p className="mt-3 text-sm text-slateText-secondary">此處為後台文件預覽介面，用於審核員查看申請文件。</p>
              <div className="mt-8 grid gap-3">
                <div className="h-3 rounded-full bg-gold-500/25" />
                <div className="h-3 rounded-full bg-slateText-primary/10" />
                <div className="h-3 rounded-full bg-slateText-primary/10" />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            <Button variant="secondary" onClick={() => setLarge((value) => !value)}><Maximize2 className="h-4 w-4" />放大</Button>
            <Button variant="secondary"><Download className="h-4 w-4" />下載</Button>
            <Button variant="secondary" onClick={onMarkBlur}><FileWarning className="h-4 w-4" />標記不清晰</Button>
            <Button onClick={onRequestUpload}><RotateCcw className="h-4 w-4" />要求重新上傳</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DocumentGrid({
  documents,
  onDocumentUpdate
}: {
  documents: ReviewDocument[];
  onDocumentUpdate: (documentId: string, status: DocumentStatus) => void;
}) {
  const [selected, setSelected] = useState<ReviewDocument | null>(null);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {documents.map((document) => (
          <Card key={document.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{document.name}</p>
                <p className="mt-1 text-sm text-slateText-secondary">{document.type}</p>
                <p className="mt-1 text-xs text-slateText-secondary">上傳時間：{document.uploadedAt}</p>
              </div>
              {statusBadge(document.status)}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" variant="secondary" onClick={() => setSelected(document)}><Eye className="h-3.5 w-3.5" />預覽</Button>
              <Button size="sm" variant="secondary" onClick={() => setSelected(document)}><Maximize2 className="h-3.5 w-3.5" />放大</Button>
              <Button size="sm" variant="secondary"><Download className="h-3.5 w-3.5" />下載</Button>
              <Button size="sm" variant="secondary" onClick={() => onDocumentUpdate(document.id, "不清晰")}>標記不清晰</Button>
              <Button size="sm" onClick={() => onDocumentUpdate(document.id, "需重新上傳")}>要求重新上傳</Button>
            </div>
          </Card>
        ))}
      </div>
      {selected ? (
        <DocumentPreviewModal
          document={selected}
          onClose={() => setSelected(null)}
          onMarkBlur={() => {
            onDocumentUpdate(selected.id, "不清晰");
            setSelected(null);
          }}
          onRequestUpload={() => {
            onDocumentUpdate(selected.id, "需重新上傳");
            setSelected(null);
          }}
        />
      ) : null}
    </>
  );
}

function ReviewActions({
  documents,
  onStatusChange
}: {
  documents: ReviewDocument[];
  onStatusChange: (status: ReviewStatus, reason?: string, remediationDocuments?: string[]) => void;
}) {
  const [mode, setMode] = useState<ActionMode | null>(null);

  return (
    <>
      <Card>
        <CardHeader><CardTitle>審核操作</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full" onClick={() => setMode("通過審核")}><CheckCircle2 className="h-4 w-4" />通過審核</Button>
          <Button className="w-full" variant="danger" onClick={() => setMode("拒絕申請")}>拒絕申請</Button>
          <Button className="w-full" variant="secondary" onClick={() => setMode("要求補件")}>要求補件</Button>
          <p className="text-sm leading-6 text-slateText-secondary">
            補件、拒絕及通過操作會保存在本機狀態中，用於展示工作人員後台流程。
          </p>
        </CardContent>
      </Card>
      {mode ? (
        <ReviewActionModal
          mode={mode}
          documents={documents}
          onClose={() => setMode(null)}
          onConfirm={({ reason, documents: selectedDocuments }) => {
            if (mode === "通過審核") onStatusChange("已通過");
            if (mode === "拒絕申請") onStatusChange("已拒絕", reason || "未填寫拒絕原因");
            if (mode === "要求補件") onStatusChange("需補件", reason || "文件需重新確認", selectedDocuments);
            setMode(null);
          }}
        />
      ) : null}
    </>
  );
}

function ListActionButtons({
  href,
  documents,
  onStatusChange
}: {
  href: string;
  documents: ReviewDocument[];
  onStatusChange: (status: ReviewStatus, reason?: string, remediationDocuments?: string[]) => void;
}) {
  const [mode, setMode] = useState<ActionMode | null>(null);
  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button asChild size="sm" variant="secondary"><Link href={href}>查看詳情</Link></Button>
        <Button size="sm" onClick={() => setMode("通過審核")}>通過</Button>
        <Button size="sm" variant="danger" onClick={() => setMode("拒絕申請")}>拒絕</Button>
        <Button size="sm" variant="secondary" onClick={() => setMode("要求補件")}>要求補件</Button>
      </div>
      {mode ? (
        <ReviewActionModal
          mode={mode}
          documents={documents}
          onClose={() => setMode(null)}
          onConfirm={({ reason, documents: selectedDocuments }) => {
            if (mode === "通過審核") onStatusChange("已通過");
            if (mode === "拒絕申請") onStatusChange("已拒絕", reason || "未填寫拒絕原因");
            if (mode === "要求補件") onStatusChange("需補件", reason || "文件需重新確認", selectedDocuments);
            setMode(null);
          }}
        />
      ) : null}
    </>
  );
}

export function KycReviewList() {
  const { cases, updateCase } = useCases<KycReviewCase>("kyc", kycDefaults);

  return (
    <>
      <PageHeader
        eyebrow="KYC 審核"
        title="KYC 個人身份審核"
        description="工作人員可查看個人身份認證案件、文件狀態、風險等級及審核操作。"
      />
      <Card>
        <CardContent className="pt-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>申請編號</TableHead>
                <TableHead>用戶姓名</TableHead>
                <TableHead>國籍</TableHead>
                <TableHead>電郵</TableHead>
                <TableHead>提交時間</TableHead>
                <TableHead>狀態</TableHead>
                <TableHead>風險等級</TableHead>
                <TableHead>負責審核員</TableHead>
                <TableHead>操作按鈕</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.nationality}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.submittedAt}</TableCell>
                  <TableCell>{statusBadge(item.status)}</TableCell>
                  <TableCell>{riskBadge(item.riskLevel)}</TableCell>
                  <TableCell>{item.reviewer}</TableCell>
                  <TableCell>
                    <ListActionButtons
                      href={`/admin/compliance/kyc/${item.id}`}
                      documents={item.documents}
                      onStatusChange={(status, reason, remediationDocuments) => updateCase(item.id, {
                        status,
                        remediationReason: reason,
                        remediationDocuments,
                        remediationRequestedAt: status === "需補件" ? currentTimeText() : item.remediationRequestedAt
                      })}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

export function KycReviewDetail({ id }: { id: string }) {
  const { cases, updateCase } = useCases<KycReviewCase>("kyc", kycDefaults);
  const item = cases.find((caseItem) => caseItem.id === id);

  const updateDocument = (documentId: string, status: DocumentStatus) => {
    if (!item) return;
    updateCase(item.id, {
      documents: item.documents.map((document) => document.id === documentId ? { ...document, status } : document),
      status: status === "需重新上傳" || status === "不清晰" ? "需補件" : item.status,
      remediationReason: status === "需重新上傳" || status === "不清晰" ? "文件不清晰或需重新上傳" : item.remediationReason,
      remediationDocuments: status === "需重新上傳" || status === "不清晰" ? [item.documents.find((document) => document.id === documentId)?.name || "指定文件"] : item.remediationDocuments,
      remediationRequestedAt: status === "需重新上傳" || status === "不清晰" ? currentTimeText() : item.remediationRequestedAt
    });
  };

  if (!item) return <MissingCase title="找不到 KYC 案件" />;

  return (
    <>
      <PageHeader
        eyebrow="KYC 審核詳情"
        title={item.name}
        description={`申請編號：${item.id}`}
        action={<Button asChild variant="secondary"><Link href="/admin/compliance/kyc">返回列表</Link></Button>}
      />
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>基本資料</CardTitle>
              <div className="flex gap-2">{statusBadge(item.status)}{riskBadge(item.riskLevel)}</div>
            </CardHeader>
            <CardContent>
              <InfoGrid
                items={[
                  ["姓名", item.name],
                  ["性別", present(item.gender)],
                  ["出生地", present(item.birthplace)],
                  ["出生日期", item.birthDate],
                  ["居住城市及地址", present(item.cityAddress || item.address)],
                  ["國籍", item.nationality],
                  ["電郵", item.email],
                  ["手機號碼", item.phone],
                  ["負責審核員", item.reviewer]
                ]}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>風險問題</CardTitle></CardHeader>
            <CardContent>
              <InfoGrid
                items={[
                  ["是否屬於任何註冊企業的法人", present(item.legalPerson)],
                  ["企業完整名稱", present(item.enterpriseFullName)],
                  ["是否曾與高風險國家 / 地區有業務或重大聯繫", present(item.highRiskContact)],
                  ["相關國家 / 地區", present(item.highRiskCountries)],
                  ["資金來源", present(item.fundSource)],
                  ["預計交易金額", present(item.expectedAmount)]
                ]}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>銀行資料</CardTitle></CardHeader>
            <CardContent>
              <InfoGrid
                items={[
                  ["銀行名稱", present(item.bankName)],
                  ["銀行所在國家", present(item.bankCountry)],
                  ["銀行地址", present(item.bankAddress)],
                  ["收款人名稱", present(item.beneficiaryName)],
                  ["銀行帳戶號碼", present(item.bankAccountNumber)],
                  ["收款人地址", present(item.beneficiaryAddress)],
                  ["SWIFT / Routing Number / ABA", present(item.swiftRoutingAba)]
                ]}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>文件區</CardTitle></CardHeader>
            <CardContent><DocumentGrid documents={item.documents} onDocumentUpdate={updateDocument} /></CardContent>
          </Card>
        </div>
        <ReviewActions
          documents={item.documents}
          onStatusChange={(status, reason, remediationDocuments) => updateCase(item.id, {
            status,
            remediationReason: reason,
            remediationDocuments,
            remediationRequestedAt: status === "需補件" ? currentTimeText() : item.remediationRequestedAt
          })}
        />
      </div>
    </>
  );
}

export function KybReviewList() {
  const { cases, updateCase } = useCases<KybReviewCase>("kyb", kybDefaults);

  return (
    <>
      <PageHeader
        eyebrow="KYB 審核"
        title="KYB 企業 / 機構審核"
        description="工作人員可查看企業認證案件、公司資料、文件狀態、風險等級及審核操作。"
      />
      <Card>
        <CardContent className="pt-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>公司名稱</TableHead>
                <TableHead>公司註冊編號</TableHead>
                <TableHead>公司註冊地</TableHead>
                <TableHead>聯絡人</TableHead>
                <TableHead>提交時間</TableHead>
                <TableHead>狀態</TableHead>
                <TableHead>風險等級</TableHead>
                <TableHead>負責業務主任</TableHead>
                <TableHead>操作按鈕</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.companyName}</TableCell>
                  <TableCell>{item.registrationNo}</TableCell>
                  <TableCell>{item.jurisdiction}</TableCell>
                  <TableCell>{item.contactName}</TableCell>
                  <TableCell>{item.submittedAt}</TableCell>
                  <TableCell>{statusBadge(item.status)}</TableCell>
                  <TableCell>{riskBadge(item.riskLevel)}</TableCell>
                  <TableCell>{item.reviewer}</TableCell>
                  <TableCell>
                    <ListActionButtons
                      href={`/admin/compliance/kyb/${item.id}`}
                      documents={item.documents}
                      onStatusChange={(status, reason, remediationDocuments) => updateCase(item.id, {
                        status,
                        remediationReason: reason,
                        remediationDocuments,
                        remediationRequestedAt: status === "需補件" ? currentTimeText() : item.remediationRequestedAt
                      })}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

export function KybReviewDetail({ id }: { id: string }) {
  const { cases, updateCase } = useCases<KybReviewCase>("kyb", kybDefaults);
  const item = cases.find((caseItem) => caseItem.id === id);

  const updateDocument = (documentId: string, status: DocumentStatus) => {
    if (!item) return;
    updateCase(item.id, {
      documents: item.documents.map((document) => document.id === documentId ? { ...document, status } : document),
      status: status === "需重新上傳" || status === "不清晰" ? "需補件" : item.status,
      remediationReason: status === "需重新上傳" || status === "不清晰" ? "文件不清晰或需重新上傳" : item.remediationReason,
      remediationDocuments: status === "需重新上傳" || status === "不清晰" ? [item.documents.find((document) => document.id === documentId)?.name || "指定文件"] : item.remediationDocuments,
      remediationRequestedAt: status === "需重新上傳" || status === "不清晰" ? currentTimeText() : item.remediationRequestedAt
    });
  };

  if (!item) return <MissingCase title="找不到 KYB 案件" />;

  return (
    <>
      <PageHeader
        eyebrow="KYB 審核詳情"
        title={item.companyName}
        description={`申請編號：${item.id}`}
        action={<Button asChild variant="secondary"><Link href="/admin/compliance/kyb">返回列表</Link></Button>}
      />
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>公司資料</CardTitle>
              <div className="flex gap-2">{statusBadge(item.status)}{riskBadge(item.riskLevel)}</div>
            </CardHeader>
            <CardContent>
              <InfoGrid
                items={[
                  ["公司完整名稱", item.companyName],
                  ["公司註冊編號", item.registrationNo],
                  ["公司註冊國家", present(item.incorporationCountry || item.jurisdiction)],
                  ["註冊日期", item.incorporationDate],
                  ["主要營業地點", present(item.principalPlace || item.businessAddress)],
                  ["主要營業地點所在國家", present(item.principalPlaceCountry)],
                  ["公司網站", present(item.companyWebsite)],
                  ["公司業務活動詳細描述", present(item.businessActivities || item.businessDescription)]
                ]}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>風險問題</CardTitle></CardHeader>
            <CardContent>
              <InfoGrid
                items={[
                  ["是否曾被監管機構調查、傳票或罰款", present(item.regulatoryInvestigation)],
                  ["是否曾與高風險國家 / 地區有業務或重大聯繫", present(item.highRiskContact)],
                  ["相關國家 / 地區", present(item.highRiskCountries)],
                  ["公司資金或資產來源", present(item.fundSource)],
                  ["預計交易金額", present(item.expectedAmount)]
                ]}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>銀行資料</CardTitle></CardHeader>
            <CardContent>
              <InfoGrid
                items={[
                  ["銀行名稱", present(item.bankName)],
                  ["銀行所在國家", present(item.bankCountry)],
                  ["銀行地址", present(item.bankAddress)],
                  ["收款人名稱", present(item.beneficiaryName)],
                  ["銀行帳戶號碼", present(item.bankAccountNumber)],
                  ["收款人地址", present(item.beneficiaryAddress)],
                  ["SWIFT / Routing Number / ABA", present(item.swiftRoutingAba)]
                ]}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>負責人資料</CardTitle></CardHeader>
            <CardContent>
              <InfoGrid
                items={[
                  ["全名", present(item.responsibleFullName || item.contactName)],
                  ["電郵", present(item.responsibleEmail || item.contactEmail)],
                  ["職稱", present(item.responsibleJobTitle || item.contactTitle)],
                  ["電話號碼", present(item.responsiblePhone || item.contactPhone)]
                ]}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>實益擁有人 / 管理人資料</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>姓名</TableHead>
                    <TableHead>職稱</TableHead>
                    <TableHead>出生日期</TableHead>
                    <TableHead>居住地址</TableHead>
                    <TableHead>國籍</TableHead>
                    <TableHead>護照號碼</TableHead>
                    <TableHead>持股比例</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(item.beneficialOwners?.length ? item.beneficialOwners : item.directors.map((director) => ({
                    lastName: director.name,
                    firstName: "",
                    jobTitle: director.uboInfo,
                    birthDate: "未提供",
                    residentialAddress: "未提供",
                    nationality: director.nationality,
                    passportNumber: director.idDocument,
                    ownership: director.ownership
                  }))).map((owner, index) => (
                    <TableRow key={`${owner.lastName}-${owner.firstName}-${index}`}>
                      <TableCell>{owner.lastName}{owner.firstName}</TableCell>
                      <TableCell>{owner.jobTitle}</TableCell>
                      <TableCell>{owner.birthDate}</TableCell>
                      <TableCell>{owner.residentialAddress}</TableCell>
                      <TableCell>{owner.nationality}</TableCell>
                      <TableCell>{owner.passportNumber}</TableCell>
                      <TableCell>{owner.ownership}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>KYB 文件區</CardTitle></CardHeader>
            <CardContent><DocumentGrid documents={item.documents} onDocumentUpdate={updateDocument} /></CardContent>
          </Card>
        </div>
        <ReviewActions
          documents={item.documents}
          onStatusChange={(status, reason, remediationDocuments) => updateCase(item.id, {
            status,
            remediationReason: reason,
            remediationDocuments,
            remediationRequestedAt: status === "需補件" ? currentTimeText() : item.remediationRequestedAt
          })}
        />
      </div>
    </>
  );
}

export function RemediationCenter() {
  const { cases: kycCases } = useCases<KycReviewCase>("kyc", kycDefaults);
  const { cases: kybCases } = useCases<KybReviewCase>("kyb", kybDefaults);
  const { cases: depositCases } = useDepositCases();
  const items = useMemo(() => {
    return [
      ...kycCases.map((item) => ({
        id: item.id,
        name: item.name,
        reason: item.remediationReason,
        requestedAt: item.remediationRequestedAt,
        status: item.status,
        reviewer: item.reviewer,
        documents: item.remediationDocuments
      })),
      ...kybCases.map((item) => ({
        id: item.id,
        name: item.companyName,
        reason: item.remediationReason,
        requestedAt: item.remediationRequestedAt,
        status: item.status,
        reviewer: item.reviewer,
        documents: item.remediationDocuments
      })),
      ...depositCases.map((item) => ({
        id: item.id,
        name: item.applicantName,
        reason: item.remediationReason,
        requestedAt: item.remediationRequestedAt,
        status: item.reviewStatus,
        reviewer: item.reviewer,
        documents: item.remediationDocuments
      }))
    ].filter((item) => item.status === "需補件" || item.reason);
  }, [kycCases, kybCases, depositCases]);

  return (
    <>
      <PageHeader
        eyebrow="補件中心"
        title="補件案件管理"
        description="集中查看等待用戶重新提交文件或補充資料的 KYC / KYB 案件。"
      />
      <Card>
        <CardContent className="pt-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>補件案件</TableHead>
                <TableHead>補件原因</TableHead>
                <TableHead>等待用戶回覆時間</TableHead>
                <TableHead>指定文件</TableHead>
                <TableHead>補件狀態</TableHead>
                <TableHead>負責審核員</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}<span className="block text-xs text-slateText-secondary">{item.name}</span></TableCell>
                  <TableCell>{item.reason || "待補充原因"}</TableCell>
                  <TableCell>{item.requestedAt || "剛剛建立"}</TableCell>
                  <TableCell>{item.documents?.length ? item.documents.join("、") : "未指定"}</TableCell>
                  <TableCell>{statusBadge(item.status as ReviewStatus)}</TableCell>
                  <TableCell>{item.reviewer}</TableCell>
                </TableRow>
              ))}
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-slateText-secondary">目前沒有補件案件</TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

type DepositReviewStatus = "待審核" | "審核中" | "需補件" | "已通過" | "已拒絕";

export type DepositProofInput = {
  name: string;
  category: string;
  type?: string;
  status?: DocumentStatus;
};

export type DepositReviewCase = {
  id: string;
  uid: string;
  applicantName: string;
  amount: string;
  currency: string;
  source: string;
  note: string;
  submittedAt: string;
  documentStatus: DocumentStatus;
  reviewStatus: DepositReviewStatus;
  kycKybStatus: string;
  riskNotice: string;
  reviewer: string;
  remediationReason?: string;
  remediationDocuments?: string[];
  remediationRequestedAt?: string;
  documents: ReviewDocument[];
};

const depositStorageKey = "7gg-admin-deposit-review-cases";

const depositDefaults: DepositReviewCase[] = [
  {
    id: "DEP-20260518-001",
    uid: "UID-100492",
    applicantName: "Orbit Commerce Limited",
    amount: "128,000",
    currency: "USD",
    source: "北美 DTC 商品訂單回款",
    note: "本次入帳對應五月第一批出貨訂單。",
    submittedAt: "2026-05-18 15:30",
    documentStatus: "待審核",
    reviewStatus: "待審核",
    kycKybStatus: "KYB 審核中",
    riskNotice: "文件已提交，需核對合同與物流訂單是否一致。",
    reviewer: "Grace Lee",
    documents: [
      { id: "dep-doc-1", name: "合同 / 訂單", type: "入帳證明", uploadedAt: "2026-05-18 15:28", status: "待審核" },
      { id: "dep-doc-2", name: "物流訂單", type: "入帳證明", uploadedAt: "2026-05-18 15:29", status: "待審核" }
    ]
  },
  {
    id: "DEP-20260517-006",
    uid: "UID-884201",
    applicantName: "Luca Rossi",
    amount: "42,500",
    currency: "EUR",
    source: "自由顧問服務收入",
    note: "缺少客戶訂單與詢盤紀錄，需要用戶補充。",
    submittedAt: "2026-05-17 18:12",
    documentStatus: "缺失",
    reviewStatus: "需補件",
    kycKybStatus: "KYC 需補件",
    riskNotice: "入帳來源說明與現有文件不足以完成交易背景核對。",
    reviewer: "Daniel Wong",
    remediationReason: "缺少合同 / 訂單或詢盤紀錄",
    remediationDocuments: ["合同 / 訂單", "詢盤紀錄"],
    remediationRequestedAt: "2026-05-18 09:45",
    documents: [
      { id: "dep-doc-3", name: "三個月內銀行月結單", type: "補充參考文件", uploadedAt: "2026-05-17 18:10", status: "已通過" }
    ]
  }
];

function readStoredDeposits() {
  if (typeof window === "undefined") return [];
  try {
    const saved = window.localStorage.getItem(depositStorageKey);
    return saved ? JSON.parse(saved) as DepositReviewCase[] : [];
  } catch {
    return [];
  }
}

function persistDepositCase(item: DepositReviewCase) {
  const stored = readStoredDeposits();
  const next = [item, ...stored.filter((caseItem) => caseItem.id !== item.id)];
  window.localStorage.setItem(depositStorageKey, JSON.stringify(next));
  window.dispatchEvent(new Event("7gg-deposit-review-cases"));
}

export function appendDepositApplication(
  form: { currency: string; amount: string; source: string; note: string; applicantName?: string; uid?: string },
  documents: DepositProofInput[]
) {
  if (typeof window === "undefined") return;
  const timestamp = Date.now();
  const submittedAt = currentTimeText();
  const item: DepositReviewCase = {
    id: `DEP-${timestamp}`,
    uid: form.uid || "UID-MOCK-7001",
    applicantName: form.applicantName || "7GG Pay 商戶",
    amount: form.amount || "待確認",
    currency: form.currency,
    source: form.source || "待確認",
    note: form.note || "未提供",
    submittedAt,
    documentStatus: documents.length ? "待審核" : "缺失",
    reviewStatus: "待審核",
    kycKybStatus: "已提交，待合規核對",
    riskNotice: "需核對入帳文件與資金來源說明是否一致。",
    reviewer: "未分配",
    documents: documents.map((document, index) => ({
      id: `dep-doc-${timestamp}-${index}`,
      name: document.category,
      type: document.type || document.name,
      uploadedAt: submittedAt,
      status: document.status || "待審核"
    }))
  };
  persistDepositCase(item);
}

function subscribeToDepositCases(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("7gg-deposit-review-cases", onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener("7gg-deposit-review-cases", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function useDepositCases() {
  const storedSnapshot = useSyncExternalStore(
    subscribeToDepositCases,
    () => typeof window === "undefined" ? "[]" : window.localStorage.getItem(depositStorageKey) ?? "[]",
    () => "[]"
  );

  const cases = useMemo(() => {
    try {
      return mergeCases(depositDefaults, JSON.parse(storedSnapshot) as DepositReviewCase[]);
    } catch {
      return depositDefaults;
    }
  }, [storedSnapshot]);

  const updateCase = (id: string, patch: Partial<DepositReviewCase>) => {
    const current = cases.find((item) => item.id === id);
    if (!current) return;
    persistDepositCase({ ...current, ...patch });
  };

  return { cases, updateCase };
}

function DepositActionButtons({
  href,
  documents,
  onStatusChange
}: {
  href?: string;
  documents: ReviewDocument[];
  onStatusChange: (status: DepositReviewStatus, reason?: string, remediationDocuments?: string[]) => void;
}) {
  const [mode, setMode] = useState<ActionMode | null>(null);
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {href ? <Button asChild size="sm" variant="secondary"><Link href={href}>查看詳情</Link></Button> : null}
        <Button size="sm" onClick={() => setMode("通過審核")}>通過入帳</Button>
        <Button size="sm" variant="danger" onClick={() => setMode("拒絕申請")}>拒絕入帳</Button>
        <Button size="sm" variant="secondary" onClick={() => setMode("要求補件")}>要求補充文件</Button>
      </div>
      {mode ? (
        <ReviewActionModal
          mode={mode}
          documents={documents}
          onClose={() => setMode(null)}
          onConfirm={({ reason, documents: selectedDocuments }) => {
            if (mode === "通過審核") onStatusChange("已通過");
            if (mode === "拒絕申請") onStatusChange("已拒絕", reason || "入帳文件未能通過審核");
            if (mode === "要求補件") onStatusChange("需補件", reason || "需補充入帳證明文件", selectedDocuments);
            setMode(null);
          }}
        />
      ) : null}
    </>
  );
}

export function DepositReviewList() {
  const { cases, updateCase } = useDepositCases();

  return (
    <>
      <PageHeader
        eyebrow="入帳審核"
        title="入帳文件審核"
        description="工作人員可查看商戶提交的入帳資料、合同 / 訂單、詢盤紀錄及物流文件，並進行入帳審核。"
      />
      <Card>
        <CardContent className="pt-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>入帳編號</TableHead>
                <TableHead>UID</TableHead>
                <TableHead>用戶姓名 / 公司名稱</TableHead>
                <TableHead>入帳金額</TableHead>
                <TableHead>幣種</TableHead>
                <TableHead>提交時間</TableHead>
                <TableHead>文件狀態</TableHead>
                <TableHead>審核狀態</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.uid}</TableCell>
                  <TableCell>{item.applicantName}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.currency}</TableCell>
                  <TableCell>{item.submittedAt}</TableCell>
                  <TableCell>{statusBadge(item.documentStatus)}</TableCell>
                  <TableCell>{statusBadge(item.reviewStatus)}</TableCell>
                  <TableCell>
                    <DepositActionButtons
                      href={`/admin/compliance/deposits/${item.id}`}
                      documents={item.documents}
                      onStatusChange={(status, reason, remediationDocuments) => updateCase(item.id, {
                        reviewStatus: status,
                        documentStatus: status === "已通過" ? "已通過" : status === "需補件" ? "需重新上傳" : item.documentStatus,
                        remediationReason: reason,
                        remediationDocuments,
                        remediationRequestedAt: status === "需補件" ? currentTimeText() : item.remediationRequestedAt
                      })}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

export function DepositReviewDetail({ id }: { id: string }) {
  const { cases, updateCase } = useDepositCases();
  const item = cases.find((caseItem) => caseItem.id === id);

  const updateDocument = (documentId: string, status: DocumentStatus) => {
    if (!item) return;
    updateCase(item.id, {
      documents: item.documents.map((document) => document.id === documentId ? { ...document, status } : document),
      documentStatus: status,
      reviewStatus: status === "需重新上傳" || status === "不清晰" ? "需補件" : item.reviewStatus,
      remediationReason: status === "需重新上傳" || status === "不清晰" ? "入帳文件不清晰或需重新上傳" : item.remediationReason,
      remediationDocuments: status === "需重新上傳" || status === "不清晰" ? [item.documents.find((document) => document.id === documentId)?.name || "指定文件"] : item.remediationDocuments,
      remediationRequestedAt: status === "需重新上傳" || status === "不清晰" ? currentTimeText() : item.remediationRequestedAt
    });
  };

  if (!item) return <MissingCase title="找不到入帳審核案件" />;

  const documentsByName = (name: string) => item.documents.filter((document) => document.name.includes(name));

  return (
    <>
      <PageHeader
        eyebrow="入帳審核詳情"
        title={item.id}
        description={`${item.applicantName} · ${item.currency} ${item.amount}`}
        action={<Button asChild variant="secondary"><Link href="/admin/compliance/deposits">返回列表</Link></Button>}
      />
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>入帳資料</CardTitle>
              <div className="flex gap-2">{statusBadge(item.documentStatus)}{statusBadge(item.reviewStatus)}</div>
            </CardHeader>
            <CardContent>
              <InfoGrid
                items={[
                  ["UID", item.uid],
                  ["用戶姓名 / 公司名稱", item.applicantName],
                  ["入帳金額", item.amount],
                  ["幣種", item.currency],
                  ["提交時間", item.submittedAt],
                  ["用戶 KYC / KYB 狀態", item.kycKybStatus],
                  ["風險提示", item.riskNotice],
                  ["負責審核員", item.reviewer]
                ]}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>入帳來源說明</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-slateText-secondary">
              <p>{item.source}</p>
              <p>{item.note}</p>
            </CardContent>
          </Card>
          {["合同 / 訂單", "詢盤紀錄", "物流訂單"].map((group) => (
            <Card key={group}>
              <CardHeader><CardTitle>{group}</CardTitle></CardHeader>
              <CardContent>
                {documentsByName(group).length ? (
                  <DocumentGrid documents={documentsByName(group)} onDocumentUpdate={updateDocument} />
                ) : (
                  <p className="rounded-2xl border border-[color:var(--border-muted)] bg-[color:var(--control)] p-5 text-sm text-slateText-secondary">未提交此類文件</p>
                )}
              </CardContent>
            </Card>
          ))}
          <Card>
            <CardHeader><CardTitle>全部入帳文件</CardTitle></CardHeader>
            <CardContent><DocumentGrid documents={item.documents} onDocumentUpdate={updateDocument} /></CardContent>
          </Card>
        </div>
        <Card className="h-fit">
          <CardHeader><CardTitle>審核操作</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <DepositActionButtons
              documents={item.documents}
              onStatusChange={(status, reason, remediationDocuments) => updateCase(item.id, {
                reviewStatus: status,
                documentStatus: status === "已通過" ? "已通過" : status === "需補件" ? "需重新上傳" : item.documentStatus,
                remediationReason: reason,
                remediationDocuments,
                remediationRequestedAt: status === "需補件" ? currentTimeText() : item.remediationRequestedAt
              })}
            />
            {item.remediationReason ? (
              <div className="rounded-2xl border border-amber-500/25 bg-amber-500/10 p-4 text-sm text-slateText-secondary">
                <p className="font-medium text-slateText-primary">補件原因</p>
                <p className="mt-2">{item.remediationReason}</p>
                <p className="mt-2">指定文件：{item.remediationDocuments?.join("、") || "未指定"}</p>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function MissingCase({ title }: { title: string }) {
  return (
    <Card className="mx-auto max-w-2xl p-8 text-center">
      <CardTitle>{title}</CardTitle>
      <p className="mt-3 text-sm text-slateText-secondary">請返回列表重新選擇案件。</p>
      <Button asChild className="mt-6"><Link href="/admin/compliance">返回合規審核</Link></Button>
    </Card>
  );
}
