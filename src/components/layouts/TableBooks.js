import { useEffect, useState } from "react";
import { createBooks, deleteSoftBook, getAllCategoriesBook, getAuthors, getBooks } from "../../services/Api";
import { Link } from "react-router-dom";
import moment from "moment";

import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TableAuthors = () => {

    const [booksData, setBookData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);
    const [bookToDelete, setBookToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        // Lấy getAuthors
        getBooks({})
            .then(({ data }) => setBookData(data.data));

        getAllCategoriesBook({})
            .then(({ data }) => setCategoriesData(data.data));

        // getAuthors({})
        //     .then(({ data }) => setAuthorsData(data.data));
    }, [])

    const onClickDelete = (book) => {
        setBookToDelete(book);
        setShowDeleteModal(true);
    };

    const handleDelete = () => {
        if (bookToDelete) {
            // Gọi API để xóa sách
            deleteSoftBook(bookToDelete._id)
                .then(({ data }) => {
                    if (data.message === "Success") {
                        // Xóa thành công, cập nhật danh sách tác giả
                        const updatedBooks = booksData.filter(
                            (book) => book._id !== bookToDelete._id
                        );
                        setBookData(updatedBooks);
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
                {/* Page Heading */}
                <div className="d-sm-flex align-items-center justify-content-between">
                    <h2 className="">Sách</h2>
                </div>

                {/* Thêm mới */}
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages1" aria-expanded="true" aria-controls="collapsePages">
                    <i className="fas fa-plus mr-2" />
                    <Link style={{ textDecoration: "none" }} to="/add-book">Thêm mới sách</Link>
                </a>

                {/* End Thêm mới */}

                {/* DataTales Example */}
                <div className="card shadow mb-4 mt-4">
                    <div className="card-body">
                        <div className="table-responsive">

                            {/* TableAuthors */}
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <th>Tên Sách</th>
                                        <th>Thể loại</th>
                                        <th>Năm </th>
                                        <th style={{ maxWidth: '50px' }}>Mô tả</th>
                                        <th>Tổng số </th>
                                        <th>Số tồn</th>
                                        <th className="text-center" colSpan={2} >Tùy chọn</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        booksData.map((item, index) =>

                                            <tr key={index}>
                                                <td>
                                                    <Link style={{ textDecoration: "none" }} to={`/details-book/${item._id}`}>{item.name}</Link>
                                                </td>
                                                <td>{item.category_id?.name}</td>
                                                <td>{moment(item?.year_creation).format('DD/MM/YYYY')}</td>
                                                <td style={{ maxWidth: '350px' }}>{item.description}</td>
                                                <td>{item.total}</td>
                                                <td>{item.stock}</td>
                                                <th className="text-center" >
                                                    <Link to={`/update-book/${item._id}`}>
                                                        <i id="ic-pen" className="fa fa-pen" />
                                                    </Link>
                                                </th>
                                                <th className="text-center" >
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
                            <h5 className="modal-title">Xóa sách</h5>
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
                            <p>Bạn có chắc chắn muốn xóa sách này?</p>
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


        </>
    )
}

export default TableAuthors;