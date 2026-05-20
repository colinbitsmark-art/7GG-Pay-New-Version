"use client";

import { useState } from "react";
import { ArrowDownToLine, ArrowUpFromLine, Bitcoin, Building2, Eye, FileText, Trash2, Upload, Wallet } from "lucide-react";
import { MockDrawer, MockModal, CopyButton, FlowSteps, InfoGrid, MockQrCode, ResultPanel } from "@/components/mock-interaction-components";
import { T } from "@/components/preferences-provider";
import { PageHeader } from "@/components/section-shell";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  cryptoDepositOptions,
  cryptoWallets,
  fiatDepositInstructions,
  fiatWallets,
  transactionDetails,
  walletTransactions
} from "@/lib/mock-data";
import { appendDepositApplication, type DepositProofInput } from "@/components/verification-review-module";

type FiatWallet = (typeof fiatWallets)[number];
type CryptoWallet = (typeof cryptoWallets)[number];
type WalletTransaction = (typeof walletTransactions)[number];
type CryptoAsset = keyof typeof cryptoDepositOptions;
type FiatAsset = keyof typeof fiatDepositInstructions;

const cryptoFlowSteps = ["等待充值", "等待區塊確認", "入帳審核中", "已入帳"];
const withdrawSteps = ["等待審批", "合規檢查中", "處理中"];
const depositProofCategories = ["合同 / 訂單", "詢盤紀錄", "物流訂單"] as const;

type DepositProofDraft = DepositProofInput & {
  id: string;
  fileType: string;
};

function DepositDocumentsStep({
  currency,
  amount,
  source,
  note,
  proofs,
  onAmountChange,
  onSourceChange,
  onNoteChange,
  onProofsChange,
  submitted
}: {
  currency: string;
  amount: string;
  source: string;
  note: string;
  proofs: DepositProofDraft[];
  onAmountChange: (value: string) => void;
  onSourceChange: (value: string) => void;
  onNoteChange: (value: string) => void;
  onProofsChange: (value: DepositProofDraft[]) => void;
  submitted: boolean;
}) {
  const [preview, setPreview] = useState<DepositProofDraft | null>(null);

  const addFiles = (category: string, files: FileList | null) => {
    if (!files?.length) return;
    const next = Array.from(files).map((file, index) => ({
      id: `${category}-${file.name}-${Date.now()}-${index}`,
      name: file.name,
      category,
      type: file.name,
      fileType: file.type || "檔案",
      status: "待審核" as const
    }));
    onProofsChange([...proofs, ...next]);
  };

  return (
    <div className="space-y-4 rounded-2xl border border-gold-500/20 bg-gold-500/10 p-4">
      <div>
        <p className="font-semibold">入帳文件</p>
        <p className="mt-2 text-sm leading-6 text-slateText-secondary">
          為符合反洗錢及交易審核要求，請上傳與本次入帳相關的合同、訂單、詢盤紀錄或物流文件。
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Input value={currency} readOnly aria-label="入帳幣種" />
        <Input value={amount} placeholder="入帳金額" onChange={(event) => onAmountChange(event.target.value)} />
        <Input value={source} placeholder="入帳來源" onChange={(event) => onSourceChange(event.target.value)} />
        <Input value={note} placeholder="備註" onChange={(event) => onNoteChange(event.target.value)} />
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        {depositProofCategories.map((category) => (
          <label
            key={category}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              addFiles(category, event.dataTransfer.files);
            }}
            className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-gold-500/35 bg-[color:var(--control)] p-4 text-center transition hover:border-gold-500/60 hover:bg-[color:var(--control-hover)]"
          >
            <Upload className="mb-2 h-5 w-5 text-gold-300" />
            <span className="text-sm font-semibold">{category}</span>
            <span className="mt-2 text-xs text-slateText-secondary">支援 PDF / 圖片格式，可拖拉多個文件</span>
            <input
              type="file"
              multiple
              accept="application/pdf,image/*"
              className="hidden"
              onChange={(event) => addFiles(category, event.target.files)}
            />
          </label>
        ))}
      </div>
      <div className="space-y-2">
        {proofs.length ? proofs.map((proof) => (
          <div key={proof.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[color:var(--border-muted)] bg-[color:var(--control)] p-3">
            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4 text-gold-300" />
              <div>
                <p className="text-sm font-medium">{proof.category}</p>
                <p className="text-xs text-slateText-secondary">{proof.name} · 上傳狀態：待審核</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={() => setPreview(proof)}><Eye className="h-3.5 w-3.5" />預覽</Button>
              <label className="inline-flex h-8 cursor-pointer items-center justify-center rounded-lg border border-gold-500/15 bg-[color:var(--control)] px-3 text-xs font-medium text-slateText-primary transition hover:border-gold-500/40 hover:bg-[color:var(--control-hover)]">
                重新上傳
                <input type="file" accept="application/pdf,image/*" className="hidden" onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  onProofsChange(proofs.map((item) => item.id === proof.id ? { ...item, name: file.name, type: file.name, fileType: file.type || "檔案" } : item));
                }} />
              </label>
              <Button size="sm" variant="secondary" onClick={() => onProofsChange(proofs.filter((item) => item.id !== proof.id))}><Trash2 className="h-3.5 w-3.5" />刪除</Button>
            </div>
          </div>
        )) : (
          <p className="rounded-xl border border-amber-500/25 bg-amber-500/10 p-3 text-sm text-amber-300">
            請至少上傳一類入帳證明文件，否則不能提交入帳申請。
          </p>
        )}
      </div>
      {submitted ? (
        <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-3 text-sm text-emerald-300">
          入帳申請已提交，等待銀行確認及文件審核。
        </div>
      ) : null}
      {preview ? (
        <MockModal title="文件預覽" onClose={() => setPreview(null)}>
          <div className="rounded-2xl border border-gold-500/20 bg-[color:var(--control)] p-8 text-center">
            <FileText className="mx-auto mb-4 h-10 w-10 text-gold-300" />
            <p className="text-xl font-semibold">{preview.category}</p>
            <p className="mt-2 text-sm text-slateText-secondary">{preview.name}</p>
            <p className="mt-4 text-sm leading-6 text-slateText-secondary">此處為入帳文件預覽介面，實際文件內容以本機展示資料呈現。</p>
          </div>
        </MockModal>
      ) : null}
    </div>
  );
}

