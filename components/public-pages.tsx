"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Building2,
  Code2,
  Globe2,
  Mail,
  Network,
  Upload,
  ShieldCheck,
  TerminalSquare,
  UserRound,
  Users,
  Webhook
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  FeatureCard,
  HeroVisual,
  LanguageThemeControls,
  Logo,
  PricingCard,
  PublicShell,
  productModules
} from "@/components/platform-components";
import { usePreferences } from "@/components/preferences-provider";
import { appendVerificationCase } from "@/components/verification-review-module";

const useCases = [
  ["Cross-border E-commerce", "Accept and settle global commerce payments across fiat and stablecoin rails.", Globe2],
  ["Trading Companies", "Operate supplier payouts, collections, and FX flows with treasury-grade controls.", Building2],
  ["Web3 Businesses", "Present crypto-fiat operating flows without connecting real wallets or chains.", Network],
  ["OTC / Digital Asset Businesses", "Mock review-ready flows for OTC settlement, payout controls, and reporting.", ShieldCheck],
  ["Global Merchants", "Unify multi-market pay-in, pay-out, wallets, and transaction visibility.", Users]
] as const;

const complianceItems = [
  "Canada MSB Registered",
  "Hong Kong MSO Application in Progress",
  "AML / KYB Ready",
  "Secure Fiat & Crypto Operations"
];

export function HomePageContent() {
  const { t } = usePreferences();
  return (
    <PublicShell>
      <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-10 px-5 py-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <Badge variant="gold" className="mb-6">{t("Institutional payment infrastructure")}</Badge>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
            {t("7GG Pay — Global Fiat & Crypto Payment Infrastructure")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slateText-secondary">
            {t("A next-generation payment platform for global merchants, cross-border businesses, and digital asset companies.")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild><Link href="/register">{t("Get Started")}<ArrowRight className="h-4 w-4" /></Link></Button>
            <Button asChild variant="secondary"><Link href="/contact">{t("Contact Sales")}</Link></Button>
            <Button asChild variant="ghost"><Link href="/developers">{t("View Developer Docs")}</Link></Button>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-3">
            {["$128M monthly volume", "42 corridors", "99.98% mock uptime"].map((item) => (
              <div key={item} className="rounded-2xl border border-gold-500/15 bg-[color:var(--card)] p-4 text-sm text-slateText-secondary">
                <span className="block text-base font-semibold text-slateText-primary">{item.split(" ")[0]}</span>
                {t(item.split(" ").slice(1).join(" "))}
              </div>
            ))}
          </div>
        </div>
        <HeroVisual />
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <SectionIntro eyebrow="Products" title="One premium surface for payment operations" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {productModules.map(([title, description, Icon]) => (
            <FeatureCard key={title} title={title} description={description} icon={Icon} />
          ))}
        </div>
      </section>

      <section className="border-y border-gold-500/15 bg-[color:var(--card)] py-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 md:grid-cols-4">
          {complianceItems.map((item) => (
            <Card key={item} className="p-5">
              <BadgeCheck className="mb-4 h-6 w-6 text-gold-300" />
              <p className="text-sm font-medium">{t(item)}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <SectionIntro eyebrow="Solutions" title="Built for global finance operators" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {useCases.map(([title, description, Icon]) => (
            <FeatureCard key={title} title={title} description={description} icon={Icon} items={["Pay-in", "Pay-out", "Reporting"]} />
          ))}
        </div>
      </section>

      <DeveloperPreview />
      <FinalCta />
    </PublicShell>
  );
}

function SectionIntro({ eyebrow, title }: { eyebrow: string; title: string }) {
  const { t } = usePreferences();
  return (
    <div className="mb-8">
      <p className="text-xs uppercase tracking-[0.24em] text-gold-300">{t(eyebrow)}</p>
      <h2 className="mt-3 text-3xl font-semibold">{t(title)}</h2>
    </div>
  );
}

function DeveloperPreview() {
  const { t } = usePreferences();
  const modules = [
    [TerminalSquare, "REST API", "v1/payments"],
    [Webhook, "Webhook", "payment.succeeded"],
    [Code2, "SDK", "Node / TS"],
    [ShieldCheck, "Sandbox", "Mock mode"],
    [BookOpen, "API Logs", "2,419 events"]
  ] as const;
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <Card className="grid gap-8 overflow-hidden p-6 md:grid-cols-[0.85fr_1.15fr] md:p-8">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-gold-300">{t("Developers")}</p>
          <h2 className="mt-3 text-3xl font-semibold">{t("Developer portal preview")}</h2>
          <p className="mt-4 leading-7 text-slateText-secondary">{t("REST endpoints, webhook events, sandbox toggles, SDK surfaces, and API logs presented as UI-only artifacts.")}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {modules.map(([Icon, label, value]) => (
            <div key={label} className="rounded-2xl border border-gold-500/15 bg-[color:var(--control)] p-4">
              <Icon className="mb-5 h-5 w-5 text-gold-300" />
              <p className="text-sm font-medium">{t(label)}</p>
              <p className="mt-1 text-sm text-slateText-secondary">{value}</p>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}

function FinalCta() {
  const { t } = usePreferences();
  return (
    <section className="mx-auto max-w-7xl px-5 pb-20">
      <Card className="p-8 text-center">
        <h2 className="text-3xl font-semibold">{t("Start building with 7GG Pay")}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slateText-secondary">{t("Launch a mock account flow or speak with our team about global payment infrastructure.")}</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button asChild><Link href="/register">{t("Start your account")}</Link></Button>
          <Button asChild variant="secondary"><Link href="/contact">{t("Talk to our team")}</Link></Button>
        </div>
      </Card>
    </section>
  );
}

export function PublicListingPage({ kind }: { kind: "products" | "solutions" | "compliance" | "developers" | "pricing" | "contact" }) {
  const { t } = usePreferences();
  const titleMap = {
    products: "Products",
    solutions: "Solutions",
    compliance: "Compliance",
    developers: "Developers",
    pricing: "Pricing",
    contact: "Contact Sales"
  };
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-14">
        <Badge variant="gold" className="mb-5">{t(titleMap[kind])}</Badge>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">{t(pageHeadline(kind))}</h1>
        <p className="mt-4 max-w-2xl text-slateText-secondary">{t(pageDescription(kind))}</p>
      </section>
      {kind === "products" ? <ProductsSection /> : null}
      {kind === "solutions" ? <SolutionsSection /> : null}
      {kind === "compliance" ? <ComplianceSection /> : null}
      {kind === "developers" ? <DevelopersSection /> : null}
      {kind === "pricing" ? <PricingSection /> : null}
      {kind === "contact" ? <ContactSection /> : null}
    </PublicShell>
  );
}

function pageHeadline(kind: string) {
  return {
    products: "Payment products for fiat and digital asset operations",
    solutions: "Industry solutions for global merchants",
    compliance: "Compliance and security readiness",
    developers: "Developer-first payment infrastructure",
    pricing: "Transparent pricing surfaces for every stage",
    contact: "Talk to 7GG Pay sales"
  }[kind] ?? "7GG Pay";
}

function pageDescription(kind: string) {
  return {
    products: "Explore pay-in, pay-out, wallet, FX, gateway, and virtual account modules with mock UI previews.",
    solutions: "Premium workflows for commerce, trading, Web3, payment platforms, and digital asset businesses.",
    compliance: "A UI-only overview of registration, KYB, AML, monitoring, operations, and data security controls.",
    developers: "Preview mock APIs, webhooks, sandbox controls, SDK access, keys, logs, and code snippets.",
    pricing: "Plan cards with placeholder pricing, fees, spreads, API access, KYB support, and sales CTAs.",
    contact: "Use this mock contact form to present enterprise sales, compliance, and developer support paths."
  }[kind] ?? "";
}

function ProductsSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-20">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {productModules.map(([title, description, Icon]) => (
          <FeatureCard key={title} title={title} description={description} icon={Icon} items={["Key features", "Mock UI preview card", "Operational controls"]} />
        ))}
      </div>
    </section>
  );
}

function SolutionsSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-20">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {useCases.map(([title, description, Icon]) => (
          <FeatureCard key={title} title={title} description={description} icon={Icon} items={["Treasury operations", "Payment management", "Risk visibility"]} />
        ))}
      </div>
    </section>
  );
}

