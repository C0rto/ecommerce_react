import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    // lo spread operator è necessario perchè dovendo impostare entrambi gli stati allo stesso punto della memoria per funzionamento JS una volta filtrati i prodotti non si tornerà allo stato iniziale. Lo spread operator invece permette di fare una copia dei valori evitando di puntare allo stesso memory place
    let maxPrice = action.payload.products.map((p) => p.price)
    maxPrice = Math.max(...maxPrice)
    return {
      ...state,
      all_products: [...action.payload.products],
      filtered_products: [...action.payload.products],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    }
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true }
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false }
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload.value }
  }
  if (action.type === SORT_PRODUCTS) {
    const { filtered_products, sort } = state
    let tempProducts = [...filtered_products]
    if (sort === 'price-lowest') {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price)
    }
    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price)
    }
    if (sort === 'name-a') {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }
    if (sort === 'name-z') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    }
    return { ...state, filtered_products: tempProducts }
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload
    return { ...state, filters: { ...state.filters, [name]: value } }
  }

  if (action.type === FILTER_PRODUCTS) {
    //TODO filtering product
    const { all_products } = state
    const {
      text,
      company,
      category,
      color,
      min_price,
      max_price,
      price,
      shipping,
    } = state.filters
    let tempProducts = [...all_products] // to filter we need default data if we don't use a copy of the all_products we run out of item in a lil
    // start filtering here
    // ! TEXT FILTER
    if (text) {
      tempProducts = tempProducts.filter((product) =>
        product.name.toLowerCase().startsWith(text)
      )
    }
    // ! CATEGORY FILTER
    if (category !== 'all') {
      tempProducts = tempProducts.filter(
        (product) => product.category.toLowerCase() === category
      )
    }
    // ! COMPANY FILTER
    if (company !== 'all') {
      tempProducts = tempProducts.filter(
        (product) => product.company.toLowerCase() === company
      )
    }
    // ! COLORS FILTER
    if (color !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((c) => c === color)
      })
    }
    // ! PRICE FILTER
    tempProducts = tempProducts.filter((product) => product.price <= price)
    // !  SHIPPING FILTER
    if (shipping) {
      tempProducts = tempProducts.filter((product) => product.shipping === true)
    }
    return { ...state, filtered_products: tempProducts }
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false,
      },
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
