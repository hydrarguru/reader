import { Form, ButtonToolbar, Button } from 'rsuite';

function LoginForm () {
    return (
    <Form fluid>
      <Form.Group controlId="username">
        <Form.ControlLabel>Username</Form.ControlLabel>
        <Form.Control name="username" />
        <Form.HelpText>Required</Form.HelpText>
      </Form.Group>

      <Form.Group controlId="password">
        <Form.ControlLabel>Password</Form.ControlLabel>
        <Form.Control name="password" type="password" autoComplete="off" />
      </Form.Group>

      <Form.Group>
        <ButtonToolbar>
          <Button color="green" appearance="primary">Submit</Button>
          <Button color="red" appearance="primary">Cancel</Button>
        </ButtonToolbar>
      </Form.Group>
    </Form>
  )
}

export default LoginForm