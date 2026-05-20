import { DepositReviewDetail } from "@/components/verification-review-module";

export default async function AdminDepositReviewDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <DepositReviewDetail id={decodeURIComponent(id)} />;
}
