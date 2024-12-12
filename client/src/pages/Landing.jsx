import React from 'react'
import main from '../assets/main.svg'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import Wrapper from '../assets/wrappers/LandingPage'
const Landing = () => {
  return (
    <Wrapper>
      <nav>
          <Logo/>
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Track all your jobs here
          </p>
          <Link to='/register' className='btn register-link'>
            Register
          </Link>
          <Link to='/login' className='btn '>
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  )
}

export default Landing
