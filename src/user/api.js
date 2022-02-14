const axios = require("axios")
const port= 8080

export const postLogin = async (data) =>
{
    const response = await axios.post(`http://localhost:${port}/users/login`, data, {crossDomain: true})

    return response
}

export const refreshTokens = async (data) =>
{
    const response = await axios.post(`http://localhost:${port}/users/refreshTokens`, data, {crossDomain: true})

    return response
}