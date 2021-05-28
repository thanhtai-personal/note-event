import React, { Suspense, useEffect } from 'react'
import LoadingComponent from 'root/components/loading'

const DashboardComponent = React.lazy(() => import('../components/adminBoard'))

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
      <DashboardComponent {...nested} />
    </Suspense>
  )
}

export default DashboardContainer