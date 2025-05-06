export default function successResponse(status,message,data,res) {
    return res.status(status).json({
        success: true,
        message: message,
        data:data,
        statusCode: status,
    })
}