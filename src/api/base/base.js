import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || '0.0.0.0/0';

const API = axios.create({
	baseURL: `${BASE_URL}/cold-storage-api`,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default API;