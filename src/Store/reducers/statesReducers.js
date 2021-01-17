import * as actionTypes from '../actions/actionTypes'

const initialState = {
    states: [   {name: "MH", isChecked: true}, 
                {name: "KA", isChecked: true}, 
                {name: "AP", isChecked: true}, 
                {name: "TN", isChecked: true}, 
                {name: "KL", isChecked: true}, 
                {name: "DL", isChecked: true},
                {name: "UP", isChecked: true},
                {name: "WB", isChecked: true},
                {name: "OR", isChecked: true},
                {name: "RJ", isChecked: true},
                {name: "TG", isChecked: true},
                {name: "CT", isChecked: true}, 
                {name: "HR", isChecked: true},
                {name: "BR", isChecked: true},
                {name: "GJ", isChecked: true},
                {name: "MP", isChecked: true},
                {name: "AS", isChecked: true},
                {name: "PB", isChecked: true},
                {name: "JK", isChecked: true},
                {name: "JH", isChecked: true},
                {name: "UT", isChecked: true},
                {name: "HP", isChecked: true},
                {name: "GA", isChecked: true},
                {name: "PY", isChecked: true},
                {name: "TR", isChecked: true},
                {name: "MN", isChecked: true},
                {name: "CH", isChecked: true},
                {name: "AR", isChecked: true},
                {name: "ML", isChecked: true},
                {name: "NL", isChecked: true},
                {name: "LA", isChecked: true},
                {name: "SK", isChecked: true},
                {name: "AN", isChecked: true},
                {name: "MZ", isChecked: true},
                {name: "DN", isChecked: true},
                {name: "UN", isChecked: true},
                {name: "LD", isChecked: true}
            ]
}

export default function statesReducer(state=initialState, {type, payload}) {
    switch(type) {
        case actionTypes.UPDATE_STATES:
            return payload.dataState
        default:
            return state;
    }
}