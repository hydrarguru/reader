import { useState } from "react";
import { Panel, Stack, Button, IconButton, ButtonToolbar } from "rsuite";
import { Heading, Text } from "rsuite";
import SortUpIcon from "@rsuite/icons/SortUp";
import SortDownIcon from "@rsuite/icons/SortDown";


type voteType = "up" | "down";

async function updatePostScore(post_id: string, score: number) {
  await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/post/${post_id}/${score}`,
    {
      method: "POST",
    }
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
}

const CommunityPost = (post: {
  id: string;
  title: string;
  content: string;
  score: number;
  author: string;
}) => {
  const [score, setScore] = useState(post.score);
  const [scoreUpdating, setScoreUpdating] = useState(false);
  const postId = post.id;
  
  function handlePostVote(post_id: string, voteType: voteType) {
    if (post_id && !scoreUpdating) {
      setScoreUpdating(true);
      if (voteType === "up") {
        setScore(score + 1);
        updatePostScore(post_id, score + 1).then(() =>
          console.log("Score updated:", score + 1)
        );
      } else if (voteType === "down") {
        setScore(score - 1);
        updatePostScore(post_id, score - 1).then(() =>
          console.log("Score updated: ", score - 1)
        );
      }
      setScoreUpdating(false);
    }
  }

  return (
    <Panel
      style={{
        backgroundColor: "#1a1d24",
      }}
      bordered
      header={
        <Stack justifyContent="space-between">
          <Heading level={2}>{post.title}</Heading>
          <ButtonToolbar>
            <IconButton
              ripple={false}
              appearance="primary"
              icon={<SortUpIcon />}
              onClick={() => handlePostVote(postId, "up")}
            />
            <Button appearance="subtle">{score}</Button>
            <IconButton
              ripple={false}
              appearance="default"
              icon={<SortDownIcon />}
              onClick={() => handlePostVote(postId, "down")}
            />
          </ButtonToolbar>
        </Stack>
      }
    >
      <Text size="lg" as="i">
        {post.content}
      </Text>
      <Stack justifyContent="space-between">
        <Text size="sm">Author: {post.author}</Text>
      </Stack>
    </Panel>
  );
};

export default CommunityPost;
