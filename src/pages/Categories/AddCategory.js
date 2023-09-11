import React, { useEffect, useState } from 'react';
import HeaderAdmin from '../../components/layouts/HeaderAdmin';
import Sidebar from '../../components/layouts/Sidebar';
import { Link, useNavigate } from "react-router-dom";
import { createAuthors, createCategoryBooks, getAuthors } from '../../services/Api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategory = () => {

    const navigate = useNavigate();

    const [authorsData, setAuthorData] = useState([]);
    const [inputData, setInputData] = useState({});
    const [errorMessages, setErrorMessages] = useState({});

    const hasNumber = /\d/;
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const specialCharsDescription = /[$%^&*_\[\]{}|]+/;

    //onChangeInput 
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
        setErrorMessages({ ...errorMessages, [name]: "" });
        console.log(inputData)
    }

    //onCLickSubmit
    const onCLickSubmit = (e) => {
        e.preventDefault();
        const isTrueName = specialChars.test(inputData.name);
        const ishasNumberName = hasNumber.test(inputData.name);
        const isTrueDescription = specialCharsDescription.test(inputData.description)

        const errors = {};

        if (!inputData.name) {
            errors.name = "Vui lòng nhập họ tên !";
        } else if (isTrueName) {
            errors.name = "Tên thể loại sách không hợp lệ !";
        }
        else if (ishasNumberName) {
            errors.name = "Tên thể loại sách không thể có số !";
        }

        if (!inputData.description) {
            errors.description = "Vui lòng nhập tiểu sử !";
        } else if (isTrueDescription) {
            errors.description = "Mô tả không hợp lệ !";
        }

        if (Object.keys(errors).length > 0) {
            setErrorMessages(errors);
        } else {
            const displayServerError = (errorType, errorMessage) => {
                const errors = { ...errorMessages };

                switch (errorType) {
                    case 'name':
                        errors.email = errorMessage;
                        break;
                    case 'description':
                        errors.phone = errorMessage;
                        break;
                    default:
                        errors.serverError = errorMessage;
                        break;
                }

                setErrorMessages(errors);
            };
            createCategoryBooks(inputData)
                .then(({ data }) => {
                    if (data.data.status === "OK") {
                        toast.success(data.data.message);
                        setTimeout(() => navigate('/categories'), 1400)

                    } else if (data.data.status === "ERR") {
                        toast.error(data.message);
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
            <ToastContainer />
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <HeaderAdmin />
                    <div className="container-fluid">
                        <div className='row mt-5'>
                            <div className='col-lg-3'></div>

                            <div className='col-lg-6'>
                                <h2 className='text-center mb-5'>Thêm mới danh mục</h2>
                                <form id="form-insert" className="">
                                    <div className=" form-group">
                                        <div className="form-group">
                                            <label >Tên thể loại</label>
                                            <input
                                                name="name"
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                aria-describedby="name"
                                                onChange={onChangeInput}
                                                value={inputData.name || ""}
                                            />
                                            {errorMessages.name && (
                                                <p className="text-danger ml-3">{errorMessages.name}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className=" form-group">
                                        <div className="form-group">
                                            <label >Mô tả</label>
                                            <input
                                                name="description"
                                                type="text"
                                                className="form-control"
                                                id="description"
                                                aria-describedby="name"
                                                onChange={onChangeInput}
                                                value={inputData.description || ""}
                                            />
                                            {errorMessages.description && (
                                                <p className="text-danger ml-3">{errorMessages.description}</p>
                                            )}
                                        </div>
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

export default AddCategory;