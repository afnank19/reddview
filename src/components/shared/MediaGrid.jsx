import React from "react";

const MediaGrid = ({ data }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 m-2 w-full">
      {/* <img src={data[5].data.url}></img> */}
      {data.map((childData, index) => {
        // console.log(childData?.data);
        // ?.preview?.images[0]?.variants.nsfw.resolutions[5]?.url

        return childData.data.post_hint == "image" ? (
          <img
            key={index}
            loading="lazy"
            src={childData.data.url}
            className="flex-shrink-0 w-96 max-w-full h-1/5  object-cover"
          ></img>
        ) : null;
      })}
    </div>
  );
};

export default MediaGrid;
