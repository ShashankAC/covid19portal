import React, { useState, useEffect } from 'react'
import styles from './Navbar.module.css'
import { connect } from 'react-redux'
import updateStates from '../../Store/actions/statesAction'

function Navbar(props) {

    const [statesList, setStatesList] = useState([])
    // const [selectAll, setSelectAll] = useState(true)

    useEffect(() => {
        setStatesList(props.states.states)
        // console.log(props.states.states)
    }, [props.states])

    const handleChange = (event) => {
        let state = event.target.name
        let checked = event.target.checked
        let states = [...statesList]

        if (state === "selectAll" && checked) {
            // setSelectAll(true)
            // for (let i = 0; i < states.length; i++) {
            //     states[i].isChecked = true
            // }
        }
        else if(state === "selectAll" && !checked) {
            // setSelectAll(false)
            // for (let i = 0; i < states.length; i++) {
            //     states[i].isChecked = false
            // }
        }
        else {
            for (let i = 0; i < states.length; i++) {
                if(states[i].name === state && checked) {
                    states[i].isChecked = true
                }
                else if(states[i].name === state && !checked) {
                    states[i].isChecked = false
                }
            }
        }
        setStatesList(states)
        props.onUpdateStates({states: states})
    }
    
    return (
        <div className={styles.container}>
            {/* <div className={styles.states}>
                <label className={styles.selectAll}>Select All</label>
                    <input 
                        type="checkbox"
                        name="selectAll"
                        value={selectAll}
                        checked={selectAll}
                        onChange={handleChange}
                    />
            </div> */}
            {statesList.map((state, i) => (
                <div key={i} className={styles.states}>
                    <label className={styles.statesName}>{state.name}</label>
                    <input  
                        type="checkbox" 
                        value={state.name}
                        checked={state.isChecked} 
                        name={state.name}
                        className={styles.stateCheckBox}
                        onChange={handleChange}/>
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = state => ({
    states: state.states
})

const mapDispatchToProps = {
    onUpdateStates: updateStates
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)