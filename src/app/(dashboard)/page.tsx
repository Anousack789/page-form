import { GetFormStats } from "@/actions/form";
import CreateFormBtn from "@/components/CreateFormBtn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  EyeIcon,
  MousePointerClickIcon,
  ScrollTextIcon,
  TrendingUpIcon,
} from "lucide-react";
import { ReactNode, Suspense } from "react";

function HomePage() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h1 className="text-4xl font-bold col-span-2">Your Forms</h1>
      <Separator className="my-6" />
      <CreateFormBtn />
    </div>
  );
}

export default HomePage;

const CardStatsWrapper = async () => {
  const stats = await GetFormStats();
  return <StatsCards loading={false} data={stats} />;
};
interface StatsCardProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}
const StatsCards = (props: StatsCardProps) => {
  const { data, loading } = props;
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total visits"
        icon={<EyeIcon className="text-blue-600" />}
        loading={loading}
        className="shadow-md shadow-blue-600"
        value={data?.visits.toLocaleString() || ""}
        helperText={"All time form visits"}
      />
      <StatsCard
        title="Total submissions"
        icon={<ScrollTextIcon className="text-yellow-600" />}
        loading={loading}
        className="shadow-md shadow-yellow-600"
        value={data?.submissions.toLocaleString() || ""}
        helperText={"All time form submissions"}
      />
      <StatsCard
        title="Submission Rate"
        icon={<MousePointerClickIcon className="text-green-600" />}
        loading={loading}
        className="shadow-md shadow-green-600"
        value={data?.submissionRate.toLocaleString() + "%" || ""}
        helperText={"All time form submissions"}
      />
      <StatsCard
        title="Bounce Rate"
        icon={<TrendingUpIcon className="text-red-600" />}
        loading={loading}
        className="shadow-md shadow-red-600"
        value={data?.bounceRate.toLocaleString() + "%" || ""}
        helperText={"Visits that leaves without interacting"}
      />
    </div>
  );
};

const StatsCard = ({
  title,
  value,
  icon,
  helperText,
  loading,
  className,
}: {
  title: string;
  value: string;
  helperText: string;
  className: string;
  loading: boolean;
  icon: ReactNode;
}) => {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
      </CardContent>
    </Card>
  );
};
