import { useState, useRef } from 'react';
import { Form, Schema, Button, IconButton, Input, Modal, InputPicker } from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';


const { StringType } = Schema.Types;
const createPostModel = Schema.Model({
  communityId: StringType().isRequired('Community is required.'),
  postTitle: StringType().isRequired('Post title is required.'),
  postContent: StringType().isRequired('Post content is required.'),
  postImageUrl: StringType().isRequired('Post image URL is required.')
});

const CreateCommunity = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = (change: boolean) => {
      setOpenModal(change);
  }
  const formRef = useRef();
  const [formError, setFormError] = useState({});
  const [formValue, setFormValue] = useState({
  postTitle: '',
  postContent: '',
  communityId: '',
  });
  
  const handleSubmit = () => {
    if (!formRef.current.check()) {
      console.error('Form Error');
      return;
    }
    console.log(formValue, 'Form Value');
  };

  return (
      <>
      <Modal open={openModal} onClose={() => handleOpenModal(false)} size="sm">
        <Modal.Header>
          <Modal.Title>Create Community</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form 
            fluid
            ref={formRef}
            onChange={setFormValue}
            onCheck={setFormError}
            formValue={formValue}
            model={createPostModel}
            id='create-post-form'
           >
            <Form.Group controlId='communityName'>
              <Form.ControlLabel>Community name:</Form.ControlLabel>
                <Input name='communityName' />
            </Form.Group>

            <Form.Group controlId='communityImageUrl'>
              <Form.ControlLabel>Community name:</Form.ControlLabel>
                <Input name='communityImageUrl' />
            </Form.Group>

            <Form.Group controlId='communityDesc'>
              <Input name='communityDesc' as="textarea" rows={3} placeholder="Community description:" />
            </Form.Group>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button form='create-post-form' type='submit' appearance="primary" color='orange' onClick={handleSubmit}>Confirm</Button>
          <Button type='button' onClick={() => handleOpenModal(false)} appearance="default">Cancel</Button>
        </Modal.Footer>
      </Modal>
      <IconButton icon={<PlusIcon />} appearance='primary' color='orange' onClick={() => handleOpenModal(true)}>Create Community</IconButton>
    </>
  )
};

export default CreateCommunity;