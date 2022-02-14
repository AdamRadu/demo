import * as api from "./api"

export const postLogin = async (data) =>{

    try {
        const result = await api.postLogin(data)

        console.log(result)

        const resultWithCode = {
            data: result.data,
            code: result.status
        }

        return resultWithCode
      }
      catch (error) {
        return error
      }
}

export const refreshTokens = async (data) =>{

    const token = JSON.stringify({refresh_token: data})

    const result = await api.refreshTokens(token)

    const resultWithCode = {
        data: result.data,
        code: result.status
    }

    console.log(resultWithCode)

    return resultWithCode
}