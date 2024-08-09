// Component Imports
import Payment from '@views/client/Payment'

// Data Imports
import { getPricingData } from '@/app/server/actions'

const PaymentPage = async () => {
  // Vars
  const data = await getPricingData()

  return <Payment data={data} />
}

export default PaymentPage
