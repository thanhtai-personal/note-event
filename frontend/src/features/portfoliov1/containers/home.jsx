import React, { Suspense, useEffect } from 'react'
import LoadingComponent from 'root/commonComponents/loading'

const HomeComponent = React.lazy(() => import('../components/default'))

const HomeContainer = (props) => {

  const { setup, unset, ...nested } = props
  useEffect(() => {
    setup()
    return () => {
      unset()
    }
  }, [])

  return (
    <Suspense fallback={<LoadingComponent />}>
      <HomeComponent {...props} />
    </Suspense>
  )
}

export default HomeContainer