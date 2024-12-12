import React from 'react'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'
import { useAllJobsContext } from '../pages/AllJobs.jsx'
import PageBtnContainer from './PageBtnContainer.jsx'

const JobsContainer = () => {
  const {data} = useAllJobsContext();
  // console.log(data);
  const {jobs, totalJobs, numOfPages} = data;
  // console.log(jobs)
   if(jobs.length === 0){
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <h5>{totalJobs} job{jobs.length > 1 && 's'} found</h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer/>}
    </Wrapper>
  )
}

export default JobsContainer
