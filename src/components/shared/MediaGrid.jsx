import React from "react";

const MediaGrid = ({ data }) => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 m-2">
      {/* <img src={data[5].data.url}></img> */}
      {data.map((childData, index) => {
        // console.log(childData?.data);
        // ?.preview?.images[0]?.variants.nsfw.resolutions[5]?.url

        return childData.data.post_hint == "image" ? (
          <div key={index} className="mb-4 break-inside-avoid">
            <img
              key={index}
              loading="lazy"
              src={childData.data.url}
              className="w-full object-cover border border-[#b997db] m-1"
            ></img>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default MediaGrid;
