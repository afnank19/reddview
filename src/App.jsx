import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

// Some brainstorming, each child has a data property
function App() {
  const [searchTerm, setSearchTerm] = useState("Pics");

  const { data, error, isError, isPending, isFetching, refetch } = useQuery({
    queryKey: ["subr"],
    queryFn: async () => {
      console.log("doing something");

      const response = await fetch(
        `https://www.reddit.com/r/${searchTerm}/hot.json?limit=20`
      );
      const data = await response.json();

      // console.log(data.data.children[5].data);
      return data.data.children;
    },
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
        GOOOOOONNNNNG
      </p>
      <div className="relative w-full">
        <input
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              refetch();
            }
          }}
          placeholder="Search"
          className="bg-black text-white p-1 m-1 rounded-lg"
        ></input>
        <div className="absolute left-0 right-0 mt-2 bg-slate-100 rounded-md shadow-lg max-h-20 overflow-y-auto m-2 max-w-max px-6">
          <p>r/pics</p>
          <p>r/cars</p>
          <p>r/software</p>
          <p>r/software</p>
          <p>r/software</p>
          <p>r/software</p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2 m-2 w-full">
        {/* <img src={data[5].data.url}></img> */}
        {data.map((childData, index) => {
          // console.log(childData?.data);
          // ?.preview?.images[0]?.variants.nsfw.resolutions[5]?.url

          return childData.data.post_hint == "image" ? (
            <img
              loading="lazy"
              src={childData.data.url}
              className="flex-shrink-0 w-96 max-w-full h-1/5  object-cover"
            ></img>
          ) : null;
        })}
      </div>
    </>
  );
}

export default App;
