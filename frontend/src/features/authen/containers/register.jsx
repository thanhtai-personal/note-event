import React, { Suspense, useEffect } from 'react'
import LoadingComponent from 'root/components/loading'

const SignUpComponent = React.lazy(() => import('../components/register'))

const SignUpContainer = (props) => {
  const { setup, unset, ...nested } = props
  useEffect(() => {
    setup()
    return () => {
      unset()
    }
  }, [])

  return (
    <Suspense fallback={<LoadingComponent />}>
      <SignUpComponent {...nested} />
    </Suspense>
  )
}

export default SignUpContainer