import '../../src/App.css';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios'; 

function Form() {
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:3001/create', data); 
            console.log('Data submitted successfully:', response.data);
            alert('Successfully added!');
            reset();
            navigate('/users');
        } catch (error) {
            console.error('Error submitting data:', error);
            alert('Error submitting data, please try again.'); 
        }
    };

    return (
        <div className="form-container">
            <div><h2>Register Form</h2></div>
            <form className="landscape-form" onSubmit={handleSubmit(onSubmit)}>
                {/* UserId */}
                <div className="form-group">
                    <label className="form-label" htmlFor="UserId">User ID:</label>
                    <input 
                        id="UserId"
                        {...register("UserId", { required: true })}
                        aria-invalid={errors.UserId ? "true" : "false"}
                    />
                    {errors.UserId && <p className="input-error" role="alert">User ID is required</p>}
                </div>

                {/* Email */}
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email:</label>
                    <input 
                        id="email"
                        {...register("email", { 
                            required: "Email Address is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email format"
                            }
                        })}
                        aria-invalid={errors.email ? "true" : "false"}
                    />
                    {errors.email && <p className="input-error" role="alert">{errors.email.message}</p>}
                </div>

                {/* Mobile Number */}
                <div className="form-group">
                    <label className="form-label" htmlFor="mobile">Mobile Number:</label>
                    <input 
                        id="mobile"
                        {...register("mobile", { 
                            required: "Mobile number is required",
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Mobile number must be 10 digits"
                            }
                        })}
                        aria-invalid={errors.mobile ? "true" : "false"}
                    />
                    {errors.mobile && <p className="input-error" role="alert">{errors.mobile.message}</p>}
                </div>

                {/* Gender */}
                <div className="form-group">
                    <label className="form-label" htmlFor="gender">Gender:</label>
                    <select id="gender" {...register("gender", { required: true })}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="non-binary">Non-binary</option>
                    </select>
                    {errors.gender && <p className="input-error" role="alert">Gender is required</p>}
                </div>

                {/* Address */}
                <div className="form-group">
                    <label className="form-label" htmlFor="address">Address:</label>
                    <input
                        id="address"
                        {...register("address", { 
                            required: true,
                            maxLength: {
                                value: 50,
                                message: "Address must not exceed 50 characters"
                            },
                            validate: value => /^[a-zA-Z\s]*$/.test(value) || "Address must only contain letters and spaces"
                        })}
                        aria-invalid={errors.address ? "true" : "false"}
                    />
                    {errors.address && <p className="input-error" role="alert">{errors.address.message}</p>}
                </div>

                {/* Pincode */}
                <div className="form-group">
                    <label className="form-label" htmlFor="pincode">Pincode:</label>
                    <input
                        id="pincode"
                        {...register("pincode", { 
                            required: true,
                            pattern: {
                                value: /^[0-9]{6}$/,
                                message: "Pincode must be exactly 6 digits"
                            }
                        })}
                        aria-invalid={errors.pincode ? "true" : "false"}
                    />
                    {errors.pincode && <p className="input-error" role="alert">{errors.pincode.message}</p>}
                </div>

                {/* City */}
                <div className="form-group">
                    <label className="form-label" htmlFor="city">City:</label>
                    <input
                        id="city"
                        {...register("city", { 
                            required: true,
                            validate: value => /^[a-zA-Z\s]*$/.test(value) || "City must only contain letters"
                        })}
                        aria-invalid={errors.city ? "true" : "false"}
                    />
                    {errors.city && <p className="input-error" role="alert">{errors.city.message}</p>}
                </div>

                {/* State */}
                <div className="form-group">
                    <label className="form-label" htmlFor="state">State:</label>
                    <input
                        id="state"
                        {...register("state", { 
                            required: true,
                            validate: value => /^[a-zA-Z\s]*$/.test(value) || "State must only contain letters"
                        })}
                        aria-invalid={errors.state ? "true" : "false"}
                    />
                    {errors.state && <p className="input-error" role="alert">{errors.state.message}</p>}
                </div>

                {/* Country */}
                <div className="form-group">
                    <label className="form-label" htmlFor="country">Country:</label>
                    <input
                        id="country"
                        {...register("country", { 
                            required: true,
                            validate: value => /^[a-zA-Z\s]*$/.test(value) || "Country must only contain letters"
                        })}
                        aria-invalid={errors.country ? "true" : "false"}
                    />
                    {errors.country && <p className="input-error" role="alert">{errors.country.message}</p>}
                </div>

                {/* Submit Button */}
                <input className='button' type="submit" />
            </form>
        </div>
    );
}

export default Form;
