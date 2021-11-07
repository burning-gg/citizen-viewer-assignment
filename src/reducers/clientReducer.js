import {
  GET_CLIENTS,
  ADD_CLIENT,
  UPDATE_CLIENT,
  DELETE_CLIENT
} from '../actions/types'

const initialState = {
  clients: [],
  loading: true
}

const clientReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_CLIENTS:
      return {
        ...state,
        clients: payload,
        loading: false
      };
    case ADD_CLIENT:
      return {
        ...state,
        clients: [...state.clients, payload],
        loading: false
      }
    case UPDATE_CLIENT:
      const { oldId, clientData } = payload
      return {
        ...state,
        clients: state.clients.map(client =>
          client.id === oldId ? { ...client, id: clientData.id, name: clientData.name, phone: clientData.phone, email: clientData.email } : client),
        loading: false
      };
    case DELETE_CLIENT:
      return {
        ...state,
        clients: state.clients.filter(client => client.id !== payload),
        loading: false
      }
    default:
      return state
  }
}

export default clientReducer

/*
...state,
        clients: state.clients.map(client =>
          client.id === payload.id ? payload : client),
*/