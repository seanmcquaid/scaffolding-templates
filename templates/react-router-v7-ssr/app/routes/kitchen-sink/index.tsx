import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'react-router';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import type { Route } from './+types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import queryClient from '@/services/queries/queryClient';
import { toast } from '@/hooks/useToast';
import postsService from '@/services/postsService';
import LinkButton from '@/components/ui/LinkButton';
import getValidatedFormData from '@/utils/getValidatedFormData';
import { PostsQueryKeys } from '@/services/queries/posts';

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

export const loader = async () => {
  const posts = await postsService.getPosts();

  return posts;
};

export const clientLoader = async ({
  serverLoader,
}: Route.ClientLoaderArgs) => {
  const posts = await queryClient.ensureQueryData({
    queryKey: [PostsQueryKeys.GET_POSTS],
    queryFn: () => serverLoader(),
  });

  return posts;
};

clientLoader.hydrate = true;

export const action = async ({ request }: Route.ActionArgs) => {
  const { errors, data, defaultValues } = getValidatedFormData({
    schema: formDataSchema,
    formData: await request.formData(),
  });

  if (errors) {
    return { errors, defaultValues };
  }

  return { data };
};

export const clientAction = async ({
  serverAction,
}: Route.ClientActionArgs) => {
  const { data, errors, defaultValues } = await serverAction();

  if (errors) {
    return { errors, defaultValues };
  }

  toast({
    title: `Hello ${data?.name}!`,
  });

  return { data };
};

const KitchenSinkPage = ({ loaderData, actionData }: Route.ComponentProps) => {
  const {
    register,
    formState: { errors },
  } = useForm<z.infer<typeof formDataSchema>>({
    resolver: zodResolver(formDataSchema),
    mode: 'onChange',
  });

  return (
    <div>
      <Form method="POST">
        <Input
          className="m-4"
          label="Name"
          errorMessage={errors?.name?.message || actionData?.errors?.name}
          defaultValue={actionData?.defaultValues?.name}
          {...register('name')}
        />
        <Button type="submit">{'Submit'}</Button>
      </Form>
      <ul className="grid grid-cols-2">
        {loaderData?.map(post => (
          <li key={post.id} className="mt-4 flex items-center">
            <LinkButton to={`/react-query/${post.id}`}>
              {post.title.substring(0, 4)}
            </LinkButton>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KitchenSinkPage;
