import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import {
	useDeletePost,
	useGetPostById,
} from "@/lib/react-query/queriesAndMutations";
import { multiFormatDateString } from "@/lib/utils";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function PostDetails() {
	const { id } = useParams();
	const { data: post, isPending } = useGetPostById(id || "");
	const { user } = useUserContext();
	const { mutateAsync: deletePost, isPending: isLoadingDelete } =
		useDeletePost();
	const navigate = useNavigate();
	const { toast } = useToast();

	if (!isPending && !post) return <div>Post not found</div>;

	const handleDeletePost = async () => {
		const deletedPost = await deletePost({
			postId: post?.$id || "",
			imageId: post?.imageId,
		});
		if (!deletedPost) {
			toast({
				title: "Update failed. Please try again.",
			});
		}

		return navigate(`/`);
	};

	return (
		<div className="post_details-container">
			{isPending ? (
				<Loader />
			) : (
				<div className="post_details-card">
					<img
						src={post?.imageUrl}
						alt="Post Image"
						className="post_details-img"
					/>
					<div className="post_details-info">
						<div className="flex-between w-full">
							<Link
								to={`/profile/${post?.creator.username}`}
								className="flex items-center gap-3"
							>
								<img
									src={
										post?.creator.imageUrl ||
										"/assets/icons/profile-placeholder.svg"
									}
									alt="Creator"
									className="rounded-full w-12 lg:h-12"
								/>

								<div className="flex flex-col">
									<p className="base-medium lg:body-bold text-light-1">
										{post?.creator.name
											.split(" ")
											.slice(0, 2)
											.join(" ")}
									</p>
									<div className="flex-center gap-2 text-light-3">
										<p className="subtle-semibold lg:small-regular">
											{multiFormatDateString(
												post?.$createdAt
											)}
										</p>
										-
										<p className="subtle-semibold lg:small-regular">
											{post?.location}
										</p>
									</div>
								</div>
							</Link>
							{user.id === post?.creator.$id && (
								<div className="flex-center">
									<Link to={`/update-post/${post?.$id}`}>
										<img
											src="/assets/icons/edit.svg"
											alt="Edit"
											width={24}
											height={24}
										/>
									</Link>

									<Button
										variant="ghost"
										className="ghost_details-delete_btn"
										onClick={handleDeletePost}
										disabled={isLoadingDelete}
									>
										<img
											src="/assets/icons/delete.svg"
											alt="Delete"
										/>
									</Button>
								</div>
							)}
						</div>
						<hr className="border w-full border-dark-4/80" />
						<div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
							<p>{post?.caption}</p>
							<ul className="flex gap-1 mt-2">
								{post?.tags.map((tag: string) => (
									<li
										key={tag}
										className="text-light-3"
									>
										#{tag}
									</li>
								))}
							</ul>
						</div>
						<div className="w-full">
							<PostStats
								post={post}
								userId={user.id}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
