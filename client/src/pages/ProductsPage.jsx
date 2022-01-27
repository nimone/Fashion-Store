import React, { useState, useEffect } from "react"
import { ChevronDown } from "react-feather"
import { useLocation } from "react-router-dom"
import { popularProducts } from "@/dummydata"

import ProductList from "@/ui/ProductList"
import Container from "@/components/Container"
import Button from "@/components/Button"
import DropDown, { Select, Option } from "@/components/DropDown"

const sortOptions = [
  "popular",
  "new",
  "price: low to high",
  "price: high to low",
]

export default function ProductsPage() {
  const query = new URLSearchParams(useLocation().search)
  const [products, setProducts] = useState([...popularProducts])
  const [sort, setSort] = useState(0)
  const [showSortOptions, setShowSortOptions] = useState(false)

  const category = query.get("category")

  useEffect(() => {
    setShowSortOptions(false)
  }, [sort])

  return (
    <main>
      <Container
        heading={`Products${category ? ": " + category : ""}`}
        type="page"
      >
        <section className="flex justify-end">
          <div className="relative">
            <span className="font-bold">Sort:</span>
            <Button
              secondary
              onClick={() => setShowSortOptions((prev) => !prev)}
            >
              {sortOptions[sort]} <ChevronDown className="ml-2" />
            </Button>

            {showSortOptions && (
              <DropDown className="mt-10 inset-x-0">
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
        <ProductList products={popularProducts} />
      </Container>
    </main>
  )
}
