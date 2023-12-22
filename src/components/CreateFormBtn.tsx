'use client';
import { formSchema, formSchemaType } from '@/schemas/form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

import { CreateForm } from '@/actions/form';
import { useRouter } from 'next/navigation';
import { LuFilePlus, LuRefreshCw } from 'react-icons/lu';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from './ui/use-toast';

function CreateFormBtn() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = async (value: formSchemaType) => {
    try {
      const form = await CreateForm({
        name: value.name,
        description: value.description ?? '',
      });
      router.push(`/builder/${form}`);
      toast({
        title: 'Success',
        description: 'Create form success',
        variant: 'default',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again latet',
        variant: 'destructive',
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className='group flex h-[190px] flex-col items-center justify-center gap-4 border border-dashed border-primary/20 bg-background hover:cursor-pointer hover:border-primary'
        >
          <LuFilePlus className='h-8 w-8 text-muted-foreground group-hover:text-primary' />
          <p className='text-xl font-bold text-muted-foreground group-hover:text-primary'>
            Create new form
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create form</DialogTitle>
          <DialogDescription>
            Create a new form to start collecting responses
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className='space-y-2'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea rows={5} {...field} />
                    </FormControl>
                  </FormItem>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type='button'
              className='mt-4 w-full'
              disabled={form.formState.isSubmitting}
              onClick={form.handleSubmit(onSubmit)}
            >
              {!form.formState.isSubmitting && <span>Save</span>}
              {form.formState.isSubmitting && (
                <LuRefreshCw className='animate-spin' />
              )}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateFormBtn;
