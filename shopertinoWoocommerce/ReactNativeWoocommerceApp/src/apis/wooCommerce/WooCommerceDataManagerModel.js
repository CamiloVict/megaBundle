import authDeviceStorage from '../AuthDeviceStorage'
import Category from './../../models/Category'
import Product from './../../models/Product'
import Order from './../../models/Order'

export default class WooCommerceDataManagerModel {
  constructor(networkManager) {
    this.networkManager = networkManager
    this.productsImages = {}
  }

  async createCustomer(params) {
    try {
      const customer = await this.networkManager.post('customers', params)

      authDeviceStorage.setEmailLoginCredentials(params.email, params.password)

      return {
        response: customer.response,
        success: true,
      }
    } catch (error) {
      return { error, success: false }
    }
  }

  async authCustomer(params) {
    try {
      const customer = await this.networkManager.post('token', params)

      authDeviceStorage.setEmailLoginCredentials(
        params.username,
        params.password,
      )

      return {
        response: customer.response,
        success: true,
      }
    } catch (error) {
      return { error, success: false }
    }
  }

  async retrievePersistedAuthUser() {
    try {
      const { email, password } =
        await authDeviceStorage.getEmailLoginCredentials()

      if (email && password) {
        const customer = await this.authCustomer({ username: email, password })

        return {
          response: customer.response,
          success: true,
        }
      } else {
        return { success: false }
      }
    } catch (error) {
      return { error, success: false }
    }
  }

  async getCustomer(params) {
    try {
      const customer = await this.networkManager.get('customers', params)

      return {
        response: customer.response,
        success: true,
      }
    } catch (error) {
      return { error, success: false }
    }
  }

  async updateCustomer(id, params) {
    try {
      const customer = await this.networkManager.put(`customers/${id}`, params)

      return {
        response: customer.response,
        success: true,
      }
    } catch (error) {
      return { error, success: false }
    }
  }

  logout() {
    authDeviceStorage.removeEmailLoginCredentials()
  }

  fetchOrders = async (user, params) => {
    try {
      const customers = await this.networkManager.loadMore('orders', 10, params)

      console.log('customers===-=', customers)

      // name

      return {
        response: this.processOrders(user, customers.response),
        success: true,
      }
    } catch (error) {
      console.log('error', error)
      return { error, success: false }
    }
  }

  async fetchCustomers() {
    try {
      const customers = await this.networkManager.loadMore('customers', 10)

      return {
        response: customers.response,
        success: true,
      }
    } catch (error) {
      return { error, success: false }
    }
  }

  async getCustomer(params) {
    try {
      const customer = await this.networkManager.get('customers', params)

      return {
        response: customer.response,
        success: true,
      }
    } catch (error) {
      return { error, success: false }
    }
  }

  async updateCustomer(id, params) {
    try {
      const customer = await this.networkManager.put(`customers/${id}`, params)

      return {
        response: customer.response,
        success: true,
      }
    } catch (error) {
      return { error, success: false }
    }
  }

  async placeOrder(params) {
    try {
      const order = await this.networkManager.post('orders', params)

      return {
        response: order.response,
        success: true,
      }
    } catch (error) {
      return { error, success: false }
    }
  }
  async updateOrder(id, params) {
    try {
      const order = await this.networkManager.put(`orders/${id}`, params)

      return {
        response: order.response,
        success: true,
      }
    } catch (error) {
      return { error, success: false }
    }
  }

  async fetchMoreProducts() {
    try {
      const products = await this.networkManager.loadMore('products', 10)

      return {
        response: this.processProducts(products.response),
        success: true,
      }
    } catch (error) {
      return { error, success: false }
    }
  }

  async getProductById(id) {
    try {
      const product = await this.networkManager.get(`products/${id}`)

      return {
        response: product.response,
        success: true,
      }
    } catch (error) {
      return { error, success: false }
    }
  }

  async fetchCategories() {
    try {
      const categories = await this.networkManager.loadMore(
        'products/categories',
        10,
      )

      return {
        response: this.processCategories(categories.response),
        success: true,
      }
    } catch (error) {
      return { error, success: false }
    }
  }

  processOrders(user, orders) {
    return orders.map(order => {
      const selectedPaymentMethod = {
        brand: order.payment_method,
        title: order.payment_method_title,
      }
      const selectedShippingMethod = {
        id:
          order.shipping_lines?.length > 0
            ? order.shipping_lines[0].method_id
            : '',
        label:
          order.shipping_lines?.length > 0
            ? order.shipping_lines[0].method_title
            : '',
        amount:
          order.shipping_lines?.length > 0 ? order.shipping_lines[0].total : '',
      }

      const shoppingBag = this.getWooCommerceShoppingBagItems(order.line_items)

      return new Order(
        new Date(order.date_created),
        order.id,
        order.status,
        Number(order.total),
        shoppingBag,
        user,
        selectedShippingMethod,
        selectedPaymentMethod,
        user.shippingAddress,
        user.id,
      )
    })
  }

  processProducts(products) {
    return products.map(product => {
      const images = this.getImages(product)

      this.productsImages[product.id] = images

      return new Product(
        product.id,
        product.name,
        product.price,
        product.description,
        images[0],
        images,
        this.getCategories(product.categories),
        null,
        null,
        product.attributes,
      )
    })
  }

  processCategories(categories) {
    return categories.map(category => {
      const { id, name, image } = category
      const photo = image && image.src ? image.src : ''

      return new Category(id, name, photo)
    })
  }

  getWooCommerceShoppingBagItems = lineItems => {
    return lineItems.map(item => {
      const photo =
        this.productsImages[item.product_id]?.length > 0
          ? this.productsImages[item.product_id][0]
          : ''
      return {
        id: item.product_id,
        quantity: item.quantity ? item.quantity : 1,
        photo,
        name: item.name,
        price: item.price,
      }
    })
  }

  // processOrder(order) {
  //   return
  // }

  getImages(product) {
    return product.images.map(image => {
      return image.src
    })
  }

  getCategories(categories) {
    return categories.map(category => {
      return category.id
    })
  }
}
