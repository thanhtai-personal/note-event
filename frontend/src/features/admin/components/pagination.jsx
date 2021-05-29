import React, { useCallback, useState } from 'react'
import { Grid } from '@material-ui/core'
import './neumorphism.css'

const PageButton = (props) => {
  const { page, isActive, getData, setCurrentPage, setPage } = props
  const handleClickPage = useCallback(() => {
    getData && typeof getData === 'function' && getData(page)
    setPage && typeof setPage === 'function' && setPage(page)
    setCurrentPage && typeof setCurrentPage === 'function' && setCurrentPage(page)
  }, [getData, setCurrentPage, page, setPage])
  return (
    <li className={`page-item ${isActive ? 'active' : ''}`} onClick={handleClickPage}>
      {/* eslint-disable-next-line */}
      <a className='page-link' aria-label='first link'>{page}</a>
    </li>
  )
}

const Pagination = (props) => {
  const { getData, setPage } = props
  const [currentPage, setCurrentPage] = useState(1)
  const [startPage, setStartPage] = useState(1)
  const [endPage, setEndPage] = useState(5)

  const handlePrev = useCallback(() => {
    if (currentPage - 1 < startPage) {
      setStartPage && typeof setStartPage === 'function' && setStartPage(startPage - 5 > 1 ? startPage - 5 : 1)
      setEndPage && typeof setEndPage === 'function' && setEndPage(endPage - 5 > 5 ? endPage - 5 : 5)
    }
    getData && typeof getData === 'function' && getData(currentPage > 1 ? currentPage - 1 : currentPage)
    setPage && typeof setPage === 'function' && setPage(currentPage > 1 ? currentPage - 1 : currentPage)
    setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)
    
  }, [currentPage, setCurrentPage, setStartPage, setEndPage, startPage, endPage, getData, setPage])

  const handleNext = useCallback(() => {
    if (currentPage + 1 > endPage) {
      setStartPage && typeof setStartPage === 'function' && setStartPage(startPage + 5)
      setEndPage && typeof setEndPage === 'function' && setEndPage(endPage + 5)
    }
    getData && typeof getData === 'function' && getData(currentPage + 1)
    setPage && typeof setPage === 'function' && setPage(currentPage + 1)
    setCurrentPage(currentPage + 1)
  }, [currentPage, setCurrentPage, setStartPage, setEndPage, startPage, endPage, getData, setPage])

  return (
    <Grid container spacing={1} style={{ marginTop: '1em' }}>
      <Grid item xs={12} style={{ float: 'left', margin: 'auto' }}>
        <nav aria-label='Blog page navigation'>
          <ul className='pagination'>
            <li className='page-item'>
              {/* eslint-disable-next-line */}
              <a className='page-link' aria-label='first link' onClick={handlePrev}>Prev</a>
            </li>
            {(() => {
              let pages = []
              for (let i = startPage; i <= endPage; i++) {
                pages.push(<PageButton setPage={setPage} setCurrentPage={setCurrentPage} getData={getData} isActive={currentPage === i} key={`page-${i}`} page={i} />)
              }
              return pages
            })()}
            <li className='page-item'>
              {/* eslint-disable-next-line */}
              <a className='page-link' aria-label='first link' onClick={handleNext}>Next</a>
            </li>
          </ul>
        </nav>
      </Grid>
    </Grid>

  )
}

export default Pagination