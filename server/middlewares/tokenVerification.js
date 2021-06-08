const verifySignedToken = (userToken) => {
    try{
      const decoded = jwt.verify(userToken, `${process.env.JWT_SECRET}`)
      return { decoded, success:true }
  }
    catch (error) {
          return { success: false ,message:error.message, from:"verifySignedToken"};
      }
  }
  module.exports = verifySignedToken;