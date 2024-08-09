// types.ts

export interface FacebookPost {
  created_time: string
  id: string
  message?: string
  story?: string
}

export interface Paging {
  cursors: {
    after: string
    before: string
  }
}

export interface FacebookApiResponse {
  data: FacebookPost[]
  paging: Paging
}
