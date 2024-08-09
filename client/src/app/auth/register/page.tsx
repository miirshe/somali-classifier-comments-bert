// Next Imports
import type { Metadata } from 'next'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'
import Register from '@/views/Register'

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register to your account'
}

const page = () => {
  // Vars
  const mode = getServerMode()

  return <Register mode={mode} />
}

export default page
