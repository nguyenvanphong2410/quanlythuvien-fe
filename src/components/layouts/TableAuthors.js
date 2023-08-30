import { useEffect, useState } from "react";
import { createAuthors, deleteSoftAuthor, getAuthors } from "../../services/Api";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";


const TableAuthors = () => {

    const navigate = useNavigate();

    const [authorsData, setAuthorData] = useState([]);
    const [inputComment, setInputComment] = useState({});

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

    //onCLickSubmit
    const onCLickSubmit = (e) => {
        e.preventDefault();
        createAuthors(inputComment, {})
            .then(({ data }) => {
                setInputComment({});
                if (data.data.status === "OK") {
                    window.location.reload();
                } else if (data.data.status === "ERR") {
                    alert(data.message);
                }
            });
    }

    //onCLickDelete
    const onClickDelete = (id) => {
        deleteSoftAuthor(id)
            .then(({ data }) => {
                if (data.status === "OK") {
                    window.location.reload();
                } else if (data.status === "ERR") {
                    alert(data.message);
                }
            })
    }

    return (
        <>
            {/* Page Heading */}
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Tác Giả</h1>
            </div>
            {/* Nav Item - Pages Collapse Menu */}
            {/* Thêm mới */}
            <div>
                <div className="col-3">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages1" aria-expanded="true" aria-controls="collapsePages">
                        <i className="fas fa-fw fa-user-plus mr-2" />
                        <Link style={{ textDecoration: "none" }} to="/add-author">Thêm mới tác giả</Link>
                    </a>
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
            <div id="delete-btn" class="modal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Xóa tác giả</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>Bạn có chắc chắn muốn xóa tác giả này?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger">Xóa</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default TableAuthors;