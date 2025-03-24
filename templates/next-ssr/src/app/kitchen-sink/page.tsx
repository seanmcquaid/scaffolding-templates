import KitchenSinkForm from './KitchenSinkForm';
import LinkButton from '@/components/ui/LinkButton';
import postsService from '@/services/postsService';

const KitchenSinkPage = async () => {
  const posts = await postsService.getPosts();

  return (
    <div>
      <KitchenSinkForm />
      <ul className="grid grid-cols-2">
        {posts?.map(post => (
          <li key={post.id} className="mt-4 flex items-center">
            <LinkButton href={`/react-query/${post.id}`}>
              {post.title.substring(0, 4)}
            </LinkButton>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KitchenSinkPage;
