import { useForm } from '@tanstack/react-form';
import { Form, href } from 'react-router';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import LinkButton from '@/components/ui/LinkButton';
import { useAppForm } from '@/hooks/form';
import { toast } from '@/hooks/useToast';
import { getPostsQueryOptions } from '@/services/queries/posts';
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

export const clientLoader = async () => {
  const posts = await queryClient.ensureQueryData(getPostsQueryOptions());

  return posts;
};

clientLoader.hydrate = true;

export const clientAction = async ({ request }: Route.ClientActionArgs) => {
  const formData = await request.formData();
  const { errors, data, defaultValues } = getValidatedFormData({
    formData,
    schema: formDataSchema,
  });
  if (errors) {
    return { defaultValues, errors };
  }

  toast({
    title: `Hello ${data.name}!`,
  });

  return { data };
};

const KitchenSinkPage = ({ loaderData, actionData }: Route.ComponentProps) => {
  const form = useAppForm({
    defaultValues: {
      name: '',
    },
    validators: {
      onChange: formDataSchema,
    },
  });

  return (
    <div>
      <Form method="post">
        <form.AppField
          children={field => (
            <field.TextField
              className="m-4"
              defaultValue={actionData?.defaultValues?.name}
              label="Name"
            />
          )}
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
