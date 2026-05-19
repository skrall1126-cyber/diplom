import { redirect } from "next/navigation";

interface CourseDashboardPageProps {
  params: {
    id: string;
  };
}

export default function CourseDashboardPage({
  params,
}: CourseDashboardPageProps) {
  redirect(`/course/${params.id}`);
}
