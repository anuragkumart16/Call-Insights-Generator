async function geminiResponse(prompt) {
  const apiKey = process.env.GEMINI_API_KEY
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}

export default geminiResponse