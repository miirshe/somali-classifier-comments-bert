// store/pagePostsSlice.ts
'use client'

import { createSlice } from '@reduxjs/toolkit'

const getPageId = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('pageId') || ''
  }
  return ''
}

const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken') || ''
  }
  return ''
}

const initialState = {
  pageId: getPageId(),
  accessToken: getAccessToken()
}

const pagePostsSlice = createSlice({
  name: 'pagePosts',
  initialState,
  reducers: {
    setPageId: (state, action) => {
      state.pageId = action.payload
      if (typeof window !== 'undefined') {
        localStorage.setItem('pageId', action.payload)
      }
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', action.payload)
      }
    },
    clearPageInfo: state => {
      state.pageId = ''
      state.accessToken = ''
      if (typeof window !== 'undefined') {
        localStorage.removeItem('pageId')
        localStorage.removeItem('accessToken')
      }
    }
  }
})

export const { setPageId, setAccessToken, clearPageInfo } = pagePostsSlice.actions
export default pagePostsSlice.reducer
