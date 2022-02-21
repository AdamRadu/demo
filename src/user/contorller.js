import * as api from "./api"

export const postLogin = async (data) =>{

    try {
        const result = await api.postLogin(data)

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

export const signupUser = async (data) =>{
    var result

    if (data.username.includes("@")){
        result = await api.postSignupWithEmail({email_address: data.username, password: data.password, confirm_password: data.confirmationPassword})
    }else{
        result = await api.postSignupWithUsername({username: data.username, password: data.password, confirm_password: data.confirmationPassword})
    }

    const resultWithCode = {
        data: result.data,
        code: result.status
    }

    return resultWithCode
}

export const updateUser = async (data) =>{

    const body = JSON.stringify({username: data.username, email_address: data.email})

    const result = await api.patchUpdateUser({id: data.id, body: body})

    const resultWithCode = {
        data: result.data,
        code: result.status
    }

    return resultWithCode
}

export const updatePassword = async (data) =>{

    const body = JSON.stringify({old_password: data.password.old,  new_password: data.password.new, confirm_password: data.password.confirmation})

    const result = await api.patchUpdatePassword({id: data.id, body: body})

    const resultWithCode = {
        data: result.data,
        code: result.status
    }

    return resultWithCode
}

export const refreshTokens = async (data) =>{

    const token = JSON.stringify({refresh_token: data})

    const result = await api.refreshTokens(token)

    const resultWithCode = {
        data: result.data,
        code: result.status
    }

    return resultWithCode
}

export const getUsers = async () =>{

    const result = await api.getUsers()

    const resultWithCode = {
        data: result.data,
        code: result.status
    }

    return resultWithCode
}