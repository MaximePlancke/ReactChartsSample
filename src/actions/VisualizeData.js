import { callApi } from '../middleware/api'
import { 
	VISUALIZE_DATA_INIT_DATA,
	VISUALIZE_DATA_SWITCH_TAB,
	VISUALIZE_DATA_CHANGE_DURATION,
	VISUALIZE_DATA_CHANGE_TIME,
	VISUALIZE_DATA_SUCCESS_DATA,
	VISUALIZE_DATA_FAIL_DATA
} from './types'


const fetchData = (dispatch, datas) => {
	callApi(datas).then(response => {
		dispatch({
			type: VISUALIZE_DATA_SUCCESS_DATA,
			payload: {prop: datas.prop, value: response}
		})
	}).catch(error => {
		dispatch({
			type: VISUALIZE_DATA_FAIL_DATA,
			payload: {prop: datas.prop}
		})
	})
}

export const initRequest = (datas) => {
	return (dispatch) => {
		dispatch({
			type: VISUALIZE_DATA_INIT_DATA,
			payload: null
		})
		datas.tabs.map(item => fetchData(dispatch, {...datas.initPage, prop: item}))
	}
}

export const switchTab = (activeTab) => {
	return {
		type: VISUALIZE_DATA_SWITCH_TAB,
		payload: activeTab
	}
}

export const changeDuration = (datas) => {
	return (dispatch) => {
		dispatch({
			type: VISUALIZE_DATA_CHANGE_DURATION,
			payload: datas
		})
		fetchData(dispatch, datas);
	}
}

export const changeTime = (datas) => {
	return (dispatch) => {
		dispatch({
			type: VISUALIZE_DATA_CHANGE_TIME,
			payload: datas
		})
		fetchData(dispatch, datas);
	}
}

