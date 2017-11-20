import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie} from 'recharts';
import etymologies from '../../example_charts/data.js'


const mapStateToProps = (state) => {
   console.log(state, 'this is the state in Chart ')
   return {}
}

/*
const data = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];
*/

class SimplePieChart extends Component{
    constructor(props){
      super(props)
    }

    render(){
        console.log(etymologies);

        var data = {};
        var formattedData = [];
        var total = 0;

        etymologies.etymologies.forEach(function(d) {
            total += d.word.count;
            if(data[d.origin] == undefined){
              data[d.origin] = d.word.count;
            }
            else{
              data[d.origin] += d.word.count;
            }
        });

        for(var key in data){
          formattedData.push({name: key, value: Math.round((data[key]/total)*100)});
        }

        return (
        <PieChart width={800} height={400}>
          <Pie isAnimationActive={false}
            data={formattedData}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label/>
          <Tooltip/>
        </PieChart>
        )
    }
}

const Connected = connect(mapStateToProps)(SimplePieChart);
export default Connected;
