import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { min, max, extent } from 'd3-array'
import { scaleLinear, scaleOrdinal } from 'd3-scale'
import { schemeCategory10 } from 'd3-scale-chromatic'
import { select, event } from 'd3-selection'
import { brush } from 'd3-brush'
import { line } from 'd3-shape'
import { axisLeft, axisBottom } from 'd3-axis'
import { getNullSamples } from '../lib/lib'
import { isEmpty } from 'ramda'
import '../styles/Graphic.css'

export default class Graphic extends Component{
    constructor(props){
      super(props)

      // Bind this to createBarCharts and calculateChartValues
      this.createBarCharts           = this.createBarCharts.bind(this)
	  this.calculateChartValues      = this.calculateChartValues.bind(this)
      this.brush                     = brush
	  this.calculateChartValues(props) 
    }

    componentDidMount(){
        this.createBarCharts()
    }

    componentDidUpdate(){
      this.createBarCharts()
    }

    componentWillReceiveProps(nextProps){
	  this.calculateChartValues(nextProps) 
    }

    calculateChartValues(props){
        const { 
          zoom, 
          height,
          width,                    
          data,
          onChangeZoomX } = props

        console.log(isEmpty(data[0]))

	     this.colors        = scaleOrdinal(schemeCategory10)
         this.zoom          = zoom
         this.onChangeZoomX = onChangeZoomX

         this.height        = height || 200;        
         this.width         = width  || 480;       
         this.xOffset       = 0.05*this.width;
         this.yOffset       = 0.05*this.height; 
         this.yRangeMin     = 0.2*this.yOffset; 
        
         // should be [[]]
         this.data          = isEmpty(data[0]) ? [getNullSamples()]  : data;

         this.minsAndMaxsOfSamplesFiles = this.data
		                              .map( sampleArray => extent( sampleArray, d=>+d.y ) )
		                              .reduce((a,acc) => a.concat(acc) , []);

         this.minsAndMaxsOfDomain       = this.data
		                              .map( sampleArray => extent( sampleArray, d=>+d.x ) )
		                              .reduce((a,acc) => a.concat(acc) , []);

         this.shortestOfAll            = min(this.minsAndMaxsOfSamplesFiles,d=>d) 
         this.greatestOfAll            = max(this.minsAndMaxsOfSamplesFiles,d=>d)
         this.shortestOfDomain         = min(this.minsAndMaxsOfDomain,d=>d)
         this.greatestOfDomain         = max(this.minsAndMaxsOfDomain,d=>d)
         this.upFreeSpaceCoeff         = 0.1
         this.maxOfDomain              = this.greatestOfAll + (Math.abs(this.greatestOfAll)* this.upFreeSpaceCoeff )
         this.maxLengthOfSamplesFiles  = this
                                          .data
		                                  .reduce( (acc,a) => a.length > acc ? a.length : acc, 0 )

         // Domains
	     this.xInitialDomain            = [this.shortestOfDomain,this.greatestOfDomain]
         this.yInitialDomain            = [this.shortestOfAll,this.maxOfDomain]

         // Chart Scales
	     const xDomain = this.xInitialDomain
	     const yDomain = this.yInitialDomain
         this.xScale = scaleLinear().clamp(true).domain(xDomain).range([this.xOffset,(this.width+this.xOffset)]);
         this.yScale = scaleLinear().clamp(true).domain(yDomain).range([(this.height - this.yOffset),this.yRangeMin]);

         this.xAxis = axisBottom(this.xScale).ticks(12)
         this.yAxis = axisLeft(this.yScale).tickSize(-this.width)

         this.yAxisGroup  = null

        // Defining cursor data accesors 
        this.incomingDataLine = line()
            .defined( d => d )
            .x((d,i) => { return this.xScale(d.x) } )
            .y( d    => { return this.yScale(parseFloat(d.y)) } )
    }

