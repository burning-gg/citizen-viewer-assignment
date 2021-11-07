import axios from 'axios'
import { setAlert } from './alertAction'
import {
  GET_STREETS,
  GET_HOUSES,
  GET_FLATS,
  SET_LOCATION,
  SET_ADDRESS_ID
} from './types'

export const getStreets = () => async dispatch => {
  try {
    const res = await axios.get('/Request/streets')

    dispatch({
      type: GET_STREETS,
      payload: res.data
    })
  } catch (err) {
    dispatch(setAlert('Error to get streets', 'error'))
  }
}

export const getHouses = (streetId) => async dispatch => {
  try {
    const res = await axios.get(`/Request/houses/${streetId}`)

    dispatch({
      type: GET_HOUSES,
      payload: res.data
    })
  } catch (err) {
    dispatch(setAlert('Error to get houses', 'error'))
  }
}

export const getFlats = (houseId) => async dispatch => {
  try {
    const res = await axios.get(`/Request/house_flats/${houseId}`)

    dispatch({
      type: GET_FLATS,
      payload: res.data
    })
  } catch (err) {
    dispatch(setAlert('Error to get flats', 'error'))
  }
}

export const setLocation = (location) => dispatch => {
  dispatch({
    type: SET_LOCATION,
    payload: location
  })
}

export const setAddressId = (flatId) => dispatch => {
  dispatch({
    type: SET_ADDRESS_ID,
    payload: flatId
  })
}