import {get
} from '../get.js';

export function getListData() {
	const result = get('/api/activity');
	return result;
}