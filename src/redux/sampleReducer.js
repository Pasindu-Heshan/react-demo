import {createSlice} from '@reduxjs/toolkit'

export const filterSlice = createSlice({
    name: 'signup',
    initialState: {
        signup: null,
        login: null,
        isValidUser: false,
        userData:[],
        existingEmail: false,
        invalidEmail:false
    },
    reducers: {
        handleFilter (state, action)  {
            // state.signup = action.payload
            const newUser = action.payload;
            const existingUser = state.userData.find(user => user.data.email === newUser.data.email);
            if(!existingUser){
                state.userData = [...state.userData, newUser]
                state.existingEmail = false
            }else {
                state.existingEmail = true
            }

            console.log(newUser,"newUser")
            console.log(state.userData,"userData")
            console.log(state.existingEmail,"existingEmail")

        },
        loginFilter(state, action) {
            // console.log(action.payload)
            // state.signup = {...state.signup}
            // state.login = action.payload
            // console.log(state.signup,"signup")
            // console.log(state.login,"login")
            // console.log(state.isValidUser)
            const newLogin = action.payload;
            console.log(newLogin, "newLogin")
            const emailCheck = state.userData.find(user => user.data.email !== newLogin.data.email)
            if(emailCheck){
                state.invalidEmail = true
            }else{
                state.invalidEmail = false
            }
            const existingUser = state.userData.find(user => user.data.email === newLogin.data.email && user.data.password === newLogin.data.password );
            if (existingUser) {
                state.isValidUser = true
                state.login = state.userData.filter(user => user.data.email === newLogin.data.email)
            } else {
                state.isValidUser = false
            }
        },
        logoutFilter(state, action) {
            // console.log(state, action)
            // state.login = null
            // state.isValidUser = false
            // const email = action.payload
            // const existingUser = state.userData.find(user=> )

        }

    }
})

const {actions, reducer} = filterSlice
export const {handleFilter, loginFilter} = actions
export default reducer