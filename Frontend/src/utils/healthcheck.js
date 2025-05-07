const url = import.meta.env.VITE_BACKEND_URL

export default async function healthCheck() {
    try {
        const response = await fetch(`${url}/api/v1/healthcheck`)
        const data = await response.json()
        console.log(data)
        return data 
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }   
}