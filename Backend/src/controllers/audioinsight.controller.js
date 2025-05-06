import { asyncHandler } from "../utils/asyncHandler.js";
import getTranscriptionViaLink from "../utils/getTranscriptionViaLink.js";
import errorResponse from "../utils/errorResponse.js";
import successResponse from "../utils/successResponse.js";
import geminiResponse from "../utils/geminiResponse.js";
import createEntry from "./../utils/createEntry.js"



const audioInsightViaLink = asyncHandler(async (req, res) => {
    const body = req.body
    console.log(new Date().toLocaleString(), body);
    const { agentId, audioLink, customerId } = body
    if (!agentId || !audioLink || !customerId) return errorResponse(400, 'All Fields are Required', {}, res);

    let transcript
    getTranscriptionViaLink(audioLink)
        .then((data) => {
            if (data.err_code == 'REMOTE_CONTENT_ERROR') return errorResponse(500, 'Some Error Occured', data.err_msg, res);
            if (data.err_code) return errorResponse(500, 'Some Error Occured', data.err_msg, res);

            transcript = data.results.channels[0].alternatives[0].transcript
            return data.results.channels[0].alternatives[0]
        })
        .then((data) => {
            const prompt = `Here is a transcript of a sales/customer service call:

            ${JSON.stringify({ data })}

            Please do the following:

            1. Provide a summary of the conversation in a dictionary format.
            2. List key points from the transcript in a dictionary.
            3. Evaluate the sales agent's performance:
            - Give a performance rating out of 10.
            - Provide feedback.
            - Highlight areas of improvement.
            4. Generate next actionables as a dictionary with keys:
            - "training": topics the agent should learn or practice.
            - "follow_up": items to follow up on.
            - "improvement_plan": steps to improve based on this call.

            Respond only in structured JSON format with each section clearly separated.`;

            return geminiResponse(prompt)
        })
        .then((responseData) => {
            const rawText = responseData.candidates[0].content.parts[0].text;
            const cleanedText = rawText.replace(/```json|```/g, '').trim();

            let finalObject;
            try {
                finalObject = JSON.parse(cleanedText);
            } catch (err) {
                console.error("Failed to parse JSON:", err);
                return err
            }

            return finalObject
        })
        .then((data)=>{
            return createEntry(customerId, agentId, audioLink, transcript, data)
        })
        .then((data) => {
            return successResponse(200, 'Audio Transcribed Successfully', data, res)
        })
        .catch((err) => {
            return errorResponse(500, 'Some Error Occured', err , res)
        })

})

export { audioInsightViaLink }