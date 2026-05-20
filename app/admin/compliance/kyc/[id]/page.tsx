import { KycReviewDetail } from "@/components/verification-review-module";

export default async function ComplianceKycDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <KycReviewDetail id={decodeURIComponent(id)} />;
}
