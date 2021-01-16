import React, { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

function Navbar() {

    const [selectedStates, setSelectedStates] = useState([])
    const [statesList, setStatesList] = useState([])
    
    
    useEffect(() => {
        setStatesList(["MH", "KA", "AP", "TN", "KL", "DL", "UP", "WB", "OR", "RJ",
        "TG", "CT", "HR", "BR", "GJ", "MP", "AS", "PB", "JK", "JH", "UT", "HP", "GA",
        "PY","TR","MN","CH","AR","ML","NL","LA","SK","AN","MZ","DN","UN","LD"])
    }, [])

    const handleChange = (event) => {
        let states = [...selectedStates]
        if(event.target.checked) {
            states.push(event.target.value)
            setSelectedStates(states)
        }
        else {
            let newList = []
            for (let i = 0; i < selectedStates.length; i++) {
                if(event.target.value !== selectedStates[i]) {
                    newList.push(selectedStates[i])
                }
            }
            states = newList
            setSelectedStates(states)
        }
        console.log(states)
    }
    
    return (
        <div className={styles.container}>
            {statesList.map((state, i) => (
                <input key={i} type="checkbox" value={state} name={state} onChange={handleChange}/>
            ))}
        </div>
    )
}

export default Navbar