export default function errorResponse(status,message,data,res,) {
    console.log(data)
    return res.status(status).json({
        success: false,
        message: message,
        data:data.message,
        statusCode: status
    })
}