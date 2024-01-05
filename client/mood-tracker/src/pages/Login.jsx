import React from 'react';
import { useState, useEffect } from 'react';
// import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import '../styles/Auth.css';

function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess || user) {
			navigate('/');
		}

		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const userData = {
			email,
			password,
		};

		dispatch(login(userData));
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div className='auth-container'>
			<div className='form-container'>
				<section className='heading'>
					<h1>Login</h1>
					<p>Embrace your today's mood</p>
				</section>

				<section className='form'>
					<form onSubmit={onSubmit}>
						<div className='form-group'>
							<input
								type='email'
								className='form-control'
								id='email'
								name='email'
								value={email}
								placeholder='Enter your email'
								onChange={onChange}
							/>
						</div>
						<div className='form-group'>
							<input
								type='password'
								className='form-control'
								id='password'
								name='password'
								value={password}
								placeholder='Enter password'
								onChange={onChange}
							/>
						</div>

						<div className='form-group'>
							<button type='submit' className='btn btn-block'>
								Login
							</button>
						</div>
					</form>
				</section>

				<section className='registration-link'>
					<p>
						New user?{' '}
						<a href='/register' className='registration-link'>
							Create an account
						</a>
					</p>

					<p>
						Forgot your password?{' '}
						<a href='/reset-password' className='registration-link'>
							Change Password
						</a>
					</p>
				</section>
			</div>
			<div className='image-container'>
				<img src={require('../assets/boylogin.png')} alt='Login' />
			</div>
		</div>
	);
}

export default Login;
