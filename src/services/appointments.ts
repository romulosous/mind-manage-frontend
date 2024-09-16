import { API } from "@/config"

const baseUrl = "/appointment"

export const AppointmentApi = {
    fetchAppointments: async (filters: any) => {
        const query = new URLSearchParams(filters).toString()
        const response = await API.get(`${baseUrl}?${query}`)
        return response
    },
    createAppointment: async (body: any) => {
        const response = await API.post(`${baseUrl}`, body)
        return response
    },
    updateAppointment: async (body: any) => {
        const response = await API.post(`${baseUrl}`, body)
        return response
    },
    deleteAppointment: async (id: string | number) => {
        const response = await API.post(`${baseUrl}/${id}`)
        return response
    },
    fetchAppointmentsById: async (id: string | number) => {
        await API.post(`${baseUrl}/${id}`)
    },
}
