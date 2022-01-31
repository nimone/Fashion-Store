const API_URL = "http://localhost:5000"

function setAccessToken(token) {
  localStorage.setItem('token', token)
}
function getAccessToken() {
  return localStorage.getItem('token')
}

function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user))
}
function getUser() {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

async function registerUser({fullname, email, password}) {
  const resp = await fetch(API_URL+"/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({fullname, email, password}),
  })
  return await resp.json()
}

async function loginUser({email, password}) {
  const resp = await fetch(API_URL+"/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password}),
  })
  const data = await resp.json()

  if (data.accessToken) {
    setAccessToken(data.accessToken)
    await fetchUserDetails()
  }
  return data
}

function logoutUser() {
  localStorage.clear()
}

async function createUserCart() {
  const resp = await fetch(API_URL+"/carts", {
    method: "POST",
    headers: {
      "x-access-token": getAccessToken(),
    },
  })
  return await resp.json()
}

async function fetchUserDetails() {
  const resp =  await fetch(API_URL+"/users/me", {
    headers: {
      "x-access-token": getAccessToken(),
    }
  })
  const {status, user} = await resp.json()
  if (status == "ok") {
    if (!user.avatarSrc) {
      user.avatarSrc = `https://avatars.dicebear.com/api/initials/${user.fullname}.svg`
    }
    setUser(user)
  }
  return {status, user}
}

async function fetchProducts(category, newArrivals=false) {
  let query = `new=${newArrivals ? "true" : "false"}${category ? "&category="+category : ""}`
  const resp = await fetch(API_URL+"/products?"+query)
  return await resp.json()
}
async function fetchProduct(id) {
  const resp = await fetch(API_URL+"/products/"+id)
  return await resp.json()
}

export default {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  fetchUserDetails,
  fetchProducts,
  fetchProduct,
  createUserCart,
}