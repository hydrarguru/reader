import { useState } from 'react';
import { Form, Button, IconButton, Modal } from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';
import { useFormik } from 'formik';

type NewCommunity = {
  community_name: string,
  community_desc: string,
  community_image_url: string,
}

async function createCommunity(newCommunity: NewCommunity) {
  await fetch(`${import.meta.env.VITE_READER_BACKEND_URL}/community/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      community_name: newCommunity.community_name,
      community_desc: newCommunity.community_desc,
      community_image_url: newCommunity.community_image_url,
    })
  }).then(res => {
    console.log(res);
  })
}

const CreateCommunity = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = (change: boolean) => {
      setOpenModal(change);
  }
  const communityForm = useFormik({
    initialValues: {
      community_name: '',
      community_desc: '',
      community_image_url: '',
    },
    onSubmit: values => {
      createCommunity(values);
      communityForm.setValues({
        community_name: '',
        community_desc: '',
        community_image_url: '',
      })
    },
  });

  return (
      <>
      <Modal open={openModal} onClose={() => handleOpenModal(false)} size="sm">
        <Modal.Header>
          <Modal.Title>Create Community</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form 
            fluid
            id='create-community-form'
            onSubmit={() => {communityForm.handleSubmit()}}
           >
            <div style={
              {
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }
            }>
                <label htmlFor='community_name'>Community Name:</label>
                <input
                  style={{
                    color: 'black',
                    border: '1px solid black',
                    borderRadius: '2px',
                    padding: '0.15rem',
                  }}
                  autoComplete='off'
                  id='community_name'
                  name='community_name'
                  type='text'
                  value={communityForm.values.community_name}
                  onChange={communityForm.handleChange}
                />

                <label htmlFor='community_desc'>Community Description:</label>
                <textarea
                  style={{
                    color: 'black',
                    border: '1px solid black',
                    borderRadius: '2px',
                    padding: '0.15rem',
                  }}
                  autoComplete='off'
                  id='community_desc'
                  name='community_desc'
                  value={communityForm.values.community_desc}
                  onChange={communityForm.handleChange}
                />

                <label htmlFor='community_image_url'>Community Image URL:</label>
                <input
                  style={{
                    color: 'black',
                    border: '1px solid black',
                    borderRadius: '2px',
                    padding: '0.15rem',
                  }}
                  autoComplete='off'
                  id='community_image_url'
                  name='community_image_url'
                  type='text'
                  value={communityForm.values.community_image_url}
                  onChange={communityForm.handleChange}
                />

            </div>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button form='create-community-form' type='submit' appearance="primary" color='orange'>Confirm</Button>
          <Button type='button' onClick={() => handleOpenModal(false)} appearance="default">Cancel</Button>
        </Modal.Footer>
      </Modal>
      <IconButton icon={<PlusIcon />} appearance='primary' color='orange' onClick={() => handleOpenModal(true)}>Create Community</IconButton>
    </>
  )
};

export default CreateCommunity;