import Container from "@/components/container";
import UserAvatar from "@/components/user-avatar";

import { PostsProvider } from "@/context/PostsContext";
import { UserDTO } from "@/types/user.types";

import PostsList from "./PostsList";

interface PostsFeedPageProps {
  limit: number;
  user?: UserDTO;
  hideCategory?: boolean;
  slug?: string;
}

const slugToTitle = (slug: string) => {
  switch (slug) {
    case "popular":
      return "Popular";
    case "admin-selections":
      return "Admin Selections";
    case "bulletin-board":
      return "Bulletin Board";
    case "national-commercials":
      return "National Commercials";
    case "youtube-commercials":
      return "YouTube Commercials";
    case "local-commercials":
      return "Local Commercials";
    case "audio-commercials":
      return "Audio Commercials";
    case "classic-commercials":
      return "Classic Commercials";
    default:
      return slug.replace("-", " ").slice(0, 1).toUpperCase() + slug.replace("-", " ").slice(1);
  }
};

const PostsFeedPage = ({ limit, user, hideCategory, slug }: PostsFeedPageProps) => {
  return (
    <PostsProvider {...{ limit }}>
      <Container>
        <div className="space-y-6">
          {user && (
            <UserAvatar
              {...{ imageUrl: user.photo!, username: user.username }}
              size="lg"
            />
          )}
          {slug && <h1 className="text-3xl font-bold mb-4">{slugToTitle(slug)}</h1>}
          <div className="flex flex-col gap-2">
            <PostsList hideCategory={hideCategory} />
          </div>
        </div>
      </Container>
    </PostsProvider>
  );
};

export default PostsFeedPage;

