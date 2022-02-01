import { createContext, useEffect, useReducer, useState } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import ScrollToTop from "@/ScrollToTop"

import Navbar from "@/ui/Navbar"
import Footer from "@/ui/Footer"
import HomePage from "@/pages/HomePage"
import LoginPage from "@/pages/LoginPage"
import RegisterPage from "@/pages/RegisterPage"
import NotFoundPage from "@/pages/404Page"
import ProductsPage from "@/pages/ProductsPage"
import ProductDetailsPage from "@/pages/ProductDetailsPage"
import CartPage from "@/pages/CartPage"
import OrdersPage from "@/pages/OrdersPage"
import OrderDetailsPage from "@/pages/OrderDetailsPage"
import AccountPage from "@/pages/AccountPage"
import api from '@/api'
import cartReducer, { initialCartState } from '@/reducers/cartReducer'

export const UserContext = createContext()
export const CartContext = createContext()

export default function App() {
  const [user, setUser] = useState(null)
  const [cart, cartDispatch] = useReducer(cartReducer, initialCartState)
  
  useEffect(() => {
    (async () => {
      const resp = await api.fetchUserDetails()
      console.log(resp)
      if (resp.status == "ok") {
        setUser(resp.user)
      }
    })()
  }, [])

  useEffect(() => {
    if (!user) return
    (async () => {
      const resp = await api.getUserCart()
      console.log(resp)
      if (resp.products) {
        cartDispatch({type: "SET_PRODUCTS", payload: resp.products})
      }
    })()
  }, [user])

  return (
    <Router>      
      <CartContext.Provider value={{cart, cartDispatch}}>
      <UserContext.Provider value={{user, setUser}}>
        <Navbar />
        <ScrollToTop>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>        
          <Route path="/login">
            {!user ? <LoginPage /> : <Redirect to={{pathname: '/'}} />}
          </Route>        
          <Route path="/register">
            {!user ? <RegisterPage /> : <Redirect to={{pathname: '/'}} />}
          </Route>
          <Route exact path="/products">
            <ProductsPage />
          </Route>
          <Route path="/products/:id">
            <ProductDetailsPage />
          </Route>
          <Route path="/cart">
            <CartPage />
          </Route>
          <Route exact path="/orders">
            {user ? <OrdersPage /> : <Redirect to={{pathname: '/login'}} />}
          </Route>
          <Route path="/orders/:id">
            {user ? <OrderDetailsPage /> : <Redirect to={{pathname: '/login'}} />}
          </Route>
          <Route path="/account">
            {user ? <AccountPage /> : <Redirect to={{pathname: '/login'}} />}
          </Route>

          <Route path={["/404", "/*"]}>
            <NotFoundPage />
          </Route>
        </Switch>
        </ScrollToTop>

        <Footer />
      </UserContext.Provider>
      </CartContext.Provider>
    </Router>
  );
}