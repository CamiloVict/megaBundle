import WooCommerceAPI from './root'

export default class WooCommerceNetworkRequestModel {
  constructor(config, version = 'wc/v2') {
    const { url, consumerKey, consumerSecret } = config

    this.apiManager = new WooCommerceAPI({
      url,
      consumerKey,
      consumerSecret,
      wp_api: true,
      version,
      queryStringAuth: true,
    })
    this.pagesLoaded = 0
  }

  async get(path, params = {}) {
    try {
      const response = await this.apiManager.get(path, params)

      return { response, success: true }
    } catch (error) {
      return { error, success: false }
    }
  }

  loadMore(path, batchSize, params = {}) {
    const pagingParams = {
      page: this.pagesLoaded + 1,
      per_page: batchSize,
    }

    return this.get(path, { ...params, ...pagingParams })
  }

  async post(path, params) {
    try {
      const response = await this.apiManager.post(path, params)

      return { response, success: true }
    } catch (error) {
      return { error, success: false }
    }
  }

  async put(path, params) {
    try {
      const response = await this.apiManager.put(path, params)

      return { response, success: true }
    } catch (error) {
      return { error, success: false }
    }
  }

  async delete(path, params = { force: true }) {
    try {
      const response = await this.apiManager.delete(path, params)

      return { response, success: true }
    } catch (error) {
      return { error, success: false }
    }
  }

  reset() {
    this.pagesLoaded = 0
  }
}
