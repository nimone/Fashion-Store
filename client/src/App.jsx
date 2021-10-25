import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from "@/ui/Navbar"
import Footer from "@/ui/Footer"
import HomePage from "@/pages/HomePage"
import LoginPage from "@/pages/LoginPage"
import RegisterPage from "@/pages/RegisterPage"
import NotFoundPage from "@/pages/404Page"

export default function App() {
  return (
    <Router>      
      <Navbar />
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

        <Route path="/*">
          <NotFoundPage />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}