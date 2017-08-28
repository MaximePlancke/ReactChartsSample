import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { switchTab, initRequest } from '../actions/VisualizeData'
import CustomPane from '../components/CustomPane'
import { Tab, Container } from 'semantic-ui-react'


class VisualizeDataPage extends Component {
	static propTypes = {
		initPage: PropTypes.shape({
			activeTime: PropTypes.string,
			activeDuration: PropTypes.number
		}),
		activeTab: PropTypes.number,
		tabs: PropTypes.array,
		panes: PropTypes.object,
		switchTab: PropTypes.func,
		initRequest: PropTypes.func
	}

	componentWillMount() {
		let {tabs, initPage} = this.props
		this.props.initRequest({tabs, initPage})
	}

	onTabChange(event, data) {
		if(data.activeIndex !== this.props.activeTab) {
			this.props.switchTab(data.activeIndex)
		}
	}

	getActiveTab() {
		let { activeTab, tabs } = this.props
		return tabs[activeTab]	
	}

	capitalize(item) {
		return item.charAt(0).toUpperCase() + item.slice(1)
	}

	renderPanes(name) {
		let datas = this.props.panes[name]
		return 	<Tab.Pane loading={datas.isLoading} className="custom-tab">
					<CustomPane name={name} datas={datas}/>
			   	</Tab.Pane>
	}

	render() {
		let { activeTab, tabs } = this.props
		let panes = tabs.map(item => {
			return { menuItem: this.capitalize(item), render: () => this.renderPanes(item) }
		})

		return (
			<Container style={containerStyle}>
				<Tab 
					panes={panes} 
					menu={{ secondary: true, pointing: true }} 
					activeIndex={activeTab}
					onTabChange={this.onTabChange.bind(this)}
				/>
			</Container>
		)
	}
}

const containerStyle = {
	padding: '5em 0em',
	marginTop: '20px',
	background: 'white',
	borderRadius: '5px' 
}

const mapStateToProps = (state, ownProps) => {
	let { initPage, activeTab, tabs, events, stats } = state.visualizeData
	return { initPage, activeTab, tabs, panes: { events, stats} }
}

export default connect(mapStateToProps, { switchTab, initRequest })(VisualizeDataPage)