function WalletCard({
  asset,
  name,
  balance,
  usd,
  meta,
  type,
  onDeposit,
  onWithdraw
}: {
  asset: string;
  name: string;
  balance: string;
  usd: string;
  meta: string;
  type: "fiat" | "crypto";
  onDeposit: () => void;
  onWithdraw: () => void;
}) {
  const Icon = type === "fiat" ? Building2 : Bitcoin;
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold-500/25 bg-gold-500/10 text-gold-300">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold">{asset}</p>
            <p className="text-sm text-slateText-secondary">{name}</p>
          </div>
        </div>
        <span className="rounded-full border border-[color:var(--border-muted)] px-2.5 py-1 text-xs text-slateText-secondary">
          {meta}
        </span>
      </div>
      <p className="mt-6 text-2xl font-semibold tracking-tight">{balance}</p>
      <p className="mt-1 text-sm text-slateText-secondary">{usd} <T k="USD equivalent" /></p>
      <div className="mt-5 flex gap-2">
        <Button size="sm" className="flex-1" onClick={onDeposit}><ArrowDownToLine className="h-3.5 w-3.5" />入帳</Button>
        <Button size="sm" variant="secondary" className="flex-1" onClick={onWithdraw}><ArrowUpFromLine className="h-3.5 w-3.5" />提現</Button>
      </div>
    </Card>
  );
}

function FiatDepositModal({ wallet, onClose }: { wallet: FiatWallet; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [note, setNote] = useState("");
  const [proofs, setProofs] = useState<DepositProofDraft[]>([]);
  const info = fiatDepositInstructions[wallet.asset as FiatAsset];

  const submitApplication = () => {
    if (!proofs.length) return;
    appendDepositApplication({
      currency: wallet.asset,
      amount,
      source,
      note,
      applicantName: "7GG Pay 商戶"
    }, proofs);
    setSubmitted(true);
  };

  return (
    <MockModal title="法幣入帳" onClose={onClose} wide>
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <InfoGrid
            items={[
              ["收款人名稱", info.beneficiaryName],
              ["銀行名稱", info.bankName],
              ["銀行地址", info.bankAddress],
              ["帳戶號碼 / IBAN", info.accountNumber],
              ["SWIFT / Routing Number", info.swift],
              ["參考編號", <span key="ref" className="inline-flex items-center gap-2 font-mono">{info.referenceCode}<CopyButton value={info.referenceCode} label="複製" /></span>],
              ["支持電匯 / 本地清算", info.rails],
              ["到帳時間", info.arrival],
              ["手續費提示", info.fee],
              ["合規提示", info.compliance]
            ]}
          />
          <DepositDocumentsStep
            currency={wallet.asset}
            amount={amount}
            source={source}
            note={note}
            proofs={proofs}
            onAmountChange={setAmount}
            onSourceChange={setSource}
            onNoteChange={setNote}
            onProofsChange={setProofs}
            submitted={submitted}
          />
          <div className="flex flex-wrap gap-2">
            <CopyButton value={`${info.beneficiaryName}\n${info.bankName}\n${info.accountNumber}\n${info.swift}\n${info.referenceCode}`} label="複製全部" />
            <Button onClick={submitApplication} disabled={!proofs.length}>我已完成轉帳並提交文件</Button>
          </div>
        </div>
        <ResultPanel
          title="法幣入帳狀態"
          status={submitted ? "等待銀行確認" : "待提交"}
          lines={submitted ? ["入帳文件已提交", "等待銀行確認", "文件審核完成後資金將顯示於錢包。"] : ["請使用本人或已驗證企業銀行賬戶充值。", "請在轉帳備註填寫參考編號。"]}
        />
      </div>
    </MockModal>
  );
}

function CryptoDepositModal({ wallet, onClose }: { wallet: CryptoWallet; onClose: () => void }) {
  const asset = wallet.asset as CryptoAsset;
  const option = cryptoDepositOptions[asset];
  const [network, setNetwork] = useState(option.networks[0]);
  const [scenario, setScenario] = useState<"idle" | "credited" | "review">("idle");
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [note, setNote] = useState("");
  const [proofs, setProofs] = useState<DepositProofDraft[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const address = option.addresses[network as keyof typeof option.addresses];
  const activeIndex = scenario === "idle" ? 1 : scenario === "credited" ? 3 : 2;

  const submitApplication = () => {
    if (!proofs.length) return;
    appendDepositApplication({
      currency: wallet.asset,
      amount,
      source,
      note,
      applicantName: "7GG Pay 商戶"
    }, proofs);
    setSubmitted(true);
  };

  return (
    <MockModal title="加密資產入帳" onClose={onClose} wide>
      <div className="grid gap-5 xl:grid-cols-[0.75fr_1.25fr]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-[color:var(--border-muted)] bg-[color:var(--control)] p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slateText-secondary"><T k="Network" /></p>
            <div className="mt-3 flex flex-wrap gap-2">
              {option.networks.map((item) => (
                <Button key={item} type="button" size="sm" variant={item === network ? "default" : "secondary"} onClick={() => setNetwork(item)}>
                  {item}
                </Button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-gold-500/20 bg-gold-500/10 p-5 text-center">
            <MockQrCode value={address} />
            <p className="mt-4 break-all font-mono text-xs text-slateText-secondary">{address}</p>
            <div className="mt-4 flex justify-center"><CopyButton value={address} label="複製地址" /></div>
          </div>
          <InfoGrid items={[["幣種", wallet.asset], ["最小充值金額", option.minDeposit], ["區塊確認數", option.confirmations], ["風險提示", "充值後系統會先進行入帳審核。"]]} />
        </div>
        <div className="space-y-4">
          <FlowSteps steps={cryptoFlowSteps} activeIndex={activeIndex} />
          <DepositDocumentsStep
            currency={`${wallet.asset} / ${network}`}
            amount={amount}
            source={source}
            note={note}
            proofs={proofs}
            onAmountChange={setAmount}
            onSourceChange={setSource}
            onNoteChange={setNote}
            onProofsChange={setProofs}
            submitted={submitted}
          />
          <Button className="w-full" onClick={submitApplication} disabled={!proofs.length}>提交入帳文件</Button>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setScenario("credited")}>模擬已入帳</Button>
            <Button variant="secondary" onClick={() => setScenario("review")}>模擬入帳審核中</Button>
          </div>
          {scenario === "credited" ? (
            <ResultPanel title="入帳結果" status="已入帳" lines={["區塊確認完成", "入帳審核完成", "資金已入帳至錢包"]} />
          ) : null}
          {scenario === "review" ? (
            <ResultPanel title="入帳結果" status="入帳審核中" lines={["已收到入帳", "本次入帳正在進行標準審核", "如狀態長時間未更新，請聯絡客服。"]} />
          ) : null}
        </div>
      </div>
    </MockModal>
  );
}

function WithdrawModal({
  wallet,
  onClose
}: {
  wallet: FiatWallet | CryptoWallet;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const isCrypto = "network" in wallet;
  return (
    <MockModal title="Withdraw" onClose={onClose}>
      <div className="space-y-4">
        <InfoGrid items={[["Asset", wallet.asset], ["Available balance", wallet.balance], ["Fee", isCrypto ? "Network fee + 0.05%" : "0.10%, minimum local fee"], ["Estimated arrival", isCrypto ? "10-60 minutes after approval" : "Instant to T+1"], ["Risk notice", "Withdrawals may require approval and compliance checks."]]} />
        <Input placeholder={isCrypto ? "Receiving wallet address" : "Receiving bank account"} />
        <Input placeholder="Amount" />
        <Button className="w-full" onClick={() => setSubmitted(true)}>Submit mock withdrawal</Button>
        {submitted ? (
          <div className="space-y-3">
            <FlowSteps steps={withdrawSteps} activeIndex={2} />
            <ResultPanel title="Withdraw status" status="Processing" lines={["Pending Approval", "Compliance Checking", "Processing"]} />
          </div>
        ) : null}
      </div>
    </MockModal>
  );
}

function TransactionDrawer({ tx, onClose }: { tx: WalletTransaction; onClose: () => void }) {
  const detail = transactionDetails[tx.txid as keyof typeof transactionDetails];

  return (
    <MockDrawer title="Transaction detail" onClose={onClose}>
      <div className="space-y-5">
        <InfoGrid
          items={[
            ["Transaction ID", detail.id],
            ["Type", detail.type],
            ["Asset", detail.asset],
            ["Network", detail.network],
            ["Amount", detail.amount],
            ["Fee", detail.fee],
            ["Status", <StatusBadge key="status" value={detail.status} />],
            ["Tx Hash / Bank Reference", detail.reference]
          ]}
        />
        <Card>
          <CardHeader><CardTitle>Timeline</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {detail.timeline.map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border border-[color:var(--border-muted)] bg-[color:var(--control)] p-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-500 text-xs font-semibold text-black">{index + 1}</span>
                <span className="text-sm"><T k={item} /></span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </MockDrawer>
  );
}

export function WalletInteractions() {
  const [fiatDeposit, setFiatDeposit] = useState<FiatWallet | null>(null);
  const [cryptoDeposit, setCryptoDeposit] = useState<CryptoWallet | null>(null);
  const [withdrawWallet, setWithdrawWallet] = useState<FiatWallet | CryptoWallet | null>(null);
  const [selectedTx, setSelectedTx] = useState<WalletTransaction | null>(null);

  return (
    <>
      <PageHeader
        eyebrow="Treasury"
        title="Wallet"
        description="Fiat and crypto wallet balances with mock transaction history and operational actions."
        action={<Button><Wallet className="h-4 w-4" /> Add wallet</Button>}
      />

      <div className="mb-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold-300"><T k="Fiat wallets" /></h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {fiatWallets.map((wallet) => (
            <WalletCard key={wallet.asset} {...wallet} meta={wallet.trend} type="fiat" onDeposit={() => setFiatDeposit(wallet)} onWithdraw={() => setWithdrawWallet(wallet)} />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold-300"><T k="Crypto wallets" /></h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cryptoWallets.map((wallet) => (
            <WalletCard key={wallet.asset} {...wallet} meta={wallet.network} type="crypto" onDeposit={() => setCryptoDeposit(wallet)} onWithdraw={() => setWithdrawWallet(wallet)} />
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Wallet transaction table</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>TXID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {walletTransactions.map((tx) => (
                <TableRow key={tx.txid} onClick={() => setSelectedTx(tx)} className="cursor-pointer">
                  <TableCell className="font-medium">{tx.asset}</TableCell>
                  <TableCell>{tx.txid}</TableCell>
                  <TableCell>{tx.amount}</TableCell>
                  <TableCell><StatusBadge value={tx.status} /></TableCell>
                  <TableCell className="text-slateText-secondary">{tx.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {fiatDeposit ? <FiatDepositModal wallet={fiatDeposit} onClose={() => setFiatDeposit(null)} /> : null}
      {cryptoDeposit ? <CryptoDepositModal wallet={cryptoDeposit} onClose={() => setCryptoDeposit(null)} /> : null}
      {withdrawWallet ? <WithdrawModal wallet={withdrawWallet} onClose={() => setWithdrawWallet(null)} /> : null}
      {selectedTx ? <TransactionDrawer tx={selectedTx} onClose={() => setSelectedTx(null)} /> : null}
    </>
  );
}
