// React Imports
import type { SVGAttributes } from 'react'

const LaptopCharging = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='64' height='65' viewBox='0 0 64 65' fill='none' {...props}>
      <path
        opacity='0.2'
        d='M10 44.6943V18.6943C10 17.6335 10.4214 16.6161 11.1716 15.8659C11.9217 15.1158 12.9391 14.6943 14 14.6943H50C51.0609 14.6943 52.0783 15.1158 52.8284 15.8659C53.5786 16.6161 54 17.6335 54 18.6943V44.6943H10Z'
        fill='currentColor'
      />
      <path
        d='M10 44.6943V18.6943C10 17.6335 10.4214 16.6161 11.1716 15.8659C11.9217 15.1158 12.9391 14.6943 14 14.6943H50C51.0609 14.6943 52.0783 15.1158 52.8284 15.8659C53.5786 16.6161 54 17.6335 54 18.6943V44.6943M36 22.6943H28M6 44.6943H58V48.6943C58 49.7552 57.5786 50.7726 56.8284 51.5228C56.0783 52.2729 55.0609 52.6943 54 52.6943H10C8.93913 52.6943 7.92172 52.2729 7.17157 51.5228C6.42143 50.7726 6 49.7552 6 48.6943V44.6943Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default LaptopCharging
