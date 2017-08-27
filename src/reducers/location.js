import * as types from '../actions/actionTypes';

const initialState = {
  current: null,
  available: [
    {
      name: "Delco Center",
      address: {
        street: "4601 Pecan Brook Drive",
        city: "Austin",
        state: "TX",
        zip: "78724",
      },
      latitude: "30.3175138",
      longitude: "-97.6627078",
      area: "Austin",
    },
    {
      name: "LBJ High School",
      address: {
        street: "7309 Lazy Creek Drive",
        city: "Austin",
        state: "TX",
        zip: "78724",
      },
      latitude: "30.3134996",
      longitude: "-97.658856",
      area: "Austin",
    },
    {
      name: "Smithville Recreation Center",
      address: {
        street: "106 Gazley Street",
        city: "Smithville",
        state: "TX",
        zip: "78957",
      },
      latitude: "30.0087163",
      longitude: "-97.1657356",
      area: "Bastrop",
    },
    {
      name: "Bell County Expo Center",
      address: {
        street: "301 W Loop 121",
        city: "Belton",
        state: "TX",
        zip: "76513",
      },
      latitude: "31.0295651",
      longitude: "-97.4817594",
      area: "Belton",
    },
    {
      name: "Randolph Air Force Base",
      address: {
        street: "53 Military Plaza",
        city: "Universal City",
        state: "TX",
        zip: "78148",
      },
      latitude: "29.5327561",
      longitude: "-98.2822675",
      area: "San Antonio",
    },
  ],
  reservations: [
    {
      city: "Austin",
      sites: [
        {
          name: "Visit Austin",
          url: "http://reservations.austintexas.org/hotel/list",
        },
        {
          name: "Texas Hotel and Lodging Association",
          url: "https://texaslodging.com",
        },
      ]
    },
    {
      city: "San Antonio",
      sites: [
        {
          name: "My San Antonio Recommendations",
          url: "http://www.mysanantonio.com/news/weather/article/S-A-hotels-accommodating-Hurricane-Harvey-11957845.php#photo-13895085",
        },
      ]
    },
    {
      city: "Houston",
      sites: [
        {
          name: "Hotel Derek",
          url: "https://www.destinationhotels.com/hotel-derek",
        },
        {
          name: "Hotel Garden Inn",
          url: "https://www.facebook.com/HGIHoustonCypressStation/?hc_ref=ARTIbZsO9K9aIYCReXj3nYbrgAvdDvTxaHNj2ebF0A0MWzRUA14vGl7GJbWvJpC8ml8"
        }
      ]
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
