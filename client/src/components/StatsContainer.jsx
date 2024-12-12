import React from 'react'
import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/StatsContainer'
import StatItem from './StatItem'


const StatsContainer = ({allStats}) => {
    const stats = [
        {title: 'Pending Applications', count: allStats?.Pending || 0,
            icon: <FaSuitcaseRolling/>, color: '#f59e0b', bcg: '#fef3c7'
        },
        {title: 'Interviews Scheduled', count: allStats?.Interview || 0,
            icon: <FaCalendarCheck/>, color: '#647acb', bcg: '#e0e8f9'
        },
        {title: 'Jobs Declined', count: allStats?.Declined || 0,
            icon: <FaBug/>, color: '#d66a6a', bcg: '#fef3c7'
        },
    ]
  return (
    <Wrapper>
        {stats.map((item) => {
            return (<StatItem key={item.title} {...item}/>)
        })}
    </Wrapper>
  )
}

export default StatsContainer
