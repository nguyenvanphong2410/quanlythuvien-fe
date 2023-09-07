import { useEffect, useState } from "react";
import { createBooks, deleteSoftBook, getAllCategoriesBook, getAuthors, getBooks } from "../../services/Api";
import { Link } from "react-router-dom";
import moment from "moment";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TableAuthors = () => {

    const [booksData, setBookData] = useState([]);
    const [authorsData, setAuthorsData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);
    const [inputData, setInputData] = useState({
        author_ids: [], // Thêm một trường mới để lưu trữ author_ids
    });

    useEffect(() => {
        // Lấy getAuthors
        getBooks({})
            .then(({ data }) => setBookData(data.data));

        getAllCategoriesBook({})
            .then(({ data }) => setCategoriesData(data.data));

        getAuthors({})
            .then(({ data }) => setAuthorsData(data.data));
    }, [])

    //handleOnChangeInputCreateBook
    const onChangeInput = (e) => {
        const { name, value, checked } = e.target;

        if (name === "author_ids") {
            // Nếu trường name là "author_ids", thực hiện xử lý riêng
            let updatedAuthorIds = [...inputData.author_ids];

            if (checked) {
                // Nếu ô checkbox được chọn, thêm giá trị vào mảng
                updatedAuthorIds.push(value);
            } else {
                // Nếu ô checkbox được bỏ chọn, loại bỏ giá trị khỏi mảng
                updatedAuthorIds = updatedAuthorIds.filter((id) => id !== value);
            }

            setInputData({ ...inputData, author_ids: updatedAuthorIds });
        } else {
            // Xử lý các trường input khác như bình thường
            setInputData({ ...inputData, [name]: value });
        }
        console.log(inputData);

    }

    //onCLickDelete
    const onClickDelete = (id) => {
        deleteSoftBook(id)
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
                <h1 className="h3 mb-0 text-gray-800">Sách</h1>
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


        </>
    )
}

export default TableAuthors;