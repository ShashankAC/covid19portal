import * as actionTypes from './actionTypes'

export default function updateStates(dataState) {
    return {
        type: actionTypes.UPDATE_STATES,
        payload: {
            dataState: dataState
        }
    }
}