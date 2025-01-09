const RESULT_LIMIT = 150;
export const GetImagesFromSubreddit = async (searchTerm) => {
  const response = await fetch(
    `https://www.reddit.com/r/${searchTerm}/hot.json?limit=${RESULT_LIMIT}`
  );
  const data = await response.json();

  // console.log(data.data.children[5].data);
  return data.data.children;
};

export const searchForSubreddits = async (searchTerm) => {
  const response = await fetch(
    `https://www.reddit.com/subreddits/search.json?q=${searchTerm}&include_over_18=true`
  );

  const result = await response.json();

  return result.data.children;
};
