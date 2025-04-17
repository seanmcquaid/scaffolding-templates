import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from 'react-router';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import LinkButton from '@/components/ui/LinkButton';
import { toast } from '@/hooks/useToast';
import postsService from '@/services/postsService';
import { PostsQueryKeys } from '@/services/queries/posts';
import queryClient from '@/services/queries/queryClient';
import getValidatedFormData from '@/utils/getValidatedFormData';
import type { Route } from './+types';

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
    queryFn: () => serverLoader(),
    queryKey: [PostsQueryKeys.GET_POSTS],
  });

  return posts;
};

clientLoader.hydrate = true;

export const action = async ({ request }: Route.ActionArgs) => {
  const { errors, data, defaultValues } = getValidatedFormData({
    formData: await request.formData(),
    schema: formDataSchema,
  });

  if (errors) {
    return { defaultValues, errors };
  }

  return { data };
};

export const clientAction = async ({
  serverAction,
}: Route.ClientActionArgs) => {
  const { data, errors, defaultValues } = await serverAction();

  if (errors) {
    return { defaultValues, errors };
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
    mode: 'onChange',
    resolver: zodResolver(formDataSchema),
  });

  return (
    <div>
      <Form method="POST">
        <Input
          className="m-4"
          defaultValue={actionData?.defaultValues?.name}
          errorMessage={errors?.name?.message || actionData?.errors?.name}
          label="Name"
          {...register('name')}
        />
        <Button type="submit">{'Submit'}</Button>
      </Form>
      <ul className="grid grid-cols-2">
        {loaderData?.map(post => (
          <li className="mt-4 flex items-center" key={post.id}>
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
