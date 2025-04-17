import { zodResolver } from '@hookform/resolvers/zod';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import LinkButton from '@/components/ui/LinkButton';
import { useToast } from '@/hooks/useToast';
import { getPostsQueryOptions } from '@/services/queries/posts';

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
    mode: 'onChange',
    resolver: zodResolver(formDataSchema),
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
          errorMessage={errors?.name?.message}
          label="Name"
          {...register('name')}
        />
        <Button type="submit">{'Submit'}</Button>
      </form>
      <ul className="grid grid-cols-2">
        {posts?.map(post => (
          <li className="mt-4 flex items-center" key={post.id}>
            <LinkButton
              params={{ id: post.id.toString() }}
              to="/react-query/$id"
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
