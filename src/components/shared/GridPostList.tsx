import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import { useUserContext } from "@/context/AuthContext";

type GridPostListProps = {
	posts: Models.DocumentList<Models.Document> | undefined;
	showUser?: boolean;
	showStats?: boolean;
};

export default function GridPostList({
	posts,
	showUser = true,
	showStats = true,
}: GridPostListProps) {
	const { user } = useUserContext();

	const truncateName = (name: string) => {
		return name.length > 20 ? `${name.substring(0, 15)}...` : name;
	};
	return (
		<ul className="grid-container">
			{posts?.documents.map((post: Models.Document) => (
				<li
					key={post.$id}
					className="relative min-w-80 h-80"
				>
					<Link
						to={`/posts/${post.$id}`}
						className="grid-post_link"
					>
						<img
							src={post.imageUrl}
							alt="Photo"
							className="h-full w-full object-cover"
						/>
					</Link>
					<div className="grid-post_user">
						{showUser && (
							<div className="flex items-center justify-normal gap-2 flex-1">
								<img
									src={post.creator.imageUrl}
									alt="Creator"
									className="w-8 h-8 rounded-full"
								/>
								<p className="line-clamp-1">
									{truncateName(post.creator.name)}
								</p>
							</div>
						)}
						{showStats && (
							<PostStats
								post={post}
								userId={user.id}
							/>
						)}
					</div>
				</li>
			))}
		</ul>
	);
}
