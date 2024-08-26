import { useState, useEffect, useRef } from 'react'
import { subscribeToVendorProducts as subscribeToVendorProductsAPI } from './FirebaseVendorClient'
import { useVendorConfig } from '../../../Core/vendor/hooks/useVendorConfig'

const useVendorProducts = vendorID => {
  const { config } = useVendorConfig()

  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])

  const unsubscribeFromVendorProducts = useRef(null)

  useEffect(() => {
    setLoading(true)
    unsubscribeFromVendorProducts.current?.()
    unsubscribeFromVendorProducts.current = subscribeToVendorProductsAPI(
      config.tables?.vendorProductsTableName,
      vendorID,
      onVendorProductsUpdate,
    )
    return () => {
      unsubscribeFromVendorProducts.current?.()
    }
  }, [])

  const onVendorProductsUpdate = vendorProducts => {
    setProducts(vendorProducts)
    setLoading(false)
  }

  return { products, loading }
}

export default useVendorProducts
