import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginEmployee } from "../../services/Api";
import Cookies from 'js-cookie';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from "jwt-decode";

const Login = () => {
    const navigate = useNavigate();

    const [inputData, setInputData] = useState({});
    const [employeeData, setEmployeeData] = useState("");
    const [messageError, setMessageError] = useState("");
    const [errorMessages, setErrorMessages] = useState({});

    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    //OnChangeInput
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setInputData((inputData) => ({
            ...inputData,
            [name]: value,
        }));
        setErrorMessages({ ...errorMessages, [name]: "" });
        console.log(inputData)
    };

    const OnClickLogin = async (e) => {
        e.preventDefault();

        const isCheckEmail = reg.test(inputData.email);

        const errors = {};

        if (!inputData.email) {
            errors.email = "Vui lòng nhập email !";
        } else if (!isCheckEmail) {
            errors.email = "Email không hợp lệ !";
        }

        if (!inputData.password) {
            errors.password = "Vui lòng nhập password !";
        }

        if (Object.keys(errors).length > 0) {
            setErrorMessages(errors);
        } else {
            const displayServerError = (errorType, errorMessage) => {
                const errors = { ...errorMessages };

                switch (errorType) {
                    case 'email':
                        errors.email = errorMessage;
                        break;
                    case 'password':
                        errors.password = errorMessage;
                        break;
                    case 'lock':
                        errors.email = errorMessage;
                        break;
                    default:
                        errors.serverError = errorMessage;
                        break;
                }

                setErrorMessages(errors);
            };
            loginEmployee(inputData, {})
                .then((data) => {
                    if (data.data.data.status === "OK") {
                        console.log('data', data.data)
                        // Lưu token vào cookie, hết hạn 7 ngày
                        Cookies.set('access_token', data.data.data?.access_token, { expires: 7 });
                        navigate('/');
                    } else if (data.data.status === "ERR") {
                        displayServerError(data.data.data.type, data.data.data.message);
                    }
                })
                .catch((error) => {
                    console.log(error?.response?.data);
                    if (error?.response?.data.type) {
                        displayServerError(
                            error.response?.data.type,
                            error.response?.data.message
                        );
                    }
                });
        }
    }

    return (
        <>
            {/* <ToastContainer 
                limit={10}
                transition={Slide}
                // theme="dark"
            /> */}
            <div className="container">
                {/* Outer Row */}
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-7 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                {/* Nested Row within Card Body */}
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Đănh nhập</h1>
                                            </div>

                                            <form className="user">
                                                <div className="form-group">
                                                    <input
                                                        name="email"
                                                        type="email"
                                                        className="form-control form-control-user"
                                                        id="email"
                                                        onChange={onChangeInput}
                                                        placeholder="Email"
                                                    // value={inputData?.email || ""}
                                                    />
                                                    {errorMessages.email && (
                                                        <p className="text-danger ml-3">{errorMessages.email}</p>
                                                    )}
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        name="password"
                                                        type="password"
                                                        className="form-control form-control-user"
                                                        id="password"
                                                        onChange={onChangeInput}
                                                        placeholder="Mật khẩu"
                                                    // value={inputData?.password || ""}
                                                    />
                                                    {errorMessages.password && (
                                                        <p className="text-danger ml-3">{errorMessages.password}</p>
                                                    )}
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                    </div>
                                                </div>
                                                <button onClick={OnClickLogin} className="btn btn-primary btn-user btn-block">
                                                    Đăng nhập
                                                </button>

                                            </form>
                                            <hr />
                                            <div className="text-center">
                                                <Link className="small" to="/register">Tạo tài khoản mới</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Login;