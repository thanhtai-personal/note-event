import React, { useState, useCallback, useEffect } from 'react'
import { Grid, makeStyles, Switch, NativeSelect, Typography, Input, Checkbox, Button } from '@material-ui/core'
import { documentSizeToImageSize } from './utils'
import { documentSize, documentSizeVertical } from './constants'
import GridTable from './gridTable'
const fileTypes = [
  'image/apng',
  'image/bmp',
  'image/gif',
  'image/jpeg',
  'image/pjpeg',
  'image/png',
  'image/svg+xml',
  'image/tiff',
  'image/webp',
  'image/x-icon'
];

const documentSizeOptions = Object.keys(documentSize).map((key, index) => (
  {
    key: `document-size-option-${key}-${index}`,
    value: key,
    ...documentSize[key]
  }
))

const documentSizeOptionsElem = documentSizeOptions.map((item, index) => (
  <option key={item.key} value={item.value}>
    {item.label}
  </option>
))

const useStyle = () => (makeStyles((theme) => {
  return {
    fileUploadWrapper: {
      paddingBottom: theme.spacing(3)
    },
    gridImageContainer: {
    },
    imageWrapper: {
    },
    image: {
      width: '100%',
      height: 'auto'
    },
    actions: {
      alignContent: 'center',
      textAlign: 'center',
      justifyContent: 'center'
    },
    actionLabel: {
      fontSize: '12px'
    },
    inputFile: {
      cursor: 'pointer',
      content: 'Select your image',
      '&:before': {
        cursor: 'pointer'
      },
      '&#file-upload-button': {
        cursor: 'pointer'
      }
    }
  }
}))