function ComplianceSection() {
  const items = ["Canada MSB", "Hong Kong MSO Application", "KYC / KYB", "AML / CFT", "Transaction Monitoring", "Secure Operations", "Data Security"];
  return (
    <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-20 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <FeatureCard key={item} title={item} description={`${item} mock compliance capability for UI presentation.`} icon={ShieldCheck} items={["Policy surface", "Review workflow", "Audit trail"]} />
      ))}
    </section>
  );
}

function DevelopersSection() {
  const { t } = usePreferences();
  const apis = ["API Overview", "Payment API", "Payout API", "FX Quote API", "Webhook", "Sandbox", "API Key Preview"];
  return (
    <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-20 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="grid gap-4 sm:grid-cols-2">
        {apis.map((api) => (
          <Card key={api} className="p-5">
            <KeyIcon title={api} />
            <p className="mt-4 font-semibold">{t(api)}</p>
            <p className="mt-2 text-sm text-slateText-secondary">{t("Mock developer module for API documentation and sandbox operations.")}</p>
          </Card>
        ))}
      </div>
      <Card className="p-5">
        <p className="mb-4 text-sm font-semibold text-gold-300">{t("Code block mockup")}</p>
        <pre className="overflow-auto rounded-2xl border border-gold-500/15 bg-[color:var(--control)] p-4 text-sm text-slateText-secondary">
{`POST /v1/payments
{
  "amount": "24880.00",
  "currency": "USD",
  "settlement": "USDT"
}`}
        </pre>
      </Card>
    </section>
  );
}

function KeyIcon({ title }: { title: string }) {
  const Icon = title.includes("Webhook") ? Webhook : title.includes("Key") ? KeyIconInner : TerminalSquare;
  return <Icon className="h-6 w-6 text-gold-300" />;
}

function KeyIconInner(props: React.ComponentProps<typeof TerminalSquare>) {
  return <TerminalSquare {...props} />;
}

function PricingSection() {
  return (
    <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-20 md:grid-cols-2 xl:grid-cols-4">
      <PricingCard plan="Starter" price="$0/mo" />
      <PricingCard plan="Business" price="$299/mo" featured />
      <PricingCard plan="Enterprise" price="Custom" />
      <PricingCard plan="Custom Pricing" price="Talk to us" />
    </section>
  );
}

