import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {object, string, number} from "yup";
import axios from 'axios';

const loginValidations = object({
	email: string().email().min(5).max(100).required('Required'),
	password: string().min(6).max(15).required('Required')
})


export const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
		resolver: yupResolver(loginValidations)
	});
	
  const onSubmit = (data) => {
	axios({
		method: "POST",
		url: "http://18.183.45.219:3000/api/v1/users/login",
		data: {
			email: data.email,
			password: data.password
		}
	}).then((response) => {
		localStorage.setItem("SHOPPING_TOKEN", response.data.token)
		localStorage.setItem("SHOOPING_CART_ID", response.data.cart_id)
		window.location.href = '/feed'
	}).catch((error) => {
		console.log(error);
	})
  }

  return (
		<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
			<form onSubmit={handleSubmit(onSubmit)} style={{width: 400, border: '1px solid', padding: 50}}>
                <h1>Login Form</h1>
				<div className="form-group" style={{marginBottom: 20}}>
					<input
						{...register("email", { required: true })}
						type="email"
						placeholder="Email"
						className="form-control"
					/>
					<small class="form-text text-danger">{errors['email']?.message}</small>
				</div>

				<div className="form-group" style={{marginBottom: 20}}>
					<input
						{...register("password", { required: true })}
						type="password"
						placeholder="Password"
						className="form-control"
						
					/>
					<small class="form-text text-danger">{errors['password']?.message}</small>
				</div>

				<input type="submit" className="btn btn-primary" />
			</form>
            <a href="/signup">If you dont have an account?, signup here</a>
		</div>
  );
}