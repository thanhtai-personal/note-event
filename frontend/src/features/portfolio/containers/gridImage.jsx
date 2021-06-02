import React, { Suspense, useEffect } from 'react'
import LoadingComponent from 'root/commonComponents/loading'

const GridImageComponent = React.lazy(() => import('../components/gridImageSetup'))

const PortfolioContainer = (props) => {

  const { setup, unset, ...nested } = props
  useEffect(() => {
    setup()
    return () => {
      unset()
    }
  }, [])

  return (
    <Suspense fallback={<LoadingComponent />}>
      <GridImageComponent {...props} />
    </Suspense>
  )
}

export default PortfolioContainer