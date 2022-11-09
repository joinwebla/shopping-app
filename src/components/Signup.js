import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {object, string, number} from "yup";
import axios from "axios";

const signupValidations = object({
	name: string().min(2).max(40).required('Required'),
	email: string().email().min(5).max(100).required('Required'),
	password: string().min(6).max(15).required('Required')
})


export const Signup = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
		resolver: yupResolver(signupValidations)
	});

	
  const onSubmit = (data) => {
		axios({
			method: "POST",
			url: "http://18.183.45.219:3000/api/v1/users/register",
			data: {
				name: data.name,
				email: data.email,
				password: data.password
			}
		}).then((response) => {
			if(response.data.success){
				window.location.href = '/login'
			}
		}).catch((error) => {
			alert(error)
		})
  }

  return (
		<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>

			<form onSubmit={handleSubmit(onSubmit)} style={{width: 400, border: '1px solid', padding: 50}}>
				<h1>Signup Form</h1>
				<div>
					{/* {error} */}
				</div>
				<div className="form-group" style={{marginBottom: 20}}>
					<input
							{...register("name", { required: true })}
							placeholder='Name'
							type="text"
							className="form-control"
					/>
					<small class="form-text text-danger">{errors['name']?.message}</small>
				</div>

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
			<div>
				<a href="/login">If you already have an account?, login here</a>
			</div>
		</div>
  );
}