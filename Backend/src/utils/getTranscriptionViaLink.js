async function getTranscriptionViaLink(url) {
    const response = await fetch('https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true', {
        method: 'POST',
        headers: {
            'Authorization': `Token ${process.env.DEEPGRAM_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
    });
    const data = await response.json();
    return data
}

export default getTranscriptionViaLink