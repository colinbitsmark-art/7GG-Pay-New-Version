"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import { FlowSteps, InfoGrid, ResultPanel } from "@/components/mock-interaction-components";
import { T } from "@/components/preferences-provider";
import { PageHeader } from "@/components/section-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const steps = ["Select payout type", "Beneficiary information", "Amount & currency", "Review"];
const payoutStatuses = ["Created", "Reviewing", "Approved", "Processing", "Completed"];

export function PayoutCreateFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [payoutType, setPayoutType] = useState("Bank transfer");
  const [rail, setRail] = useState("SWIFT");
  const [submitted, setSubmitted] = useState(false);

  const summary = useMemo(() => ({
    payoutType,
    beneficiary: "Apex Logistics",
    country: "Hong Kong",
    rail,
    sourceWallet: "USD Operating Wallet",
    amount: "42,000.00 USD",
    fee: "0.18% / $75.60",
    arrival: rail === "FPS" ? "Instant after approval" : "T+1"
  }), [payoutType, rail]);

  const submit = () => {
    setSubmitted(true);
    window.setTimeout(() => router.push("/dashboard/pay-out/mock-payout-2026"), 450);
  };

  return (
    <>
      <PageHeader
        eyebrow="Global disbursement"
        title="Create payout"
        description="Mock multi-step payout creation flow with beneficiary, rail, amount, compliance warning, and status simulation."
      />

      <Card>
        <CardHeader><CardTitle>Create payout</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <FlowSteps steps={steps} activeIndex={step} />

          {step === 0 ? (
            <div className="grid gap-3 md:grid-cols-3">
              {["Bank transfer", "Stablecoin payout", "Batch payout"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPayoutType(type)}
                  className={`rounded-2xl border p-5 text-left transition ${payoutType === type ? "border-gold-500 bg-gold-500/10 shadow-gold" : "border-[color:var(--border-muted)] bg-[color:var(--control)]"}`}
                >
                  <p className="font-semibold"><T k={type} /></p>
                  <p className="mt-2 text-sm text-slateText-secondary"><T k="Mock payout rail selection" /></p>
                </button>
              ))}
            </div>
          ) : null}

          {step === 1 ? (
            <div className="grid gap-3 md:grid-cols-2">
              <Input defaultValue="Apex Logistics" placeholder="Beneficiary name" />
              <Input defaultValue="Hong Kong" placeholder="Country / Region" />
              <Input defaultValue="024-782-991008" placeholder="Bank account / wallet address" />
              <div className="flex flex-wrap gap-2 rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--input-bg)] p-2">
                {["SWIFT", "ACH", "FPS", "SEPA", "TRON", "Ethereum"].map((item) => (
                  <Button key={item} size="sm" variant={rail === item ? "default" : "secondary"} onClick={() => setRail(item)}>{item}</Button>
                ))}
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-3 md:grid-cols-2">
              <Input defaultValue="USD Operating Wallet" placeholder="Source wallet" />
              <Input defaultValue="42,000.00" placeholder="Amount" />
              <Input defaultValue="0.18% / $75.60" placeholder="Fee" />
              <Input defaultValue={summary.arrival} placeholder="Estimated arrival" />
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-4">
              <InfoGrid
                items={[
                  ["Payout type", summary.payoutType],
                  ["Beneficiary name", summary.beneficiary],
                  ["Country / Region", summary.country],
                  ["Rail", summary.rail],
                  ["Source wallet", summary.sourceWallet],
                  ["Amount", summary.amount],
                  ["Fee", summary.fee],
                  ["Estimated arrival", summary.arrival]
                ]}
              />
              <ResultPanel title="Payment notice" status="Review" lines={["Mock payout may require review before processing.", "No real payment will be sent."]} />
            </div>
          ) : null}

          {submitted ? <ResultPanel title="Mock payout submitted" status="Created" lines={payoutStatuses} /> : null}

          <div className="flex justify-between gap-2">
            <Button variant="secondary" disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}>Back</Button>
            {step < 3 ? (
              <Button onClick={() => setStep((value) => Math.min(3, value + 1))}>Next</Button>
            ) : (
              <Button onClick={submit}><Send className="h-4 w-4" />Submit mock payout</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
