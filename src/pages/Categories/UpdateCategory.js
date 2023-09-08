import React from 'react'
import HeaderAdmin from '../../components/layouts/HeaderAdmin'
import Sidebar from '../../components/layouts/Sidebar'
import { useEffect, useState } from "react";
import { getDetailsCategory, updateCategory } from "../../services/Api";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { Slide, ToastContainer, toast } from 'react-toastify';
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
            <div id="wrapper">
            <ToastContainer transition={Slide} />
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderAdmin />
                        <div className="container-fluid">
                            <div className='row'>
                                <div className="col-3"></div>

                                <div className="col-6">
                                    <h2 className='text-center'>Cập nhật thông tin thể loại sách</h2>
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
                                        <button
                                            onClick={onCLickUpdate}
                                            type="submit"
                                            className="btn btn-primary float-right "
                                        >Lưu</button>
                                    </form>
                                </div>

                                <div className="col-3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default UpdateCategory