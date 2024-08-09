import { Skeleton } from '@mui/material'

const TableSkeleton = ({ rowsNum, colNum }: { rowsNum: number; colNum: number }) => {
  return (
    <>
      {Array.from({ length: rowsNum }).map((_, rowIndex) => (
        <tr key={rowIndex}>
          {Array.from({ length: colNum }).map((_, colIndex) => (
            <td key={colIndex}>
              <Skeleton animation='wave' variant='text' sx={{ fontSize: '1.5rem' }} width='100%' />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}

export default TableSkeleton
