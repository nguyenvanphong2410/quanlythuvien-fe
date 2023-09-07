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
        author_ids: [], // Thêm một trường mới để lưu trữ author_ids
    });

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
        console.log(inputData);

    }

    const onChangeEditor = (event, editor) => {
        const data = editor.getData();
        setInputData({ ...inputData, content: data });
    };

    //onCLickSubmit
    const onCLickSubmit = (e) => {
        e.preventDefault();
        createBooks(inputData, {})
            .then((data) => {
                if (data.data.status === "OK") {
                    // alert(data.data.message);
                    // navigate('/books');
                    toast.success(data.data.message);
                    setTimeout(() => navigate('/books'), 1400)
                } else if (data.data.status === "ERR") {
                    // alert(data.data.message);
                    toast.error(data.data.message);
                }
            });
    }
    return (
        <>
         <ToastContainer />
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <nav className="navbar navbar-expand navbar-light bg-dark topbar mb-4 static-top shadow">
                            <ul className="navbar-nav ml-auto">
                                <HeaderAdmin />
                            </ul>
                        </nav>
                        <div className="container-fluid">
                            <div>
                                <div className="col-5">
                                    <h2>Thêm mới sách</h2>
                                </div>
                                <div className="col-7"></div>
                            </div>

                            <div id="collapsePages1" className="" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                                <form id="form-insert" className="">

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
                                                            <label className="ml-3"  value={item._id}>
                                                                {item.name}
                                                            </label>
                                                            <br />
                                                        </>
                                                    )
                                                }
                                            </div>
                                        </div>


                                        <div className="col-lg-4 form-group">
                                            <label for="inputState">Thể loại</label>
                                            <select name="category_id" onChange={onChangeInput} value={inputData.category_id || ""} id="inputState" className="form-control">
                                                {
                                                    categoriesData.map((item, index) =>
                                                        < >
                                                            <option key={index} value={item._id}>{item.name}</option>
                                                        </>
                                                    )
                                                }
                                            </select>
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
                                    </div>
                                    {/* <div className="form-group">
                                        <label >Nội dung</label>
                                        <textarea
                                            name="content"
                                            type="password"
                                            className="form-control"
                                            id="content"
                                            onChange={onChangeInput}
                                            value={inputData.content || ""}
                                        />
                                    </div> */}

                                    <label >Nội dung</label>
                                    <CKEditor
                                        name="content"
                                        editor={ClassicEditor}
                                        data={inputData?.content || ""}
                                        onChange={onChangeEditor}
                                        style={{ minHeight: "500px" }}
                                        
                                    />

                                    <button onClick={onCLickSubmit} type="submit" className="btn btn-success mt-4">Thêm</button>
                                </form>


                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddBook;