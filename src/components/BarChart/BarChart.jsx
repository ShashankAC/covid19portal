import React, { useEffect, useRef } from 'react'
import BarD3 from './BarChartD3'
import classes from './BarChart.module.css'

function BarChart() {

    let barChart = useRef()

    useEffect(() => {
        draw();
        window.addEventListener('resize', this.draw);

        return () => { 
            window.removeEventListener('resize', this.draw);
        }
    }, []) 


    const draw = () => {
        new BarD3(barChart.current)
    }

    return (
        <div ref="barChart" className={classes.barChart}> </div>
    )
}

export default BarChart