const GridImageComponent = (props) => {
  const [picture, setPicture] = useState('')
  const [isRotate, setIsRotate] = useState(false)
  const [isWhiteGrid, setIsWhiteGrid] = useState(false)
  const [isShowGrid, setIsShowGrid] = useState(false)
  const [paperSize, setPaperSize] = useState('A0')
  const [numOfGrid, setNumOfGrid] = useState(1)
  const [opacity, setOpacity] = useState(50)
  const [imageSize, setImageSize] = useState({})
  const [gridTableData, setGridTableData] = useState({
    width: 0,
    height: 0,
    numCols: 0,
    numRows: 0
  })
  const classes = useStyle({})()

  const handleGridTableData = useCallback(() => {
    if (!paperSize || numOfGrid < 1) return
    const gridSize = documentSizeToImageSize(isRotate ? documentSizeVertical[paperSize] : documentSize[paperSize], imageSize)
    const gridBox = gridSize.getGridSize(numOfGrid)
    setGridTableData({
      ...gridBox,
      numCols: numOfGrid,
      numRows: (gridSize.height / gridBox.height) + 1
    })
  }, [numOfGrid, paperSize, isRotate, imageSize])

  const handleChangeUploadInput = useCallback((event) => {
    const files = event.target.files
    const file = files && files[0] ? files[0] : {}
    if (!file || (
      file // 👈 null and undefined check
      && Object.keys(file).length === 0 && file.constructor === Object
    )) return
    setPicture(URL.createObjectURL(file))
  }, [setPicture])

  const handleImageError = useCallback(() => {
    return
  }, [])

  const handleChangeShowGridSwitch = useCallback((event, data) => {
    setIsShowGrid(data)
  }, [setIsShowGrid])

  useEffect(() => {
    handleGridTableData()
  }, [numOfGrid, paperSize, isRotate, imageSize, handleGridTableData])

  const handleChangeNumOfGrid = useCallback((e) => {
    let value = e.target?.value
    if (value < 1) value = 1
    if (value > 32) value = 32
    setNumOfGrid(parseInt(value || -1))
  }, [setNumOfGrid])

  const handleOpacity = useCallback((e) => {
    setOpacity(parseInt(e.target?.value || -1))
  }, [setOpacity])

  const handleChangePaperSize = useCallback((event) => {
    const value = event?.target?.value
    setPaperSize(value)
  }, [setPaperSize])

  const handleChangeIsRotate = useCallback((event) => {
    const checked = event.target.checked
    setIsRotate(checked)
  }, [setIsRotate])

  const handleChangeIsWhiteGrid = useCallback((event) => {
    const checked = event.target.checked
    setIsWhiteGrid(checked)
  }, [setIsWhiteGrid])

  const handleLoadedImage = useCallback(() => {
    const imgElement = document.getElementById('image')
    if (!imgElement) return
    setImageSize({
      width: imgElement.offsetWidth,
      height: imgElement.offsetHeight,
    })
  }, [setImageSize])

  const handleOrientationChange = useCallback(() => {
    const imgElement = document.getElementById('image')
    if(picture) imgElement.src = picture
  }, [picture])

  useEffect(() => {
    window.addEventListener('orientationchange', handleOrientationChange)
    window.addEventListener('onresize', handleOrientationChange)
    window.addEventListener('deviceorientation', handleOrientationChange)
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange)
      window.removeEventListener('deviceorientation', handleOrientationChange)
      window.removeEventListener('onresize', handleOrientationChange)
    }
  }, [handleOrientationChange])

  const goToProfile = useCallback(() => {
    window.history.pushState({}, 'profile', '/profile')
    window.history.go()
  }, [])

  return (<>
    <div className={classes.gridImageContainer}>
      <div className={classes.imageWrapper}>
        {isShowGrid && <GridTable
          {...gridTableData}
          imageSize={imageSize}
          whiteGrid={isWhiteGrid}
          opacity={opacity}
        />}
        {/* eslint-disable-next-line */}
        {picture && <img alt='uploaded-image' id='image' className={classes.image} src={picture} onError={handleImageError} onLoad={handleLoadedImage} />}
      </div>
      <Grid container spacing={1} alignContent={'center'} className={classes.actions}>
        <Grid item xs={12} className={classes.fileUploadWrapper}
          style={picture ? {
            marginBottom: '2em',
            marginTop: '2em'
          } : {
              border: 'double 1px black',
              minHeight: '70vh',
              marginBottom: '2em',
              justifyContent: 'center',
              alignContent: 'center',
              textAlign: 'center',
              verticalAlign: 'center',
              alignItems: 'center',
              display: 'flex'
            }}
        >
          <input type='file'
            onChange={handleChangeUploadInput}
            accept={fileTypes.reduce((ft, current) => (`${current}, ${ft}`))}
            multiple={false}
            className={classes.inputFile}
            aria-label={'Select your image'}
          ></input>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={2}>
              <Typography variant={'body2'} className={classes.actionLabel}>Show grid:</Typography>
              <Switch label='secondary' checked={isShowGrid} onChange={handleChangeShowGridSwitch} />
            </Grid>
            <Grid item xs={2}>
              <Typography variant={'body2'} className={classes.actionLabel}>Paper size: </Typography>
              <NativeSelect
                defaultValue={paperSize}
                onChange={handleChangePaperSize}
              >
                {documentSizeOptionsElem}
              </NativeSelect>
            </Grid>
            <Grid item xs={2}>
              <Typography variant={'body2'} className={classes.actionLabel}>Num of columns: (1-32) </Typography>
              <Input type={'number'} inputProps={{ max: 32, min: 1 }} defaultValue={numOfGrid} onChange={handleChangeNumOfGrid} />
            </Grid>
            <Grid item xs={2}>
              <Typography variant={'body2'} className={classes.actionLabel}>Is rotate 90: </Typography>
              <Checkbox defaultValue={isRotate} onChange={handleChangeIsRotate} />
            </Grid>
            <Grid item xs={2}>
              <Typography variant={'body2'} className={classes.actionLabel}>White grid: </Typography>
              <Checkbox defaultValue={isWhiteGrid} onChange={handleChangeIsWhiteGrid} />
            </Grid>
            <Grid item xs={2}>
              <Typography variant={'body2'} className={classes.actionLabel}>Grid opacity (%): </Typography>
              <Input type={'number'} inputProps={{ max: 100, min: 10 }} defaultValue={opacity} onChange={handleOpacity} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            style={{
              width: '100%',
              color: 'red',
              marginTop: '2em',
            }}
            onClick={goToProfile}
          >
            Contact me via my profile!
          </Button>
        </Grid>
      </Grid>
    </div>
  </>)
}

export default GridImageComponent