function ContactSection() {
  const { t } = usePreferences();
  const fields = ["Name", "Company", "Email", "Phone", "Country", "Business type", "Monthly volume", "Message"];
  return (
    <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-20 lg:grid-cols-[1.2fr_0.8fr]">
      <Card>
        <CardHeader><CardTitle>{t("Contact sales form")}</CardTitle></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {fields.map((field) => (
            <Input key={field} placeholder={t(field)} className={field === "Message" ? "md:col-span-2" : ""} />
          ))}
          <Button className="md:col-span-2">{t("Submit inquiry")}</Button>
        </CardContent>
      </Card>
      <div className="grid gap-5">
        {[
          ["Sales contact card", Mail],
          ["Compliance inquiry card", ShieldCheck],
          ["Developer support card", Code2]
        ].map(([title, Icon]) => (
          <Card key={title as string} className="p-5">
            <Icon className="mb-4 h-6 w-6 text-gold-300" />
            <p className="font-semibold">{t(title as string)}</p>
            <p className="mt-2 text-sm text-slateText-secondary">{t("Mock contact path for frontend presentation only.")}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function LoginPageContent() {
  const { t } = usePreferences();
  return (
    <div className="public-site min-h-screen px-5 py-8 text-slateText-primary">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Logo />
        <LanguageThemeControls compact={false} />
      </div>
      <div className="mx-auto mt-16 max-w-md">
        <Card>
          <CardHeader><CardTitle>{t("Login")}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder={t("Email")} />
            <Input placeholder={t("Password")} type="password" />
            <div className="flex items-center justify-between text-sm text-slateText-secondary">
              <label className="flex items-center gap-2"><input type="checkbox" />{t("Remember me")}</label>
              <Link href="/login">{t("Forgot password")}</Link>
            </div>
            <Button asChild className="w-full"><Link href="/dashboard">{t("Login")}</Link></Button>
            <p className="text-center text-sm text-slateText-secondary">{t("No account yet?")} <Link className="text-gold-300" href="/register">{t("Register")}</Link></p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

type ReviewType = "kyc" | "kyb";
type FormState = Record<string, string>;

const registrationCopy = {
  en: {
    localDraft: "Verification details",
    formHint: "Complete the required information and documents. Your account can only be activated after the review is approved.",
    returnLogin: "Back to login",
    returnHome: "Back to home",
    chooseBadge: "Registration verification",
    chooseTitle: "Choose your verification type",
    chooseDescription: "Select KYC personal verification or KYB business / institutional verification. The form will adjust to your choice.",
    appliesTo: "Best for:",
    kycTitle: "KYC Personal Identity Verification",
    kycApplies: ["Individual users", "Freelancers", "Personal treasury management"],
    startKyc: "Start KYC",
    kybTitle: "KYB Business / Institutional Verification",
    kybApplies: ["Merchants", "Companies", "PSPs", "Web3 / OTC / cross-border payment institutions"],
    startKyb: "Start KYB",
    steps: {
      kyc: ["Basic information", "Risk questions", "Bank information", "Document upload", "Review & submit"],
      kyb: ["Company information", "Risk questions", "Beneficial owners / managers", "Bank & responsible person", "Document upload", "Review & submit"]
    },
    buttons: {
      back: "Back",
      next: "Next",
      submitting: "Submitting...",
      submitKyc: "Submit KYC",
      submitKyb: "Submit KYB",
      backToLogin: "Back to login",
      contactOfficer: "Contact relationship manager"
    },
    selectPlaceholder: "Please select",
    uploadHint: "Drag a file here, or click to choose a file",
    notProvided: "Not provided",
    requiredDocuments: "Required documents",
    optionalDocuments: "Optional documents",
    yesNo: ["Yes", "No"],
    licenseOptions: ["Yes", "No", "In progress"],
    kycLabels: {
      customerFullName: "Customer full name",
      gender: "Gender",
      birthplace: "Place of birth",
      birthDate: "Date of birth",
      cityAddress: "Residential city and address",
      nationality: "Nationality",
      phone: "Contact phone",
      email: "Email address",
      legalPerson: "Are you a legal representative of any registered company?",
      enterpriseFullName: "Full company name if applicable",
      highRiskContact: "Have you had business or material links with high-risk countries / regions?",
      highRiskCountries: "Relevant countries / regions if applicable",
      fundSource: "Source of funds",
      expectedAmount: "Expected transaction amount",
      bankName: "Bank name",
      bankCountry: "Bank country",
      bankAddress: "Bank address",
      beneficiaryName: "Beneficiary name",
      bankAccountNumber: "Bank account number",
      beneficiaryAddress: "Beneficiary address",
      swiftRoutingAba: "SWIFT / Routing Number / ABA",
      idPassport: "ID card / passport",
      proofOfAddress: "Proof of address within three months",
      bankStatement: "Bank statement within three months",
      sourceOfFundsDoc: "Source of funds supporting document",
      reviewTitle: "KYC information summary",
      declaration: "I confirm that all information and documents provided are true, accurate, and complete."
    },
    kybLabels: {
      companyFullName: "Full company name",
      incorporationCountry: "Country of incorporation",
      incorporationDate: "Registration date",
      registrationNo: "Company registration number",
      principalPlace: "Principal place of business",
      principalPlaceCountry: "Country of principal place of business",
      companyWebsite: "Company website, or not applicable",
      businessActivities: "Detailed description of business activities",
      regulatoryInvestigation: "Has the company been investigated, subpoenaed, or fined by CFTC, OFAC, FinCEN, SEC, IRS, or other regulators?",
      highRiskContact: "Has the company had business or material links with high-risk countries / regions?",
      highRiskCountries: "Relevant countries / regions if applicable",
      fundSource: "Source of company funds or assets",
      expectedAmount: "Expected transaction amount",
      ownerLastName: "Last name",
      ownerFirstName: "First name",
      ownerJobTitle: "Title",
      ownerBirthDate: "Date of birth",
      ownerResidentialAddress: "Residential address",
      ownerNationality: "Nationality",
      ownerPassportNumber: "Passport number",
      ownerOwnership: "Ownership percentage",
      addOwner: "Add beneficial owner / manager",
      bankName: "Bank name",
      bankCountry: "Bank country",
      bankAddress: "Bank address",
      beneficiaryName: "Beneficiary name",
      bankAccountNumber: "Bank account number",
      beneficiaryAddress: "Beneficiary address",
      swiftRoutingAba: "SWIFT / Routing Number / ABA",
      responsibleFullName: "Responsible person full name",
      responsibleEmail: "Responsible person email",
      responsibleJobTitle: "Responsible person title",
      responsiblePhone: "Responsible person phone",
      certificateOfIncorporation: "Certificate of incorporation",
      articles: "Articles of association",
      directorsList: "Register of directors",
      shareholdersList: "Register of shareholders",
      organizationChart: "Organization chart",
      proofOfAddress: "Proof of address within three months",
      bankStatement: "Bank statement within three months",
      sourceOfFundsDoc: "Source of funds supporting document",
      directorPassport: "Passport of directors and UBOs holding 25% or more",
      directorProofOfAddress: "Proof of address of directors and UBOs holding 25% or more",
      reviewTitle: "Business information summary",
      declaration: "As the authorized representative of the account applicant, I confirm that all information and documents provided are true, accurate, and complete."
    },
    submitted: {
      badge: "Submitted",
      kyc: "Your KYC information has been submitted and is now under identity review.",
      kyb: "Your KYB information has been submitted and is now under business review.",
      note: "The review result will be sent to you by email. After approval, your relationship manager will contact you to help complete account activation."
    }
  },
  "zh-HK": {
    localDraft: "審核資料",
    formHint: "請完整填寫所需資料並上傳文件。帳戶需在審核通過後才可啟用。",
    returnLogin: "返回登入",
    returnHome: "返回首頁",
    chooseBadge: "註冊認證",
    chooseTitle: "選擇您的認證類型",
    chooseDescription: "請先選擇個人身份認證或企業 / 機構商戶認證，系統會根據選擇顯示對應表單。",
    appliesTo: "適用於：",
    kycTitle: "KYC 個人身份認證",
    kycApplies: ["個人用戶", "自由工作者", "個人資金管理"],
    startKyc: "開始 KYC",
    kybTitle: "KYB 企業 / 機構認證",
    kybApplies: ["商戶", "公司", "PSP", "Web3 / OTC / 跨境支付機構"],
    startKyb: "開始 KYB",
    steps: {
      kyc: ["基本資料", "風險問題", "銀行資料", "文件上傳", "確認提交"],
      kyb: ["公司基本資料", "風險問題", "實益擁有人 / 管理人", "銀行及負責人資料", "文件上傳", "確認提交"]
    },
    buttons: {
      back: "返回上一步",
      next: "下一步",
      submitting: "提交中...",
      submitKyc: "提交 KYC",
      submitKyb: "提交 KYB",
      backToLogin: "返回登入",
      contactOfficer: "聯絡業務主任"
    },
    selectPlaceholder: "請選擇",
    uploadHint: "拖拉文件到此處，或點擊選擇文件",
    notProvided: "尚未填寫",
    requiredDocuments: "必須文件",
    optionalDocuments: "選填文件",
    yesNo: ["是", "否"],
    licenseOptions: ["是", "否", "申請中"],
    kycLabels: {
      customerFullName: "客戶全名",
      gender: "性別",
      birthplace: "出生地",
      birthDate: "出生日期",
      cityAddress: "居住城市及地址",
      nationality: "國籍",
      phone: "聯絡電話",
      email: "電郵地址",
      legalPerson: "是否屬於任何註冊企業的法人",
      enterpriseFullName: "如是，需填寫企業完整名稱",
      highRiskContact: "是否曾與高風險國家 / 地區有業務或重大聯繫",
      highRiskCountries: "如是，需填寫相關國家 / 地區",
      fundSource: "資金來源",
      expectedAmount: "預計交易金額",
      bankName: "銀行名稱",
      bankCountry: "銀行所在國家",
      bankAddress: "銀行地址",
      beneficiaryName: "收款人名稱",
      bankAccountNumber: "銀行帳戶號碼",
      beneficiaryAddress: "收款人地址",
      swiftRoutingAba: "SWIFT / Routing Number / ABA",
      idPassport: "身分證 / 護照",
      proofOfAddress: "三個月內地址證明",
      bankStatement: "三個月內銀行月結單",
      sourceOfFundsDoc: "資金來源證明文件",
      reviewTitle: "KYC 資料摘要",
      declaration: "本人確認所提供的所有資料及文件均為真實、準確、完整。"
    },
    kybLabels: {
      companyFullName: "公司完整名稱",
      incorporationCountry: "公司註冊國家",
      incorporationDate: "註冊日期",
      registrationNo: "公司註冊編號",
      principalPlace: "主要營業地點",
      principalPlaceCountry: "主要營業地點所在國家",
      companyWebsite: "公司網站，如無可填寫「不適用」",
      businessActivities: "公司業務活動詳細描述",
      regulatoryInvestigation: "公司是否曾被 CFTC、OFAC、FinCEN、SEC、IRS 或其他監管機構調查、傳票或罰款",
      highRiskContact: "公司是否曾與高風險國家 / 地區有業務或重大聯繫",
      highRiskCountries: "如是，需填寫相關國家 / 地區",
      fundSource: "公司資金或資產來源",
      expectedAmount: "預計交易金額",
      ownerLastName: "姓",
      ownerFirstName: "名",
      ownerJobTitle: "職稱",
      ownerBirthDate: "出生日期",
      ownerResidentialAddress: "居住地址",
      ownerNationality: "國籍",
      ownerPassportNumber: "護照號碼",
      ownerOwnership: "持股比例",
      addOwner: "新增實益擁有人 / 管理人",
      bankName: "銀行名稱",
      bankCountry: "銀行所在國家",
      bankAddress: "銀行地址",
      beneficiaryName: "收款人名稱",
      bankAccountNumber: "銀行帳戶號碼",
      beneficiaryAddress: "收款人地址",
      swiftRoutingAba: "SWIFT / Routing Number / ABA",
      responsibleFullName: "負責人全名",
      responsibleEmail: "負責人電郵",
      responsibleJobTitle: "負責人職稱",
      responsiblePhone: "負責人電話號碼",
      certificateOfIncorporation: "註冊證明",
      articles: "公司章程",
      directorsList: "董事名單",
      shareholdersList: "股東名單",
      organizationChart: "組織架構圖",
      proofOfAddress: "三個月內地址證明",
      bankStatement: "三個月內銀行月結單",
      sourceOfFundsDoc: "資金來源證明文件",
      directorPassport: "董事及 25% 或以上最終實益股東護照",
      directorProofOfAddress: "董事及 25% 或以上最終實益股東三個月內地址證明",
      reviewTitle: "企業資料摘要",
      declaration: "本人作為帳戶申請人的授權代表，確認所提供的所有資料及文件均為真實、準確、完整。"
    },
    submitted: {
      badge: "已提交",
      kyc: "您的 KYC 資料已提交，正在進行身份審核。",
      kyb: "您的 KYB 資料已提交，正在進行企業審核。",
      note: "審核結果將會透過電郵通知您。審核通過後，您的業務主任將會與您聯絡，協助您完成帳戶啟用流程。"
    }
  },
  "zh-CN": {
    localDraft: "审核资料",
    formHint: "请完整填写所需资料并上传文件。账户需在审核通过后才可启用。",
    returnLogin: "返回登录",
    returnHome: "返回首页",
    chooseBadge: "注册认证",
    chooseTitle: "选择您的认证类型",
    chooseDescription: "请先选择个人身份认证或企业 / 机构商户认证，系统会根据选择显示对应表单。",
    appliesTo: "适用于：",
    kycTitle: "KYC 个人身份认证",
    kycApplies: ["个人用户", "自由工作者", "个人资金管理"],
    startKyc: "开始 KYC",
    kybTitle: "KYB 企业 / 机构认证",
    kybApplies: ["商户", "公司", "PSP", "Web3 / OTC / 跨境支付机构"],
    startKyb: "开始 KYB",
    steps: {
      kyc: ["基本资料", "风险问题", "银行资料", "文件上传", "确认提交"],
      kyb: ["公司基本资料", "风险问题", "实益拥有人 / 管理人", "银行及负责人资料", "文件上传", "确认提交"]
    },
    buttons: {
      back: "返回上一步",
      next: "下一步",
      submitting: "提交中...",
      submitKyc: "提交 KYC",
      submitKyb: "提交 KYB",
      backToLogin: "返回登录",
      contactOfficer: "联系业务主任"
    },
    selectPlaceholder: "请选择",
    uploadHint: "拖拽文件到此处，或点击选择文件",
    notProvided: "尚未填写",
    requiredDocuments: "必须文件",
    optionalDocuments: "选填文件",
    yesNo: ["是", "否"],
    licenseOptions: ["是", "否", "申请中"],
    kycLabels: {
      customerFullName: "客户全名",
      gender: "性别",
      birthplace: "出生地",
      birthDate: "出生日期",
      cityAddress: "居住城市及地址",
      nationality: "国籍",
      phone: "联系电话",
      email: "电子邮箱",
      legalPerson: "是否属于任何注册企业的法人",
      enterpriseFullName: "如是，需填写企业完整名称",
      highRiskContact: "是否曾与高风险国家 / 地区有业务或重大联系",
      highRiskCountries: "如是，需填写相关国家 / 地区",
      fundSource: "资金来源",
      expectedAmount: "预计交易金额",
      bankName: "银行名称",
      bankCountry: "银行所在国家",
      bankAddress: "银行地址",
      beneficiaryName: "收款人名称",
      bankAccountNumber: "银行账户号码",
      beneficiaryAddress: "收款人地址",
      swiftRoutingAba: "SWIFT / Routing Number / ABA",
      idPassport: "身份证 / 护照",
      proofOfAddress: "三个月内地址证明",
      bankStatement: "三个月内银行月结单",
      sourceOfFundsDoc: "资金来源证明文件",
      reviewTitle: "KYC 资料摘要",
      declaration: "本人确认所提供的所有资料及文件均为真实、准确、完整。"
    },
    kybLabels: {
      companyFullName: "公司完整名称",
      incorporationCountry: "公司注册国家",
      incorporationDate: "注册日期",
      registrationNo: "公司注册编号",
      principalPlace: "主要营业地点",
      principalPlaceCountry: "主要营业地点所在国家",
      companyWebsite: "公司网站，如无可填写「不适用」",
      businessActivities: "公司业务活动详细描述",
      regulatoryInvestigation: "公司是否曾被 CFTC、OFAC、FinCEN、SEC、IRS 或其他监管机构调查、传票或罚款",
      highRiskContact: "公司是否曾与高风险国家 / 地区有业务或重大联系",
      highRiskCountries: "如是，需填写相关国家 / 地区",
      fundSource: "公司资金或资产来源",
      expectedAmount: "预计交易金额",
      ownerLastName: "姓",
      ownerFirstName: "名",
      ownerJobTitle: "职称",
      ownerBirthDate: "出生日期",
      ownerResidentialAddress: "居住地址",
      ownerNationality: "国籍",
      ownerPassportNumber: "护照号码",
      ownerOwnership: "持股比例",
      addOwner: "新增实益拥有人 / 管理人",
      bankName: "银行名称",
      bankCountry: "银行所在国家",
      bankAddress: "银行地址",
      beneficiaryName: "收款人名称",
      bankAccountNumber: "银行账户号码",
      beneficiaryAddress: "收款人地址",
      swiftRoutingAba: "SWIFT / Routing Number / ABA",
      responsibleFullName: "负责人全名",
      responsibleEmail: "负责人邮箱",
      responsibleJobTitle: "负责人职称",
      responsiblePhone: "负责人电话号码",
      certificateOfIncorporation: "注册证明",
      articles: "公司章程",
      directorsList: "董事名单",
      shareholdersList: "股东名单",
      organizationChart: "组织架构图",
      proofOfAddress: "三个月内地址证明",
      bankStatement: "三个月内银行月结单",
      sourceOfFundsDoc: "资金来源证明文件",
      directorPassport: "董事及 25% 或以上最终实益股东护照",
      directorProofOfAddress: "董事及 25% 或以上最终实益股东三个月内地址证明",
      reviewTitle: "企业资料摘要",
      declaration: "本人作为账户申请人的授权代表，确认所提供的所有资料及文件均为真实、准确、完整。"
    },
    submitted: {
      badge: "已提交",
      kyc: "您的 KYC 资料已提交，正在进行身份审核。",
      kyb: "您的 KYB 资料已提交，正在进行企业审核。",
      note: "审核结果将会通过电子邮件通知您。审核通过后，您的业务主任将会与您联系，协助您完成账户启用流程。"
    }
  }
} as const;

type RegisterCopy = (typeof registrationCopy)[keyof typeof registrationCopy];

function getDraftKey(type: ReviewType) {
  return `7gg-register-${type}`;
}

function readDraft(type: ReviewType): FormState {
  try {
    const saved = window.localStorage.getItem(getDraftKey(type));
    return saved ? JSON.parse(saved) as FormState : {};
  } catch {
    return {};
  }
}

export function RegisterPageContent() {
  const { language } = usePreferences();
  const copy = registrationCopy[language];
  const [reviewType, setReviewType] = useState<ReviewType | null>(null);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<ReviewType | null>(null);

  const storageKey = useMemo(() => reviewType ? getDraftKey(reviewType) : "7gg-register-draft", [reviewType]);
  const steps = reviewType === "kyb" ? copy.steps.kyb : copy.steps.kyc;

  useEffect(() => {
    if (!reviewType) return;
    window.localStorage.setItem(storageKey, JSON.stringify(form));
  }, [form, reviewType, storageKey]);

  const selectReviewType = (type: ReviewType) => {
    setReviewType(type);
    setStep(0);
    setSubmitted(null);
    setForm(readDraft(type));
  };

  const updateField = (key: string, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = async () => {
    if (!reviewType) return;
    setSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 700));
    appendVerificationCase(reviewType, form);
    setSubmitting(false);
    setSubmitted(reviewType);
  };

  return (
    <div className="public-site min-h-screen px-5 py-6 text-slateText-primary">
      <div className="fixed inset-0 -z-10 bg-gold-radial" />
      <div className="fixed inset-0 -z-10 bg-obsidian-grid bg-[size:54px_54px] opacity-[0.12]" />
      <header className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <Logo />
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <LanguageThemeControls compact={false} />
          <Button asChild variant="secondary"><Link href="/login">{copy.returnLogin}</Link></Button>
          <Button asChild variant="ghost"><Link href="/">{copy.returnHome}</Link></Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl py-10">
        {submitted ? (
          <SubmittedState type={submitted} copy={copy} />
        ) : !reviewType ? (
          <ReviewTypeSelection copy={copy} onSelect={selectReviewType} />
        ) : (
          <Card className="overflow-hidden">
            <div className="border-b border-[color:var(--border-subtle)] p-5 md:p-7">
              <Badge variant="gold" className="mb-4">{copy.localDraft}</Badge>
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                {reviewType === "kyc" ? copy.kycTitle : copy.kybTitle}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slateText-secondary">
                {copy.formHint}
              </p>
              <RegisterStepper steps={steps} current={step} />
            </div>
            <div className="p-5 md:p-7">
              {reviewType === "kyc" ? (
                <KycFormStep step={step} form={form} copy={copy} updateField={updateField} />
              ) : (
                <KybFormStep step={step} form={form} copy={copy} updateField={updateField} />
              )}
              <div className="mt-8 flex flex-col-reverse justify-between gap-3 sm:flex-row">
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={() => (step === 0 ? setReviewType(null) : setStep((value) => value - 1))}>
                    {copy.buttons.back}
                  </Button>
                </div>
                {step < steps.length - 1 ? (
                  <Button onClick={() => setStep((value) => value + 1)}>{copy.buttons.next}</Button>
                ) : (
                  <Button onClick={submit} disabled={submitting}>
                    {submitting ? copy.buttons.submitting : reviewType === "kyc" ? copy.buttons.submitKyc : copy.buttons.submitKyb}
                  </Button>
                )}
              </div>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}

function ReviewTypeSelection({ copy, onSelect }: { copy: RegisterCopy; onSelect: (type: ReviewType) => void }) {
  return (
    <section>
      <Badge variant="gold" className="mb-5">{copy.chooseBadge}</Badge>
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{copy.chooseTitle}</h1>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-slateText-secondary">
        {copy.chooseDescription}
      </p>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Card className="p-6">
          <UserRound className="mb-5 h-9 w-9 text-gold-300" />
          <h2 className="text-2xl font-semibold">{copy.kycTitle}</h2>
          <p className="mt-4 text-sm font-medium text-slateText-secondary">{copy.appliesTo}</p>
          <ul className="mt-3 space-y-2 text-sm text-slateText-secondary">
            {copy.kycApplies.map((item) => <li key={item}>• {item}</li>)}
          </ul>
          <Button className="mt-6 w-full" onClick={() => onSelect("kyc")}>{copy.startKyc}</Button>
        </Card>
        <Card className="p-6">
          <Building2 className="mb-5 h-9 w-9 text-gold-300" />
          <h2 className="text-2xl font-semibold">{copy.kybTitle}</h2>
          <p className="mt-4 text-sm font-medium text-slateText-secondary">{copy.appliesTo}</p>
          <ul className="mt-3 space-y-2 text-sm text-slateText-secondary">
            {copy.kybApplies.map((item) => <li key={item}>• {item}</li>)}
          </ul>
          <Button className="mt-6 w-full" onClick={() => onSelect("kyb")}>{copy.startKyb}</Button>
        </Card>
      </div>
    </section>
  );
}

function RegisterStepper({ steps, current }: { steps: readonly string[]; current: number }) {
  return (
    <div className="mt-6 grid gap-3 md:grid-cols-4 lg:grid-cols-5">
      {steps.map((item, index) => (
        <div key={item} className={`rounded-2xl border p-4 ${index <= current ? "border-gold-500/45 bg-gold-500/10" : "border-[color:var(--border-muted)] bg-[color:var(--control)]"}`}>
          <span className={`mb-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${index <= current ? "bg-gold-500 text-black" : "bg-slateText-primary/10 text-slateText-secondary"}`}>
            {index + 1}
          </span>
          <p className="text-sm font-medium">{item}</p>
        </div>
      ))}
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value?: string; onChange: (value: string) => void; type?: string }) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-slateText-secondary">{label}</span>
      <Input type={type} placeholder={label} value={value ?? ""} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function SelectLike({ label, value, onChange, options, placeholder }: { label: string; value?: string; onChange: (value: string) => void; options: readonly string[]; placeholder: string }) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-slateText-secondary">{label}</span>
      <select
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--input-bg)] px-3 py-2 text-sm text-slateText-primary outline-none focus:border-gold-500/45 focus:ring-2 focus:ring-gold-500/15"
      >
        <option value="">{placeholder}</option>
        {options.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
    </label>
  );
}

function UploadBox({ label, value, onChange, hint }: { label: string; value?: string; onChange: (value: string) => void; hint: string }) {
  const [dragging, setDragging] = useState(false);
  const fileName = value || hint;
  return (
    <label
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        const file = event.dataTransfer.files[0];
        if (file) onChange(file.name);
      }}
      className={`flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed p-5 text-center transition ${dragging ? "border-gold-500 bg-gold-500/10 shadow-gold" : "border-gold-500/25 bg-[color:var(--control)]"}`}
    >
      <Upload className="mb-3 h-7 w-7 text-gold-300" />
      <span className="font-medium">{label}</span>
      <span className="mt-2 text-xs text-slateText-secondary">{fileName}</span>
      <input
        type="file"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onChange(file.name);
        }}
      />
    </label>
  );
}

function TextareaField({ label, value, onChange }: { label: string; value?: string; onChange: (value: string) => void }) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-slateText-secondary">{label}</span>
      <textarea
        value={value ?? ""}
        placeholder={label}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-28 w-full rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--input-bg)] p-3 text-sm text-slateText-primary outline-none focus:border-gold-500/45 focus:ring-2 focus:ring-gold-500/15"
      />
    </label>
  );
}