    // Continuar desde aca para generar el zoom en el grafico
    createBarCharts(){
        const node             = this.node
        let incomingDataLine   = this.incomingDataLine
        const colors           = this.colors
        const data             = this.data
		                
        let   idleTimeout    = null
        const idleDelay      = 350

        const xScale         = this.xScale
        const yScale         = this.yScale
        const xInitialDomain = this.xInitialDomain
        const yInitialDomain = this.yInitialDomain
        const xOffset        = this.xOffset
        const yOffset        = this.yOffset
        const height         = this.height
        const onChangeZoomX  = this.onChangeZoomX 
        const maxLengthOfSamplesFiles = this.maxLengthOfSamplesFiles
        const yRangeMin      = this.yRangeMin
        const brush          = this.brush()
                                 .on("end", brushended)

        select(node)
         .html("");

        select(node)
         .selectAll('path.line')
           .data(data)
             .enter()
             .append('path')
             .each(function(d,i){

               select(this)
                .attr('d',incomingDataLine(d))
                .attr('fill','none')
                .attr('fill-opacity','0.5')
                .attr('stroke',colors(i))
                .attr('stroke-width','3')
                .attr('id',() => `curva_${i}`)
                .attr('class','line')
            })

        select(node)
          .append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + (this.height - this.yOffset) + ")")
          .call(this.xAxis)
    
        this.yAxisGroup = 
          select(node)
            .append("g")
            .attr("class", "axis axis--y")
            .attr("transform", "translate(" + (xOffset) + ",0)")
            .call(this.yAxis)
        
        // Horizontal Grid Lines ...
        this.yAxisGroup
          .selectAll('g.tick') 
          .each(function(){
            select(this)
              .selectAll('line')
              .attr('opacity','0.8')
              .attr('stroke','black')
              .attr('stroke-dasharray','1,8')
          })

        // Setting the domain bolder
        select(node)
          .append("line")
          .attr('stroke','black')
          .attr('stroke-width','1')
          .attr('x1', xScale(maxLengthOfSamplesFiles))
          .attr('y1',(yRangeMin))
          .attr('x2', xScale(maxLengthOfSamplesFiles))
          .attr('y2',(height - yOffset));
      
        select(node)
          .append("g")
          .attr("class", "brush")
          .call(brush)


        function brushended(){
          var s = event.selection;
          var x_new_values = []
          var y_new_values = []

          if (!s) {
            if (!idleTimeout) return idleTimeout = setTimeout(idled, idleDelay)
            x_new_values = xInitialDomain
            xScale.domain(xInitialDomain)
            yScale.domain(yInitialDomain)
          } else {
            x_new_values = [s[0][0], s[1][0]].map(xScale.invert, xScale)
            xScale.domain(x_new_values)
            y_new_values = [s[1][1], s[0][1]].map(yScale.invert, yScale)
            yScale.domain(y_new_values)
            select(node).select(".brush").call(brush.move, null)
          }
          zoom()
          //onChangeZoomX()

        }

        const yAxisGroup = this.yAxisGroup
        const xAxis      = this.xAxis
        const yAxis      = this.yAxis
        function zoom() {
          var t = select(node).transition().duration(1000);
          select(node).select(".axis--x").transition(t).call(xAxis);
          select(node).select(".axis--y").transition(t).call(yAxis);
          select(node).selectAll('path.line')
             .transition(t)
             .each(function(d,i){
                select(this).attr('d',incomingDataLine(data[i])) // modificar esto...
            });
        
          yAxisGroup
            .selectAll('g.tick') 
            .transition(t)
            .each(function(){
              select(this)
                .selectAll('line')
                .attr('opacity','0.8')
                .attr('stroke','black')
                .attr('stroke-dasharray','1,8');
            });
        }

        function idled() {
          idleTimeout = null;
        }
    }

    render(){
        return (
          <div className="GraficoUI">
            <svg ref={ node => this.node = node } width={this.width + this.xOffset} height={this.height + this.yOffset}></svg>
          </div>
        )
    }
}


