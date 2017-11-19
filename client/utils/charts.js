import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
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
    var r = {category: d.word.normal, value: Math.round( 100* d.word.count / sum ), colorBy: d.origin};
    data.push(r);
});

const toPercent = (decimal, fixed = 0) => {
    return `${(decimal * 1).toFixed(fixed)}%`;
};

class SimpleBarChart extends Component{
    constructor(props){
      super(props)
    }

    render(){
        console.log(etymologies);
        console.log(data);

        var colorMap = {
            "French" : "red",
            "Old English" : "blue",
            "Latin" : "green"
        };

        return (
            <div>
            <BarChart 
                width={560} 
                height={700} 
                data={data} 
                layout="vertical"
                margin={{top: 5, right: 30, left: 50, bottom: 5}}
                >
                <XAxis type="number" ticks={[0,10,20,30,40,50,60,70,80,90,100]} tickFormatter={toPercent} />
                <YAxis type="category" dataKey="category" interval={0} />
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip formatter={toPercent} />
                <Legend />
                <Bar dataKey="value" >
                {
                    data.map((entry, index) => (
                        <Cell key={data[index].category} fill={ colorMap[ data[index].colorBy ] }/>
                    ))
                }
                </Bar>
            </BarChart>

            </div>
        )
    }
}

const Connected = connect(mapStateToProps)(SimpleBarChart);
export default Connected;
