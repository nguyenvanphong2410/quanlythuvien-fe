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
            .then(({data}) => {
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
            .then(({data}) => {
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
                        <span>Thêm mới tác giả</span>
                    </a>
                </div>
                <div className="col-10"></div>
            </div>

            <div id="collapsePages1" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                <form id="form-insert" className="">
                    <div className="row">
                        <div className="col-lg-6 form-group">
                            <div className="form-group">
                                <label >Họ tên</label>
                                <input
                                    name="name"
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    aria-describedby="name"
                                    onChange={onChangeInput}
                                    value={inputComment.name || ""}
                                />
                                <small id="emailHelp" className="form-text text-muted"> message...</small>
                            </div>
                        </div>
                        <div className="col-lg-6 form-group">
                            <div className="form-group">
                                <label >Ngày sinh</label>
                                <input
                                    name="date_of_birth"
                                    type="date"
                                    className="form-control"
                                    id="date_of_birth"
                                    onChange={onChangeInput}
                                    value={inputComment.date_of_birth || ""}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label >Tiểu sử</label>
                        <textarea
                            name="story"
                            type="text"
                            className="form-control"
                            id="story"
                            onChange={onChangeInput}
                            value={inputComment.story || ""}
                        />
                    </div>
                    <button onClick={onCLickSubmit} type="submit" className="btn btn-success ">Thêm</button>
                </form>


            </div>
            {/* End Thêm mới */}
            {/* DataTales Example */}
            <div className="card shadow mb-4 mt-4">
                <div className="card-body">
                    <div className="table-responsive">

                        {/* TableAuthors */}
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                            <thead>
                                <tr>
                                    <th>Họ tên tác giả</th>
                                    <th>Ngày sinh</th>
                                    <th>Các đầu sách </th>
                                    <th colSpan={2} >Tùy chọn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    authorsData.map((item, index) =>
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{moment(item.date_of_birth).format('DD/MM/YYYY')}</td>
                                            <td></td>
                                            <th>
                                                <Link to={`/update-author/${item._id}`}>
                                                    <i id="ic-pen" className="fa fa-pen" />
                                                </Link>
                                            </th>
                                            <th>
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