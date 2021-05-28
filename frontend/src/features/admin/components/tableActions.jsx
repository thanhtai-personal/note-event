import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import 'ui-neumorphism/dist/index.css'
import { Grid, FormControl, NativeSelect } from '@material-ui/core'
import { Button } from 'ui-neumorphism'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 140,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    color: 'red',
    backgroundColor: 'yellowgreen'
  },
}))

const TableActions = (props) => {
  const { crawlAll, crawlAllLoading, disabledCrawlerAll } = props
  const classes = useStyles()

  const handleCrawlAll = useCallback(() => {
    crawlAll && typeof crawlAll === 'function' && crawlAll()
  }, [crawlAll])

  return (
    <Grid container spacing={3} style={{ marginBottom: '1em' }}>
      <Grid item xs={3} style={{ margin: 'auto' }}>
        <FormControl className={classes.formControl}>
          SITE: <NativeSelect
            value={0}
            onChange={() => { }}
            name="age"
            className={classes.selectEmpty}
            inputProps={{ 'aria-label': 'age' }}
          >
            <option value={0}>Truyen convert</option>
          </NativeSelect>
        </FormControl>
      </Grid>
      <Grid item xs={2}>
      </Grid>
      <Grid item xs={2}>
      </Grid>
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={2}>
        <Button onClick={handleCrawlAll} disabled={crawlAllLoading || disabledCrawlerAll} depressed color='var(--primary)' style={{ float: 'right' }}>Crawl Site</Button>
      </Grid>
    </Grid>
  )
}

export default TableActions