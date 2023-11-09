import PostForm from "@/components/forms/PostForm";

export default function CreatePost() {
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
						Create Post
					</h2>
				</div>
				<PostForm />
			</div>
		</div>
	);
}
