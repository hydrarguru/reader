import { Panel, Stack, Button, IconButton, ButtonToolbar} from 'rsuite';
import { Heading, Text } from 'rsuite';
import SortUpIcon from '@rsuite/icons/SortUp';
import SortDownIcon from '@rsuite/icons/SortDown';
import { useState } from 'react';

type voteType = 'up' | 'down';

const CommunityPost = (post: { title: string, content: string, score: number, author: string }) => {
    const [score, setScore] = useState(post.score);
    const [postVoted, setPostVoted] = useState(false);
    function handlePostVote(voteType: voteType) {
      if (voteType === 'up') {
        setScore(score + 1);
        setPostVoted(true);
      } else {
        setScore(score - 1);
        setPostVoted(true);
      }
    }

    return (
      <Panel
      style={{
        backgroundColor: '#1a1d24',  
      }}
      bordered
      header={
        <Stack justifyContent="space-between">
          <Heading level={2}>{post.title}</Heading>
          <ButtonToolbar>
            <IconButton disabled={postVoted} ripple={ false } appearance="primary" icon={<SortUpIcon />} onClick={() => handlePostVote('up')}/>
            <Button appearance='subtle'>{score}</Button>
            <IconButton disabled={postVoted} ripple={ false } appearance="default" icon={<SortDownIcon />} onClick={() => handlePostVote('down')}/>
          </ButtonToolbar>
        </Stack>
      }
    >
      <Text size='lg' as='i'>{post.content}</Text>
      <Stack justifyContent="space-between">
        <Text size='sm'>Author: {post.author}</Text>
      </Stack>
    </Panel>
    );
};


export default CommunityPost;
