import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import LinkButton from '@/components/ui/LinkButton'
import { toast } from '@/hooks/useToast'
import { getPostsQueryOptions } from '@/services/queries/posts'
import queryClient from '@/services/queries/queryClient'
import getValidatedFormData from '@/utils/getValidatedFormData'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from 'react-router'
import { z } from 'zod'
import type { Route } from './+types'

const formDataSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Name must be between 3 and 10 characters',
    })
    .max(10, {
      message: 'Name must be between 3 and 10 characters',
    }),
})

export const clientLoader = async () => {
  const posts = await queryClient.ensureQueryData(getPostsQueryOptions())

  return posts
}

clientLoader.hydrate = true

export const clientAction = async ({ request }: Route.ClientActionArgs) => {
  const formData = await request.formData()
  const { errors, data, defaultValues } = getValidatedFormData({
    formData,
    schema: formDataSchema,
  })
  if (errors) {
    return { errors, defaultValues }
  }

  toast({
    title: `Hello ${data.name}!`,
  })

  return { data }
}

const KitchenSinkPage = ({ loaderData, actionData }: Route.ComponentProps) => {
  const {
    register,
    formState: { errors },
  } = useForm<z.infer<typeof formDataSchema>>({
    resolver: zodResolver(formDataSchema),
    mode: 'onChange',
  })

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
  )
}

export default KitchenSinkPage
