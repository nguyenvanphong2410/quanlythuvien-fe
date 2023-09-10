import React from 'react'
import HeaderAdmin from '../../components/layouts/HeaderAdmin'
import Sidebar from '../../components/layouts/Sidebar'
import { useEffect, useState } from "react";
import { getEmployeeDetails, updateEmployee } from "../../services/Api";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateEmployee = () => {

    //Navigate
    const navigate = useNavigate();

    const params = useParams();
    const id = params.id;

    const [employeeDetailsData, setEmployeeDetailsData] = useState(null);
    const [inputData, setInputData] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const [errorMessages, setErrorMessages] = useState({});


    const hasNumber = /\d/;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    useEffect(() => {
        // Lấy getAuthors
        getEmployeeDetails(id)
            .then(({ data }) => {
                setEmployeeDetailsData(data.data)
                setInputData({
                    name: data.data?.name || "",
                    email: data.data?.email || "",
                    phone: data.data?.phone || "",
                });
            });
    }, [id])

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setInputData((prevInput) => ({
            ...prevInput,
            [name]: value
        }));
        setErrorMessages({ ...errorMessages, [name]: "" });
    };

    const onCLickUpdate = (e) => {
        e.preventDefault();

        const isCheckEmail = reg.test(inputData.email);
        const isTrueName = specialChars.test(inputData.name);
        const ishasNumberName = hasNumber.test(inputData.name);
        const isTruePhone = specialChars.test(inputData.phone);

        const errors = {};

        if (!inputData.name) {
            errors.name = "Vui lòng nhập họ tên !";
        } else if (isTrueName) {
            errors.name = "Tên nhân viên không hợp lệ !";
        } else if (ishasNumberName) {
            errors.name = "Tên không thể có số !";
        }

        if (!inputData.email) {
            errors.email = "Vui lòng nhập email !";
        } else if (!isCheckEmail) {
            errors.email = "Email không hợp lệ !";
        }

        if (!inputData.phone) {
            errors.phone = "Vui lòng nhập số điện thoại !";
        } else if (isTruePhone) {
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

            updateEmployee(id, inputData)
                .then(({ data }) => {
                    console.log('errdata', data);
                    if (data.data.status === "OK") {
                        toast.success(data.data.message);
                        setTimeout(() => navigate('/employees'), 1400)
                    } else if (data.data.status === "ERR") {
                        displayServerError(data.data.type, data.data.message);
                    }
                })
                .catch((error) => {
                    console.log('errdata', error?.response?.data?.type);
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
                            <div className="col-3"></div>
                            <div className="col-6">
                                <h2 className='text-center'>Cập nhật thông tin nhân viên</h2>
                                <form method='POST' id="form-insert" className="mt-5">
                                    <div className="row">
                                        <div className="col-lg-12 form-group">
                                            <div className="form-group">
                                                <label >Họ tên</label>
                                                <input
                                                    name="name"
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    aria-describedby="name"
                                                    onChange={onChangeInput}
                                                    value={inputData.name}

                                                />
                                                {errorMessages.name && (
                                                    <p className="text-danger ml-3">{errorMessages.name}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-lg-12 form-group">
                                            <div className="form-group">
                                                <label >Email</label>
                                                <input
                                                    name="email"
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    onChange={onChangeInput}
                                                    value={inputData.email}
                                                />
                                                {errorMessages.email && (
                                                    <p className="text-danger ml-3">{errorMessages.email}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-lg-12 form-group">
                                            <div className="form-group">
                                                <label >Phone</label>
                                                <input
                                                    name="phone"
                                                    type="text"
                                                    maxLength={10}
                                                    className="form-control"
                                                    id="phone"
                                                    onChange={onChangeInput}
                                                    value={inputData.phone}
                                                />
                                                {errorMessages.phone && (
                                                    <p className="text-danger ml-3">{errorMessages.phone}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={onCLickUpdate}
                                        type="submit"
                                        className="btn btn-primary float-right"
                                    >Lưu</button>
                                </form>
                            </div>
                            <div className="col-3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateEmployee