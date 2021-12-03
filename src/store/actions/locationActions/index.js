function updateCurrentLocation(currentLocation) {
  return {
    type: "UPDATE_CURRENT_LOCATION",
    data: currentLocation
  }
}

function updatePickupLocation(pickupLocation) {
  return {
    type: "UPDATE_PICKUP_LOCATION",
    data: pickupLocation
  }
}

function updateDestinationLocation(destinationLocation) {
  return {
    type: "UPDATE_DESTINATION_LOCATION",
    data: destinationLocation
  }
}

export {
  updateCurrentLocation,
  updatePickupLocation,
  updateDestinationLocation
}