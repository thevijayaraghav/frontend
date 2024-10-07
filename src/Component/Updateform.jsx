import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import './Updateform.css';

function UpdateForm({ user, onClose }) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    
    useEffect(() => {
        if (user) {
            setValue("UserId", user.UserId);
            setValue("email", user.email);
            setValue("gender", user.gender);
            setValue("address", user.address);
            setValue("pincode", user.pincode);
            setValue("city", user.city);
            setValue("state", user.state);
            setValue("country", user.country);
            setValue("mobile", user.mobile); 
        }
    }, [user, setValue]);

    
    const onSubmit = async (data) => {
        try {
            const response = await axios.put(`http://localhost:3001/update/${user.UserId}`, data);
            if (response.status === 200) {
                alert('User updated successfully!');
                onClose(); // Close the form after submission
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Error updating user, please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field-container">
                <label>User ID:</label>
                <input {...register("UserId", { required: false })} />
                {errors.UserId && <p>User ID is required</p>}
            </div>

            <div className="field-container">
                <label>Email:</label>
                <input 
                    {...register("email", { 
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email format"
                        }
                    })} 
                />
                {errors.email && <p className="input-error" role="alert">{errors.email.message}</p>}
            </div>

            <div className="field-container">
                <label>Mobile Number:</label>
                <input 
                    {...register("mobile", { 
                        required: "Mobile number is required",
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Mobile number must be 10 digits"
                        }
                    })} 
                />
                {errors.mobile && <p className="input-error" role="alert">{errors.mobile.message}</p>}
            </div>

            <div className="field-container">
                <label>Gender:</label>
                <input {...register("gender", { required: true })} />
                {errors.gender && <p>Gender is required</p>}
            </div>

            <div className="field-container">
                <label>Address:</label>
                <input {...register("address", { required: true })} />
                {errors.address && <p>Address is required</p>}
            </div>

            <div className="field-container">
                <label>Pincode:</label>
                <input {...register("pincode", { 
                    required: true,
                    pattern: {
                        value: /^[0-9]{6}$/,
                        message: "Pincode must be exactly 6 digits"
                    }
                })} />
                {errors.pincode && <p className="input-error" role="alert">{errors.pincode.message}</p>}
            </div>

            <div className="field-container">
                <label>City:</label>
                <input {...register("city", { required: true })} />
                {errors.city && <p>City is required</p>}
            </div>

            <div className="field-container">
                <label>State:</label>
                <input {...register("state", { required: true })} />
                {errors.state && <p>State is required</p>}
            </div>

            <div className="field-container">
                <label>Country:</label>
                <input {...register("country", { required: true })} />
                {errors.country && <p>Country is required</p>}
            </div>

            <div className="d-flex justify-content-center" style={{ width: '100%' }}>
                <div className="col-6 d-flex justify-content-start">
                    <button type="submit" className="btn btn-primary w-100 rounded">Update</button>
                </div>
                <div className="col-6 d-flex justify-content-end">
                    <button type="button" className="btn btn-secondary w-100 rounded" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </form>
    );
}

export default UpdateForm;
