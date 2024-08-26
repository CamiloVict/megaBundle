import WooCommerceNetworkRequestModel from './WooCommerceNetworkRequestModel'
import WooCommerceDataManagerModel from './WooCommerceDataManagerModel'
import { wooCommerceConfig } from '../../config'

const wooCommerceNetworkRequest = new WooCommerceNetworkRequestModel(
  wooCommerceConfig,
)

const wooCommerceNetworkRequestAuth = new WooCommerceNetworkRequestModel(
  wooCommerceConfig,
  'jwt-auth/v1',
)

export const wooCommerceDataManager = new WooCommerceDataManagerModel(
  wooCommerceNetworkRequest,
)

export const wooCommerceAuth = new WooCommerceDataManagerModel(
  wooCommerceNetworkRequestAuth,
)
