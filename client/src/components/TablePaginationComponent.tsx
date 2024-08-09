// MUI Imports
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'

// Third Party Imports
import type { useReactTable } from '@tanstack/react-table'

type Props = {
  table: ReturnType<typeof useReactTable>
  data: IApiResponse<[{}]>
  currentPage: number
  setCurrentPage: (page: number) => void
}

const TablePaginationComponent = ({ table, data, currentPage, setCurrentPage }: Props) => {
  return (
    <div className='flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2'>
      <Typography color='text.disabled'>
        {`Showing ${data?.totalDocs === 0 ? 0 : (data?.page - 1) * data?.limit + 1}
    to ${Math.min(data?.page * data?.limit, data?.totalDocs)} of ${data?.totalDocs} entries`}
      </Typography>

      <Pagination
        shape='rounded'
        color='primary'
        variant='tonal'
        count={Math.ceil(data?.totalDocs / data?.limit)}
        page={currentPage}
        onChange={(_, page) => {
          setCurrentPage(page)
        }}
        showFirstButton
        showLastButton
      />
    </div>
  )
}

export default TablePaginationComponent
