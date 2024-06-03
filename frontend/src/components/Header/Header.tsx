import './Header.css'

function Header() {
  return (
    <nav>
        <ul>
            <li className='header-logo'><a href="/">Not Reddit</a></li>
            <li><a href="/">Login</a></li>
            <li><a href="/about">Sign Up</a></li>
        </ul>
    </nav>
  )
}
  
export default Header