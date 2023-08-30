import { useEffect, useState } from "react";
import { deleteSoftCategory, getAllCategoriesBook } from "../../services/Api";
import { Link, useNavigate } from "react-router-dom";

const TableCategories = () => {
    const navigate = useNavigate();

    const [CategoryData, setCategoryData] = useState([]);

    useEffect(() => {
        // Lấy getEmployees
        getAllCategoriesBook({})
            .then(({ data }) => setCategoryData(data.data));
    }, [])

    //onClickDelete
    const onClickDelete = (id) => {
        deleteSoftCategory(id)
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
                                    CategoryData.map((item, index) =>
                                        <tr key={index}>
                                            <td>{item?.name}</td>
                                            <td>{item?.description}</td>
                                            <th className="text-center" >
                                                <Link to={`/update-category/${item?._id}`}>
                                                    <i id="ic-pen" className="fa fa-pen" />
                                                </Link>
                                            </th>
                                            <th className="text-center" >
                                                <a onClick={() => onClickDelete(item?._id)} >
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

        </>
    )

}

export default TableCategories;