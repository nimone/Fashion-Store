import React, { useContext, useEffect, useState } from "react"
import { ChevronDown } from "react-feather"
import { useLocation } from "react-router-dom"

import ProductList from "@/ui/ProductList"
import Container from "@/components/Container"
import Button from "@/components/Button"
import DropDown, { Select, Option } from "@/components/DropDown"
import useClickOutside from "@/hooks/useClickOutside" 
import api from "../api"
import { CartContext, UserContext } from "@/App"

const sortOptions = [
  "popular",
  "new",
  "price: low to high",
  "price: high to low",
]

export default function ProductsPage() {
  const {cartDispatch} = useContext(CartContext)
  const {user} = useContext(UserContext)
  const query = new URLSearchParams(useLocation().search)
  const [products, setProducts] = useState([])
  const [sort, setSort] = useState(0)
  const [showSortOptions, setShowSortOptions] = useState(false)
  const dropDownRef = useClickOutside(() => setShowSortOptions(false))

  const category = query.get("category")

  useEffect(() => {
    (async () => {
      const resp = await api.fetchProducts(category)
      if (resp.status != "error") {
        setProducts(resp)
      }
    })()
  }, [category])

  useEffect(() => sortProducts(sort), [sort])

  const sortProducts = (sortType) => {
    switch (sortType) {
      case 1:
        setProducts([...products].sort((a, b) => a.updatedAt - b.updatedAt))
      case 2: 
        setProducts([...products].sort((a, b) => a.price - b.price))
        break
      case 3:
        setProducts([...products].sort((a, b) => b.price - a.price))
        break
      default:
        return
    }
  }

  const addToCart = async (product, quantity=1) => {
    if (user) {
      const resp = await api.addProductsToCart([{productID: product._id, quantity}])
      if (resp.status === "ok") {
        cartDispatch({type: "ADD_PRODUCTS", payload: [{...product, quantity}]})
      }
    } else {
      cartDispatch({type: "ADD_PRODUCTS", payload: [{...product, quantity}]})
    }
  }

  return (
    <main>
      <Container
        heading={`Products${category ? " for: " + category : ""}`}
        type="page"
      >
        <section className="flex justify-end">
          <div className="relative" ref={dropDownRef}>
            <span className="font-bold">Sort by:</span>
            <Button
              secondary
              onClick={() => setShowSortOptions((prev) => !prev)}
            >
              {sortOptions[sort]} <ChevronDown className="ml-2" />
            </Button>

            {showSortOptions && (
              <DropDown className="mt-10 inset-x-0" onClick={() => setShowSortOptions(false)}>
                <Select>
                  {sortOptions.map((option, i) => (
                    <Option key={option} onClick={() => setSort(i)}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </DropDown>
            )}
          </div>
        </section>
        <ProductList products={products} onAddToCart={addToCart} />
      </Container>
    </main>
  )
}
