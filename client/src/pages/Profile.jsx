import React from 'react'
import { Form, redirect, useOutletContext } from 'react-router-dom'
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { FormRow, SubmitBtn } from '../components';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const action = (queryClient) => async ({request}) => {
  try {
    const formData = await request.formData();
    const file = formData.get('avatar');
    if(file && file.size > 500000){
      toast.error('Image size too large');
      return null;
    }
    await customFetch.patch('/users/update-user', formData);
    queryClient.invalidateQueries(['user']);
    toast.success('Profile updated successfully')
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return null;
  }
}

const Profile = () => {
  const {user} = useOutletContext();
  const {name, lastName, email, location} = user;
  return (
    <Wrapper>
      <Form method='post' className='form' encType='multipart/form-data'>
        <h4 className='form-title'>Profile</h4>
        <div className='form-center'>
          <div className="form-row">
            <label htmlFor='avatar' className='form-label'>Select and image file (max 0.5 MB)</label>
            <input type='file' id='avatar' name='avatar' className='form-input' accept='image/*' />
          </div>
          <FormRow type='text' name='name' defaultValue={name}/>
          <FormRow type='text' name='lastName' defaultValue={lastName} labelText='Last Name'/>
          <FormRow type='email' name='email' defaultValue={email}/>
          <FormRow type='text' name='location' defaultValue={location}/>
        </div>
          <SubmitBtn formBtn/>
      </Form>
    </Wrapper>
  )
}

export default Profile
