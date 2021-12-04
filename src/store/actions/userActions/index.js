function updateUser(user){
    return {
        type: "UPDATE_USER",
        data: user
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
    deleteUser
}