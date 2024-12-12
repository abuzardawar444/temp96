import React from 'react'
import {Link, redirect} from 'react-router-dom'
import { FormRow, Logo, SubmitBtn } from '../components'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { Form } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

export const action = async ({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data);
  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration Successful')
    return redirect('/login');
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
    return error;
  }
}

const Register = () => {

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo/>
        <h4>Register</h4>
        <FormRow type='text' name='name' labelText='Name'/>
        <FormRow type='text' name='lastName' labelText='Last Name'/>
        <FormRow type='text' name='location' labelText='Location'/>
        <FormRow type='email' name='email' labelText='E-Mail'/>
        <FormRow type='password' name='password' labelText='Password'/>
        <SubmitBtn />
        <p>
          Already a User?
          <Link to='/login' className='member-btn'> Login</Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Register
