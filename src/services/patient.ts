import { API } from "@/config"

const baseUrl = "/patient"

export const patientApi = {
    fetchPatients: async (filters: any) => {
        const query = new URLSearchParams(filters).toString()
        const response = await API.get(`${baseUrl}?${query}`)
        return response
    },
    createPatient: async (body: any) => {
        const response = await API.post(`${baseUrl}`, body)
        return response
    },
    updatePatient: async (body: any) => {
        const response = await API.post(`${baseUrl}`, body)
        return response
    },
    deletePatient: async (id: string | number) => {
        const response = await API.post(`${baseUrl}/${id}`)
        return response
    },
    fetchPatientsById: async (id: string | number) => {
        await API.post(`${baseUrl}/${id}`)
    },
}
