import React, { useEffect, useState } from 'react';
import HeaderAdmin from '../../components/layouts/HeaderAdmin';
import Sidebar from '../../components/layouts/Sidebar';
import { getAuthorDetails, getBookDetails, updateAuthor, updateBook } from '../../services/Api';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Slide, ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';



const UpdateAuthor = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    const [bookDetailsData, setAuthorDetailsData] = useState(null);
    const [inputData, setInputData] = useState({
        name: "",
        date_of_birth: "",
        story: "",

    });

    useEffect(() => {
        getAuthorDetails(id)
            .then(({ data }) => {
                // setAuthorDetailsData(data.data);
                setInputData({
                    name: data.data?.name || "",
                    date_of_birth: moment(data.data?.date_of_birth).format('YYYY-MM-DD') || "",
                    story: data.data?.story || ""
                });
            });
    }, [id]);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setInputData((prevInput) => ({
            ...prevInput,
            [name]: value
        }));
        console.log(inputData)
    };

    const onChangeEditor = (event, editor) => {
        const data = editor.getData();
        setInputData(prevInput => ({
            ...prevInput,
            story: data
        }));
    };

    console.log('inputData', inputData);
    const onCLickUpdate = (e) => {
        e.preventDefault();
        updateAuthor(id, inputData)
            .then(({ data }) => {
                if (data.status === "OK") {
                    toast.success(data.message);
                    setTimeout(() => navigate('/authors'), 1400)
                } else if (data.status === "ERR") {
                    toast.error(data.message);
                }
            });
    };

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
                                <h2 className='text-center'>Cập nhật thông tác giả</h2>
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
                                            </div>
                                        </div>
                                        <div className="col-lg-12 form-group">
                                            <div className="form-group">
                                                <label >Năm sáng tác</label>
                                                <input
                                                    name="date_of_birth"
                                                    type="date"
                                                    className="form-control"
                                                    id="date_of_birth"
                                                    onChange={onChangeInput}
                                                    value={inputData.date_of_birth}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-12 form-group">
                                            <label >Nội dung</label>
                                            <CKEditor
                                                name="story"
                                                editor={ClassicEditor}
                                                data={inputData?.story || ""}
                                                onChange={onChangeEditor}
                                            />
                                        </div>
                                        <div className="col-lg-12">
                                            <button
                                                type="submit"
                                                className="btn btn-primary float-right"
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
        </>
    );
};

export default UpdateAuthor;