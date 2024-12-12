import React from 'react'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

export const action = (queryClient) => async({params}) => {
  const id = params.id;
  try {
    await customFetch.delete(`/jobs/${id}`);
    queryClient.invalidateQueries(['jobs']);
    queryClient.invalidateQueries(['stats']);
    toast.success('Job deleted successfully')
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
  return redirect('/dashboard/all-jobs');
}

const DeleteJob = () => {
  return (
    <div>
      
    </div>
  )
}

export default DeleteJob
