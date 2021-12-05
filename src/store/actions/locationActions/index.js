function updateCurrentLocation(currentLocation) {
  return {
    type: "UPDATE_CURRENT_LOCATION",
    data: currentLocation
  }
}

function updateSearchedLocation(searchedLocation) {
  return {
    type: "UPDATE_SEARCHED_LOCATION",
    data: searchedLocation
  }
}

function updateSearchedLocationData(searchedLocationData) {
  return {
    type: "UPDATE_SEARCHED_LOCATION_DATA",
    data: searchedLocationData
  }
}


export {
  updateCurrentLocation,
  updateSearchedLocation,
  updateSearchedLocationData
}