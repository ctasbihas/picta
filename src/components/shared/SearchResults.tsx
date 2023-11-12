import { Models } from "appwrite";
import Loader from "./Loader";
import GridPostList from "./GridPostList";

type SearchResultsProps = {
	searchedPosts: Models.DocumentList<Models.Document> | undefined;
	isSearchFetching: boolean;
};

export default function SearchResults({
	searchedPosts,
	isSearchFetching,
}: SearchResultsProps) {
	if (isSearchFetching) return <Loader />;

	if (searchedPosts && searchedPosts.documents.length > 0) {
		return <GridPostList posts={searchedPosts} />;
	}

	return (
		<p className="text-light-4 mt-10 text-center w-full">
			No results found!
		</p>
	);
}
