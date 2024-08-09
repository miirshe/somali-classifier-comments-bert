// Type Imports
import type { ChildrenType } from '@core/types'

// Component Imports
import Footer from '@components/layout/client/Footer'
import Header from '@components/layout/client/Header'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

// Util Imports
import { frontLayoutClasses } from '@layouts/utils/layoutClasses'

const FrontLayout = ({ children }: ChildrenType) => {
  // Vars
  const mode = getServerMode()

  return (
    <div className={frontLayoutClasses.root}>
      <Header mode={mode} />
      {children}
      <Footer mode={mode} />
    </div>
  )
}

export default FrontLayout
