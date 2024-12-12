import {FaAlignLeft} from 'react-icons/fa';
import { useDashboardContext } from '../pages/DashboardLayout';
import Logo from './Logo';
import LogoutContainer from './LogoutContainer';
import ThemeToggle from './ThemeToggle';
import Wrapper from '../assets/wrappers/Navbar';

const Navbar = () => {

  const {toggleSidebar} = useDashboardContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button type='button' className='toggle-btn' onClick={toggleSidebar}>
            <FaAlignLeft/>
        </button>
        <div>
            <Logo/>
            <h4 className='logo-text'>Dashboard</h4>
        </div>
        <div className="btn-container">
          <ThemeToggle/>
          <LogoutContainer/>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar
