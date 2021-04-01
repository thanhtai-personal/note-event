import React, { Suspense } from 'react'
import actionHelpers from './actionHelpers'
import { CircularProgress } from '@material-ui/core'

const makeSingleton = (makeInstantFunc, dataInit) => {
    return (function () {
        var instance
        return {
            getInstance: function () {
                // check if instance is available
                if (!instance) {
                    instance = makeInstantFunc(dataInit)
                    delete instance.constructor // or set it to null
                }
                return instance
            }
        }
    })()
}

export const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight
    const windowWidth = window.innerWidth || document.documentElement.clientWidth
    const rectBottom = rect.top + rect.height, rectRight = rect.left + rect.width
    const isVerticalInView = (rect.top > 0 && rect.top <= windowHeight)
        || (rect.top < 0 && rectBottom > 0)
    const isHorizonalInView = (rect.left > 0 && rect.left < windowWidth)
        || (rect.left < 0 && rectRight > 0)
    return (isVerticalInView && isHorizonalInView)
}

export const makeSuspenseComponent = (component) => (<Suspense fallback={<CircularProgress />}>{component}</Suspense>)
export const hocKeys = {
    multiTheme: 'multiTheme'
}

const utils = {
    ...actionHelpers
    , makeSingleton
}

export default utils