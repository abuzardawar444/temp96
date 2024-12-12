import React from 'react'
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <>
      {/* To show children components */}
      <Outlet/>
    </>
  )
}

export default HomeLayout
