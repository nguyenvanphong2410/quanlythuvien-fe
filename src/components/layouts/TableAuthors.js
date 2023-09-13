import { useEffect, useState } from "react";
import { createAuthors, deleteSoftAuthor, getAuthors } from "../../services/Api";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TableAuthors = () => {

    const navigate = useNavigate();


    const [authorsData, setAuthorData] = useState([]);
    const [inputComment, setInputComment] = useState({});

    const [authorToDelete, setAuthorToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        // Lấy getAuthors
        getAuthors({})
            .then(({ data }) => setAuthorData(data.data));
    }, [])

    const onClickDelete = (author) => {
        setAuthorToDelete(author);
        setShowDeleteModal(true);
    };

    const handleDelete = () => {
        if (authorToDelete) {
            // Gọi API để xóa tác giả
            deleteSoftAuthor(authorToDelete._id)
                .then(({ data }) => {
                    if (data.message === "Success") {
                        // Xóa thành công, cập nhật danh sách tác giả
                        const updatedAuthors = authorsData.filter(
                            (author) => author._id !== authorToDelete._id
                        );
                        setAuthorData(updatedAuthors);
                        toast.success(data?.data?.message);
                    } else if (data.message === "Error") {
                        toast.error(data?.data?.message);

                    }
                });
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
                <div className="d-sm-flex align-items-center justify-content-between">
                    <h2 className="">Tác Giả</h2>
                </div>

                <div >
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages1" aria-expanded="true" aria-controls="collapsePages">
                        <i className="fas fa-fw fa-user-plus mr-2" />
                        <Link style={{ textDecoration: "none" }} to="/add-author">Thêm mới tác giả</Link>
                    </a>
                </div>


                {/* DataTales */}
                <div className="card shadow mb-4 mt-4">
                    <div className="card-body">
                        <div className="table-responsive">

                            {/* TableAuthors */}
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0} >
                                <thead>
                                    <tr>
                                        <th>Họ tên tác giả</th>
                                        <th>Ngày sinh</th>
                                        <th className="text-center" colSpan={2} >Tùy chọn</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        authorsData.map((item, index) =>
                                            <tr key={index}>
                                                <td>
                                                    <Link style={{ textDecoration: "none" }} to={`/details-author/${item._id}`}>{item.name}</Link>
                                                </td>
                                                <td>{moment(item.date_of_birth).format('DD/MM/YYYY')}</td>
                                                <th className="text-center">
                                                    <Link to={`/update-author/${item._id}`}>
                                                        <i id="ic-pen" className="fa fa-pen" />
                                                    </Link>
                                                </th>
                                                {/* <th className="text-center">
                                                    <a onClick={() => onClickDelete(item)} data-toggle="modal" data-target="#delete-modal">
                                                        <i id="ic-trash" className="fa fa-trash" />
                                                    </a>
                                                </th> */}
                                                <th className="text-center">
                                                    <a
                                                        onClick={() => onClickDelete(item)}
                                                        data-toggle="modal"
                                                        data-target="#delete-modal"
                                                    >
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

                {/* Modal delete */}
                <div
                    id="delete-modal"
                    className="modal"
                    tabIndex="-1"
                    style={{ display: showDeleteModal ? "block" : "none" }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Xóa tác giả</h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={handleCancelDelete}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Bạn có chắc chắn muốn xóa tác giả này?</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleDelete}
                                    data-dismiss="modal"
                                >
                                    Xóa
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                    onClick={handleCancelDelete}
                                >
                                    Hủy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default TableAuthors;