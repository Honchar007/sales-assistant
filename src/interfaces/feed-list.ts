type FeedList = {
  url: string,
  id: string | undefined,
  title: string
  published: string,
  keywords: string[],
  score: number,
  review?: string,
  matchedCases: number,
  matchedBlogs: number,
};

export default FeedList;
