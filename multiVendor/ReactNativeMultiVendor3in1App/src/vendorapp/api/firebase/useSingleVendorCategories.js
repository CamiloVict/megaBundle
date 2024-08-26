import { useState, useEffect } from 'react'
import { subscribeToCategories as subscribeToCategoriesAPI } from './FirebaseVendorClient'
import { useVendorConfig } from '../../../Core/vendor/hooks/useVendorConfig'

const useSingleVendorCategories = () => {
  const { config } = useVendorConfig()

  const [categories, setCategories] = useState([])

  useEffect(() => {
    const unsubscribeFromCategories = subscribeToCategoriesAPI(
      config.tables?.vendorCategoriesTableName,
      onCategoriesUpdate,
    )
    return unsubscribeFromCategories
  }, [])

  const onCategoriesUpdate = list => {
    setCategories(list)
  }

  return { categories }
}

export default useSingleVendorCategories
