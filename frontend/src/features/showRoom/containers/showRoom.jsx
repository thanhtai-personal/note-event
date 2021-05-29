import React, { Suspense, useEffect } from 'react'
import LoadingComponent from 'root/components/loading'

const ShowRoomComponent = React.lazy(() => import('../components/showRoom'))

const DashboardContainer = (props) => {
  const { setup, unset, ...nested } = props
  useEffect(() => {
    setup()
    return () => {
      unset()
    }
  }, [])
  return (
    <Suspense fallback={<LoadingComponent />}>
      <ShowRoomComponent {...nested} />
    </Suspense>
  )
}

export default DashboardContainer