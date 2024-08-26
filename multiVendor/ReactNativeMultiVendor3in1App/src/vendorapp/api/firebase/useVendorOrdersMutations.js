import {
  accept as acceptAPI,
  onDelete as onDeleteAPI,
  reject as rejectAPI,
} from './FirebaseOrdersClient'

const useVendorOrdersMutations = () => {
  const accept = order => {
    return acceptAPI(order)
  }

  const onDelete = orderID => {
    return onDeleteAPI(orderID)
  }

  const reject = order => {
    return rejectAPI(order)
  }

  return { accept, onDelete, reject }
}

export default useVendorOrdersMutations
