import React, { useEffect, useState } from 'react';
import HeaderAdmin from '../../components/layouts/HeaderAdmin';
import Sidebar from '../../components/layouts/Sidebar';
import { createBooks, deleteSoftBook, getAllCategoriesBook, getAuthors, getBooks } from "../../services/Api";
import { Link, useNavigate } from "react-router-dom";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBook = () => {

    const navigate = useNavigate();


    const [authorsData, setAuthorsData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);
    const [inputData, setInputData] = useState({
        author_ids: [],
    });
    const [editorInstance, setEditorInstance] = useState(null);
    const [errorMessages, setErrorMessages] = useState({});

    const hasNumber = /\d/;
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const specialCharsDescription = /[$%^&*_\[\]{}|]+/;
    const specialCharsContent = /[$%^&*_\[\]{}|]+/;


    useEffect(() => {
        getAllCategoriesBook({})
            .then(({ data }) => setCategoriesData(data.data));

        getAuthors({})
            .then(({ data }) => setAuthorsData(data.data));
    }, [])

    //handleOnChangeInputCreateBook
    const onChangeInput = (e) => {
        const { name, value, checked } = e.target;

        if (name === "author_ids") {
            // Nếu trường name là "author_ids", thực hiện xử lý riêng
            let updatedAuthorIds = [...inputData.author_ids];

            if (checked) {
                // Nếu ô checkbox được chọn, thêm giá trị vào mảng
                updatedAuthorIds.push(value);
            } else {
                // Nếu ô checkbox được bỏ chọn, loại bỏ giá trị khỏi mảng
                updatedAuthorIds = updatedAuthorIds.filter((id) => id !== value);
            }

            setInputData({ ...inputData, author_ids: updatedAuthorIds });
        } else {
            // Xử lý các trường input khác như bình thường
            setInputData({ ...inputData, [name]: value });
        }
        setErrorMessages({ ...errorMessages, [name]: "" });
        console.log(inputData)
    }

    const onChangeEditor = (event, editor) => {
        const data = editor.getData();
        setInputData({ ...inputData, content: data });
    };

    //onCLickSubmit
    const onCLickSubmit = (e) => {
        e.preventDefault();

        const isTrueName = specialChars.test(inputData.name);
        const isTrueDescription = specialCharsDescription.test(inputData.description)
        const isTrueContent = specialCharsContent.test(inputData.content)

        const errors = {};

        if (!inputData.name) {
            errors.name = "Vui lòng nhập họ tên !";
        } else if (isTrueName) {
            errors.name = "Tên tác giả không hợp lệ !";
        }

        if (inputData.author_ids.length === 0) {
            errors.author_ids = "Vui lòng chọn tác giả !";
        }

        if (!inputData.category_id) {
            errors.category_id = "Vui lòng chọn thể loại sách !";
        }

        if (!inputData.year_creation) {
            errors.year_creation = "Vui lòng chọn ngày tháng năm !";
        }

        if (!inputData.total) {
            errors.total = "Vui lòng điền tổng sổ lượng !";
        }
        if (!inputData.stock) {
            errors.stock = "Vui lòng điền tổng sổ lượng tồn !";
        }

        if (!inputData.description) {
            errors.description = "Vui lòng điền mô tả !";
        } else if (isTrueDescription) {
            errors.description = "Mô tả không hợp lệ !";
        }

        if (!inputData.content) {
            errors.content = "Vui lòng nhập nội dung!";
        } else if (isTrueContent) {
            errors.content = "Nội dung không hợp lệ !";
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
                    case 'content':
                        errors.content = errorMessage;
                        break;
                    case 'stock':
                        errors.stock = errorMessage;
                        break;
                    case 'total':
                        errors.total = errorMessage;
                        break;
                    case 'description':
                        errors.description = errorMessage;
                        break;
                    // case 'description':
                    //     errors.description = errorMessage;
                    //     break;
                    // case 'description':
                    //     errors.description = errorMessage;
                    //     break;
                    // case 'auhthor_ids':
                    //     errors.author_ids = errorMessage;
                    //     break;
                    default:
                        errors.serverError = errorMessage;
                        break;
                }

                setErrorMessages(errors);
            };
            createBooks(inputData, {})
                .then((data) => {
                    if (data.data.data.status === "OK") {
                        toast.success(data.data.data.message);
                        setTimeout(() => navigate('/books'), 1400)
                    } else if (data.data.data.status === "ERR") {
                        toast.error(data.data.message);
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
                    <div id="content">
                        <HeaderAdmin />
                        <div className="container-fluid">
                            <h2>Thêm mới sách</h2>
                            <form id="form-insert" >
                                <div className="row">
                                    <div className="col-lg-4  form-group">
                                        <label >Tên sách</label>
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

                                    <div className="col-lg-4  form-group">
                                        <span
                                            style={{
                                                marginTop: '31px',
                                                height: '39px',
                                                backgroundColor: '#fff',
                                                border: '1px solid #d2d3de',
                                                borderRadius: '5px'
                                            }}
                                            className="nav-link collapsed pt-0 " href="#"
                                            data-toggle="collapse" data-target="#collapsePages12"
                                            aria-expanded="true" aria-controls="collapsePages">
                                            <span
                                                style={{
                                                    marginTop: '5px',
                                                    marginLeft: '40%',
                                                }}
                                            >Tác giả</span>
                                            <i className="fas fa-caret-down ml-2" />
                                        </span>
                                        <div
                                            style={{ maxHeight: '100px', overflow: 'auto' }}
                                            id="collapsePages12" className="collapse"
                                            aria-labelledby="headingPages" data-parent="#accordionSidebar"
                                        >

                                            {
                                                authorsData.map((item, index) =>
                                                    <>
                                                        <input
                                                            key={index}
                                                            name="author_ids"
                                                            value={item._id}
                                                            className="ml-4"
                                                            type="checkbox"
                                                            onChange={onChangeInput}
                                                            checked={inputData.author_ids.includes(item._id)}
                                                        />
                                                        <label className="ml-3" value={item._id}>
                                                            {item.name}
                                                        </label>
                                                        <br />
                                                    </>
                                                )
                                            }
                                        </div>
                                        {errorMessages.author_ids && (
                                            <p className="text-danger ml-3">{errorMessages.author_ids}</p>
                                        )}
                                    </div>
                                    <div className="col-lg-4 form-group">
                                        <label for="inputState">Thể loại</label>
                                        <select name="category_id" onChange={onChangeInput} value={inputData.category_id || ""} id="inputState" className="form-control">
                                            <option >chọn thể loại ...</option>
                                            {
                                                categoriesData.map((item, index) =>
                                                    < >
                                                        <option key={index} value={item._id}>{item.name}</option>
                                                    </>
                                                )
                                            }
                                        </select>
                                        {errorMessages.category_id && (
                                            <p className="text-danger ml-3">{errorMessages.category_id}</p>
                                        )}

                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col-lg-4 form-group">
                                        <label >Năm sáng tác</label>
                                        <input
                                            name="year_creation"
                                            type="date"
                                            className="form-control"
                                            id="year_creation"
                                            onChange={onChangeInput}
                                            value={inputData.year_creation || ""}
                                        />
                                        {errorMessages.year_creation && (
                                            <p className="text-danger ml-3">{errorMessages.year_creation}</p>
                                        )}
                                    </div>
                                    <div className="col-lg-4 form-group">
                                        <div className="form-group">
                                            <label >Số lượng </label>
                                            <input
                                                name="total"
                                                type="number"
                                                className="form-control"
                                                id="total"
                                                onChange={onChangeInput}
                                                value={inputData.total || ""}
                                            />
                                            {errorMessages.total && (
                                                <p className="text-danger ml-3">{errorMessages.total}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-4 form-group">
                                        <div className="form-group">
                                            <label >Số tồn</label>
                                            <input
                                                name="stock"
                                                type="number"
                                                className="form-control"
                                                id="stock"
                                                onChange={onChangeInput}
                                                value={inputData.stock || ""}
                                            />
                                            {errorMessages.stock && (
                                                <p className="text-danger ml-3">{errorMessages.stock}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label >Mô tả</label>
                                    <textarea
                                        name="description"
                                        type="password"
                                        className="form-control"
                                        id="description"
                                        onChange={onChangeInput}
                                        value={inputData.description || ""}
                                    />
                                    {errorMessages.description && (
                                        <p className="text-danger ml-3">{errorMessages.description}</p>
                                    )}
                                </div>

                                <label >Nội dung</label>
                                <CKEditor
                                    name="content"
                                    editor={ClassicEditor}
                                    data={inputData?.content || ""}
                                    onChange={onChangeEditor}
                                    style={{ minHeight: "500px" }}
                                />
                                {errorMessages.content && (
                                    <p className="text-danger ml-3">{errorMessages.content}</p>
                                )}
                                <button
                                    onClick={onCLickSubmit}
                                    type="submit"
                                    className="btn btn-success mt-4"
                                >Thêm</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddBook;