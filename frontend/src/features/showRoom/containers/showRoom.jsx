import React, { Suspense, useEffect } from 'react'
import LoadingComponent from 'root/components/loading'

const ShowRoomComponent = React.lazy(() => import('../components/showRoom'))

const ShowRoomContainer = (props) => {
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

export default ShowRoomContainer