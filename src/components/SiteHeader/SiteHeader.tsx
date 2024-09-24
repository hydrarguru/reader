import { Navbar, Nav } from 'rsuite';
import PeoplesCostomizeIcon from '@rsuite/icons/PeoplesCostomize';
import OperatePeopleIcon from '@rsuite/icons/OperatePeople';


function SiteHeader() {
  return (
    <Navbar>
    <Navbar.Brand href="/">Reader</Navbar.Brand>
    <Nav pullRight>
        <Nav.Item icon={<PeoplesCostomizeIcon />} href='#'>Login</Nav.Item>
        <Nav.Item icon={<OperatePeopleIcon />} href='#'>Register</Nav.Item>
    </Nav>
  </Navbar>
  )
}
  
export default SiteHeader