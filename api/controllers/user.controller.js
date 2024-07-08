import User from '../models/user.model.js'
export const  destroy = async (req, res) => {
    const userId = req.params.id
    await User.findByIdAndDelete(userId)
    res.clearCookie('access_token')
    return res.status(200).json('User deleted successfully')
}