function KycFormStep({ step, form, copy, updateField }: { step: number; form: FormState; copy: RegisterCopy; updateField: (key: string, value: string) => void }) {
  const labels = copy.kycLabels;
  if (step === 0) {
    return <FormGrid fields={[
      [labels.customerFullName, "customerFullName"],
      [labels.gender, "gender"],
      [labels.birthplace, "birthplace"],
      [labels.birthDate, "birthDate", "date"],
      [labels.cityAddress, "cityAddress"],
      [labels.nationality, "nationality"],
      [labels.phone, "phone"],
      [labels.email, "email", "email"]
    ]} form={form} updateField={updateField} />;
  }
  if (step === 1) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <SelectLike label={labels.legalPerson} value={form.legalPerson} onChange={(value) => updateField("legalPerson", value)} options={copy.yesNo} placeholder={copy.selectPlaceholder} />
        <Field label={labels.enterpriseFullName} value={form.enterpriseFullName} onChange={(value) => updateField("enterpriseFullName", value)} />
        <SelectLike label={labels.highRiskContact} value={form.highRiskContact} onChange={(value) => updateField("highRiskContact", value)} options={copy.yesNo} placeholder={copy.selectPlaceholder} />
        <Field label={labels.highRiskCountries} value={form.highRiskCountries} onChange={(value) => updateField("highRiskCountries", value)} />
        <Field label={labels.fundSource} value={form.fundSource} onChange={(value) => updateField("fundSource", value)} />
        <Field label={labels.expectedAmount} value={form.expectedAmount} onChange={(value) => updateField("expectedAmount", value)} />
      </div>
    );
  }
  if (step === 2) {
    return <FormGrid fields={[
      [labels.bankName, "bankName"],
      [labels.bankCountry, "bankCountry"],
      [labels.bankAddress, "bankAddress"],
      [labels.beneficiaryName, "beneficiaryName"],
      [labels.bankAccountNumber, "bankAccountNumber"],
      [labels.beneficiaryAddress, "beneficiaryAddress"],
      [labels.swiftRoutingAba, "swiftRoutingAba"]
    ]} form={form} updateField={updateField} />;
  }
  if (step === 3) {
    return <UploadGrid items={[[labels.idPassport, "idPassport"], [labels.proofOfAddress, "proofOfAddress"], [labels.bankStatement, "bankStatement"], [labels.sourceOfFundsDoc, "sourceOfFundsDoc"]]} form={form} copy={copy} updateField={updateField} />;
  }
  return <ReviewPanel title={labels.reviewTitle} items={[
    [labels.customerFullName, form.customerFullName],
    [labels.gender, form.gender],
    [labels.birthplace, form.birthplace],
    [labels.birthDate, form.birthDate],
    [labels.cityAddress, form.cityAddress],
    [labels.nationality, form.nationality],
    [labels.phone, form.phone],
    [labels.email, form.email],
    [labels.legalPerson, form.legalPerson],
    [labels.highRiskContact, form.highRiskContact],
    [labels.fundSource, form.fundSource],
    [labels.expectedAmount, form.expectedAmount],
    [labels.bankName, form.bankName],
    [labels.bankAccountNumber, form.bankAccountNumber]
  ]} declaration={labels.declaration} copy={copy} />;
}

type BeneficialOwnerForm = {
  lastName: string;
  firstName: string;
  jobTitle: string;
  birthDate: string;
  residentialAddress: string;
  nationality: string;
  passportNumber: string;
  ownership: string;
};

function emptyOwner(): BeneficialOwnerForm {
  return {
    lastName: "",
    firstName: "",
    jobTitle: "",
    birthDate: "",
    residentialAddress: "",
    nationality: "",
    passportNumber: "",
    ownership: ""
  };
}

function readBeneficialOwners(value?: string): BeneficialOwnerForm[] {
  if (!value) return [emptyOwner()];
  try {
    const parsed = JSON.parse(value) as BeneficialOwnerForm[];
    return parsed.length ? parsed : [emptyOwner()];
  } catch {
    return [emptyOwner()];
  }
}

function BeneficialOwnersEditor({ form, copy, updateField }: { form: FormState; copy: RegisterCopy; updateField: (key: string, value: string) => void }) {
  const labels = copy.kybLabels;
  const owners = readBeneficialOwners(form.beneficialOwners);
  const saveOwners = (next: BeneficialOwnerForm[]) => updateField("beneficialOwners", JSON.stringify(next));

  const updateOwner = (index: number, key: keyof BeneficialOwnerForm, value: string) => {
    const next = owners.map((owner, ownerIndex) => ownerIndex === index ? { ...owner, [key]: value } : owner);
    saveOwners(next);
  };

  return (
    <div className="space-y-5">
      {owners.map((owner, index) => (
        <Card key={`owner-${index}`} className="p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="font-semibold">實益擁有人 / 管理人 {index + 1}</h3>
            {owners.length > 1 ? (
              <Button type="button" size="sm" variant="secondary" onClick={() => saveOwners(owners.filter((_, ownerIndex) => ownerIndex !== index))}>
                移除
              </Button>
            ) : null}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label={labels.ownerLastName} value={owner.lastName} onChange={(value) => updateOwner(index, "lastName", value)} />
            <Field label={labels.ownerFirstName} value={owner.firstName} onChange={(value) => updateOwner(index, "firstName", value)} />
            <Field label={labels.ownerJobTitle} value={owner.jobTitle} onChange={(value) => updateOwner(index, "jobTitle", value)} />
            <Field label={labels.ownerBirthDate} type="date" value={owner.birthDate} onChange={(value) => updateOwner(index, "birthDate", value)} />
            <Field label={labels.ownerResidentialAddress} value={owner.residentialAddress} onChange={(value) => updateOwner(index, "residentialAddress", value)} />
            <Field label={labels.ownerNationality} value={owner.nationality} onChange={(value) => updateOwner(index, "nationality", value)} />
            <Field label={labels.ownerPassportNumber} value={owner.passportNumber} onChange={(value) => updateOwner(index, "passportNumber", value)} />
            <Field label={labels.ownerOwnership} value={owner.ownership} onChange={(value) => updateOwner(index, "ownership", value)} />
          </div>
        </Card>
      ))}
      <Button type="button" variant="secondary" onClick={() => saveOwners([...owners, emptyOwner()])}>
        {labels.addOwner}
      </Button>
    </div>
  );
}

