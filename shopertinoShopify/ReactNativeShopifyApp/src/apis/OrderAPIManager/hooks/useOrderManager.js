import { useRef } from 'react'
import { useConfig } from '../../../config'
import OrderAPIManager from './OrderAPIManager'
import ShopifyWebCheckoutManager from '../ShopifyWebCheckoutManager'

const useOrderManager = ({
  totalPrice,
  shoppingBag,
  currentUser,
  orderHistory,
  currentOrderId,
  selectedShippingMethod,
}) => {
  const config = useConfig()

  const OrderAPI = config.isStripeCheckoutEnabled
    ? OrderAPIManager
    : ShopifyWebCheckoutManager



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
