import { Form, ButtonToolbar, Button } from 'rsuite';

const RegisterForm = () => {
    return (
    <Form fluid>
      <Form.Group controlId="username">
        <Form.ControlLabel>Username</Form.ControlLabel>
        <Form.Control id='username' name="username" autoComplete="off"/>
        <Form.HelpText>Required</Form.HelpText>
      </Form.Group>

      <Form.Group controlId="email">
        <Form.ControlLabel>Email</Form.ControlLabel>
        <Form.Control id='email' name="email" type="email" autoComplete="off"/>
        <Form.HelpText>Required</Form.HelpText>
      </Form.Group>

      <Form.Group controlId="password">
        <Form.ControlLabel>Password</Form.ControlLabel>
        <Form.Control id='password' name="password" type="password" autoComplete="off"/>
      </Form.Group>

      <Form.Group controlId="password-confirm">
        <Form.ControlLabel>Confirm Password</Form.ControlLabel>
        <Form.Control id='password-confirm' name="password-confirm" type="password" autoComplete="off"/>
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