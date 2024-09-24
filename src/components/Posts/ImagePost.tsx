interface ImagePostProps {
  imageUrl: string;
  postTitle: string;
  postContent: string;
  postAuthor: string;
  postScore: number;
}

const ImagePost = ({
  imageUrl,
  postTitle,
  postContent,
  postAuthor,
  postScore,
}: ImagePostProps) => {
  return (
    <div>
      <img src={imageUrl} alt="Post" />
      <h1>{postTitle}</h1>
      <p>{postContent}</p>
      <p>Author: {postAuthor}</p>
      <p>Score: {postScore}</p>
    </div>
  );
};

export default ImagePost;
