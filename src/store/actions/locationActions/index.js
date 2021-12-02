import { getAllAds } from "../../../config/firebase"

function updateLocation(){
  return async (dispatch) => {
  console.log("ads actions return:")

        const location = await getAllAds()
        dispatch({
          type: 'UPDATE_LOCATION',
          data: location
        })
      }
}

export {
  updateLocation,
}