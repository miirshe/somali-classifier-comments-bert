interface IPopulateOption {
  path: string
  dir: string
  select: string
}

export interface IQueryParams {
  query?: { [key: string]: string | number | boolean | string[] }
  search?: { keyword: string; fields: string[] }
  options?: {
    limit?: number
    page?: number
    populate?: IPopulateOption[]
    sort?: { [key: string]: 'asc' | 'desc' }
  }
}
