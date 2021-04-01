import React, { Suspense } from 'react'
import LoadingComponent from 'root/components/loading'

const SignUpComponent = React.lazy(() => import('../components/register'))

const SignUpContainer = (props) => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <SignUpComponent {...props} />
    </Suspense>
  )
}

export default SignUpContainer