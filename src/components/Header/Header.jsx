import React, { useState, useEffect } from 'react'
import styles from './Header.module.css'
import { connect } from 'react-redux'
import updateDate from '../../Store/actions/dataAction'

function Header(props) {

    const [date, setDate] = useState('')
    const [maxDate, setMaxDate] = useState('')
    
    useEffect(() => {
        let date  = props.date.latestDate.split("T")[0]
        setDate(date)
        let todayDate = new Date()
        setMaxDate(todayDate)
    }, [props.date])

    const handleChange = (event) => {
        switch(event.target.name) {
            case "date":
                setDate(event.target.value)
                props.onUpdateDate({
                    latestDate: event.target.value
                })
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
                max={maxDate}
                className={styles.dateInput} />
        </div>
    )
}

const mapStateToProps = state => ({
    date: state.date
})

const mapDispatchToProps = {
    onUpdateDate: updateDate
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)