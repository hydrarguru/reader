import './Header.css'

function Header() {
  return (
    <nav>
        <ul>
            <li className='header-logo'><a href="/">Not Reddit</a></li>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
        </ul>
    </nav>
  )
}
  
export default Header