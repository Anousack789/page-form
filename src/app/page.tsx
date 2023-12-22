import { GetFormStats, GetForms } from '@/actions/form';
import CreateFormBtn from '@/components/CreateFormBtn';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Form } from '@prisma/client';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import { ReactNode, Suspense } from 'react';
import {
  LuEye,
  LuLibrary,
  LuMousePointerClick,
  LuMoveRight,
  LuScrollText,
  LuTrendingUp,
  LuView,
} from 'react-icons/lu';

function HomePage() {
  return (
    <main className='flex w-full flex-grow'>
      <div className='container pt-4'>
        <Suspense fallback={<StatsCards loading={true} />}>
          <CardStatsWrapper />
        </Suspense>
        <Separator className='my-6' />
        <h1 className='col-span-2 text-4xl font-bold'>Your Forms</h1>
        <Separator className='my-6' />
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          <Suspense
            fallback={[0, 1, 2, 3].map((el) => (
              <FormCardSkeleton key={el} />
            ))}
          >
            <FormCards />
          </Suspense>
          <CreateFormBtn />
        </div>
      </div>
    </main>
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
    <div className='grid w-full grid-cols-1 gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4'>
      <StatsCard
        title='Total visits'
        icon={<LuEye className='text-blue-600' />}
        loading={loading}
        className='shadow-md shadow-blue-600'
        value={data?.visits.toLocaleString() || ''}
        helperText={'All time form visits'}
      />
      <StatsCard
        title='Total submissions'
        icon={<LuScrollText className='text-yellow-600' />}
        loading={loading}
        className='shadow-md shadow-yellow-600'
        value={data?.submissions.toLocaleString() || ''}
        helperText={'All time form submissions'}
      />
      <StatsCard
        title='Submission Rate'
        icon={<LuMousePointerClick className='text-green-600' />}
        loading={loading}
        className='shadow-md shadow-green-600'
        value={data?.submissionRate.toLocaleString() + '%' || ''}
        helperText={'All time form submissions'}
      />
      <StatsCard
        title='Bounce Rate'
        icon={<LuTrendingUp className='text-red-600' />}
        loading={loading}
        className='shadow-md shadow-red-600'
        value={data?.bounceRate.toLocaleString() + '%' || ''}
        helperText={'Visits that leaves without interacting'}
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
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium text-muted-foreground'>
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>
          {loading && (
            <Skeleton>
              <span className='opacity-0'>0</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className='pt-1 text-xs text-muted-foreground'>{helperText}</p>
      </CardContent>
    </Card>
  );
};

const FormCardSkeleton = () => {
  return (
    <Skeleton className='border-primary-/20 h-[190px] w-full border-2'></Skeleton>
  );
};

const FormCards = async () => {
  const forms = await GetForms();

  return (
    <>
      {forms.map((form) => {
        return <FormCard key={form.id} form={form} />;
      })}
    </>
  );
};

const FormCard = ({ form }: { form: Form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center justify-between gap-2'>
          <span className='truncate font-bold'>{form.name}</span>
          {form.published && <Badge>Published</Badge>}
          {!form.published && <Badge variant={'destructive'}>Draft</Badge>}
        </CardTitle>
        <CardDescription className='flex items-center justify-between text-sm text-muted-foreground'>
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {!form.published && (
            <span className='flex items-center gap-3'>
              <LuView className='text-muted-foreground'></LuView>
              <span>{form.visits.toLocaleString()}</span>
              <LuLibrary />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className='h-[20px] truncate text-sm text-muted-foreground'>
        {form.description || 'No description'}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button asChild className='text-md mt-2 w-full gap-4'>
            <Link href={`/forms/${form.id}`}>
              View submissions <LuMoveRight />
            </Link>
          </Button>
        )}
        {!form.published && (
          <Button asChild className='text-md mt-2 w-full gap-4'>
            <Link href={`/builder/${form.id}`}>Edit form</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
