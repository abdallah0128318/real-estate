import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    errorMsg: null,
    isLoading: false,
    userData: null,
    usernameError: null,
    emailError: null,
    passwordError: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state) => {
        state.isLoading = true
    },
    signinSuccess: (state, action) => {
        state.isLoading = false
        state.errorMsg = null
        state.userData = action.payload

    },
    signinFail: (state, action) => {
        state.isLoading = false
        state.errorMsg = action.payload
    },
    deleteSuccess: (state) =>
    {
      state.userData = null
      state.errorMsg = null
    },
    deleteFail: (state, action) =>
    {
      state.errorMsg = action.payload
    },
    signOutSuccess: (state) =>
    {
      state.userData = null
      state.errorMsg = null
    },
    signOutFail: (state, action) =>
    {
      state.errorMsg = action.payload
    },
    imageUploadSuccess: (state, action)=>{
      state.userData.photo = action.payload
    },
    beforeUpdate: (state) => {
      state.isLoading = true
    },
    updateSuccess: (state, action) => {
        state.isLoading = false
        state.userData = action.payload
        state.usernameError = null
        state.emailError = null
        state.passwordError = null
    },
    updateFail: (state, action) => {
        state.isLoading = false
        state.usernameError = action.payload.username
        state.emailError = action.payload.email
        state.passwordError = action.payload.password
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
            signinFail, signIn, signinSuccess, deleteFail, deleteSuccess, 
            signOutFail, signOutSuccess, imageUploadSuccess, beforeUpdate, updateFail, updateSuccess 
            } = userSlice.actions

export default userSlice.reducer