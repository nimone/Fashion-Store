import { useState } from 'react'
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

export default function App() {
  return (
    <Router>      
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

        <Route path={["/404", "/*"]}>
          <NotFoundPage />
        </Route>
      </Switch>
      </ScrollToTop>

      <Footer />
    </Router>
  );
}