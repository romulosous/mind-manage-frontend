import Endpoint from "./endpoint"

interface ApiError {
	statusCode: number
	message: string
}

type cacheType =
	| "default"
	| "force-cache"
	| "no-cache"
	| "no-store"
	| "only-if-cached"
	| "reload"


class FetchAPI {
	private baseURL: string

	constructor(baseURL: string) {
		this.baseURL = baseURL
	}

	private async request<T>(
		endpoint: string,
		method: string,
		headers: HeadersInit,
		body?: object,
		cache: cacheType = "no-cache",
		signal?: AbortSignal
	): Promise<T> {
		const url = `${this.baseURL}${endpoint}`
		const options: RequestInit = {
			method,
			credentials: "include",
			signal: signal,
			headers: { "Content-Type": "application/json", "Accept": "*/*", ...headers },
			cache,
		}

		if (body) {
			options.body = JSON.stringify(body)
		}

		try {
			const response = await fetch(url, options)
			const data = await this.handleResponse(response)
			return data
		} catch (error) {
			if (error instanceof AuthError) {
				const refreshResponse = (await this.refreshToken()) as { statusCode: number }
				if (refreshResponse.statusCode === 401) {
					throw error
				}
				const response = await fetch(url, options)
				return this.handleResponse(response)
			} else {
				if (signal?.aborted as unknown as AbortSignal) {
					return true as T
				}
				throw error
			}
		}
	}

	private async handleResponse(response: Response) {
		if (response.status === 401) {
			throw new AuthError("UNAUTHORIZED")
		}
		if (!response.ok) {
			const errorData: ApiError = await response.json()
			throw errorData
		}

		const contentType = response.headers.get("content-type")

		if (contentType && contentType.includes("application/json")) {
			return response.json()
		} else {
			return response.text()
		}
	}

	private async refreshToken() {
		try {
			const response = await fetch(this.baseURL + "/auth/refresh", {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
			})

			if (!response.ok) {
				localStorage.removeItem("auth")
				localStorage.clear()
				window.location.reload()
				throw new AuthError("UNAUTHORIZED_REFRESH_TOKEN")
			}

			return {
				statusCode: 200,
				payload: {},
			}
		} catch (error) {
			if (error instanceof AuthError) {
				const errorResponse = error.toErrorResponse()
				return errorResponse
			} else {
				return console.error(error)
			}
		}
	}

	public get<T>(
		endpoint: string,
		cache: cacheType = "no-cache",
		params?: object,
		headers?: HeadersInit
	): Promise<T> {
		return this.request<T>(endpoint, "GET", headers || {}, undefined, cache)
	}

	public post<T>(
		endpoint: string,
		data?: object,
		headers?: HeadersInit,
		signal?: AbortSignal
	): Promise<T> {
		return this.request<T>(endpoint, "POST", headers || {}, data, undefined, signal)
	}

	public put<T>(endpoint: string, data?: object, headers?: HeadersInit): Promise<T> {
		return this.request<T>(endpoint, "PUT", headers || {}, data)
	}

	public patch<T>(endpoint: string, data?: object, headers?: HeadersInit): Promise<T> {
		return this.request<T>(endpoint, "PATCH", headers || {}, data)
	}

	public delete<T>(endpoint: string, headers?: HeadersInit): Promise<T> {
		return this.request<T>(endpoint, "DELETE", headers || {})
	}
}

class AuthError extends Error {
	statusCode: number

	constructor(message: string) {
		super(message)
		this.name = "AuthError"
		this.statusCode = 401
	}

	toErrorResponse() {
		return {
			statusCode: this.statusCode,
			message: "UNAUTHORIZED",
		}
	}
}

const API = new FetchAPI(Endpoint.backUrl)

export default API
