function requestTripReducer(state = {}, action) {
    switch (action.type) {
        case 'UPDATE_PICKUP_LOCATION': {
            return { ...state, pickupLocation: action.data }
        }
        case 'UPDATE_DESTINATION_LOCATION': {
            return { ...state, destinationLocation: action.data }
        }
        case 'UPDATE_SELECTED_CAR': {
            return { ...state, selectedCar: action.data }
        }
        case 'UPDATE_TRIP_FARE': {
            return { ...state, tripFare: action.data }
        }
        case 'UPDATE_PAYMENT_METHOD': {
            return { ...state, paymentMethod: action.data }
        }
        default: {
            return state
        }
    }
}

export default requestTripReducer