import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filtered_products: [], // array of filtered
  all_products: [], // default values
  grid_view: true,
  sort: 'price-lowest', // controlled input for sorting
  //! controlled input for filters too multiple filters in one object
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext()

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: { products } })
  }, [products])

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS })
    dispatch({ type: SORT_PRODUCTS })
  }, [products, state.sort, state.filters])

  const productView = (value) => {
    if (value === 'GRID') {
      dispatch({ type: SET_GRIDVIEW })
    }
    if (value === 'LIST') {
      dispatch({ type: SET_LISTVIEW })
    }
  }

  const updateSort = (e) => {
    let value = e.target.value
    dispatch({ type: UPDATE_SORT, payload: { value } })
  }

  const updateFilter = (e) => {
    let name = e.target.name
    let value = e.target.value
    // in the button can't access to value so
    if (name === 'category') {
      value = e.target.textContent
    }
    if (name === 'color') {
      value = e.target.dataset.color
    }
    if (name === 'price') {
      value = Number(value) // valore è una stringa
    }
    if (name === 'shipping') {
      value = e.target.checked
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } })
  }

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTERS })
  }

  return (
    <FilterContext.Provider
      value={{ ...state, productView, updateSort, updateFilter, clearFilter }}
    >
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
