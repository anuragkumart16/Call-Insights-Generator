import { CallInsight } from "./../models/callinsights.model.js";
async function createEntry(customerId, agentId, audioLink, transcript, data) {
    if (!customerId || !agentId || !audioLink || !transcript || !data) throw new Error('All Fields are Required');
    try {
        const callInsight = await CallInsight.create({
            customerId,
            agentId,
            audioLink,
            audioTranscript: transcript,
            callInsight: data
        })
        return callInsight
    } catch (error) {
        throw new Error(error)
    }
}

export default createEntry