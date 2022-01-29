import React, { useEffect, useRef } from "react";

function useClickOutside(callbackFn){
  let domNode = useRef()

  useEffect(() => {
    let handler = (event) => {
      if (!domNode.current?.contains(event.target)) {
        callbackFn()
      }
    }
    document.addEventListener("mousedown", handler)

    return () => {
      document.removeEventListener("mousedown", handler)
    }
  })

  return domNode
}

export default useClickOutside