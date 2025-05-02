import { mergeForm, useTransform } from '@tanstack/react-form';
import {
  createServerValidate,
  formOptions,
  ServerValidateError,
} from '@tanstack/react-form/remix';
import { Form, href } from 'react-router';
import { z } from 'zod';
import LinkButton from '@/components/ui/LinkButton';
import { useAppForm } from '@/hooks/form';
import { toast } from '@/hooks/useToast';
import postsService from '@/services/postsService';
import { PostsQueryKeys } from '@/services/queries/posts';
import queryClient from '@/services/queries/queryClient';
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

const formOpts = formOptions({
  defaultValues: {
    name: '',
  },
  // validators: {
  //   onChange: formDataSchema,
  // },
});

const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: formDataSchema,
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


export const clientAction = async ({
  request,
}: Route.ClientActionArgs) => {
 try{
  const formData = await request.formData();
  const data = await serverValidate(formData);
  toast({
    title: `Hello ${data.name}!`,
  });
 }catch(err){
  if (err instanceof ServerValidateError) {
    return err.formState;
  }
  throw err;
 }

 return null;
};

const KitchenSinkPage = ({ loaderData, actionData }: Route.ComponentProps) => {
  const form = useAppForm({
    ...formOpts,
    transform: useTransform(
      baseForm => mergeForm(baseForm, actionData ?? {}),
      [actionData],
    ),
  });

  return (
    <div>
      <Form method="post">
        <form.AppField
          children={field => <field.TextField className="m-4" label="Name" />}
          name="name"
        />
        <form.AppForm>
          <form.SubmitButton>Submit</form.SubmitButton>
        </form.AppForm>
      </Form>
      <ul className="grid grid-cols-2">
        {loaderData?.map(post => (
          <li className="mt-4 flex items-center" key={post.id}>
            <LinkButton
              to={href('/react-query/:id', {
                id: post.id.toString(),
              })}
            >
              {post.title.substring(0, 4)}
            </LinkButton>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KitchenSinkPage;
