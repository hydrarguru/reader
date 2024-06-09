import { useState, forwardRef} from 'react';
import { Form, Button, IconButton, Input, Modal, InputPicker, Toggle } from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';
import type { Community } from '../../types/CommunityType';
import { useForm, SubmitHandler } from 'react-hook-form';

const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

interface IPostFormInputs {
  selectedCommunity: string;
  postImageUrl: string;
  postTitle: string;
  postContent: string;
} 

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



const CreatePost = () => {
    const [openModal, setOpenModal] = useState(false);
    const [communityOptions, setCommunityOptions] = useState(communities.map((community) => {
        return {
            label: community.community_name,
            value: community.community_id
        }
    }));
    const [imagePost, setImagePost] = useState<boolean>(false);

    const handleOpenModal = (change: boolean) => {
        setOpenModal(change);
    }

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<IPostFormInputs>();
    const onSubmit: SubmitHandler<IPostFormInputs> = data => alert(JSON.stringify(data, null, 2));



    return (
        <>
        <Modal open={openModal} onClose={() => handleOpenModal(false)} size="md">
          <Modal.Header>
            <Modal.Title>Create Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id='create-post-form' onSubmit={handleSubmit(onSubmit)} fluid>
              <Form.Group controlId='selected-community'>
                <Form.ControlLabel>Community:</Form.ControlLabel>
                <Form.Control
                  {...register('selectedCommunity')}
                  accepter={InputPicker}
                  data={communityOptions}
                  />
                <Form.HelpText>Choose a community to post in.</Form.HelpText>
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
                  <Form.Control disabled={!imagePost} defaultValue='' {...register('postImageUrl')}/>
                  <Form.HelpText>Post image URL is required.</Form.HelpText>
                </Form.Group>
              }

              <Form.Group controlId="postTitle">
                <Form.ControlLabel>Post title:</Form.ControlLabel>
                <Form.Control defaultValue='' {...register('postTitle')}/>
                <Form.HelpText>Post title is required.</Form.HelpText>
              </Form.Group>

              <Form.Group controlId="post-content">
                <Form.ControlLabel>Post content:</Form.ControlLabel>
                <Form.Control defaultValue='' {...register('postContent')} accepter={Textarea} />
                <Form.HelpText>Post content is required.</Form.HelpText>
              </Form.Group>
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