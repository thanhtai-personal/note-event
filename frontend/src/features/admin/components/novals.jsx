import React from 'react'

import 'ui-neumorphism/dist/index.css'
import { Table } from 'ui-neumorphism'

const getHeaders = (headers) => {
  return headers || [
    { text: 'Name', align: 'left', value: 'name' },
    { text: 'Chapters', align: 'right', value: 'chapNumber' },
    { text: 'Blocked Crawler', align: 'right', value: 'isBlockedScrap' },
    { text: 'Introduce', align: 'right', value: 'shortDesctiption' },
    { text: 'Updated time', align: 'right', value: 'updatedAt' }
  ]
}

const getItem = (headers, item) => {
  const _headers = getHeaders(headers)
  let rsItem = {}
  _headers.forEach((header) => {
    rsItem[header.value] = item[header.value]
  })
  return rsItem
}

const getItems = (headers, items) => {
  return (items || [
    { 
      name: 'test noval',
      chapNumber: 1234,
      isBlockedScrap: 'false',
      shortDesctiption: 'test noval',
      updatedAt: (<div style={{ color: 'red' }}>test div</div>)
    }
  ]).map((item) => getItem(headers, item))
}

const NovalsComponent = (props) => {
  const { novals, novalHeader } = props
  return (
    <Table inset items={getItems(novalHeader, novals)} headers={getHeaders(novalHeader)} />
  )
}

export default NovalsComponent