function KybFormStep({ step, form, copy, updateField }: { step: number; form: FormState; copy: RegisterCopy; updateField: (key: string, value: string) => void }) {
  const labels = copy.kybLabels;
  if (step === 0) {
    return (
      <div className="space-y-4">
        <FormGrid fields={[
          [labels.companyFullName, "companyFullName"],
          [labels.incorporationCountry, "incorporationCountry"],
          [labels.incorporationDate, "incorporationDate", "date"],
          [labels.registrationNo, "registrationNo"],
          [labels.principalPlace, "principalPlace"],
          [labels.principalPlaceCountry, "principalPlaceCountry"],
          [labels.companyWebsite, "companyWebsite"]
        ]} form={form} updateField={updateField} />
        <TextareaField label={labels.businessActivities} value={form.businessActivities} onChange={(value) => updateField("businessActivities", value)} />
      </div>
    );
  }
  if (step === 1) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <SelectLike label={labels.regulatoryInvestigation} value={form.regulatoryInvestigation} onChange={(value) => updateField("regulatoryInvestigation", value)} options={copy.yesNo} placeholder={copy.selectPlaceholder} />
        <SelectLike label={labels.highRiskContact} value={form.highRiskContact} onChange={(value) => updateField("highRiskContact", value)} options={copy.yesNo} placeholder={copy.selectPlaceholder} />
        <Field label={labels.highRiskCountries} value={form.highRiskCountries} onChange={(value) => updateField("highRiskCountries", value)} />
        <Field label={labels.fundSource} value={form.fundSource} onChange={(value) => updateField("fundSource", value)} />
        <Field label={labels.expectedAmount} value={form.expectedAmount} onChange={(value) => updateField("expectedAmount", value)} />
      </div>
    );
  }
  if (step === 2) {
    return <BeneficialOwnersEditor form={form} copy={copy} updateField={updateField} />;
  }
  if (step === 3) {
    return <FormGrid fields={[
      [labels.bankName, "bankName"],
      [labels.bankCountry, "bankCountry"],
      [labels.bankAddress, "bankAddress"],
      [labels.beneficiaryName, "beneficiaryName"],
      [labels.bankAccountNumber, "bankAccountNumber"],
      [labels.beneficiaryAddress, "beneficiaryAddress"],
      [labels.swiftRoutingAba, "swiftRoutingAba"],
      [labels.responsibleFullName, "responsibleFullName"],
      [labels.responsibleEmail, "responsibleEmail", "email"],
      [labels.responsibleJobTitle, "responsibleJobTitle"],
      [labels.responsiblePhone, "responsiblePhone"]
    ]} form={form} updateField={updateField} />;
  }
  if (step === 4) {
    return (
      <div className="space-y-5">
        <div>
          <h2 className="mb-3 text-lg font-semibold">{copy.requiredDocuments}</h2>
          <UploadGrid items={[
            [labels.certificateOfIncorporation, "certificateOfIncorporation"],
            [labels.articles, "articles"],
            [labels.directorsList, "directorsList"],
            [labels.shareholdersList, "shareholdersList"],
            [labels.organizationChart, "organizationChart"],
            [labels.proofOfAddress, "proofOfAddress"],
            [labels.bankStatement, "bankStatement"],
            [labels.sourceOfFundsDoc, "sourceOfFundsDoc"],
            [labels.directorPassport, "directorPassport"],
            [labels.directorProofOfAddress, "directorProofOfAddress"]
          ]} form={form} copy={copy} updateField={updateField} />
        </div>
      </div>
    );
  }
  return <ReviewPanel title={labels.reviewTitle} items={[
    [labels.companyFullName, form.companyFullName],
    [labels.incorporationCountry, form.incorporationCountry],
    [labels.registrationNo, form.registrationNo],
    [labels.principalPlace, form.principalPlace],
    [labels.regulatoryInvestigation, form.regulatoryInvestigation],
    [labels.highRiskContact, form.highRiskContact],
    [labels.fundSource, form.fundSource],
    [labels.expectedAmount, form.expectedAmount],
    [labels.bankName, form.bankName],
    [labels.responsibleFullName, form.responsibleFullName],
    [labels.responsibleEmail, form.responsibleEmail]
  ]} declaration={labels.declaration} copy={copy} />;
}

