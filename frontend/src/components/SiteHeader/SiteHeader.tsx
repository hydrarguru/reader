import { Navbar, Nav } from 'rsuite';
import PeoplesCostomizeIcon from '@rsuite/icons/PeoplesCostomize';
import OperatePeopleIcon from '@rsuite/icons/OperatePeople';


function SiteHeader() {
  return (
    <Navbar>
    <Navbar.Brand href="/">Not Reddit</Navbar.Brand>
    <Nav pullRight>
        <Nav.Item icon={<PeoplesCostomizeIcon />} href='/login'>Login</Nav.Item>
        <Nav.Item icon={<OperatePeopleIcon />} href='/register'>Register</Nav.Item>
    </Nav>
  </Navbar>
  )
}
  
export default SiteHeader