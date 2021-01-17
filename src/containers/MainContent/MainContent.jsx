import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styles from './MainContent.module.css'
import CountBox from '../../components/CountBox/CountBox'
import axios from 'axios'
import BarChart from '../../components/BarChart/BarChart'

function MainContent(props) {

    const [statesCount, setStatesCount] = useState([])
    const [tested, setTested] = useState(0)
    const [confirmed, setConfirmed] = useState(0)
    const [recovered, setRecovered] = useState(0)

    useEffect(() => {
        let selectedStateCount = 0
        for (let i = 0; i < props.states.states.length; i++) {
            if(props.states.states[i]['isChecked']) {
                selectedStateCount++
            }
        }
        setStatesCount(selectedStateCount)
        axios.get('https://api.covid19india.org/v4/timeseries.json')
        .then(response => {
            let data = response.data
            let testedC = 0, confirmedC = 0, recoveredC = 0
            if(response.status === 200) {
                // console.log(data)
                // console.log(props.date.latestDate)
                Object.keys(data).forEach((state, i) => {
                    // console.log(i, state)
                    let stateSelected = state
                    for(let i = 0; i < props.states.states.length; i++) {
                        if(props.states.states[i].isChecked && props.states.states[i].name === stateSelected) {
                            
                            // eslint-disable-next-line no-loop-func
                            Object.keys(data[stateSelected]).forEach((value) => {
                                let dateSelected = value
                                if(data[stateSelected][dateSelected][props.date.latestDate]) {
                                    if(data[stateSelected][dateSelected][props.date.latestDate]['total']['confirmed']) {
                                        confirmedC += +data[stateSelected][dateSelected][props.date.latestDate]['total']['confirmed']
                                    }
                                    if(data[stateSelected][dateSelected][props.date.latestDate]['total']['tested']) {
                                        testedC += +data[stateSelected][dateSelected][props.date.latestDate]['total']['tested']
                                    }
                                    if(data[stateSelected][dateSelected][props.date.latestDate]['total']['recovered']) {
                                        recoveredC += +data[stateSelected][dateSelected][props.date.latestDate]['total']['recovered']
                                    }
                                }
                            })
                        }
                    }
                })
                setConfirmed(confirmedC)
                setTested(testedC)
                setRecovered(recoveredC)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }, [props])


    return (
        <div>
            <div className={styles.stats}>
                <CountBox title="Selected States" value={statesCount} fontWeight="bold" />
                <CountBox title="Tested" value={tested} fontWeight="bold" />
                <CountBox title="Confirmed" value={confirmed} fontWeight="bold" />        
                <CountBox title="Recovered" value={recovered} fontWeight="bold" />  
            </div>     
            <div className={styles.charts}>
                <BarChart />
            </div>  
        </div>
    )
}

const mapStateToProps = state => ({
    states: state.states,
    date: state.date
})

export default connect(mapStateToProps)(MainContent)