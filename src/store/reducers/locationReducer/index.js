function locationReducer(state = {}, action) {
    switch (action.type) {
        case 'UPDATE_CURRENT_LOCATION': {
            return { ...state, currentLocation: action.data }
        }
        case 'UPDATE_SEARCHED_LOCATION': {
            return { ...state, searchedLocation: action.data }
        }
        case 'UPDATE_SEARCHED_LOCATION_DATA': {
            return { ...state, searchedLocationData: action.data }
        }
        default: {
            return state
        }
    }
}

export default locationReducer