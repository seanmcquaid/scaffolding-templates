import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import LinkButton from '@/components/ui/LinkButton';
import { getPostsQueryOptions } from '@/services/queries/posts';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/hooks/useToast';

const formDataSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Name must be between 3 and 10 characters',
    })
    .max(10, {
      message: 'Name must be between 3 and 10 characters',
    }),
});

export const KitchenSinkPage = () => {
  const { data: posts } = useSuspenseQuery(getPostsQueryOptions());
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof formDataSchema>>({
    resolver: zodResolver(formDataSchema),
    mode: 'onChange',
  });
  const { toast } = useToast();

  const handleOnSubmit = handleSubmit(data => {
    toast({
      title: `Hello ${data.name}!`,
    });
  });

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <Input
          className="m-4"
          label="Name"
          errorMessage={errors?.name?.message}
          {...register('name')}
        />
        <Button type="submit">{'Submit'}</Button>
      </form>
      <ul className="grid grid-cols-2">
        {posts?.map(post => (
          <li key={post.id} className="mt-4 flex items-center">
            <LinkButton
              to="/react-query/$id"
              params={{ id: post.id.toString() }}
            >
              {post.title.substring(0, 4)}
            </LinkButton>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Route = createFileRoute('/kitchen-sink/')({
  component: KitchenSinkPage,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(getPostsQueryOptions()),
});
