function locationReducer(state = {}, action) {
    switch (action.type) {
        case 'UPDATE_CURRENT_LOCATION': {
            return { ...state, currentLocation: action.data }
        }
        case 'UPDATE_PICKUP_LOCATION': {
            return { ...state, pickupLocation: action.data }
        }
        case 'UPDATE_DESTINATION_LOCATION': {
            return { ...state, destinationLocation: action.data }
        }
        default: {
            return state
        }
    }
}

export default locationReducer