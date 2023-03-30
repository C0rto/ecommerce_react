import { act } from 'react-dom/test-utils'
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  //!!! ADDING ITEMS TO CART ---------------
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload
    //? check if there is already the same item in the cart id+ color = same this is only a finder
    const tempItem = state.cart.find((item) => item.id === id + color)
    //! if the item is already in the cart
    if (tempItem) {
      // the item is already in the cart double check if is the same then change only the amount, map the array end check for identity
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max
          }
          return { ...cartItem, amount: newAmount }
        } else {
          return cartItem
        }
      })
      return { ...state, cart: tempCart }
    } else {
      //! if the item is new, then create a new Obj and add to the state.cart
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      }
      return { ...state, cart: [...state.cart, newItem] }
    }
  }
  // !!! REMOVING ITEM FROM CART
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload.id)
    return { ...state, cart: tempCart }
  }
  // !!! CLEANING THE CART
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] }
  }
  // !!! TOGGLE CART AMOUNT
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === 'I') {
          let newAmount = item.amount + 1
          if (newAmount > item.max) {
            newAmount = item.max
          }
          return { ...item, amount: newAmount }
        }
        if (value === 'D') {
          let newAmount = item.amount - 1
          if (newAmount < 1) {
            newAmount = 1
          }
          return { ...item, amount: newAmount }
        }
      } else {
        return item
      }
    })
    return { ...state, cart: tempCart }
  }
  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem
        total.total_items += amount
        total.total_amount += price * amount

        return total
      },
      {
        // returning object
        total_items: 0,
        total_amount: 0,
      }
    )
    return { ...state, total_amount, total_items }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
