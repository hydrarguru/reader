import { useState } from 'react';
import { Form, Button, IconButton, Modal } from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';
import type { Community } from '../../types/CommunityType';
import { useFormik } from 'formik';

type newPost = {
  community_id: string;
  post_author: string;
  post_title: string;
  post_image_url: string;
  post_content: string;
}

async function createNewPost(post: newPost) {
  await fetch(`${import.meta.env.VITE_BACKEND_URL}/post/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      community_id: post.community_id,
      post_author: post.post_author,
      post_title: post.post_title,
      post_image_url: post.post_image_url,
      post_content: post.post_content,
    }),
  }).then(res => console.log(res));
}

interface CreatePostProps {
  communityArray: Community[];
}

const CreatePost = (CreatePostProps: CreatePostProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [communities] = useState(CreatePostProps.communityArray);
  const handleOpenModal = (change: boolean) => {
      setOpenModal(change);
  }

  const postForm = useFormik({
    initialValues: {
      community_id: '',
      post_title: '',
      post_content: '',
    },
    onSubmit: values => {
      createNewPost({
        community_id: values.community_id,
        post_author: '02962896-582f-4865-8439-5dea7381cdde', // placeholder for admin UUID
        post_title: values.post_title,
        post_image_url: '',
        post_content: values.post_content,
      })
      postForm.setValues({
        community_id: '',
        post_title: '',
        post_content: '',
      })
      handleOpenModal(false);
    },
  });

  return (
      <>
      <Modal open={openModal} onClose={() => handleOpenModal(false)} size="sm">
        <Modal.Header>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            fluid
            id='create-post-form'
            onSubmit={() => {postForm.handleSubmit()}}
           >
            <div style={
              {
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }
            }>
                <label htmlFor='community_id'>Community:</label>
                <select
                  style={{
                    color: 'black',
                    border: '1px solid black',
                    borderRadius: '2px',
                    padding: '0.15rem',
                  }}
                  id='community_id'
                  name='community_id'
                  onChange={postForm.handleChange}
                  value={postForm.values.community_id}
                  >
                    {
                      communities.map((community) => (
                        <option key={community.community_id} value={community.community_id}>{community.community_name}</option>
                      ))
                    }
                </select>

                <label htmlFor='post_title'>Post Title:</label>
                <input
                  style={{
                    color: 'black',
                    border: '1px solid black',
                    borderRadius: '2px',
                    padding: '0.15rem',
                  }}
                  autoComplete='off'
                  id='post_title'
                  name='post_title'
                  type='text'
                  value={postForm.values.post_title}
                  onChange={postForm.handleChange}
                />

                <label htmlFor='post_content'>Post Content:</label>
                <textarea
                  style={{
                    color: 'black',
                    border: '1px solid black',
                    borderRadius: '2px',
                    padding: '0.15rem',
                  }} 
                  autoComplete='off'
                  id='post_content'
                  name='post_content'
                  value={postForm.values.post_content}
                  onChange={postForm.handleChange}
                />
            </div>


          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button form='create-post-form' type='submit' appearance="primary" color='green'>Confirm</Button>
          <Button type='button' onClick={() => handleOpenModal(false)} appearance="default">Cancel</Button>
        </Modal.Footer>
      </Modal>
      <IconButton icon={<PlusIcon />} appearance='primary' color='green' onClick={() => handleOpenModal(true)}>Create Post</IconButton>
    </>
  )
};

export default CreatePost;