import { API } from "@/config"

const baseUrl = "/auth"

export const authApi = {
	login: async (body: any) => {
		const response = await API.post(`${baseUrl}/login`, body)
		return response
	},

	revoke: async () => {
		await API.post(`${baseUrl}/revoke`)
	},

	refresh: async () => {
		await API.post(`${baseUrl}/refresh`)
	},
	sendRecoveryToken: async (body: any) => {
		await API.post(`${baseUrl}/password-recovery`, body)
	},
	changePassword: async (body: any) => {
		await API.post(`${baseUrl}/recover-password`, body)
	},
}
