import api from '../../api/api';

const API_URL = '/users/';

// Register user
const register = async (userData) => {
	const response = await api.post(API_URL, userData);
	return response.data;
};

// Login user
const login = async (userData) => {
	const response = await api.post(API_URL + 'login', userData);
	return response.data;
};

// Logout user - This will be handled by the slice, but we can keep a placeholder
const logout = () => {
	// The service doesn't need to do anything here anymore.
	// The slice will handle clearing localStorage and resetting the state.
};

const authService = {
	register,
	logout,
	login,
};

export default authService;
