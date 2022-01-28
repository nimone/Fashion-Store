import { createContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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

export const UserContext = createContext()

export default function App() {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    (async () => {
      const resp = await api.fetchUserDetails()
      console.log(resp)
      if (resp.status == "ok") {
        setUser(resp.user)
      }
    })()
  }, [])

  return (
    <Router>      
      <UserContext.Provider value={{user, setUser}}>
        <Navbar />
        <ScrollToTop>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>        
          <Route path="/login">
            <LoginPage />
          </Route>        
          <Route path="/register">
            <RegisterPage />
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
            <OrdersPage />
          </Route>
          <Route path="/orders/:id">
            <OrderDetailsPage />
          </Route>
          <Route path="/account">
            <AccountPage />
          </Route>

          <Route path={["/404", "/*"]}>
            <NotFoundPage />
          </Route>
        </Switch>
        </ScrollToTop>

        <Footer />
      </UserContext.Provider>
    </Router>
  );
}