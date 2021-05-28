import React, { useEffect, useState } from 'react'

import 'ui-neumorphism/dist/index.css'
import { Table } from 'ui-neumorphism'
import { makeStyles } from '@material-ui/core/styles';

import TableActions from './tableActions'

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
    switch (item.value) {
      case 'index':
        rsItem[header.value] = index
        break
      default:
        rsItem[header.value] = item[header.value]
        break;
    }
  })
  return rsItem
}

const getItems = (headers, items) => {
  return items.map((item, index) => getItem(headers, item, index))
}

const NovalsComponent = (props) => {
  const { novals, getNovals, crawlAll
    , crawlAllLoading
  } = props
  const classes = useStyles()
  const [items, setItems] = useState([])
  const [headers, setHeaders] = useState([])

  useEffect(() => {
    const _headers = getHeaders()
    setItems(getItems(_headers, novals))
    setHeaders(_headers)
    //eslint-disable-next-line
  }, [novals])

  useEffect(() => {
    getNovals()
    //eslint-disable-next-line
  }, [])

  return (
    <>
      <TableActions crawlAll={crawlAll} crawlAllLoading={crawlAllLoading} disabledCrawlerAll={(novals || []).length > 0} />
      <Table inset items={items} headers={headers} className={classes.novalTable} />
    </>
  )
}

export default NovalsComponent