import { Form, ButtonToolbar, Button } from 'rsuite';
import React from 'react';
import { useFormik } from 'formik';

const RegisterForm = () => {
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            passwordConfirm: ''
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
    <Form fluid onSubmit={formik.handleSubmit}>
      <Form.Group controlId="username">
        <Form.ControlLabel>Username</Form.ControlLabel>
        <Form.Control id='username' name="username" autoComplete="off" onChange={formik.handleChange}/>
        <Form.HelpText>Required</Form.HelpText>
      </Form.Group>

      <Form.Group controlId="email">
        <Form.ControlLabel>Email</Form.ControlLabel>
        <Form.Control id='email' name="email" type="email" autoComplete="off" onChange={formik.handleChange}/>
        <Form.HelpText>Required</Form.HelpText>
      </Form.Group>

      <Form.Group controlId="password">
        <Form.ControlLabel>Password</Form.ControlLabel>
        <Form.Control id='password' name="password" type="password" autoComplete="off" onChange={formik.handleChange}/>
      </Form.Group>

      <Form.Group controlId="password-confirm">
        <Form.ControlLabel>Confirm Password</Form.ControlLabel>
        <Form.Control id='password-confirm' name="password-confirm" type="password" autoComplete="off" onChange={formik.handleChange}/>
      </Form.Group>

      <Form.Group>
        <ButtonToolbar>
          <Button type='submit' appearance="primary">Register</Button>
          <Button appearance="default">Cancel</Button>
        </ButtonToolbar>
      </Form.Group>
    </Form>
  )
}

export default RegisterForm