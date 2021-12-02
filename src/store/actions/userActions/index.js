function updateUser(user){
    return {
        type: "UPDATE_USER",
        data: user
    }
}

export {
    updateUser
}