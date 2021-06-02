import React from 'react'
import LeftSideBar from '../components/layout/leftSiteBar'

const useLeftSideBar = (ComposedComponent) => {
  const WithLeftSideBarComponent = (props) => {

    return (
      <>
        <LeftSideBar />
        <ComposedComponent {...props} />
      </>
    )
  }

  return WithLeftSideBarComponent
}

export default useLeftSideBar

