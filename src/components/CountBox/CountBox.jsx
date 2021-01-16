import React from 'react'
import styles from './CountBox.module.css'

function CountBox(props) {

    return (
        <div className={styles.container}>
            <fieldset>
                <legend>{props.title}</legend>
                <div className={styles.value}>
                    <p style={{fontWeight: props.fontWeight}}>{props.value}</p>
                </div>
            </fieldset>
        </div>
    )
}

export default CountBox