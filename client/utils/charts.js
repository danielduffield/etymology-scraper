import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
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

var sum = 0;
etymologies.etymologies.forEach(function(d) {
    sum += d.word.count;
});

const data = [];
etymologies.etymologies.forEach(function(d) {
    var r = {category: d.word.normal, value: d.word.count / sum};
    data.push(r);
});

class SimpleBarChart extends Component{
    constructor(props){
      super(props)
    }
    render(){
        console.log(etymologies);
        console.log(data);

        return (
            <div>
            <BarChart 
                width={560} 
                height={700} 
                data={data} 
                layout="vertical"
                margin={{top: 5, right: 30, left: 50, bottom: 5}}
                >
                <XAxis type="number"/>
                <YAxis type="category" dataKey="category" interval={0} />
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
            </div>
        )
    }
}

const Connected = connect(mapStateToProps)(SimpleBarChart);
export default Connected;
