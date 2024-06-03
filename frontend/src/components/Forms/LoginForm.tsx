import { Form, ButtonToolbar, Button } from 'rsuite';

function LoginForm () {
    return (
    <Form fluid>
      <Form.Group controlId="username">
        <Form.ControlLabel>Username</Form.ControlLabel>
        <Form.Control name="username" />
        <Form.HelpText>Required</Form.HelpText>
      </Form.Group>

      <Form.Group controlId="email">
        <Form.ControlLabel>Email</Form.ControlLabel>
        <Form.Control name="email" type="email" />
        <Form.HelpText>Required</Form.HelpText>
      </Form.Group>

      <Form.Group controlId="password">
        <Form.ControlLabel>Password</Form.ControlLabel>
        <Form.Control name="password" type="password" autoComplete="off" />
      </Form.Group>

      <Form.Group>
        <ButtonToolbar>
          <Button appearance="primary">Submit</Button>
          <Button appearance="default">Cancel</Button>
        </ButtonToolbar>
      </Form.Group>
    </Form>
  )
}

export default LoginForm