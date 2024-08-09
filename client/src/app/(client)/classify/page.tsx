// Next Imports
import type { Metadata } from 'next'

import CLassify from '@/views/client/classify'

export const metadata: Metadata = {
  title: 'Classify',
  description: 'Classify to your posts'
}

const page = () => {
  return <CLassify />
}

export default page
