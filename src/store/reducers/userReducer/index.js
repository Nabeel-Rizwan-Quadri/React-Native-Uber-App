function userReducer(state = {}, action) {
    switch (action.type) {
        case 'UPDATE_USER': {
            return { ...state, user: action.data }
        }
        case 'UPDATE_DRIVERS': {
            return { ...state, drivers: action.data }
        }
        case 'UPDATE_DRIVER_USER_DISTANCE': {
            return { ...state, driverUserDistance: action.data }
        }
        case 'DELETE_USER': {
            return { ...state, user: NULL }
        }
        default: {
            return state
        }
    }
}

export default userReducer