import './navbar.css';
import { Link } from "react-router-dom";
import { UserOutlined, NotificationOutlined, HomeOutlined } from '@ant-design/icons';

const NavBar = () => {
  return (
    <div className='nav'>
      <img src="/logoShr.png" alt="" className='nav-logo' />
      <div className='nav-options'>
        <Link to="/home"><HomeOutlined /></Link>
        <Link to="/notifications"><NotificationOutlined /></Link>
        <Link to="/profile"><UserOutlined /></Link>
      </div>
    </div >
  )
}

export default NavBar;