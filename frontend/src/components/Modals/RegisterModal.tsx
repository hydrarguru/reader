import { Modal, Button, ButtonToolbar } from 'rsuite';
import RegisterForm from '../Forms/RegisterForm';
import { useState } from 'react';

function RegisterModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <ButtonToolbar>
              <Button onClick={handleOpen}>RegisterModal</Button>
            </ButtonToolbar>

            <Modal open={open} onClose={handleClose}>
              <Modal.Header>
                <Modal.Title>Register</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <RegisterForm />
              </Modal.Body>
            </Modal>
        </>
    )
}

export default RegisterModal