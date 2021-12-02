function userReducer(state = { }, action) {
    console.log("location reducer: ", action.data)

    switch (action.type){
        case 'UPDATE_USER':{
            return {...state, user:action.data}
        }

        default:{
            return state
        }
    }
}

export default userReducer