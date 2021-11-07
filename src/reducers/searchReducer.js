import {
  GET_STREETS,
  GET_HOUSES,
  GET_FLATS,
  SET_LOCATION,
  SET_ADDRESS_ID
} from '../actions/types'

const initialState = {
  streets: [],
  houses: [],
  flats: [],
  location: '',
  addressId: '',
  loading: true
}

const searchReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_STREETS:
      return {
        ...state,
        streets: payload.filter((street) => street.cityId === 1),
        houses: [],
        flats: [],
        loading: false
      };
    case GET_HOUSES:
      return {
        ...state,
        houses: payload,
        flats: [],
        loading: false
      }
    case GET_FLATS:
      return {
        ...state,
        flats: payload.filter((flat) => flat.typeId === 3),
        loading: false
      }
    case SET_LOCATION:
      return {
        ...state,
        location: payload,
        loading: false
      }
    case SET_ADDRESS_ID:
      return {
        ...state,
        addressId: payload,
        loading: false
      }
    default:
      return state
  }
}

export default searchReducer