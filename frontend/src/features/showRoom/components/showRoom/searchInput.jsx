import React, { useCallback, useRef, useState } from 'react'
import { TextField, Typography } from 'ui-neumorphism'

const text = {
  search: 'Truyện bạn cần tìm...'
}

const keyBoard = {
  ENTER: 'Enter'
}

const SearchInput = (props) => {
  
  const { getNovals } = props
  const searchInputRef = useRef(null)

  const handleBlurSearchText = useCallback((e, data) => {
    getNovals({ searchText: searchInputRef.current.state.value })
  }, [getNovals])

  const handleKeyDown = useCallback((e) => {
    if (e.key === keyBoard.ENTER) {
      getNovals({ searchText: searchInputRef.current.state.value })
    }
  }, [getNovals])
  
  return (
    <>
      <TextField width={400} label={text.search}
        ref={searchInputRef} onBlur={handleBlurSearchText}
        onKeyDown={handleKeyDown}  
      />
    </>
  )
}

export default SearchInput