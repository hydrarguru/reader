import { Modal, Button, ButtonToolbar } from 'rsuite';
import LoginForm from '../Forms/LoginForm';
import { useState } from 'react';


function LoginModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <ButtonToolbar>
              <Button onClick={handleOpen}>LoginModal</Button>
            </ButtonToolbar>

            <Modal open={open} onClose={handleClose}>
              <Modal.Header>
                <Modal.Title>Login</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <LoginForm />
              </Modal.Body>
            </Modal>
        </>
    )
}

export default LoginModal