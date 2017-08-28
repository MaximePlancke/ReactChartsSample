import { 
	VISUALIZE_DATA_INIT_DATA,
	VISUALIZE_DATA_SWITCH_TAB,
	VISUALIZE_DATA_CHANGE_DURATION,
	VISUALIZE_DATA_CHANGE_TIME,
	VISUALIZE_DATA_SUCCESS_DATA,
	VISUALIZE_DATA_FAIL_DATA
} from '../actions/types'

const INITIAL_STATE = {
	initPage: { activeTime: 'hourly', activeDuration: 1},
	activeTab: 0,
	tabs: ['events', 'stats'],
	times: [ 
		{key: 'hourly', value: 'hourly', text: 'Hourly'}, 
		{key: 'daily', value: 'daily', text: 'Daily'} 
	],
	durations: [
		{key: 1, value: 1, text: '24 hours' },
		{key: 2, value: 2, text: '48 hours' },
		{key: 7, value: 7, text: 'Week'},
		{key: 30, value: 30, text: 'Month'}
	],
	events: {
		isLoading: false,
		activeTime: 'hourly',
		activeDuration: 1,
		datas: [],
		lines: [
			{ name: 'events', color: '#B8B5E8' }
		]
	},
	stats: {
		isLoading: false,
		activeTime: 'hourly',
		activeDuration: 1,
		datas: [],
		lines: [
			{ name: 'clicks', color: '#B8B5E8' },
			{ name: 'impressions', color: '#387908' },
			{ name: 'revenue', color: '#182908' }
		]
	}	
}

export default (state = INITIAL_STATE, action) => {
	let {type, payload } = action
	switch(type) {
		case VISUALIZE_DATA_INIT_DATA:
			return INITIAL_STATE
		case VISUALIZE_DATA_SWITCH_TAB:
			return {...state, activeTab: payload}
		case VISUALIZE_DATA_CHANGE_DURATION: 
			return {...state, [payload.prop]: {...state[payload.prop], isLoading: true, activeDuration: payload.activeDuration} }
		case VISUALIZE_DATA_CHANGE_TIME: 
			return {...state, [payload.prop]: {...state[payload.prop], isLoading: true, activeTime: payload.activeTime} }
		case VISUALIZE_DATA_SUCCESS_DATA:
			return {...state, [payload.prop]: {...state[payload.prop], isLoading: false, datas: payload.value} }
		case VISUALIZE_DATA_FAIL_DATA: 
			return {...state, [payload.prop]: {...state[payload.prop], isLoading: false, datas: []} }
		default:
			return state
	}
}