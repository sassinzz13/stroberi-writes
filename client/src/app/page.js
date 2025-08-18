import AddPost from '@/components/AddPost/AddPost'
import Home from '@/components/Home/Home'
import Login from '@/components/Login/Login'
import NavBar from '@/components/NavBar/NavBar'
import SeeMore from '@/components/SeeMore/SeeMore'
import Signup from '@/components/SignUp/SignUp'
import TopBar from '@/components/TopBar/TopBar'
import ViewContents from '@/components/ViewContents/ViewContents'
import React from 'react'

const page = () => {
  return (
    <div>
      {/* <TopBar />
      <NavBar /> */}
      <Home />
      {/* <ViewContents /> */}
      {/* <Login /> */}
      {/* <Signup /> */}
      {/* <SeeMore /> */}
      {/* <AddPost /> */}
    </div>
  )
}

export default page