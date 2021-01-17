import * as actionTypes from './actionTypes'

export default function updateDate(dataState) {
    return  {
        type: actionTypes.UPDATE_DATE,
        payload: {
            dataState: dataState
        }
    }
}

