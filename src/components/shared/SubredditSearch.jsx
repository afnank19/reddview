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
          if (e.key === "Enter" && searchQuery != "") {
            refetch();
          }
        }}
        placeholder="search and enter"
        className="bg-[#251d2e] p-1 m-1 rounded-lg ml-2"
      ></input>
      {isFetching ? (
        <div className=" absolute left-0 right-0 mt-2 bg-[#251d2e] rounded-md shadow-lg max-h-60 overflow-y-auto m-2 max-w-max px-2 flex flex-col items-start gap-1">
          <p>Loading</p>
        </div>
      ) : isError ? (
        <p>An error occured</p>
      ) : (
        <div className="absolute left-0 right-0 mt-2 bg-[#251d2e] rounded-md shadow-lg max-h-60 overflow-y-auto m-2 max-w-max px-2 flex flex-col items-start gap-1">
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
