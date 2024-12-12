import React from 'react'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom';
import { ChartsContainer, StatsContainer } from '../components';
import { useQuery } from '@tanstack/react-query';


const statsQuery = {
  queryKey: ['stats'],
  queryFn: async() => {
    const response = await customFetch.get('/jobs/stats');
    return response.data;
  }
}
export const loader = (queryClient) => async () => {
  const data = await queryClient.ensureQueryData(statsQuery);
  return null;
}
const Stats = () => {
  const {isLoading, isError, data} = useQuery(statsQuery);
  const {allStats, monthlyApplications} = data;
  return (
    <>
      <StatsContainer allStats={allStats}/>
      {monthlyApplications?.length > 1 && (<ChartsContainer data={monthlyApplications}/> )}
    </>
  )
}

export default Stats
