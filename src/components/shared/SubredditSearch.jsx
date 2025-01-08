import { useQuery } from "@tanstack/react-query";
import { searchForSubreddits } from "../../api/subreddit";
import { useState } from "react";

// Move functions out of the JSX
const SubredditSearch = ({ setSearchTerm }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, error, isError, isPending, isFetching, refetch } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: async () => searchForSubreddits(searchQuery),
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            refetch();
          }
        }}
        placeholder="Search"
        className="bg-black text-white p-1 m-1 rounded-lg"
      ></input>
      {isFetching ? (
        <p>Loading</p>
      ) : isError ? (
        <p>An error occured</p>
      ) : (
        <div className="absolute left-0 right-0 mt-2 bg-slate-100 rounded-md shadow-lg max-h-60 overflow-y-auto m-2 max-w-max px-2 flex flex-col items-start gap-1">
          {data?.map((subreddit, index) => {
            return (
              <button
                className="hover:underline"
                key={index}
                onClick={(e) => {
                  setSearchTerm(subreddit.data?.display_name);
                }}
              >
                r/{subreddit.data?.display_name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SubredditSearch;
