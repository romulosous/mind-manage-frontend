import { API } from "@/config"

const baseUrl = "/patient"

interface Response {
    data: [];
    currentPage: number;
    totalPages: number;
    count: number;
  }

export const patientApi = {
    fetchPatients: async (filters: any) => {
        const query = new URLSearchParams(filters).toString()
        const response = await API.get<Response>(`${baseUrl}?${query}`)
        return response
    },
    createPatient: async (body: any) => {
        const response = await API.post(`${baseUrl}`, body)
        return response
    },
    updatePatient: async (id: string | number, body: any) => {
        const response = await API.put(`${baseUrl}/${id}`, body)
        return response
    },
    deletePatient: async (id: string | number) => {
        const response = await API.delete(`${baseUrl}/${id}`)
        return response
    },
    fetchPatientById: async (id: string | number) => {
        const response = await API.get(`${baseUrl}/${id}`)
        return response
    },
}
