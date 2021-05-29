import React, { useEffect, useState } from 'react'

import 'ui-neumorphism/dist/index.css'
import { Table } from 'ui-neumorphism'
import { makeStyles } from '@material-ui/core/styles';
import { overrideThemeVariables } from 'ui-neumorphism'
import TableActions from './tableActions'
import Pagination from './pagination'

const useStyles = makeStyles((theme) => ({
  novalTable: {
    display: 'flex',
  }
}))

const getHeaders = () => {
  return [
    { text: 'No.', align: 'left', value: 'index' },
    { text: 'Name', align: 'left', value: 'name' },
    { text: 'Chapters', align: 'right', value: 'chapNumber' },
    { text: 'Group', align: 'right', value: 'group' },
    { text: 'Image', align: 'right', value: 'imageAltName' },
    { text: 'Short introduce', align: 'right', value: 'shortDescription' },
    { text: 'Full introduce', align: 'right', value: 'intro' },
    { text: 'Updated time', align: 'right', value: 'updatedAt' }
  ]
}

const getItem = (headers, item, index) => {
  let rsItem = {}
  headers.forEach((header) => {
    switch (header.value) {
      case 'index':
        rsItem[header.value] = index + 1
        break
      default:
        rsItem[header.value] = item[header.value]
        break;
    }
  })
  return rsItem
}

const getItems = (headers, items, page) => {
  return items.map((item, index) => {
    return getItem(headers, item, ((page - 1) * 20) + index)
  })
}

const NovalsComponent = (props) => {
  const { novals, getNovals, crawlAll
    , crawlAllLoading
  } = props
  const classes = useStyles()
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [headers, setHeaders] = useState([])

  useEffect(() => {
    const _headers = getHeaders()
    setItems(getItems(_headers, novals, page))
    setHeaders(_headers)
    //eslint-disable-next-line
  }, [novals, page])

  useEffect(() => {
    overrideThemeVariables({
      '--light-bg': '#b9d7d2',
      '--light-bg-dark-shadow': '#c8e7e3',
      '--light-bg-light-shadow': '#a0bab6'
    })
    getNovals(1)
    //eslint-disable-next-line
  }, [])

  return (
    <>
      <TableActions crawlAll={crawlAll} crawlAllLoading={crawlAllLoading} disabledCrawlerAll={(novals || []).length > 0} />
      <Table inset items={items} headers={headers} className={classes.novalTable} />
      <Pagination getData={getNovals} setPage={setPage}/>
    </>
  )
}

export default NovalsComponent