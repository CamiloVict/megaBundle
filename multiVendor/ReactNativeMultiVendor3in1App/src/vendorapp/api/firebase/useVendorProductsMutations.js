import {
  addProduct as addProductAPI,
  deleteProduct as deleteProductAPI,
  updateProduct as updateProductAPI,
} from './FirebaseVendorClient'
import { useVendorConfig } from '../../../Core/vendor/hooks/useVendorConfig'

const useVendorProductsMutations = () => {
  const { config } = useVendorConfig()

  const addProduct = product => {
    return addProductAPI(config.tables?.vendorProductsTableName, product)
  }

  const deleteProduct = (productID, callback) => {
    return deleteProductAPI(
      config.tables?.vendorProductsTableName,
      productID,
      callback,
    )
  }

  const updateProduct = product => {
    return updateProductAPI(config.tables?.vendorProductsTableName, product)
  }

  return { addProduct, deleteProduct, updateProduct }
}

export default useVendorProductsMutations
