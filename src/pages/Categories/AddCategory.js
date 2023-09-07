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

    useEffect(() => {
        // Lấy getAuthors
        getAuthors({})
            .then(({ data }) => setAuthorData(data.data));
    }, [])



    //onChangeInput 
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
        console.log(inputData)
    }

    //onCLickSubmit
    const onCLickSubmit = (e) => {
        e.preventDefault();
        createCategoryBooks(inputData)
            .then(({ data }) => {
                if (data.status === "OK") {
                    toast.success(data.message);
                    setTimeout(() => navigate('/categories'), 1400)

                } else if (data.status === "ERR") {
                    toast.error(data.message);
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

                                </div>
                                <div className="col-7"></div>
                            </div>

                            <div id="collapsePages1" className="" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                                <div className='row'>
                                    <div className='col-lg-3'></div>
                                    <div className='col-lg-6'>
                                    
                                <h2 className='text-center'>Thêm mới danh mục</h2>
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
                                        </div>
                                    </div>



                                    <button onClick={onCLickSubmit} type="submit" className="btn btn-success mt-4">Thêm</button>
                                </form>
                                </div>
                                <div className='col-lg-3'></div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddCategory;