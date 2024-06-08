import { Panel, Stack, Button, IconButton, ButtonToolbar} from 'rsuite';
import { Heading, Text } from 'rsuite';
import SortUpIcon from '@rsuite/icons/SortUp';
import SortDownIcon from '@rsuite/icons/SortDown';
import { useState } from 'react';

const formatDateString = (date: string): string => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
};

const CommunityPost = (post: { title: string, content: string, score: number, author: string, created: string }) => {
    const [score, setScore] = useState(post.score);
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
            <IconButton ripple={ false } appearance="primary" icon={<SortUpIcon />} onClick={() => setScore(score + 1)}/>
            <Button appearance='subtle'>{score}</Button>
            <IconButton ripple={ false } appearance="default" icon={<SortDownIcon />} onClick={() => setScore(score - 1)}/>
          </ButtonToolbar>
        </Stack>
      }
    >
      <Text size='lg' as='i'>{post.content}</Text>
      <Stack justifyContent="space-between">
        <Text size='sm'>Author: {post.author}</Text>
        <Text size='sm'>Posted: {formatDateString(post.created)}</Text>
      </Stack>
    </Panel>
    );
};


export default CommunityPost;
