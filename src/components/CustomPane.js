import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'
import { changeDuration, changeTime } from '../actions/VisualizeData'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

class CustomPane extends Component {
	static propTypes = {
		tabs: PropTypes.array,
		times: PropTypes.array,
		durations: PropTypes.array,
		changeDuration: PropTypes.func,
		changeTime: PropTypes.func
	}

	updateTime(event, data) {
		let {name, changeTime} = this.props
		changeTime({
			prop: name, 
			activeTime: data.value, 
			activeDuration: this.props.datas.activeDuration 
		})
	}

	updateDuration(event, data) {
		let {name, changeDuration} = this.props
		changeDuration({
			prop: name, 
			activeTime: this.props.datas.activeTime,
			activeDuration: data.value
		})
	}

	toReadableDate(date) {
		let dt = new Date(date)
		return dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate()
	}

	render() {
		let { datas, times, durations } = this.props

		let chartsData = datas.datas.map(item => {
			datas.lines.map(line => {
				item[line.name] = parseFloat(item[line.name])
				return line
			})
			item.axis = item.hour ? (this.toReadableDate(item.date) + `/ ${item.hour}:00`) : this.toReadableDate(item.date)
			return item
		})

		return (
			<div>
				<div style={{textAlign: 'center'}}>
					<Dropdown placeholder="Time" value={datas.activeTime} onChange={this.updateTime.bind(this)} selection options={times}/>
					<Dropdown placeholder="Duration" value={datas.activeDuration} onChange={this.updateDuration.bind(this)} selection options={durations}/>
				</div>

				<LineChart
					width={1000}
					height={320}
					data={chartsData}
					className="custom-line-chart"
					margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
					>
					<XAxis dataKey="axis" />
					{ datas.lines.map((item, index) => <YAxis key={index} yAxisId={index} type="number"/>) }
					<Tooltip />
					<CartesianGrid strokeDasharray="3 3" />
					{ datas.lines.map((item, index) => <Line key={index} type="monotone" dataKey={item.name} stroke={item.color} yAxisId={index} />) }
				</LineChart>
			</div>
		)
	}
}


const mapStateToProps = (state, ownProps) => {
	let {tabs, times, durations} = state.visualizeData
	return {tabs, times, durations}
}

export default connect(mapStateToProps, {changeDuration, changeTime})(CustomPane)

