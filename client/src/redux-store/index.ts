// store/index.ts
import { configureStore } from '@reduxjs/toolkit'

// Slice Imports
import chatReducer from '@/redux-store/slices/chat'
import calendarReducer from '@/redux-store/slices/calendar'
import kanbanReducer from '@/redux-store/slices/kanban'
import emailReducer from '@/redux-store/slices/email'
import { pagePostsApi } from './pagePostsApi'
import pagePostsReducer from './slices/pagePostsSlice'

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    calendar: calendarReducer,
    kanban: kanbanReducer,
    email: emailReducer,
    pagePosts: pagePostsReducer,
    [pagePostsApi.reducerPath]: pagePostsApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(pagePostsApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
