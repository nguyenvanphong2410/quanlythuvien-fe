import React, { useEffect, useState } from 'react';
import HeaderAdmin from '../../components/layouts/HeaderAdmin';
import Sidebar from '../../components/layouts/Sidebar';
import { getAllCategoriesBook, getAuthors, getBookDetails, updateBook } from '../../services/Api';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateBook = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    const [authorsData, setAuthorsData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);

    const [inputData, setInputData] = useState({
        name: "",
        year_creation: "",
        description: "",
        content: "",
        total: "",
        stock: "",
        category_id: "",
        author_ids: []
    });
    const [errorMessages, setErrorMessages] = useState({});

    console.log(inputData)
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const specialCharsDescription = /[$%^&*_\[\]{}|]+/;
    const specialCharsContent = /[$%^&*_\[\]{}|]+/;

    useEffect(() => {
        getAllCategoriesBook({})
            .then(({ data }) => setCategoriesData(data.data));
        //lấy thông tác giả
        getAuthors({})
            .then(({ data }) => setAuthorsData(data.data));
    }, [])

    useEffect(() => {
        getBookDetails(id)
            .then(({ data }) => {
                setInputData({
                    name: data.data?.name || "",
                    year_creation: moment(data.data?.year_creation).format('YYYY-MM-DD') || "",
                    description: data.data?.description || "",
                    content: data.data?.content || "",
                    total: data.data?.total || "",
                    stock: data.data?.stock || "",
                    category_id: data.data?.category_id || "",
                    author_ids: data.data?.author_ids || []
                });

            });
    }, [id]);

    const onChangeInput = (e) => {
        const { name, value, checked } = e.target;

        if (name === "author_ids") {
            setInputData(prevInput => ({
                ...prevInput,
                author_ids: checked
                    ? [...prevInput.author_ids, {_id:value}] // Thêm giá trị vào mảng
                    :prevInput.author_ids.filter(item => item._id !== value)  // Loại bỏ giá trị khỏi mảng
            }));
        } else {
            setInputData(prevInput => ({
                ...prevInput,
                [name]: value,
            }));
        }
        setErrorMessages({ ...errorMessages, [name]: "" });
        // console.log(inputData)
    };

    const onChangeEditor = (event, editor) => {
        const data = editor.getData();
        setInputData(prevInput => ({
            ...prevInput,
            content: data
        }));
    };

    console.log('inputData', inputData);
    const onCLickUpdate = (e) => {
        e.preventDefault();

        const parseIntTotal = inputData.total = parseInt(inputData.total)
        const parseIntStock = inputData.stock = parseInt(inputData.stock)

        // console.log(test);
        // console.log('Type of',typeof(test));

        const isTrueName = specialChars.test(inputData.name);
        const isTrueDescription = specialCharsDescription.test(inputData.description)
        const isTrueContent = specialCharsContent.test(inputData.content)

        const errors = {};

        if (!inputData.name) {
            errors.name = "Vui lòng nhập tên sách !";
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
        } else if (parseIntTotal < 0) {
            errors.total = "Tổng sổ lượng không hợp lệ !";
        }

        if (!inputData.stock) {
            errors.stock = "Vui lòng điền tổng số lượng tồn !";
        }else if (parseIntStock < 0) {
            errors.stock = "Số lượng tồn không hợp lệ !";
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
            updateBook(id, inputData)
                .then(({ data }) => {
                    if (data.data.status === "OK") {
                        // navigate('/books');
                        toast.success(data.data.message);
                        setTimeout(() => navigate('/books'), 1400)
                    } else if (data.data.status === "ERR") {
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
    };

    return (
        <>
            <div id="wrapper">
                <ToastContainer transition={Slide} />
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <HeaderAdmin />
                    <div className="container-fluid">
                        <div id="update">
                            <div className='row'>
                                <div className="col-3"></div>
                                <div className="col-6">
                                    <h2 className='text-center'>Cập nhật thông tin sách</h2>
                                    <form method='POST' id="form-insert" >
                                        <div className="row">
                                            <div className="col-lg-12 form-group">
                                                <div className="form-group">
                                                    <label >Tên sách</label>
                                                    <input
                                                        name="name"
                                                        type="text"
                                                        className="form-control"
                                                        id="name"
                                                        aria-describedby="name"
                                                        onChange={onChangeInput}
                                                        value={inputData?.name || ""}
                                                    />
                                                    {errorMessages.name && (
                                                        <p className="text-danger ml-3">{errorMessages.name}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-lg-12 form-group">
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
                                                                    checked={ 
                                                                        inputData?.author_ids.some(
                                                                            (itemId) => itemId?._id === item?._id
                                                                        ) || null
                                                                    }
                                                                />
                                                                <label className="ml-3" for="inputState" value={item._id}>
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
                                            <div className="col-lg-12 form-group">

                                                <div className='row'>
                                                    <div className="col-lg-6 form-group">

                                                        <label for="inputState">Thể loại</label>
                                                        <select name="category_id" onChange={onChangeInput} id="inputState" className="form-control">

                                                            <option >{inputData.category_id?.name}</option>
                                                            {categoriesData.map((item, index) => (
                                                                inputData.category_id?._id === item._id ? (
                                                                    <option
                                                                        key={index}
                                                                        value={item._id}
                                                                        style={{ display: 'none' }}
                                                                    >
                                                                        {item.name}
                                                                    </option>
                                                                ) : (
                                                                    <option key={index} value={item._id}>
                                                                        {item.name}
                                                                    </option>
                                                                )
                                                            ))}
                                                            {errorMessages.category_id && (
                                                                <p className="text-danger ml-3">{errorMessages.category_id}</p>
                                                            )}
                                                        </select>
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <div className="form-group">
                                                            <label >Năm sáng tác</label>
                                                            <input
                                                                name="year_creation"
                                                                type="date"
                                                                className="form-control"
                                                                id="year_creation"
                                                                onChange={onChangeInput}
                                                                value={inputData.year_creation}
                                                            />
                                                            {errorMessages.year_creation && (
                                                                <p className="text-danger ml-3">{errorMessages.year_creation}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-12 form-group">
                                                <div className="form-group">
                                                    <label >Mô tả</label>
                                                    <input
                                                        name="description"
                                                        type="text"
                                                        className="form-control"
                                                        id="description"
                                                        onChange={onChangeInput}
                                                        value={inputData.description}
                                                    />
                                                    {errorMessages.description && (
                                                        <p className="text-danger ml-3">{errorMessages.description}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-lg-12 form-group">
                                                <label >Nội dung</label>
                                                <CKEditor
                                                    name="content"
                                                    editor={ClassicEditor}
                                                    data={inputData?.content || ""}
                                                    onChange={onChangeEditor}
                                                />
                                                {errorMessages.content && (
                                                    <p className="text-danger ml-3">{errorMessages.content}</p>
                                                )}
                                            </div>

                                            <div className="col-lg-12 form-group">
                                                <div className='row'>
                                                    <div className="col-lg-6 form-group">

                                                        <div className="form-group">
                                                            <label >Tổng số lượng</label>
                                                            <input
                                                                name="total"
                                                                type="number"
                                                                className="form-control"
                                                                id="total"
                                                                onChange={onChangeInput}
                                                                value={inputData.total}
                                                            />
                                                            {errorMessages.total && (
                                                                <p className="text-danger ml-3">{errorMessages.total}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <div className="form-group">
                                                            <label >Số lượng còn lại</label>
                                                            <input
                                                                name="stock"
                                                                type="number"
                                                                className="form-control"
                                                                id="stock"
                                                                onChange={onChangeInput}
                                                                value={inputData.stock}
                                                            />
                                                            {errorMessages.stock && (
                                                                <p className="text-danger ml-3">{errorMessages.stock}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary mb-5 float-right"
                                                    onClick={onCLickUpdate}
                                                >
                                                    Cập nhật
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateBook;
