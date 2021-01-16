import React, { useState } from 'react'
import styles from './Header.module.css'

function Header() {
    const [date, setDate] = useState('')
    
    const handleChange = (event) => {
        switch(event.target.name) {
            case "date":
                setDate(event.target.value)
                break
            default:
                break
        }
    }

    return (
        <div className={styles.container}>
            <input 
                type="date" 
                value={date} 
                name="date" 
                onChange={handleChange}
                className={styles.dateInput} />
        </div>
    )

}

export default Header