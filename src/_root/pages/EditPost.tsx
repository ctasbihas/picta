import PostForm from "@/components/forms/PostForm";
import Loader from "@/components/shared/Loader";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { useParams } from "react-router-dom";

export default function EditPost() {
	const { id } = useParams();
	const { data: post, isPending } = useGetPostById(id || "");

	if (isPending) {
		return <Loader />;
	}

	return (
		<div className="flex flex-1">
			<div className="common-container">
				<div className="max-w-5xl w-full flex-start justify-start gap-3">
					<img
						src="/assets/icons/add-post.svg"
						alt="Add post"
						height={36}
						width={36}
					/>
					<h2 className="h3-bold md:h2-bold text-left w-full">
						Edit Post
					</h2>
				</div>
				<PostForm
					action="Update"
					post={post}
				/>
			</div>
		</div>
	);
}
