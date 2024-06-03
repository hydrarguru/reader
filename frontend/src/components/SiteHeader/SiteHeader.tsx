import { Navbar, Nav } from 'rsuite';
import PeoplesCostomizeIcon from '@rsuite/icons/PeoplesCostomize';
import OperatePeopleIcon from '@rsuite/icons/OperatePeople';


function SiteHeader() {
  return (
    <Navbar>
    <Navbar.Brand href="#">Not Reddit</Navbar.Brand>
    <Nav pullRight>
      <Nav.Menu title="Login / Signup">
        <Nav.Item icon={<PeoplesCostomizeIcon />}>Login</Nav.Item>
        <Nav.Item icon={<OperatePeopleIcon />}>Signup</Nav.Item>
      </Nav.Menu>
    </Nav>
  </Navbar>
  )
}
  
export default SiteHeader