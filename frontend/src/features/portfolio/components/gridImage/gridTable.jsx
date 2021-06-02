import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'

const useStyle = ({ imageSize, whiteGrid, opacity }) => (makeStyles((theme) => {
  return {
    gridTable: {
      borderCollapse: 'collapse',
      border: `1px solid ${whiteGrid ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`}`,
      pointerEvents: 'none',
      overflow: 'hidden',
    },
    tableWrapper: {
      position: 'absolute',
      pointerEvents: 'none',
      overflow: 'hidden',
      maxHeight: `${imageSize.height}px`
    }
  }
}))

const GridTable = (props) => {
  const { width, height, numCols, numRows, imageSize, whiteGrid, opacity } = props
  const [localOpacity, setLocalOpacity] = useState(0.5)
  const classes = useStyle({ imageSize, whiteGrid, opacity: localOpacity })()
  const [gridContent, setGridContent] =  useState(<tr><td></td></tr>)

  useEffect(() => {
    if (opacity > 10 && opacity < 101) {
      setLocalOpacity(opacity/100.0)
    }
  }, [opacity])

  useEffect(() => {
    let rows = []
    for (let i = 0; i < numRows; i++) {
      let cols = []
      for (let j = 0; j < numCols; j++) {
        cols.push(<td key={`grid-row-${i}-col-${j}`} style={{
          border: `1px solid ${whiteGrid ? `rgba(255, 255, 255, ${localOpacity})` : `rgba(0, 0, 0, ${localOpacity})`}`,
          borderCollapse: 'collapse',
          backgroundColor: 'transparent',
          height: `${height}px`,
          width: `${width}px`
        }}></td>)
      }
      rows.push(<tr key={`grid-row-${i}`}>{cols}</tr>)
    }
    setGridContent(rows)
  }, [numCols, numRows, width, height, whiteGrid, localOpacity])
  
  return (
    <div className={classes.tableWrapper}>
      <table className={classes.gridTable}>
        <tbody>
          {gridContent}
        </tbody>
      </table>
    </div>
  )
}

export default GridTable