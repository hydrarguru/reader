import { useState } from 'react';
import { Form, Schema, Button, IconButton, Input, Modal, InputPicker, Toggle } from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';
import type { Community } from '../../types/CommunityType';
import { Post } from '../../types/PostType';

async function getCommunities() {
  const result = await fetch('http://localhost:8080/community')
    .then(res => res.json())
    .catch(err => console.error(err));
    if (result === undefined || result === null) {
      return [];
    }
    else {
      return result;
    }
}

const { StringType } = Schema.Types;
const createPostModel = Schema.Model({
  communityId: StringType().isRequired('Community is required.'),
  postTitle: StringType().isRequired('Post title is required.'),
  postContent: StringType().isRequired('Post content is required.'),
  postImageUrl: StringType().isRequired('Post image URL is required.')
});

const communities: Community[] = await getCommunities();

async function createNewPost(newPost: Post) {
    await fetch('http://localhost:8080/post/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      community_id: newPost.community_id,
      post_title: newPost.post_title,
      post_content: newPost.post_content,
      post_author: newPost.post_author
    })
  }).then(res => {
    console.log(res);
  })
}

const CreatePost = () => {
    const [openModal, setOpenModal] = useState(false);
    const [imagePost, setImagePost] = useState<boolean>(false);

    const handleOpenModal = (change: boolean) => {
        setOpenModal(change);
    }

    return (
        <>
        <Modal open={openModal} onClose={() => handleOpenModal(false)} size="sm">
          <Modal.Header>
            <Modal.Title>Create Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id='create-post-form' model={createPostModel} fluid>
              <Form.Group controlId='selected-community'>
                <Form.ControlLabel>Community:</Form.ControlLabel>
                <InputPicker data={communities} labelKey='community_name' valueKey='community_id' block />
              </Form.Group>

              <Form.Group controlId="imagePost">
              <Form.ControlLabel>Image Post</Form.ControlLabel>
              <Form.Control
                name="enable"
                accepter={Toggle}
                unCheckedChildren="No"
                checkedChildren="Yes"
                onChange={(value) => setImagePost(value)}
              />
              </Form.Group>
              {
                imagePost && 
                <Form.Group controlId="postImageUrl">
                  <Form.ControlLabel>Post image URL:</Form.ControlLabel>
                  <Form.Control name='post image url' disabled={!imagePost}/>
                  <Form.HelpText>Post image URL is required.</Form.HelpText>
                </Form.Group>
              }
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button form='create-post-form' type='submit' appearance="primary">Confirm</Button>
            <Button type='button' onClick={() => handleOpenModal(false)} appearance="subtle">Cancel</Button>
          </Modal.Footer>
        </Modal>
        <IconButton icon={<PlusIcon />} appearance='primary' color='green' onClick={() => handleOpenModal(true)}>Create Post</IconButton>
      </>
    )
};

export default CreatePost;