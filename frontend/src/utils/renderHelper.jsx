import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import { isElementInViewport } from 'root/utils'
import { useCallback } from 'react'

const useStyle = makeStyles((theme) => {
  return {
    lazyLoadStyle: {
      animation: `$blurAnimation 2500ms  ${theme.transitions.easing.easeInOut}`
    },
    '@keyframes blurAnimation': {
      '0%': {
        opacity: 0,
      },
      '100%': {
        opacity: 1
      },
    }
  }
})

export const useLazyLoadSection = (WrappedComponent, { elementId, width = '100%', height = '200px' }) => {
    const LazyLoadComponent = (props) => {
        const classes = useStyle()
        const [isLoaded, setIsLoaded] = useState(false)
        const handleScroll = useCallback(() => {
            const sectionElement = document.getElementById(elementId)
            if (!isLoaded && sectionElement && isElementInViewport(sectionElement)) {
                setTimeout(() => {
                    setIsLoaded(true)
                }, 200)
            }
        }, [isLoaded])

        useEffect(() => {
            handleScroll()
            window.addEventListener('scroll', handleScroll)
            return () => { window.removeEventListener('scroll', handleScroll) }
            // for componentDidMount
            // eslint-disable-next-line
        }, [])
        return isLoaded ? <div className={classes.lazyLoadStyle} in={isLoaded} timeout={{ enter: 200, appear: 500 }}>
            <WrappedComponent {...props} />
        </div>
            : <div id={elementId} style={{
                width, height, backgroundColor: 'white'
            }}></div>
    }
    return LazyLoadComponent
}

export const useLazyLoadImage = (WrappedComponent, elementId) => {
    const LazyLoadImage = (props) => {
        const [loaded, setLoaded] = useState(false)
        let imgElm = document.getElementById(elementId)

        const handleScroll = useCallback(() => {
            if (!loaded && isElementInViewport(imgElm)) {
                // Load real image
                const imgLoader = new Image()
                imgLoader.src = props.src
                imgLoader.onload = () => {
                    const ratioWH = imgLoader.width / imgLoader.height
                    imgElm.setAttribute(
                        `src`,
                        `${props.src}`
                    )
                    props.keepRatio && this.imgElm.setAttribute(
                        `height`,
                        `${props.width / ratioWH}`
                    )
                    imgElm.classList.add(`${props.effect}`)
                    setLoaded(true)
                }
            }
        }, [props.src, props.keepRatio, props.effect, imgElm, props.width, loaded])

        useEffect(() => {
            handleScroll()
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', this.handleScroll)
            }
            // for componentDidMount
            //eslint-disable-next-line
        }, [])
        const { id, ...nestedProps } = props
        return (
            <WrappedComponent id={elementId} {...nestedProps} />
        )
    }

    return LazyLoadImage
}


export const makeLazyLoadBackgroundImage = (ComposedComponent) => {

  const LazyLoadBackgroundImageComponent = (props) => {
    const [source, setSource] = useState('')
    const { src } = props

    useEffect(() => {
      const imageLoader = new Image()
      imageLoader.src = src
      imageLoader.onload = () => {
        setSource({ src })
      }
    }, [src])
  
    return <ComposedComponent {...props} style={{ backgroundImage: `url(${source || props.placeholder})` }} />
  }
  return LazyLoadBackgroundImageComponent
}