import { useQuery } from "@tanstack/react-query";

// Some brainstorming, each child has a data property
function App() {
  const { data, error, isError, isPending } = useQuery({
    queryKey: ["subr"],
    queryFn: async () => {
      console.log("doing something");

      const response = await fetch(
        "https://www.reddit.com/r/Pics/hot.json?limit=50"
      );
      const data = await response.json();

      // console.log(data.data.children[5].data);
      return data.data.children;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isPending) {
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
      <div className="flex flex-wrap justify-center gap-2 m-2">
        {/* <img src={data[5].data.url}></img> */}
        {data.map((childData, index) => {
          // console.log(childData?.data);
          // ?.preview?.images[0]?.variants.nsfw.resolutions[5]?.url

          return childData.data.post_hint == "image" ? (
            <img
              loading="lazy"
              src={childData.data.url}
              className="w-1/5 max-w-full h-1/5 object-cover"
            ></img>
          ) : null;
        })}
      </div>
    </>
  );
}

export default App;
