import { useState } from 'react';
import { Form, Button, IconButton, Modal } from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';
import type { Community } from '../../types/CommunityType';
import type { Post } from '../../types/PostType';
import { useFormik } from 'formik';

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
      console.log(values);
      postForm.setValues({
        community_id: '',
        post_title: '',
        post_content: '',
      })
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
          <Button type='button' onClick={() => postForm.handleReset} appearance="default">Cancel</Button>
        </Modal.Footer>
      </Modal>
      <IconButton icon={<PlusIcon />} appearance='primary' color='green' onClick={() => handleOpenModal(true)}>Create Post</IconButton>
    </>
  )
};

export default CreatePost;