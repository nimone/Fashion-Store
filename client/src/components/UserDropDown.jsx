import React, { useState } from "react"
import { LogOut } from "react-feather"
import { Link } from "react-router-dom"
import DropDown, { Select, Option } from "@/components/DropDown"
import useClickOutside from "@/hooks/useClickOutside"

function UserDropDown({ user, onLogout }) {
  const dropDownRef = useClickOutside(() => setShowDropDown(false))
  const [showDropDown, setShowDropDown] = useState(false)

  return (
    <div className="relative flex items-center" ref={dropDownRef}>					
      <button 
        onClick={() => setShowDropDown(prev => !prev)}
        className="h-8 w-8 rounded-full overflow-hidden focus:(ring-4 ring-gray-300 outline-none)">
        <img 
          className="object-cover" 
          src={user.avatarSrc} 
          alt="user avatar" 
        />
      </button>
      {showDropDown && (
        <DropDown className="mt-10 right-0">
          <div className="px-4 py-3">
            <span className="block">{user.fullname}</span>
            <span className="block font-medium text-gray-900 truncate">{user.email}</span>
          </div>
          <Select onClick={() => setShowDropDown(false)}>
            <Link to="/cart">
              <Option>Cart</Option>
            </Link>
            <Link to="/orders">
              <Option>Orders</Option>
            </Link>
            <Link to="/account">
              <Option>Account</Option>
            </Link>
            <Link to="/" onClick={onLogout}>
              <Option className="flex items-center">
                <LogOut width={20} height={20} className="mr-2" />Logout
              </Option>
            </Link>
          </Select>
        </DropDown>
      )}
    </div>
  )
}

export default UserDropDown