import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import { useDashboardContext } from '../pages/DashboardLayout';

import React from 'react'
import Wrapper from '../assets/wrappers/ThemeToggle';

const ThemeToggle = () => {
    const {isDarkTheme, toggleTheme} =  useDashboardContext();
  return (
    <Wrapper onClick={toggleTheme}>
      {isDarkTheme ? <BsFillSunFill className='toggle-icon'/> : <BsFillMoonFill />}
    </Wrapper>
  )
}

export default ThemeToggle
