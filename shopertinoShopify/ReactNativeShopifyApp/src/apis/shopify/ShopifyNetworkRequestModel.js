import base64 from 'react-native-base64'
import axios from 'axios'
import authDeviceStorage from '../AuthDeviceStorage'
import { getAccessTokenMutation, getCustomerQuery } from './graphql'
import Category from './../../models/Category'
import Product from './../../models/Product'
import Order from './../../models/Order'

export default class ShopifyNetworkRequest {
  static allCategories = null

  constructor(shopifyConfig, client) {
    this.shopifyConfig = shopifyConfig
    this.client = client
    this.shopifyStoreFrontAPI = axios.create({
      baseURL: `https://${shopifyConfig.domain}/api/`,
      headers: {
        'X-Shopify-Storefront-Access-Token':
          shopifyConfig.storefrontAccessToken,
        'Content-Type': 'application/graphql',
      },
      async: true,
      crossDomain: true,
    })
    this.shopifyAdminAPI = axios.create({
      baseURL: `https://${shopifyConfig.domain}/admin/api/2020-07/`,
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': shopifyConfig.password,
        async: true,
        crossDomain: true,
      },
    })
  }

  getCustomerWithToken = async accessToken => {
    const query = getCustomerQuery(accessToken)

    const response = await this.shopifyStoreFrontAPI.post('/graphql', query)

    const customer = response?.data?.data?.customer

    return {
      response: { data: { ...customer, accessToken } },
      success: true,
    }
  }

  async login(email, password) {
    try {
      const credentials = {
        email: email || '',
        password: password || '',
      }

      const loginMutation = getAccessTokenMutation(credentials)

      const res = await this.shopifyStoreFrontAPI.post(
        '/graphql',
        loginMutation,
      )

      const accessTokenCreate = res?.data?.data?.customerAccessTokenCreate
      const token = accessTokenCreate?.customerAccessToken
      const errors = accessTokenCreate?.customerUserErrors

      if (errors?.length > 0) {
        return {
          error: errors[0].message,
        }
      }

      const customerRes = await this.getCustomerWithToken(token.accessToken)
      const decodedCustomerID = base64
        ?.decode(customerRes.response?.data?.id)
        ?.replace(/[^0-9]/g, '')

      const adminRes = await this.shopifyAdminAPI.get(
        `customers/${decodedCustomerID}.json`,
      )
      const customer = adminRes.data?.customer

      authDeviceStorage.setEmailLoginCredentials(email, password)
      return {
        success: true,
        user: {
          ...customer,
          firstName: customer.first_name,
          lastName: customer.last_name,
        },
      }
    } catch (error) {
      console.warn(error)
      return { error: error?.message }
    }
  }

  async signup(userDetails) {
    const customer = {
      email: userDetails.email || '',
      password: userDetails.password || '',
      password_confirmation: userDetails.password || '',
      first_name: userDetails.firstName || '',
      last_name: userDetails.lastName || '',
    }

    const body = {
      customer,
    }

    try {
      const res = await this.shopifyAdminAPI.post('customers.json', body)

      authDeviceStorage.setEmailLoginCredentials(
        customer.email,
        customer.password,
      )

      return { success: true, user: { ...res.data?.customer, ...userDetails } }
    } catch (error) {
      console.warn(error)
      return { error: error?.message }
    }
  }

  retrievePersistedAuthUser() {
    return new Promise(async (resolve, reject) => {
      const { email, password } =
        await authDeviceStorage.getEmailLoginCredentials()

      if (email && password) {
        this.login(email, password).then(res => {
          resolve(res)
        })
      } else {
        resolve(null)
      }
    })
  }

  async getCustomerOrder(id) {
    try {
      const res = await this.shopifyAdminAPI.get(`customers/${id}/orders.json`)

      return { success: true, response: res.data?.orders }
    } catch (error) {
      console.warn(error)
      return { error: error?.message }
    }
  }

  async updateCustomerAddress(customerId, address = {}) {
    let endPoint = `customers/${customerId}/addresses.json`
    let method = 'post'
    const body = {
      address: {
        address1: address.apt,
        address2: address.address,
        city: address.city,
        country: address.country,
        name: address.name,
        province: address.state,
        zip: address.zipCode,
      },
    }

    if (address.id) {
      body.address.id = address.id
      endPoint = `customers/${customerId}/addresses/${address.id}.json`
      method = 'put'
    }

    try {
      const res = await this.shopifyAdminAPI[method](endPoint, body)

      return { success: true, response: res.data?.customer_address }
    } catch (error) {
      console.log(error)
      return { error: error?.message }
    }
  }

  async loadCategories() {
    try {
      if (this.allCategories != null) {
        return { response: this.allCategories, success: true }
      }

      const collections = await this.client.collection.fetchAllWithProducts()

      const response = collections.map(collection => {
        const { id, title, image } = collection
        const photo = image && image.src ? image.src : ''

        return new Category(
          id,
          title,
          photo,
          this.processProducts(collection.products),
        )
      })

      this.allCategories = response

      return { response, success: true }
    } catch (error) {
      return { error, success: false }
    }
  }

  async getCheckout(id) {
    try {
      const checkout = await this.client.checkout.fetch(id)

      return { response: checkout, success: true }
    } catch (error) {
      return { error, success: false }
    }
  }

  async createCheckout(params) {
    try {
      const checkout = await this.client.checkout.create(params)

      return { response: checkout, success: true }
    } catch (error) {
      return { error, success: false }
    }
  }

  async createOrder(params) {
    try {
      const res = await fetch(
        `https://${this.shopifyConfig.domain}/admin/api/2020-07/orders.json`,
        {
          method: 'POST',
          headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Shopify-Access-Token': this.shopifyConfig.password,
          },
          body: JSON.stringify(params),
        },
      )

      return await res.json()
    } catch (error) {
      return { error: new Error(error), success: false }
    }
  }

  async loadProducts() {
    try {
      const products = await this.client.product.fetchAll()

      return { response: this.processProducts(products), success: true }
    } catch (error) {
      return { error, success: false }
    }
  }

  processProducts(products) {
    return products.map(product => {
      const images = this.getImages(product)

      return new Product(
        product.variants[0].id,
        product.title,
        product.variants[0].price,
        product.description,
        images[0],
        images,
      )
    })
  }

  getImages(product) {
    return product.images.map(image => {
      return image.src
    })
  }
}
