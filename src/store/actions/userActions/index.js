import { getAllDrivers } from "../../../config/firebase"

function updateUser(user){
    return {
        type: "UPDATE_USER",
        data: user
    }
}

function updateDrivers(driversData){
    return {
        type: "UPDATE_DRIVERS",
        data: driversData
    }
}

function updateDriverUserDistance(sortedDriverUserDistance){
    return {
        type: "UPDATE_DRIVER_USER_DISTANCE",
        data: sortedDriverUserDistance
    }
}

function deleteUser(user){
    return {
        type: "DELETE_USER",
        data: user
    }
}

export {
    updateUser,
    deleteUser,
    updateDrivers,
    updateDriverUserDistance
}