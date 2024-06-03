function Header() {
  return (
    <nav>
        <ul>
            <li className='header-logo'><a href="/">Not Reddit</a></li>
            <li><button className='header-button'>Login</button></li>
            <li><button className='header-button'>Sign Up</button></li>
        </ul>
    </nav>
  )
}
  
export default Header