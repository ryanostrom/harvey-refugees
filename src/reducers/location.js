import * as types from '../actions/actionTypes';

const initialState = {
  current: null,
  available: [
    {
      name: "Delco Center",
      address: "4601 Pecan Brook Drive, Austin, TX 78724",
      latitude: "30.3175138",
      longitude: "-97.6627078",
      area: "Austin",
    },
    {
      name: "LBJ High School",
      address: "7309 Lazy Creek Dr., Austin, TX 78724",
      latitude: "30.3134996",
      longitude: "-97.658856",
      area: "Austin",
    },
    {
      name: "Smithville Recreation Center",
      address: "106 Gazley Street, Smithville, TX 78957",
      latitude: "30.0087163",
      longitude: "-97.1657356",
      area: "Bastrop",
    },
    {
      name: "Bell County Expo Center",
      address: "301 W Loop 121, Belton, TX 76513",
      latitude: "31.0295651",
      longitude: "-97.4817594",
      area: "Belton",
    },
    {
      name: "Randolph Air Force Base",
      address: "53 Military Plaza, Universal City, TX 78148",
      latitude: "29.5327561",
      longitude: "-98.2822675",
      area: "San Antonio",
    },
  ],
  reservations: [
    {
      name: "Visit Austin",
      url: "http://reservations.austintexas.org/hotel/list",
    },
    {
      name: "Texas Hotel and Lodging Association",
      url: "https://texaslodging.com",
    },
  ]
}

export default function location(state = initialState, action = {}) {
  switch (action.type) {
    case types.SETCURRENT:
      return {
        ...state,
        current: action.payload
      }
    default:
      return state
  }
}
