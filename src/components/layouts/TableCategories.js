import { useEffect, useState } from "react";
import { deleteSoftCategory, getAllCategoriesBook } from "../../services/Api";
import { Link, useNavigate } from "react-router-dom";

import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TableCategories = () => {
    const navigate = useNavigate();

    const [categoryData, setCategoryData] = useState([]);

    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        // Lấy getEmployees
        getAllCategoriesBook({})
            .then(({ data }) => setCategoryData(data.data));
    }, [])

    const onClickDelete = (category) => {
        setCategoryToDelete(category);
        setShowDeleteModal(true);
    }

    const handleDelete = () => {
        if (categoryToDelete) {
            deleteSoftCategory(categoryToDelete._id)
                .then(({ data }) => {
                    if (data.message === "Success") {
                        // Xóa thành công, cập nhật danh sách thể loại
                        const updatedCategory = categoryData.filter(
                            (category) => category._id !== categoryToDelete._id
                        );
                        setCategoryToDelete(updatedCategory);
                        toast.success(data?.data?.message);
                    } 
                })
                .catch((data)=> {
                    if (data.error === true) {
                        toast.error(data?.data?.message);
                    }
                })
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };

    return (
        <>
            <div className="container-fluid">

                <ToastContainer
                    transition={Slide}
                    autoClose={1500}
                    hideProgressBar={false}
                />
                {/* Page Heading */}
                <div className="d-sm-flex align-items-center justify-content-between">
                    <h2 className="">Thể loại sách </h2>
                </div>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages1" aria-expanded="true" aria-controls="collapsePages">
                        <i className="fas fa-plus mr-2" />
                        <Link style={{ textDecoration: "none" }} to="/add-category">Thêm mới thể loại</Link>
                    </a>
                </div>

                {/* DataTales Example */}
                <div className="card shadow mb-4 mt-4">
                    <div className="card-body">
                        <div className="table-responsive">

                            {/* TableCategories */}
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <th>Tên thể loại</th>
                                        <th>Mô tả</th>
                                        <th className="text-center" colSpan={2} >Tùy chọn</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        categoryData.map((item, index) =>
                                            <tr key={index}>
                                                <td>{item?.name}</td>
                                                <td>{item?.description}</td>
                                                <th className="text-center" >
                                                    <Link to={`/update-category/${item?._id}`}>
                                                        <i id="ic-pen" className="fa fa-pen" />
                                                    </Link>
                                                </th>
                                                <th className="text-center" >
                                                    <a onClick={() => onClickDelete(item)} data-toggle="modal" data-target="#delete-modal" >
                                                        <i id="ic-trash" className="fa fa-trash" />
                                                    </a>
                                                </th>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
            {/* Modal delete */}
            <div id="delete-modal" className="modal" tabIndex="-1" style={{ display: showDeleteModal ? "block" : "none" }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Xóa thể loại sách</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCancelDelete}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Bạn có chắc chắn muốn xóa thể loại sách này?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={handleDelete}>
                                Xóa
                            </button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleCancelDelete}>
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default TableCategories;