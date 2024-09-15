import { toast } from "react-hot-toast"

export interface Error {
    error?: {
        property:
        | "Name"
        | "Password"
        | "Email"
        | "Cellphone"
        | "Address"
        | "Number"
        | "City"
        | "Uf"
        | "Zipcode"
        | "BirthDate"
        | "CivilStatus"
        | "Nationality"
        message: string
    }
    title?: string
    message?: string
    statusCode?: number
}

import { errorFields, ErrorMessageKey, ErrorMessages } from "./errors"

export async function handleGenericApiError(err: Error) {
    if (err.message == undefined) {
        return toast.error(ErrorMessages["CONNECTION_REFUSED"])
    }

    if (err.statusCode === 500) {
        return toast.error(ErrorMessages["GENERIC"])
    }

    if (err.error?.property) {
        return toast.error(`Campo ${errorFields[err?.error.property]} inválido`)
    }

    if (err.message) {
        if (err.message === "SOME_VALUE_IS_MISSING") {
            return "SOME_VALUE_IS_MISSING"
        }
        const errorMessageKey = err?.message as ErrorMessageKey
        return toast.error(ErrorMessages[errorMessageKey])
    } else {
        return toast.error(ErrorMessages["GENERIC"])
    }
}
