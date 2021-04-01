import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles, Modal
  , Dialog, DialogActions
  , DialogContent, Button, DialogTitle } from '@material-ui/core'
import { isElementInViewport } from 'root/utils'

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

export const componentToModal = (ComposedComponent) => {
  const ModalComponent = (props) => {
    const { onClose, open, className, ...nestedProps } = props
    const handleClose = () => {
      onClose && typeof onClose === 'function' && onClose()
    }
    return (<Modal
      open={open}
      onClose={handleClose}
      className={className}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
    >
      <ComposedComponent {...nestedProps}/>
    </Modal>)
  }
  return ModalComponent
}

export const componentToDialog = (ComposedComponent) => {
  const DialogComponent = (props) => {
    const { onOpen, onClose, text = {}, onConfirm
      , className, customActions, customButton
      , hasTitle, hasConfirmButton, dialogOptions = {}
      , ...nestedProps
    } = props
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
      onOpen && typeof onOpen === 'function' ? onOpen(() => {
        setOpen(true)
      }) : setOpen(true)
    }

    const handleClose = () => {
      onClose && typeof onClose === 'function' ? onClose(() => {
        setOpen(false)
      }) : setOpen(false)
    }

    const handleConfirm = () => {
      onConfirm && typeof onConfirm === 'function' ? onConfirm(() => {
        setOpen(false)
      }) : setOpen(false)
    }

    return (
      <div>
        { customButton ||
          <Button variant='outlined' color='primary' onClick={handleClickOpen}>
            {text?.open || 'Open dialog'}
          </Button>
        }
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          className={className}
          {...dialogOptions}
        >
          {hasTitle && <DialogTitle id='alert-dialog-title'>{text?.title || 'Unknow Title'}</DialogTitle>}
          <DialogContent>
            <ComposedComponent {...nestedProps}/>
          </DialogContent>
          { customActions ||
            <DialogActions>
              <Button onClick={handleClose} color='secondary'>
                {text?.cancel || 'cancel'}
              </Button>
              {hasConfirmButton && <Button onClick={handleConfirm} color='secondary' autoFocus>
                {text?.confirm || 'confirm'}
              </Button>}
            </DialogActions>
          }
        </Dialog>
      </div>
    )
  }
  return DialogComponent
}