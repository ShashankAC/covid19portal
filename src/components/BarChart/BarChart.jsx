import React, { useEffect, useState } from 'react'
import styles from './BarChart.module.css'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { connect } from 'react-redux'
import axios from 'axios'

function BarChart(props) {

    const [options, setOptions] = useState({})
    const [groupedOptions, setGroupedOptions] = useState({})
    // const [stateNames, setStateNames] = useState([])
    // const [statesTested, setStatesTested] = useState([])
    // const [statesConfirmed, setStatesConfirmed] = useState([])
    // const [statesRecovered, setStatesRecovered] = useState([])
    
    useEffect(() => {

        let states = props.states.states
        let stateNames = []
        states.forEach((state, i) => {
            if(state.isChecked) {
                stateNames.push(state.name)
            }
        })
        // setStateNames(names)

        axios.get('https://api.covid19india.org/v4/timeseries.json')
        .then(response => {
            let data = response.data
            let statesTested = []
            let statesConfirmed = []
            let statesRecovered = []
            if(response.status === 200) {
                Object.keys(data).forEach((state, i) => {
                    let stateSelected = state
                    for(let i = 0; i < props.states.states.length; i++) {
                        if(props.states.states[i].isChecked && props.states.states[i].name === stateSelected) {
                            
                            // eslint-disable-next-line no-loop-func
                            Object.keys(data[stateSelected]).forEach((value) => {
                                let dateSelected = value
                                if(data[stateSelected][dateSelected][props.date.latestDate]) {
                                    if(data[stateSelected][dateSelected][props.date.latestDate]['total']['confirmed']) {
                                        statesConfirmed.push(+data[stateSelected][dateSelected][props.date.latestDate]['total']['confirmed'])
                                    }
                                    if(data[stateSelected][dateSelected][props.date.latestDate]['total']['tested']) {
                                        statesTested.push(+data[stateSelected][dateSelected][props.date.latestDate]['total']['tested'])
                                    }
                                    if(data[stateSelected][dateSelected][props.date.latestDate]['total']['recovered']) {
                                        statesRecovered.push(+data[stateSelected][dateSelected][props.date.latestDate]['total']['recovered'])
                                    }
                                }
                            })
                        }
                    }
                })

                setOptions({
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: 'TESTED CONFIRMED AND RECOVERED STATS'
                    },
                    xAxis: {
                        categories: stateNames
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: ''
                        }
                    },
                    legend: {
                        reversed: false
                    },
                    plotOptions: {
                        series: {
                            stacking: 'normal'
                        }
                    },
                    series: [{
                        name: 'Tested',
                        data: statesTested
                    }, {
                        name: 'Confirmed',
                        data: statesConfirmed
                    }, {
                        name: 'Recovered',
                        data: statesRecovered
                    }]
                })    

                axios.get('https://api.covid19india.org/v4/data.json')
                    .then(response => {
                        let statesList = []
                        if(response.status === 200) {
                            let data = response.data
                        Object.keys(data).forEach((state) => {
                            let stateSelected = state
                            let numbers = []
                            for(let i = 0; i < props.states.states.length; i++) {
                                if(props.states.states[i].isChecked && props.states.states[i].name === stateSelected) {
                                    Object.keys(data[stateSelected]).forEach((value) => {
                                        if(value === "districts") {
                                            let selectedDistrict = value
                                            Object.keys(data[stateSelected][selectedDistrict]).forEach((value, i) => {
                                                let districtName = value
                                                // Object.keys(data[stateSelected][selectedDistrict][districtName]).forEach((value) => {
                                                let total = data[stateSelected][selectedDistrict][districtName]['total']
                                                if(total['confirmed']) {
                                                    numbers.push(total['confirmed'])
                                                }
                                                else {
                                                    numbers.push(0)
                                                }
                                                // })
                                            })
                                        }
                                    })
                                    break
                                }        
                            }
                            let stateData = {
                                name: stateSelected,
                                data: numbers
                            }
                            statesList.push(stateData)
                        })
                    }
                    console.log(statesList)
                    setGroupedOptions({
                        chart: {
                            type: 'bar'
                        },
                        title: {
                            text: 'DISTRICT WISE STATE GROUPED (Confirmed)'
                        },
                        subtitle: {
                            text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
                        },
                        xAxis: {
                            categories: stateNames,
                            title: {
                                text: null
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: '',
                                align: 'high'
                            },
                            labels: {
                                overflow: 'justify'
                            }
                        },
                        tooltip: {
                            valueSuffix: ''
                        },
                        plotOptions: {
                            bar: {
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'top',
                            x: -40,
                            y: 80,
                            floating: true,
                            borderWidth: 1,
                            backgroundColor:
                                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
                            shadow: true
                        },
                        credits: {
                            enabled: false
                        },
                        series: statesList
                        // [
                        //     {
                        //         name: 'State 1',
                        //         data: [107, 31, 635, 203, 2]
                        //     }, {
                        //         name: 'State 2',
                        //         data: [133, 156, 947, 408, 6]
                        //     }, {
                        //         name: 'State 3',
                        //         data: [814, 841, 3714, 727, 31]
                        //     }, {
                        //         name: 'State 4',
                        //         data: [1216, 1001, 4436, 738, 40]
                        //     }
                        // ]
                    })  
                })
                .catch(error => {
                    console.log(error)
                })

                    
            }
        })
        .catch(error => {
            console.log(error)
        })
    }, [props])



    return (
        <div className={styles.barChart}> 
            <div  className={styles.chart}>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
            <div className={styles.chart}>
                <HighchartsReact highcharts={Highcharts} options={groupedOptions} />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    states: state.states,
    date: state.date
})

export default connect(mapStateToProps)(BarChart)