import React from 'react'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { Form, redirect } from 'react-router-dom'
import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = (queryClient) => async({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/jobs', data);
    queryClient.invalidateQueries(['jobs']);
    queryClient.invalidateQueries(['stats']);
    toast.success('Job added successfully')
    return redirect('all-jobs');
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
}

const AddJob = () => {

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>Add Job</h4>
        <div className='form-center'>
          <FormRow type='text' name='position'/>
          <FormRow type='text' name='company'/>
          <FormRow type='text' labelText= 'Job Location' name='jobLocation'/>
          <FormRowSelect labelText='Job Status' name='jobStatus' defaultValue={JOB_STATUS.PENDING} list={Object.values(JOB_STATUS)}/>
          <FormRowSelect labelText='Job Type' name='jobType' defaultValue={JOB_TYPE.FULL_TIME} list={Object.values(JOB_TYPE)}/>
          <FormRow type='text' name='remarks' placeholder='Link or job details'/>
        </div>
          <SubmitBtn formBtn />
      </Form>
    </Wrapper>
  )
}

export default AddJob
