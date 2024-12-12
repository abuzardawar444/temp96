import React from 'react'
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { Form, redirect, useLoaderData } from 'react-router-dom';
import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { useQuery } from '@tanstack/react-query';

const singleJobQuery = (id) => {
  return {
    queryKey: ['job', id],
    queryFn: async () =>{
      const {data} = await customFetch.get(`/jobs/${id}`);
      return data;
    }
  }
}
export const loader = (queryClient) => async ({params}) => {
  try {
    await queryClient.ensureQueryData(singleJobQuery(params.id));
    return params.id;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect('/dashboard/all-jobs');
  }
}

export const action = (queryClient) => async({request, params}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/jobs/${params.id}`, data);
    await queryClient.invalidateQueries(['jobs']);
    await queryClient.invalidateQueries(['job']);
    await queryClient.invalidateQueries(['stats']);
    toast.success('Job edited successfully');
    return redirect('/dashboard/all-jobs');
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
}

const EditJob = () => {
  const id = useLoaderData();
  const {data:{job}} = useQuery(singleJobQuery(id));
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>Edit Job</h4>
        <div className="form-center">
          <FormRow type='text' name='position' defaultValue={job.position}/>
          <FormRow type='text' name='company' defaultValue={job.company}/>
          <FormRow type='text' name='jobLocation' labelText='Job Location' defaultValue={job.jobLocation}/>
          <FormRowSelect name='jobStatus' labelText='Job status' defaultValue={job.jobStatus} list={Object.values(JOB_STATUS)}/>
          <FormRowSelect name='jobType' labelText='Job type' defaultValue={job.jobType} list={Object.values(JOB_TYPE)}/>
          <FormRow type='text' name='remarks' labelText='Remarks' defaultValue={job.remarks}/>
        </div>
          <SubmitBtn formBtn />
      </Form>
    </Wrapper>
  )
}

export default EditJob
