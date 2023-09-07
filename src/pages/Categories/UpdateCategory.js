import React from 'react'
import HeaderAdmin from '../../components/layouts/HeaderAdmin'
import Sidebar from '../../components/layouts/Sidebar'
import { useEffect, useState } from "react";
import { getDetailsCategory, updateCategory } from "../../services/Api";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateCategory = () => {

    //Navigate
    const navigate = useNavigate();

    //Lấy id trên url
    const params = useParams();
    const id = params.id;

    const [categories, setCategories] = useState(null);
    const [inputData, setInputData] = useState({
        name: "",
        description: "",
        
    });

    useEffect(() => {
        getDetailsCategory(id)
            .then(({ data }) => {
                setCategories(data.data)
                setInputData({
                    name: data.data?.name || "",
                    description: data.data?.description || "",
                });
            });
    }, [id])


    //handleOnChangeInput
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
        updateCategory(id, inputData)
            .then(({ data }) => {
                if (data?.status === "OK") {
                    toast.success(data.message);
                    setTimeout(() => navigate('/categories'), 1400)
                } else if (data?.status === "ERR") {
                    toast.error(data?.message);
                }
            });
    }


    return (
        <>
                    <ToastContainer />
            {/* Page Wrapper */}
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">

                    {/* Main Content */}
                    <div id="content">

                        {/* Topbar */}
                        <nav className="navbar navbar-expand navbar-light bg-dark topbar mb-4 static-top shadow">
                            {/* Topbar Navbar */}
                            <ul className="navbar-nav ml-auto">
                                <HeaderAdmin />
                            </ul>
                        </nav>
                        {/* End of Topbar */}
                        {/* Begin Page Content */}
                        <div className="container-fluid">

                            {/* Thêm mới */}
                            <div>
                                <div className="col-5">
                                    <h2>Cập nhật thể loại sách</h2>
                                </div>
                                <div className="col-7"></div>
                            </div>

                            <div id="update" >
                                <div className='row'>
                                    <div className="col-3"></div>
                                    <div className="col-6">
                                        {/* <h5>{messageStatus ? messageStatus}</h5> */}
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
                                                    <div className="form-group">
                                                        <label >Mô tả</label>
                                                        <input
                                                            name="description"
                                                            type="text"
                                                            className="form-control"
                                                            id="description"
                                                            aria-describedby="name"
                                                            onChange={onChangeInput}
                                                            value={inputData.description}
                                                        />
                                                    </div>
                                                </div>
                                                

                                            </div>

                                            <button onClick={onCLickUpdate} type="submit" className="btn btn-primary ">Lưu</button>
                                        </form>
                                    </div>
                                    <div className="col-3"></div>

                                </div>


                            </div>
                            {/* End Thêm mới */}

                        </div>
                        {/* End Page Content */}
                    </div>
                </div>
            </div>

        </>
    )
}

export default UpdateCategory