export const initialCartState = {
  products: [],
  total: 0
}

export default function cartReducer(state, action) {
  let cartTotal = state.total

  switch(action.type) {
    case "SET_PRODUCTS":
      for (let product of action.payload) {
        cartTotal += product.quantity * product.price
      }
      return {
        ...state, 
        products: action.payload,
        total: cartTotal,
      }
    case "ADD_PRODUCT":
      return {
        ...state, 
        products: [...state.products, action.payload],
        total: cartTotal + action.payload.price
      }
    case "REMOVE_PRODUCT":
      let removedProduct
      return {
        ...state, 
        products: state.products.filter(product => {
          if (product._id === action.payload) {
            removedProduct = p
            return true
          }
          return false
        }),
        total: cartTotal - removedProduct.price
      }
    case "INCREMENT_PRODUCT_QUANTITY":
      let newProducts = [...state.products]
      productIdx = newProducts.findIndex(p => p._id === action.payload.id)
      newProducts[productIdx].quantity++

      return {
        ...state,
        products: newProducts,
        total: cartTotal + newProducts[productIdx].price
      }
    case "DECREMENT_PRODUCT_QUANTITY":
      newProducts = [...state.products]
      productIdx = newProducts.findIndex(p => p._id === action.payload.id)
      if (newProducts[productIdx].quantity > 1) {
        newProducts[productIdx].quantity--
        return {
          ...state,
          products: newProducts,
          total: cartTotal - newProducts[productIdx].price
        }
      }
      return state
    default:
      return state
  }
}