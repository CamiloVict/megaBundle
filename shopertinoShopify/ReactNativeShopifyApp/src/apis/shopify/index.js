import Client from 'shopify-buy'
import ShopifyNetworkRequest from './ShopifyNetworkRequestModel'
import { shopifyConfig } from '../../config'

const config = {
  domain: shopifyConfig.domain,
  storefrontAccessToken: shopifyConfig.storefrontAccessToken,
}

const client = Client.buildClient(config)

export const shopifyDataManager = new ShopifyNetworkRequest(
  shopifyConfig,
  client,
)
