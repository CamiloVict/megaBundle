import { useState, useEffect } from 'react'
import { subscribeToVendorOrders as subscribeToVendorOrdersAPI } from './FirebaseOrdersClient'
import { useVendorConfig } from '../../../Core/vendor/hooks/useVendorConfig'

const useVendorOrders = viewer => {
  const { config } = useVendorConfig()

  const [loading, setloading] = useState(false)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (!viewer.vendorID) {
      return
    }
    setloading(true)
    const unsubscribeVendorOrders = subscribeToVendorOrdersAPI(
      config.tables?.vendorsTableName,
      viewer,
      onVendorOrdersUpdate,
    )
    return unsubscribeVendorOrders
  }, [])

  const onVendorOrdersUpdate = list => {
    setOrders(list)
    setloading(false)
  }

  return { orders, loading }
}

export default useVendorOrders
