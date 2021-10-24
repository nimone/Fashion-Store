import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from "@/ui/Navbar"
import Footer from "@/ui/Footer"
import HomePage from "@/pages/HomePage"
import LoginPage from "@/pages/LoginPage"
import RegisterPage from "@/pages/RegisterPage"

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
      </Switch>

      <Footer />
    </Router>
  );
}