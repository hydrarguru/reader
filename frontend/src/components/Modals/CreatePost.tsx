import { useState } from 'react';
import { Form, Schema, Button, IconButton, Input, Modal, InputPicker, Toggle } from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';
import type { Community } from '../../types/CommunityType';

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

const createNewPost = async () => {
    await fetch('http://localhost:8080/post/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      community_id: '2723f65c-010d-4687-87c6-e5f501952c6d', // gaming uuid
      post_title: 'Post request from frontend test.',
      post_content: 'Test post content.',
      post_image_url: '',
      post_author: '02962896-582f-4865-8439-5dea7381cdde' // admin uuid
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