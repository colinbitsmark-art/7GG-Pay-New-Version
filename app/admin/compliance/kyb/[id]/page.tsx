import { KybReviewDetail } from "@/components/verification-review-module";

export default async function ComplianceKybDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <KybReviewDetail id={decodeURIComponent(id)} />;
}
