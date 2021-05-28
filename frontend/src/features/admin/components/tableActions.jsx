import React, { useCallback } from 'react'
import 'ui-neumorphism/dist/index.css'
import { Grid } from '@material-ui/core'
import { Button } from 'ui-neumorphism'

const TableActions = (props) => {
  const { crawlAll, crawlAllLoading } = props

  const handleCrawlAll = useCallback(() => {
    crawlAll && typeof crawlAll === 'function' && crawlAll()
  }, [crawlAll])

  return (
    <Grid container spacing={3} style={{ marginBottom: '2em' }}>
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={3}>
        <Button onClick={handleCrawlAll} disabled={crawlAllLoading} depressed color='var(--primary)' style={{ float: 'right' }}>Crawl All</Button>
      </Grid>
    </Grid>
  )
}

export default TableActions