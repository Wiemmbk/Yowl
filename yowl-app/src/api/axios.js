import axios from 'axios';

export default axios.create({
	baseURL: 'https://yowl-project-api.herokuapp.com/users',
});