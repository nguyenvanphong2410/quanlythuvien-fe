import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createEmployee } from "../../services/Api";
import Sidebar from "../../components/layouts/Sidebar";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";

import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEmployee = () => {
    const navigate = useNavigate();
    const [inputData, setInputData] = useState({});
    const [errorMessages, setErrorMessages] = useState({});

    const hasNumber = /\d/;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
        setErrorMessages({ ...errorMessages, [name]: "" });
    }

    const onCLickSubmit = (e) => {
        e.preventDefault();

        const isCheckEmail = reg.test(inputData.email);
        const isTrueName = specialChars.test(inputData.name);
        const isTruePhone = specialChars.test(inputData.phone);
        const ishasNumberName = hasNumber.test(inputData.name);

        const errors = {};

        if (!inputData.name) {
            errors.name = "Vui lòng nhập họ tên !";
        } else if (isTrueName) {
            errors.name = "Tên nhân viên không hợp lệ !";
        }
        else if (ishasNumberName) {
            errors.name = "Tên không thể có số !";
        }

        if (!inputData.email) {
            errors.email = "Vui lòng nhập email !";
        } else if (!isCheckEmail) {
            errors.email = "Email không hợp lệ !";
        }

        if (!inputData.password) {
            errors.password = "Vui lòng nhập mật khẩu !";
        }

        if (!inputData.phone) {
            errors.phone = "Vui lòng nhập số điện thoại !";
        }else if (isTruePhone) {
            errors.phone = "Số điện thoại không hợp lệ !";
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
                    case 'phone':
                        errors.phone = errorMessage;
                        break;
                    default:
                        errors.serverError = errorMessage;
                        break;
                }

                setErrorMessages(errors);
            };
            createEmployee(inputData, {})
                .then((data) => {
                    if (data.data.data.status === 'OK') {
                        toast.success(data.data.data.message);
                        setTimeout(() => navigate('/employees'), 1400);
                    } else if (data.data.data.status === 'ERR') {
                        displayServerError(data.data.data.type, data.data.data.message);
                    }
                })
                .catch((error) => {
                    if (error?.response?.data?.type) {
                        displayServerError(
                            error.response.data.type,
                            error.response.data.message
                        );
                    }
                });
        }
    }


    return (
        <>
            <div id="wrapper">
                <ToastContainer transition={Slide} />

                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <HeaderAdmin />
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-lg-3'></div>

                            <div className='col-lg-6'>
                                <h2 className='text-center mt-3'>Thêm mới nhân viên</h2>

                                <form className="mt-5">
                                    <div className="form-group ">
                                        <label >Họ tên</label>
                                        <input
                                            name="name"
                                            type="text"
                                            required
                                            className="form-control form-control-user"
                                            id="exampleFirstName"
                                            placeholder="Full name"
                                            onChange={onChangeInput}
                                            value={inputData.name || ""}
                                        />
                                        {errorMessages.name && (
                                            <p className="text-danger ml-3">{errorMessages.name}</p>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label >Email</label>
                                        <input
                                            name="email"
                                            type="email"
                                            className="form-control form-control-user"
                                            id="exampleInputEmail"
                                            placeholder="Email address"
                                            onChange={onChangeInput}
                                            value={inputData.email || ""}
                                        />
                                        {errorMessages.email && (
                                            <p className="text-danger ml-3">{errorMessages.email}</p>
                                        )}
                                    </div>
                                    <div className="form-group ">
                                        <label >Mật khẩu</label>
                                        <input
                                            name="password"
                                            type="password"
                                            className="form-control form-control-user"
                                            id="exampleInputPassword"
                                            placeholder="Password"
                                            onChange={onChangeInput}
                                            value={inputData.password || ""}
                                        />
                                        {errorMessages.password && (
                                            <p className="text-danger ml-3">{errorMessages.password}</p>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label >Số điện thoại</label>
                                        <input
                                            name="phone"
                                            type="text"
                                            maxLength={10}
                                            className="form-control form-control-user"
                                            id="exampleInputPhone"
                                            placeholder="Phone"
                                            onChange={onChangeInput}
                                            value={inputData.phone || ""}
                                        />
                                        {errorMessages.phone && (
                                            <p className="text-danger ml-3">{errorMessages.phone}</p>
                                        )}
                                    </div>

                                    <button onClick={onCLickSubmit} type="submit" className="btn btn-success mt-4 float-right">Thêm</button>

                                </form>
                            </div>

                            <div className='col-lg-3'></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddEmployee;