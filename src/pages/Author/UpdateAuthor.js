import React, { useEffect, useState } from 'react';
import HeaderAdmin from '../../components/layouts/HeaderAdmin';
import Sidebar from '../../components/layouts/Sidebar';
import { getAuthorDetails, getBookDetails, updateAuthor, updateBook } from '../../services/Api';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

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
                setAuthorDetailsData(data.data);
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

    const onCLickUpdate = (e) => {
        e.preventDefault();
        updateAuthor(id, inputData)
            .then(({ data }) => {
                setInputData({});
                if (data.status === "OK") {
                    navigate('/authors');
                } else if (data.status === "ERR") {
                    alert(data.message);
                }
            });
    };

    return (
        <>
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
                                    <h2>Cập nhật thông tác giả</h2>
                                </div>
                                <div className="col-7"></div>
                            </div>
                            <div id="update">
                                <div className='row'>
                                    <div className="col-3"></div>
                                    <div className="col-6">
                                        <form method='POST' id="form-insert" className="">
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
                                                    <div className="form-group">
                                                        <label >Mô tả</label>
                                                        <input
                                                            name="story"
                                                            type="text"
                                                            className="form-control"
                                                            id="story"
                                                            onChange={onChangeInput}
                                                            value={inputData.story}
                                                        />
                                                    </div>
                                                </div>
                                               
                                                <div className="col-lg-12">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary"
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
            </div>
        </>
    );
};

export default UpdateAuthor;