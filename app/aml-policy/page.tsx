import Link from "next/link";
import { ShieldCheck, UserCheck, FileSearch, Ban, Landmark, Radar, Scale } from "lucide-react";
import { Logo } from "@/components/platform-components";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const policyItems = [
  {
    title: "重視 AML / CFT",
    description: "7GG Pay 將反洗錢及反恐怖分子資金籌集要求納入客戶開戶、入帳審核、交易監控及內部合規流程。",
    icon: ShieldCheck
  },
  {
    title: "客戶身份識別 KYC / KYB",
    description: "平台要求個人客戶及企業 / 機構客戶提交身份、業務、銀行及資金來源資料，並完成文件審核。",
    icon: UserCheck
  },
  {
    title: "制裁名單及高風險地區篩查",
    description: "7GG Pay 會對客戶、受益人、交易對手及高風險國家 / 地區關聯進行審查及分級處理。",
    icon: Radar
  },
  {
    title: "可疑交易監控",
    description: "平台會監控異常入帳、付款、交易頻率、交易金額及資金來源文件，必要時要求補充資料。",
    icon: FileSearch
  },
  {
    title: "入帳文件審核",
    description: "客戶入帳時需提交合同、訂單、詢盤紀錄或物流文件，合規團隊會核對交易背景及文件完整性。",
    icon: Landmark
  },
  {
    title: "拒絕高風險或資料不完整交易",
    description: "如交易或客戶資料不完整、文件不清晰、涉及高風險因素或未能通過審核，7GG Pay 可拒絕或暫停處理。",
    icon: Ban
  },
  {
    title: "配合監管及執法要求",
    description: "7GG Pay 會按適用法律、監管要求及執法機關要求保留審核紀錄，並配合必要的合規查詢。",
    icon: Scale
  }
];

export default function AmlPolicyPage() {
  return (
    <div className="public-site min-h-screen px-5 py-6 text-slateText-primary">
      <div className="fixed inset-0 -z-10 bg-gold-radial" />
      <div className="fixed inset-0 -z-10 bg-obsidian-grid bg-[size:54px_54px] opacity-[0.12]" />
      <header className="mx-auto flex max-w-7xl items-center justify-between">
        <Logo />
        <Link className="rounded-xl border border-gold-500/20 bg-[color:var(--control)] px-4 py-2 text-sm text-slateText-secondary transition hover:text-gold-300" href="/">
          返回主頁
        </Link>
      </header>

      <main className="mx-auto max-w-7xl py-14">
        <Badge variant="gold" className="mb-5">7GG Pay 合規政策</Badge>
        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">反洗錢政策</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slateText-secondary">
          7GG Pay 致力維持高標準的反洗錢、反恐怖分子資金籌集及交易審核制度，保障平台、商戶及合作夥伴的資金安全。
        </p>

        <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {policyItems.map(({ title, description, icon: Icon }) => (
            <Card key={title} className="p-6">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-gold-500/25 bg-gold-500/10 text-gold-300">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slateText-secondary">{description}</p>
            </Card>
          ))}
        </section>

        <Card className="mt-10 p-6">
          <h2 className="text-2xl font-semibold">重要提示</h2>
          <p className="mt-4 leading-7 text-slateText-secondary">
            本頁面為 7GG Pay 前端合規展示內容。客戶提交 KYC / KYB、入帳文件或交易資料後，相關資料將以目前原型的本機展示資料方式呈現於工作人員後台，用於介面流程驗證。
          </p>
        </Card>
      </main>
    </div>
  );
}
