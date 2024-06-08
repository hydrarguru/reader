import { useState, forwardRef } from 'react';
import { Form, Button, IconButton, Input, Modal, SelectPicker } from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';

const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const communitySelection = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice'].map(item => ({
    label: item,
    value: item
}));
  

const CreatePost = () => {
    const [openModal, setOpenModal] = useState(false);
    const [postFormValue, setPostFormValue] = useState({
        community: '',
        postTitle: '',
        postContent: '',
        postImageUrl: ''
    });

    const handleOpenModal = (change: boolean) => {
        setOpenModal(change);
    }


    return (
        <>
        <Modal open={openModal} onClose={() => handleOpenModal(false)} size="md">
          <Modal.Header>
            <Modal.Title>Create Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form fluid onChange={setPostFormValue} formValue={postFormValue}>
            <Form.Group controlId="select-10">
              <Form.ControlLabel>Community:</Form.ControlLabel>
              <Form.Control name="select" data={communitySelection} accepter={SelectPicker}/>
            </Form.Group>  
              <Form.Group controlId="post-title">
                <Form.ControlLabel>Post Title</Form.ControlLabel>
                <Form.Control id='post-title' name="post-title" />
                <Form.HelpText>Required</Form.HelpText>
              </Form.Group>
              <Form.Group controlId="post-content">
                <Form.ControlLabel>Post Content</Form.ControlLabel>
                <Form.Control id='post-content' name="textarea" accepter={Textarea}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => console.log(postFormValue)} appearance="primary">Confirm</Button>
            <Button onClick={() => handleOpenModal(false)} appearance="subtle">Cancel</Button>
          </Modal.Footer>
        </Modal>
        <IconButton icon={<PlusIcon />} appearance='primary' color='green' onClick={() => handleOpenModal(true)}>Create Post</IconButton>
      </>
    )
};

export default CreatePost;