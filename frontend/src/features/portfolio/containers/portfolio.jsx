import React, { Suspense, useEffect } from 'react'
import LoadingComponent from 'root/commonComponents/loading'

const PortfolioComponent = React.lazy(() => import('../components/portfolioSetup'))

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
      <PortfolioComponent {...props} />
    </Suspense>
  )
}

export default PortfolioContainer