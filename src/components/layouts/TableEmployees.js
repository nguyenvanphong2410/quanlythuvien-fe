import { useEffect, useState } from "react";
import { getEmployees } from "../../services/Api";
import { Link, useNavigate } from "react-router-dom";
import { deleteSoftEmployee } from "../../services/Api";

const TableEmployees = () => {
    const navigate = useNavigate();

    const [employeesData, setEmployeesData] = useState([]);

    useEffect(() => {
        // Lấy getEmployees
        getEmployees({})
            .then(({ data }) => setEmployeesData(data.data));
    }, [])

    //onClickDelete
    const onClickDelete = (id) => {
        deleteSoftEmployee(id)
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
                <h1 className="h3 mb-0 text-gray-800">Nhân viên</h1>
            </div>

            {/* DataTales Example */}
            <div className="card shadow mb-4 mt-4">
                <div className="card-body">
                    <div className="table-responsive">

                        {/* TableEmployees */}
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                            <thead>
                                <tr>
                                    <th>Họ tên nhân viên</th>
                                    <th>Số điện thoại</th>
                                    <th>Email</th>
                                    <th colSpan={2} >Tùy chọn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    employeesData.map((item, index) =>
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.email}</td>
                                            <th>
                                                <Link to={`/update-employee/${item._id}`}>
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


            {/* Modal delete
            <div id='delete-modal' class="modal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Xóa nhân viên</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>Bạn có chắc chắn muốn xóa nhân viên này ?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger">Xóa</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                        </div>
                    </div>
                </div>
            </div>
            <script>

            </script> */}
        </>
    )

}

export default TableEmployees;