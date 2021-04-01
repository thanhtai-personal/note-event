import React, { Suspense } from 'react'
import LoadingComponent from 'root/components/loading'

const LoginComponent = React.lazy(() => import('../components/login'))

const LoginContainer = (props) => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <LoginComponent {...props} />
    </Suspense>
  )
}

export default LoginContainer