import * as d3 from "d3"


const margin = {top: 20, right: 10, bottom: 50, left: 200}

let WIDTH = 900 - margin.left - margin.right;
let HEIGHT = 400 - margin.top - margin.bottom;

class BarChartD3 {
    
    constructor(element) {
        let rect = element.getBoundingClientRect();
        WIDTH = rect.width - margin.left - margin.right
        // d3.select(element).select("svg").remove()
        this.draw(element)
    }

    draw(element) {

        const data = [
            {
                "name": "Burj Khalifa",
                "height": 350,
                "cost": 1.5
            },
            {
                "name": "Shanghai Tower",
                "height": 263.34
            },
            {
                "name": "Abraj Al-Bait Clock Tower",
                "height": 254.04
            },
            {
                "name": "Ping An Finance Centre",
                "height": 253.20
            },
            {
                "name": "Lotte World Tower",
                "height": 230.16
            }
        ]

        const svg = d3.select(element)
        .append("svg")
        .attr("width", WIDTH + margin.right + margin.left)
        .attr("height", HEIGHT + margin.top + margin.bottom)

        let g = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        const y = d3.scaleLinear()
                    .domain([0, d3.max(data, d => d.height)])
                    .range([HEIGHT, 0])

        const x = d3.scaleBand()
                    .domain(data.map( d => d.name))
                    .range([0, WIDTH])
                    .paddingInner(0.5)
                    .paddingOuter(0.2)

        const xAxis = d3.axisBottom(x)
        g.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + HEIGHT + ")")
            .call(xAxis)

            
        const yAxis = d3.axisLeft(y)
        .ticks(3)
        .tickFormat(d => d + "m")
        g.append("g")
            .attr("class", "y axis")
            .call(yAxis)


        g.append("text")
            .attr("class", "x axis-label")
            .attr("x", WIDTH/2)
            .attr("y", HEIGHT + 50)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .text("The world's tallest buildings")

        g.append("text")
            .attr("class", "y axis-label")
            .attr("x", - HEIGHT/2)
            .attr("y", - HEIGHT/4)
            .attr("transform", "rotate(-90)")
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .text("Height (m)")

        g.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr("x", d => x(d.name))
            .attr("y", d => y(d.height))
            .attr("height", d => HEIGHT - y(d.height))
            .attr("width", x.bandwidth())
            .attr("fill", "grey")
    }
}

export default BarChartD3