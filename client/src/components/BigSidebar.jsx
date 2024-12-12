import React from 'react'
import { useDashboardContext } from '../pages/DashboardLayout'
import Logo from './Logo';
import NavlLinks from './NavlLinks';
import Wrapper from '../assets/wrappers/BigSidebar';

const BigSidebar = () => {
    const {showSidebar} = useDashboardContext();
    // console.log(data);
  return (
    <Wrapper>
      <div className={showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"}>
        <div className="content">
          <header>
              <Logo/>
          </header>
          <NavlLinks isBigSidebar/>
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar
