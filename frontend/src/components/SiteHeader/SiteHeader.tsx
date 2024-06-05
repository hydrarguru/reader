import { Navbar, Nav } from 'rsuite';
import PeoplesCostomizeIcon from '@rsuite/icons/PeoplesCostomize';
import OperatePeopleIcon from '@rsuite/icons/OperatePeople';
import { Link } from 'react-router-dom';


function SiteHeader() {
  return (
    <Navbar>
    <Navbar.Brand href="/">Not Reddit</Navbar.Brand>
    <Nav pullRight>
        <Nav.Item icon={<PeoplesCostomizeIcon />}><Link to='/login'>Login</Link></Nav.Item>
        <Nav.Item icon={<OperatePeopleIcon />}><Link to='/register'>Register</Link></Nav.Item>
    </Nav>
  </Navbar>
  )
}
  
export default SiteHeader