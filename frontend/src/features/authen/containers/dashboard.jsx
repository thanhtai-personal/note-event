import React, { Suspense } from 'react'
import LoadingComponent from 'root/components/loading'

const DashboardComponent = React.lazy(() => import('../components/dashboard'))

const DashboardContainer = (props) => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <DashboardComponent {...props} />
    </Suspense>
  )
}

export default DashboardContainer