import axios from 'axios'
import { setAlert } from './alertAction'
import {
  GET_CLIENTS,
  ADD_CLIENT,
  UPDATE_CLIENT,
  DELETE_CLIENT
} from './types'

export const getClients = (flatId) => async dispatch => {
  try {
    const res = await axios.get(`/HousingStock/clients/?addressId=${flatId}`)

    dispatch({
      type: GET_CLIENTS,
      payload: res.data
    })
  } catch (err) {
    dispatch(setAlert('Error to get clients', 'error'))
  }
}

export const addClient = (clientData, addressId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post('/HousingStock/client', clientData, config)

    const bindNewClient = {
      addressId, clientId: res.data.id
    }

    await axios.put('/HousingStock/bind_client', bindNewClient, config)

    clientData.id = res.data.id

    dispatch({
      type: ADD_CLIENT,
      payload: clientData
    })

    dispatch(setAlert('Житель добавлен', 'success'))
  } catch (err) {
    dispatch(setAlert(`Error to add a client. ${err.message}`, 'error'))
  }
}

export const updateClient = (clientData, addressId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.get(`/HousingStock/clients?addressId=${addressId}`)

    const updatingClient = res.data.filter((client) => client.id === clientData.id)

    await axios.delete(`/HousingStock/bind_client/${updatingClient[0].bindId}`)

    const updatedClient = await axios.post('/HousingStock/client', clientData, config)

    const bindUpdatedClient = {
      addressId, clientId: updatedClient.data.id
    }

    await axios.put('https://dispex.org/api/vtest/HousingStock/bind_client', bindUpdatedClient, config)

    clientData.id = updatedClient.data.id

    const payloadData = {
      oldId: updatingClient[0].id,
      clientData
    }

    dispatch({
      type: UPDATE_CLIENT,
      payload: payloadData
    })

    dispatch(setAlert('Данные жителя отредактированы', 'success'))
  } catch (err) {
    dispatch(setAlert(`Error to update a client. ${err.message}`, 'error'))
  }
}

export const deleteClient = (clientData, addressId) => async dispatch => {
  try {
    const res = await axios.get(`/HousingStock/clients?addressId=${addressId}`)

    const deletingClient = res.data.filter((client) => client.id === clientData.id)

    await axios.delete(`/HousingStock/bind_client/${deletingClient[0].bindId}`)

    dispatch({
      type: DELETE_CLIENT,
      payload: clientData.id
    })

    dispatch(setAlert('Данные жителя удалены', 'success'))
  } catch (err) {
    dispatch(setAlert(`Error to delete a client. ${err.message}`, 'error'))
  }
}