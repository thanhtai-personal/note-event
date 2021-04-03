import React, { Suspense, useEffect } from 'react'
import LoadingComponent from 'root/components/loading'

const LoginComponent = React.lazy(() => import('../components/login'))

const LoginContainer = (props) => {
  const { setup, unset, ...nested } = props
  useEffect(() => {
    setup()
    return () => {
      unset()
    }
  }, [])

  return (
    <Suspense fallback={<LoadingComponent />}>
      <LoginComponent {...nested} />
    </Suspense>
  )
}

export default LoginContainer