import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    errorMsg: null,
    isLoading: false,
    userData: null
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
        console.log(action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { signinFail, signIn, signinSuccess } = userSlice.actions

export default userSlice.reducer