// components/CustomDataTable.tsx
'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import TablePagination from '@mui/material/TablePagination'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// Tanstack Table Imports
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender} from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'
import type { ColumnFiltersState, FilterFn, ColumnDef } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Type Imports
import classNames from 'classnames'

import type { FacebookApiResponse, FacebookPost } from '../types/index'

// Component Imports

// Icon Imports
import ChevronRight from '@menu/svg/ChevronRight'

// Style Imports
import styles from '@core/styles/table.module.css'

// Data Imports
import Header from './Header'
import TableSkeleton from './TableSkeleton'
import TablePaginationComponent from '@/components/TablePaginationComponent'

// Extend the Tanstack Table Module
declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

// Fuzzy Filter Function
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  addMeta({ itemRank })

return itemRank.passed
}

// Component Props Type
type Props = {
  data: FacebookApiResponse
  columns: ColumnDef<FacebookPost, any>[]
  title: string
  ButtonLabel: string
  currentPage: number
  setCurrentPage: (page: number) => void
  rowsPerPage: number
  setRowsPerPage: (limit: number) => void
  search: string
  setSearch: (keyword: string) => void
  isLoading: boolean
  isFetching: boolean
  addButtonClick: () => void
  showButton?: boolean
}

const CustomDataTable = ({
  data,
  columns,
  title,
  ButtonLabel,
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  search,
  setSearch,
  isLoading,
  isFetching,
  addButtonClick,
  showButton
}: Props) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState<string | number>(search)

  const theme = useTheme()

  const table = useReactTable({
    data: data?.data || [],
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: {
      columnFilters,
      globalFilter,
      pagination: { pageIndex: currentPage - 1, pageSize: rowsPerPage }
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <>
      <Header
        globalFilter={search}
        setGlobalFilter={setSearch}
        title={title}
        showButton={showButton}
        ButtonLabel={ButtonLabel}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        addButtonClick={addButtonClick}
        setCurrentPage={setCurrentPage}
      />

      <div className='overflow-x-auto relative '>
        <table className={`${styles.table} w-full`}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={classNames({
                          'flex items-center': header.column.getIsSorted(),
                          'cursor-pointer select-none': header.column.getCanSort()
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <ChevronRight fontSize='1.25rem' className='-rotate-90' />,
                          desc: <ChevronRight fontSize='1.25rem' className='rotate-90' />
                        }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {isLoading ? (
            <tbody>
              <TableSkeleton rowsNum={5} colNum={columns.length} />
            </tbody>
          ) : table.getFilteredRowModel().rows.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  No data available
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {isFetching && !isLoading && (
          <Box className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
            <Box
              sx={{ backgroundColor: theme.palette.background.default, opacity: 0.3 }}
              className='absolute top-0 left-0 w-full h-full'
            />
            <Box className='spinner border-t-transparent border-solid animate-spin rounded-full border-blue-500 border-4 h-8 w-8'></Box>
          </Box>
        )}
      </div>
      <TablePagination
        component={() => (
          <TablePaginationComponent
            table={table}
            data={data}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={rowsPerPage}
        page={currentPage - 1}
        onPageChange={(_, page) => setCurrentPage(page + 1)}
        onRowsPerPageChange={event => {
          setRowsPerPage(parseInt(event.target.value, 10))
          setCurrentPage(1)
        }}
      />
    </>
  )
}

export default CustomDataTable
