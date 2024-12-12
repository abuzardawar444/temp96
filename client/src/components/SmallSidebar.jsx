import React from 'react'
import { useDashboardContext } from '../pages/DashboardLayout'
import { FaTimes } from 'react-icons/fa';
import Logo from './Logo';
import NavlLinks from './NavlLinks';
import Wrapper from '../assets/wrappers/SmallSidebar';

const SmallSidebar = () => {
    const {showSidebar, toggleSidebar} = useDashboardContext();
    // console.log(data);
  return (
    <Wrapper>
      <div className= {showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className="content">
            <button type='button' className='close-btn' onClick={toggleSidebar}>
                <FaTimes/>
            </button>
            <header>
                <Logo/>
            </header>
            <NavlLinks/>
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar
