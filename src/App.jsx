import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import MediaGrid from "./components/shared/MediaGrid";
import { GetImagesFromSubreddit } from "./api/subreddit";
import SubredditSearch from "./components/shared/SubredditSearch";

// Some brainstorming, each child has a data property
// https://www.reddit.com/subreddits/search.json?q=bes&include_over_18=false
function App() {
  const [searchTerm, setSearchTerm] = useState("Pics");

  const { data, error, isError, isPending, isFetching, refetch } = useQuery({
    queryKey: ["subr", searchTerm],
    queryFn: async () => GetImagesFromSubreddit(searchTerm),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isPending || isFetching) {
    return <p>I be loading rn dont distrub</p>;
  }

  if (isError) {
    return <p>I done fucked up</p>;
  }

  return (
    <>
      <p className="bg-black text-white text-3xl text-center font-mono">
        reddview - images from reddit
      </p>
      <SubredditSearch setSearchTerm={setSearchTerm} />
      <MediaGrid data={data} />
    </>
  );
}

export default App;
