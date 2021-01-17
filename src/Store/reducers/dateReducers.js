import * as actionTypes from '../actions/actionTypes'

let todayDate = new Date()
let year = todayDate.getFullYear()
let month = todayDate.getMonth() + 1
if(month < 10) { month = `0${month}`}
let day = todayDate.getDate()
if(day < 10) { day = `0${day}`}
let date = `${year}-${month}-${day}`

const initialState = {
    latestDate: date
}

export default function dateReducer(state=initialState, {type, payload}) {
    switch(type) {
        case actionTypes.UPDATE_DATE:
            return payload.dataState
        default:
            return state;
    }
}