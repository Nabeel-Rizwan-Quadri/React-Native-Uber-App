function locationReducer (state = {  }, action) {
    console.log("location reducer: ", action.data)
    switch (action.type){
        case 'UPDATE_LOCATION':{
            return {...state, location: action.data}
        }
        default:{
            return state
        }
    }
}

export default locationReducer