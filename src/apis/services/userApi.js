import axiosInstance from "../axiosInstance";
const User = '/users'

const userApi = {
    registerUser: (userData) => axiosInstance.post(`${User}/register`, userData),
    signInUser: (credentials) => axiosInstance.post(`${User}/signin`, credentials),
    signOutUser: () => axiosInstance.get(`${User}/signout`),
    getUserProfile: () => axiosInstance.get(`${User}/profile`),
    updateUserProfile: (updateData) => axiosInstance.patch(`${User}/update`,updateData),
}
export default userApi;