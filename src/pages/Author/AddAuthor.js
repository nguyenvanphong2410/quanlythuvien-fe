import React, { useEffect, useState } from 'react';
import HeaderAdmin from '../../components/layouts/HeaderAdmin';
import Sidebar from '../../components/layouts/Sidebar';
import { Link, useNavigate } from "react-router-dom";
import { createAuthors, getAuthors } from '../../services/Api';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddAuthor = () => {

    const navigate = useNavigate();

    const [authorsData, setAuthorData] = useState([]);
    const [inputData, setInputData] = useState({});
    const [editorInstance, setEditorInstance] = useState(null);
    const [errorMessages, setErrorMessages] = useState({});

    const hasNumber = /\d/;
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const specialCharsStory = /[$%^&*_\[\]{}\\|]+/;

    //onChangeInput 
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
        setErrorMessages({ ...errorMessages, [name]: "" });
        console.log(inputData)
    }

    const onChangeEditor = (event, editor) => {
        const data = editor.getData();
        setInputData({ ...inputData, story: data });
    };

    //onCLickSubmit
    const onCLickSubmit = (e) => {
        e.preventDefault();

        const isTrueName = specialChars.test(inputData.name);
        const isTrueStory = specialCharsStory.test(inputData.story)
        const ishasNumberName = hasNumber.test(inputData.name);

        const errors = {};

        if (!inputData.name) {
            errors.name = "Vui lòng nhập họ tên !";
        } else if (isTrueName) {
            errors.name = "Tên tác giả không hợp lệ !";
        }
        else if (ishasNumberName) {
            errors.name = "Tên không thể có số !";
        }

        if (!inputData.date_of_birth) {
            errors.date_of_birth = "Vui lòng nhập ngày sinh !";
        } 

        if (!inputData.story) {
            errors.story = "Vui lòng nhập tiểu sử !";
        } else if (isTrueStory) {
            errors.story = "Tiểu sử không hợp lệ !";
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
                    case 'story':
                        errors.phone = errorMessage;
                        break;
                    default:
                        errors.serverError = errorMessage;
                        break;
                }

                setErrorMessages(errors);
            };

            createAuthors(inputData, {})
                .then(({ data }) => {
                    if (data.data.status === "OK") {
                        toast.success(data.data.message);
                        setTimeout(() => navigate('/authors'), 1400)
                    } else if (data.data.status === "ERR") {
                        // toast.error(data.message);
                        displayServerError(data.data.type, data.data.message);

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
                <ToastContainer />
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderAdmin />
                        <div className="container-fluid">
                            <div className='row'>
                                <div className='col-lg-3'></div>
                                <div className='col-lg-6'>
                                    <h2 className='text-center'>Thêm mới tác giả</h2>
                                    <form id="form-insert" className="">
                                        <div className='row'>
                                            <div className='col-lg-7'>
                                                <div className=" form-group">
                                                    <div className="form-group">
                                                        <label >Họ tên</label>
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
                                            </div>
                                            <div className='col-lg-5'>
                                                <div className=" form-group">
                                                    <div className="form-group">
                                                        <label >Ngày sinh</label>
                                                        <input
                                                            name="date_of_birth"
                                                            type="date"
                                                            className="form-control"
                                                            id="date_of_birth"
                                                            onChange={onChangeInput}
                                                            value={inputData.date_of_birth || ""}
                                                        />
                                                        {errorMessages.date_of_birth && (
                                                            <p className="text-danger ml-3">{errorMessages.date_of_birth}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <label >Tiểu sử</label>
                                        <CKEditor
                                            name="story"
                                            editor={ClassicEditor}
                                            data={inputData?.story || ""}
                                            onChange={onChangeEditor}
                                        />
                                        {errorMessages.story && (
                                            <p className="text-danger ml-3">{errorMessages.story}</p>
                                        )}

                                        <button onClick={onCLickSubmit} type="submit" className="btn btn-success mt-4">Thêm</button>
                                    </form>
                                </div>
                                <div className='col-lg-3'></div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddAuthor;