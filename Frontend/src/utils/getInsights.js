export default async function getInsights(agentId, customerId, audioLink, file) {
    if (audioLink) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/audioinsight/link`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    agentId,
                    audioLink,
                    customerId
                })
            })
            const data = await response.json()
            console.log(data)
            return data
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }
    else {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('agentId', agentId);
        formData.append('customerId', customerId);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/audioinsight/file`, {
                method: 'POST',
                body: formData
            })
            const data = await response.json()
            console.log(data)
            return data
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

}