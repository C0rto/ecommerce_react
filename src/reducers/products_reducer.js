import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const products_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true }
  }
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false }
  }
  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, products_loading: true }
  }
  if (action.type === GET_PRODUCTS_SUCCESS) {
    const featured_products = action.payload.products.filter(
      (product) => product.featured === true
    )
    const products = action.payload.products
    return { ...state, products_loading: false, products, featured_products }
  }
  if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, products_loading: false, products_error: true }
  }
  if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    //? We can manage different errors for diff prod so we manage them
    return { ...state, product_loading: true, product_error: false }
  }
  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      product_loading: false,
      product: action.payload.singleProduct,
    }
  }
  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return { ...state, product_loading: false, product_error: true }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default products_reducer