function FormGrid({ fields, form, updateField }: { fields: Array<[string, string, string?]>; form: Record<string, string>; updateField: (key: string, value: string) => void }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {fields.map(([label, key, type]) => (
        <Field key={key} label={label} type={type} value={form[key]} onChange={(value) => updateField(key, value)} />
      ))}
    </div>
  );
}

function UploadGrid({ items, form, copy, updateField }: { items: Array<[string, string]>; form: FormState; copy: RegisterCopy; updateField: (key: string, value: string) => void }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map(([label, key]) => (
        <UploadBox key={key} label={label} value={form[key]} hint={copy.uploadHint} onChange={(value) => updateField(key, value)} />
      ))}
    </div>
  );
}

function ReviewPanel({ title, items, declaration, copy }: { title: string; items: Array<[string, string | undefined]>; declaration: string; copy: RegisterCopy }) {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-[color:var(--border-muted)] bg-[color:var(--control)] p-4">
            <p className="text-xs text-slateText-secondary">{label}</p>
            <p className="mt-2 font-medium">{value || copy.notProvided}</p>
          </div>
        ))}
      </div>
      <label className="flex items-start gap-3 rounded-2xl border border-gold-500/20 bg-gold-500/10 p-4 text-sm text-slateText-secondary">
        <input type="checkbox" className="mt-1" />
        <span>{declaration}</span>
      </label>
    </div>
  );
}

function SubmittedState({ type, copy }: { type: ReviewType; copy: RegisterCopy }) {
  return (
    <Card className="mx-auto max-w-3xl p-8 text-center">
      <Badge variant="gold" className="mb-5">{copy.submitted.badge}</Badge>
      <h1 className="text-3xl font-semibold">
        {type === "kyc" ? copy.submitted.kyc : copy.submitted.kyb}
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slateText-secondary">
        {copy.submitted.note}
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button asChild variant="secondary"><Link href="/login">{copy.buttons.backToLogin}</Link></Button>
        <Button asChild><Link href="/contact">{copy.buttons.contactOfficer}</Link></Button>
      </div>
    </Card>
  );
}
