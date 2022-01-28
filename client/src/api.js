const API_URL = "http://localhost:5000"

function setAccessToken(token) {
  localStorage.setItem('token', token)
}

function getAccessToken() {
  return localStorage.getItem('token')
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
  }
  return data
}

export default {
  registerUser,
  loginUser,
}