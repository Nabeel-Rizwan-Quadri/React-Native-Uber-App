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

function updateSelectedCar(selectedCar) {
  return {
    type: "UPDATE_SELECTED_CAR",
    data: selectedCar
  }
}

function updateTripFare(tripFare) {
  return {
    type: "UPDATE_TRIP_FARE",
    data: tripFare
  }
}

function updatePaymentMethod(paymentMethod) {
  return {
    type: "UPDATE_PAYMENT_METHOD",
    data: paymentMethod
  }
}

export {
  updatePickupLocation,
  updateDestinationLocation,
  updateSelectedCar,
  updateTripFare,
  updatePaymentMethod
}