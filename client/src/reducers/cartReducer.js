export const initialCartState = {
  products: [],
  total: 0
}

export default function cartReducer(state, action) {
  let cartTotal = state.total

  switch(action.type) {
    case"RESET":
      return {
        products: [],
        total: 0,
      }
    case "SET_PRODUCTS":
      for (let product of action.payload) {
        cartTotal += product.quantity * product.price
      }
      return {
        ...state, 
        products: action.payload,
        total: cartTotal,
      }
    case "ADD_PRODUCTS":
      console.log(action.payload)
      return {
        ...state,
        products: [
          ...state.products, 
          ...action.payload.map(product => ({
            id: product._id,         
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: product.quantity,
          })),
        ],
        total: cartTotal + action.payload.reduce((sum, p) => sum+p.price,0)
      }
    case "REMOVE_PRODUCT":
      let removedProduct
      return {
        ...state, 
        products: state.products.filter(p => {
          if (p.id === action.payload) {
            removedProduct = p
            return false
          }
          return true
        }),
        total: removedProduct 
          ? cartTotal - removedProduct.price * removedProduct.quantity
          : cartTotal,
      }
    case "SET_PRODUCT_QUANTITY":
      if (action.payload.quantity < 1) {
        return state
      }
      const newProducts = [...state.products]
      const productIdx = newProducts.findIndex(p => p.id === action.payload.id)
      const prevQuantity = newProducts[productIdx].quantity
      newProducts[productIdx].quantity = action.payload.quantity

      return {
        ...state,
        products: newProducts,
        total: cartTotal + (action.payload.quantity - prevQuantity) * newProducts[productIdx].price,
      }
    case "CLEAR_CART":
      return {
        products: [],
        total: 0,
      }
    default:
      return state
  }
}