import { Panel, Stack, Button, IconButton, ButtonToolbar} from 'rsuite';
import { Heading, Text } from 'rsuite';
import SortUpIcon from '@rsuite/icons/SortUp';
import SortDownIcon from '@rsuite/icons/SortDown';

const CommunityPost = (post: { title: string, content: string, score: number, author: string, created: string }) => {
    return (
      <Panel
      bordered
      header={
        <Stack justifyContent="space-between">
          <Heading level={2}>{post.title}</Heading>
          <ButtonToolbar>
            <IconButton appearance="primary" color='green' icon={<SortUpIcon />} />
            <Button appearance='subtle'>{post.score}</Button>
            <IconButton appearance="primary" color='red' icon={<SortDownIcon />} />
          </ButtonToolbar>
        </Stack>
      }
    >
      <Text size='lg' as='i'>{post.content}</Text>
      <Stack justifyContent="space-between">
        <Text size='sm'>Author: {post.author}</Text>
        <Text size='sm'>Posted: {post.created}</Text>
      </Stack>
    </Panel>
    );
};


export default CommunityPost;
