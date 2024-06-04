import { Panel, Stack, Button, IconButton, ButtonToolbar} from 'rsuite';
import { Heading, Text } from 'rsuite';
import SortUpIcon from '@rsuite/icons/SortUp';
import SortDownIcon from '@rsuite/icons/SortDown';

type Post = {
    post_id: string,
    community_id?: string,
    post_author?: string,
    post_title: string,
    post_image_url?: string,
    post_content: string,
    post_score: number,
    created_at?: Date,
    modified_at?: Date
};

const Post = (postInfo: { title: string, content: string, score: number }) => {
    return (
      <Panel
      bordered
      header={
        <Stack justifyContent="space-between">
          <Heading level={2}>{postInfo.title}</Heading>
          <ButtonToolbar>
            <IconButton appearance="primary" color='green' icon={<SortUpIcon />} />
            <Button disabled>{postInfo.score}</Button>
            <IconButton appearance="primary" color='red' icon={<SortDownIcon />} />
          </ButtonToolbar>
        </Stack>
      }
    >
      <Text>{postInfo.content}</Text>
    </Panel>
    );
};

export default Post;