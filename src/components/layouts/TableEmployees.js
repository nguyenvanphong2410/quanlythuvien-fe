import { useEffect, useState } from "react";
import { getEmployees } from "../../services/Api";
import { Link, useNavigate } from "react-router-dom";
import { deleteSoftEmployee } from "../../services/Api";

const TableEmployees = () => {
    const navigate = useNavigate();

    const [employeesData, setEmployeesData] = useState([]);
    
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        // Lấy getEmployees
        getEmployees({})
            .then(({ data }) => setEmployeesData(data.data));
    }, [])

    const onClickDelete = (employee) => {
        setEmployeeToDelete(employee);
        setShowDeleteModal(true);
    }

    const handleDelete = () => {
        if (employeeToDelete) {
            deleteSoftEmployee(employeeToDelete._id)
                .then(({ data }) => {
                    if (data.status === "OK") {
                        // Xóa thành công, cập nhật danh sách nhân viên
                        const updatedEmployees = employeesData.filter(
                            (employee) => employee._id !== employeeToDelete._id
                        );
                        setEmployeesData(updatedEmployees);
                        setShowDeleteModal(false);
                        window.location.reload();
                    } else if (data.status === "ERR") {
                        alert(data.message);
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
                {/* Page Heading */}
                <div className="d-sm-flex align-items-center justify-content-between">
                    <h2 className="">Nhân viên</h2>
                </div>
                {/* Thêm mới */}
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages1" aria-expanded="true" aria-controls="collapsePages">
                    <i className="fas fa-plus mr-2" />
                    <Link style={{ textDecoration: "none" }} to="/add-employee">Thêm mới nhân viên</Link>
                </a>
                {/* End Thêm mới */}
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
                                        <th className="text-center" colSpan={2} >Tùy chọn</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        employeesData.map((item, index) =>
                                            <tr key={index}>
                                                <td>{item.name}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.email}</td>
                                                <th className="text-center" >
                                                    <Link to={`/update-employee/${item._id}`}>
                                                        <i id="ic-pen" className="fa fa-pen" />
                                                    </Link>
                                                </th>
                                                <th className="text-center" >
                                                    <a onClick={() => onClickDelete(item)} data-toggle="modal" data-target="#delete-modal">
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
                            <h5 className="modal-title">Xóa nhân viên</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCancelDelete}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Bạn có chắc chắn muốn xóa nhân viên này?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={handleDelete}>
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

export default TableEmployees;