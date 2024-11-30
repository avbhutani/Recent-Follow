async function checkAuthToken(req,res,next) {
    const token = req.headers.authtoken 
    if(!token) {
        return res.status(400).send(
            {
                success:'false',
                message:'Kindly Login!'
            }
        )
    }
    return next()
}