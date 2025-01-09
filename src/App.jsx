import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import MediaGrid from "./components/shared/MediaGrid";
import { GetImagesFromSubreddit } from "./api/subreddit";
import SubredditSearch from "./components/shared/SubredditSearch";

function App() {
  const [searchTerm, setSearchTerm] = useState("Pics");

  const { data, error, isError, isPending, isFetching, refetch } = useQuery({
    queryKey: ["subr", searchTerm],
    queryFn: async () => GetImagesFromSubreddit(searchTerm),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isPending || isFetching) {
    return <p>i be loading rn dont distrub</p>;
  }

  if (isError) {
    return (
      <p>something went wrong | content not available | refresh to go back</p>
    );
  }

  return (
    <>
      <p className="text-3xl font-mono ml-1">reddview - images from reddit</p>
      <SubredditSearch setSearchTerm={setSearchTerm} />
      <MediaGrid data={data} />
    </>
  );
}

export default App;
