import React, { useEffect, useState } from "react"
import { ChevronDown } from "react-feather"
import { useLocation } from "react-router-dom"

import ProductList from "@/ui/ProductList"
import Container from "@/components/Container"
import Button from "@/components/Button"
import DropDown, { Select, Option } from "@/components/DropDown"
import useClickOutside from "@/hooks/useClickOutside" 
import api from "../api"

const sortOptions = [
  "popular",
  "new",
  "price: low to high",
  "price: high to low",
]

export default function ProductsPage() {
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

  const addToCart = async (productID) => {
    const resp = await api.addProductsToCart([{productID, quantity: 1}])
    console.log(resp)
  }

  return (
    <main>
      <Container
        heading={`Products${category ? ": " + category : ""}`}
        type="page"
      >
        <section className="flex justify-end">
          <div className="relative" ref={dropDownRef}>
            <span className="font-bold">Sort:</span>
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
