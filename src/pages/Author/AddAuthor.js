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
    const [inputComment, setInputComment] = useState({});
    const [editorInstance, setEditorInstance] = useState(null);

    useEffect(() => {
        // Lấy getAuthors
        getAuthors({})
            .then(({ data }) => setAuthorData(data.data));
    }, [])

    //onChangeInput 
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setInputComment({ ...inputComment, [name]: value });
        console.log(inputComment)
    }

    const onChangeEditor = (event, editor) => {
        const data = editor.getData();
        setInputComment({ ...inputComment, story: data });
    };

    //onCLickSubmit
    const onCLickSubmit = (e) => {
        e.preventDefault();
        createAuthors(inputComment, {})
            .then(({ data }) => {
                if (data.status === "OK") {
                    toast.success(data.message);
                    setTimeout(() => navigate('/authors'), 1400)
                } else if (data.status === "ERR") {
                    toast.error(data.message);
                }
            });
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
                            <h2>Thêm mới tác giả</h2>
                            <form id="form-insert" className="">
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
                                            value={inputComment.name || ""}
                                            style={{ width: '300px' }}
                                        />
                                    </div>
                                </div>
                                <div className=" form-group">
                                    <div className="form-group">
                                        <label >Ngày sinh</label>
                                        <input
                                            name="date_of_birth"
                                            type="date"
                                            className="form-control"
                                            id="date_of_birth"
                                            onChange={onChangeInput}
                                            style={{ width: '300px' }}
                                            value={inputComment.date_of_birth || ""}
                                        />
                                    </div>
                                </div>

                                <label >Tiểu sử</label>
                                <CKEditor
                                    name="story"
                                    editor={ClassicEditor}
                                    data={inputComment?.story || ""}
                                    onChange={onChangeEditor}
                                />

                                <button onClick={onCLickSubmit} type="submit" className="btn btn-success mt-4">Thêm</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddAuthor;