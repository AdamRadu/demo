const axios = require("axios")
const loginPort= 8081
const port = 8080

export const postLogin = async (data) =>{
    const response = await axios.post(`http://localhost:${loginPort}/users/login`, data, {crossDomain: true})

    return response
}

export const postSignupWithEmail = async (data) =>{
    const response = await axios.post(`http://localhost:${port}/signup/email`, data, {crossDomain: true})

    return response
}

export const postSignupWithUsername = async (data) =>{
    const response = await axios.post(`http://localhost:${port}/signup/username`, data, {crossDomain: true})

    return response
}

export const patchUpdateUser = async (data) =>{

    const response = await axios.patch(`http://localhost:${port}/users/${data.id}/update`, data.body, {crossDomain: true})

    return response
}

export const refreshTokens = async (data) =>{
    const response = await axios.post(`http://localhost:${loginPort}/users/refreshTokens`, data, {crossDomain: true})

    return response
}

