import { useRef } from 'react'
import { useConfig } from '../../../config'
import OrderAPIManager from './OrderAPIManager'

const useOrderManager = ({
  totalPrice,
  shoppingBag,
  currentUser,
  orderHistory,
  currentOrderId,
  selectedShippingMethod,
}) => {
  const config = useConfig()



  const OrderAPI = OrderAPIManager

  const orderAPIManager = useRef(
    new OrderAPI(
      {
        totalPrice,
        shoppingBag,
        currentUser,
        orderHistory,
        currentOrderId,
        selectedShippingMethod,
      },
      config,
    ),
  ).current

  return { orderAPIManager }
}

export default useOrderManager
