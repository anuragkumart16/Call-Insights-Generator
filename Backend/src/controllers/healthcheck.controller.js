import { asyncHandler } from "../utils/asyncHandler.js";

const healthCheck = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
        statusCode: 200
    })
})

export {healthCheck}