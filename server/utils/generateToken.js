const jwt = require("jsonwebtoken")

const generateToken = async(id) => {
    const token= await jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
        expiresIn: "30d"
    })
    console.log(token);
    const userVerification = await jwt.verify(token, `${process.env.JWT_SECRET}`);
    console.log(userVerification);
}

module.exports = generateToken;