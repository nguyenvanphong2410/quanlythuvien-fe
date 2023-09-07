import { useEffect, useState } from "react";
import { createAuthors, deleteSoftAuthor, getAuthors } from "../../services/Api";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TableAuthors = () => {

    const navigate = useNavigate();

    const [authorsData, setAuthorData] = useState([]);
    const [inputComment, setInputComment] = useState({});

    useEffect(() => {
        // Lấy getAuthors
        getAuthors({})
            .then(({ data }) => setAuthorData(data.data));
    }, [])

    //onCLickDelete
    const onClickDelete = (id) => {
        deleteSoftAuthor(id)
            .then(({ data }) => {
                if (data.status === "OK") {
                    toast.success(data.message);
                    setTimeout(() => window.location.reload(), 1000)
                } else if (data.status === "ERR") {
                    toast.error(data.message);
                }
            })
    }

    return (
        <>
            <ToastContainer />
            {/* Page Heading */}
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h2 className=" mb-0 ">Tác Giả</h2>
            </div>
            {/* Nav Item - Pages Collapse Menu */}
            {/* Thêm mới */}
            <div>
                <div className="col-3">
                    {/* <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages1" aria-expanded="true" aria-controls="collapsePages"> */}
                        <i className="fas fa-fw fa-user-plus mr-2" />
                        <Link style={{ textDecoration: "none" }} to="/add-author">Thêm mới tác giả</Link>
                    {/* </a> */}
                </div>
                <div className="col-10"></div>
            </div>


            {/* End Thêm mới */}
            {/* DataTales Example */}
            <div className="card shadow mb-4 mt-4">
                <div className="card-body">
                    <div className="table-responsive">

                        {/* TableAuthors */}
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0} >
                            <thead>
                                <tr>
                                    <th>Họ tên tác giả</th>
                                    <th>Ngày sinh</th>
                                    {/* <th>Các đầu sách </th> */}
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
                                            {/* <td></td> */}
                                            <th className="text-center">
                                                <Link to={`/update-author/${item._id}`}>
                                                    <i id="ic-pen" className="fa fa-pen" />
                                                </Link>
                                            </th>
                                            <th className="text-center">
                                                <a onClick={() => onClickDelete(item._id)} data-toggle="modal" data-target="#delete-modal">
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

            {/* confirm delete */}
            {/* <div id="delete-btn" className="modal" tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Xóa tác giả</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Bạn có chắc chắn muốn xóa tác giả này?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger">Xóa</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Hủy</button>
                        </div>
                    </div>
                </div>
            </div> */}

        </>
    )
}

export default TableAuthors;