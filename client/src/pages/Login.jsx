import React from 'react'
import { Link, Form, redirect, useNavigate } from 'react-router-dom'
import { FormRow, Logo, SubmitBtn } from '../components'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
import { GrGoogle } from "react-icons/gr";

export const action = (queryClient) => async ({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/login', data);
    queryClient.invalidateQueries();
    toast.success('Login Succesful');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.message);
    // console.log(error)
    return error;
  }
}

const Login = () => {

  const navigate = useNavigate();

  const loginWithGoogle = async() => {
    window.open('https://hive-upjh.onrender.com/api/v1/auth/google/callback','_self');
  }

  const loginDemoUser = async() => {
    const data = {
      email: 'test@test.com',
      password: 'secret@123'
    }
    try {
      await customFetch.post('/auth/login', data);
      toast.success('Take a test drive');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.message);
      // console.log(error)
      return error;
    }
  }
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo/>
        <h4>Login</h4>
        <FormRow type='email' name='email' labelText='Email'/>
        <FormRow type='password' name='password' labelText='Password'/>
        <SubmitBtn />
        <button type='button' className='btn btn-block' onClick={loginDemoUser}>Explore the App</button>
        <button type='button' className='btn btn-block google' onClick={loginWithGoogle}><GrGoogle className='google-icon'/>Login with Google</button>
        <p>
          Not a user yet? <Link to='/register'> Register</Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Login
