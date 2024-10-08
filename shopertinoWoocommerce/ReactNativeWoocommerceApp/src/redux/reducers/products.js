const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST'
const UPDATE_SHOPPING_BAG = 'UPDATE_SHOPPING_BAG'
const REMOVE_FROM_SHOPPING_BAG = 'REMOVE_FROM_SHOPPING_BAG'
const HANDLE_ORDER_PLACED = 'HANDLE_ORDER_PLACED'
const SEARCH_BY_KEY_TEXT = 'SEARCH_BY_KEY_TEXT'
const SET_PRODUCTS = 'SET_PRODUCTS'
const SET_CATEGORIES = 'SET_CATEGORIES'
const LOAD_ORDER_HISTORY = 'LOAD_ORDER_HISTORY'
const LOGOUT = 'logout'

export const setWishlist = data => ({
  type: ADD_TO_WISHLIST,
  data,
})

export const updateShoppingBag = data => ({
  type: UPDATE_SHOPPING_BAG,
  data,
})

export const removeFromShoppingBag = data => ({
  type: REMOVE_FROM_SHOPPING_BAG,
  data,
})

export const resetCheckout = data => ({
  type: HANDLE_ORDER_PLACED,
  data,
})

export const setProducts = data => ({
  type: SET_PRODUCTS,
  data,
})

export const setCategories = data => ({
  type: SET_CATEGORIES,
  data,
})

export const loadOrderHistory = data => ({
  type: LOAD_ORDER_HISTORY,
  data,
})

export const searchByKeyText = data => ({
  type: SEARCH_BY_KEY_TEXT,
  data,
})

const productsInitialState = {
  wishlist: [],
  shoppingBag: [],
  orderHistory: [],
  searchResultProducts: [],
  allProducts: [], //just inserted this
  categories: [],
  newArrivals: [],
  featured: [],
  bestSellers: [],
  totalShoppinBagPrice: 0,
}

export const products = (state = productsInitialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return updateWishlist(state, action.data)
    case UPDATE_SHOPPING_BAG:
      return updateShoppingBagProduct(state, action.data)
    case REMOVE_FROM_SHOPPING_BAG:
      return removeProductFromShoppingBag(state, action.data)
    case HANDLE_ORDER_PLACED:
      return {
        ...state,
        shoppingBag: [],
        totalShoppinBagPrice: 0,
        currentOrderId: '',
      }
    case SEARCH_BY_KEY_TEXT:
      return onChangeText(state, action.data)
    case SET_PRODUCTS:
      return updateProducts(state, action.data)
    case SET_CATEGORIES:
      return {
        ...state,
        categories: [...action.data],
      }
    case LOAD_ORDER_HISTORY:
      return {
        ...state,
        orderHistory: [...action.data],
      }

    case LOGOUT:
      return productsInitialState

    default:
      return state
  }
}

const updateShoppingBagPrice = state => {
  const pricesArray = []

  state.shoppingBag.map(product => {
    pricesArray.push(product.price * (product.quantity ?? 1))
  })

  let totalPrice = 0

  if (pricesArray.length) {
    totalPrice = pricesArray
      .reduce((accumulator, currentValue) => accumulator + currentValue)
      .toFixed(2)
  }

  return {
    ...state,
    totalShoppinBagPrice: totalPrice,
  }
}

const onChangeText = (state, text) => {
  let searchResultProducts = []

  if (text) {
    searchResultProducts = state.allProducts.filter(product => {
      return (
        product.name &&
        product.name.toLowerCase().indexOf(text.toLowerCase()) >= 0
      )
    })
  }

  if (searchResultProducts.length > 0) {
    return {
      ...state,
      searchResultProducts,
    }
  } else {
    return {
      ...state,
      searchResultProducts: state.allProducts,
    }
  }
}

const updateWishlist = (state, product) => {
  const wishlist = [...state.wishlist]
  const indexToUpdate = state.wishlist.findIndex(wishlistProduct => {
    return wishlistProduct.id === product.id
  })

  if (indexToUpdate !== -1) {
    wishlist.splice(indexToUpdate, 1)
  } else {
    wishlist.push(product)
  }

  return {
    ...state,
    wishlist,
  }
}

const updateShoppingBagProduct = (state, product) => {
  const shoppingBag = [...state.shoppingBag]
  const indexToUpdate = state.shoppingBag.findIndex(shoppingBagProduct => {
    return shoppingBagProduct.id === product.id
  })

  if (indexToUpdate !== -1) {
    shoppingBag[indexToUpdate] = product
  } else {
    shoppingBag.push(product)
  }

  return updateShoppingBagPrice({
    ...state,
    shoppingBag,
  })
}

const removeProductFromShoppingBag = (state, product) => {
  const shoppingBag = [...state.shoppingBag]
  const indexToUpdate = state.shoppingBag.findIndex(shoppingBagProduct => {
    return shoppingBagProduct.id === product.id
  })

  if (indexToUpdate !== -1) {
    shoppingBag.splice(indexToUpdate, 1)
  }

  return updateShoppingBagPrice({
    ...state,
    shoppingBag,
  })
}

const updateProducts = (state, allProducts) => {
  // const categoryProducts = products.filter(product => {
  //   return product.category === categoryId;
  // });

  return {
    ...state,
    allProducts,
    searchResultProducts: allProducts,
  }
}
