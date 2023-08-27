import { useEffect, useState } from "react";
import { createBooks, deleteSoftBook, getAllCategoriesBook, getBooks } from "../../services/Api";
import { Link } from "react-router-dom";
import moment from "moment";

const TableAuthors = () => {

    const [booksData, setBookData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);
    const [inputData, setInputData] = useState({});

    useEffect(() => {
        // Lấy getAuthors
        getBooks({})
            .then(({ data }) => setBookData(data.data));

        getAllCategoriesBook({})
            .then(({ data }) => setCategoriesData(data.data));
    }, [])

    //handleOnChangeInputCreateBook
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
        console.log(inputData);

    }

    //onCLickSubmit
    const onCLickSubmit = (e) => {
        e.preventDefault();
        createBooks(inputData, {})
            .then((data) => {
                setInputData({});
                if (data.data.status === "OK") {
                    alert(data.data.message);
                    window.location.reload();
                } else if (data.data.status === "ERR") {
                    alert(data.data.message);
                }
            });
    }

    //onCLickDelete
    const onClickDelete = (id) => {
        deleteSoftBook(id)
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
                <h1 className="h3 mb-0 text-gray-800">Sách</h1>
            </div>

            {/* Thêm mới */}
            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages1" aria-expanded="true" aria-controls="collapsePages">
                <i className="fas fa-plus mr-2" />
                <span>Thêm mới sách</span>
            </a>
            <div id="collapsePages1" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                <form id="form-insert" className="">

                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6 form-group">
                            <label >Tên sách</label>
                            <input
                                name="name"
                                type="text"
                                className="form-control"
                                id="name"
                                aria-describedby="name"
                                onChange={onChangeInput}
                                value={inputData.name || ""}
                            />
                        </div>

                        {/* <div className="col-lg-3 col-md-6 col-sm-6 form-group">
                            <span className="nav-link collapsed pt-0 mt-4" href="#" data-toggle="collapse" data-target="#collapsePages12" aria-expanded="true" aria-controls="collapsePages">
                                <span>Chọn tác giả</span>
                                <i className="fas fa-caret-down ml-2" />
                            </span>
                            <div id="collapsePages12" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">

                                <input name="author_ids" value={inputData.author_ids || ""} className="ml-4" type="checkbox"  />
                                <label className="ml-3" for="vehicle1"> Trần Gia Huy</label><br />
                                <input name="author_ids" value={inputData.author_ids || ""} className="ml-4" type="checkbox"  />
                                <label className="ml-3" for="vehicle1"> Nguyễn Quang Huy</label><br />
                                <input name="author_ids" value={inputData.author_ids || ""} className="ml-4" type="checkbox"  />
                                <label className="ml-3" for="vehicle1"> Quốc Đam</label><br />

                            </div>
                        </div> */}


                        <div className="col-lg-3 form-group">
                            <label for="inputState">Thể loại</label>
                            <select name="category_id" onChange={onChangeInput} value={inputData.category_id || ""} id="inputState" className="form-control">
                                {
                                    categoriesData.map((item, index) =>
                                        < >
                                            <option key={index} value={item._id}>{item.name}</option>
                                        </>
                                    )
                                }
                            </select>
                        </div>

                        <div className="col-lg-3 form-group">
                            <label >Năm sáng tác</label>
                            <input
                                name="year_creation"
                                type="date"
                                className="form-control"
                                id="year_creation"
                                onChange={onChangeInput}
                                value={inputData.year_creation || ""}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label >Mô tả</label>
                        <textarea
                            name="description"
                            type="password"
                            className="form-control"
                            id="description"
                            onChange={onChangeInput}
                            value={inputData.description || ""}
                        />
                    </div>
                    <div className="form-group">
                        <label >Nội dung</label>
                        <textarea
                            name="content"
                            type="password"
                            className="form-control"
                            id="content"
                            onChange={onChangeInput}
                            value={inputData.content || ""}
                        />
                    </div>

                    <div className="row">
                        <div className="col-lg-6 form-group">
                            <div className="form-group">
                                <label >Tổng số lượng sách</label>
                                <input
                                    name="total"
                                    type="number"
                                    className="form-control"
                                    id="total"
                                    onChange={onChangeInput}
                                    value={inputData.total || ""}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 form-group">
                            <div className="form-group">
                                <label >Số lượng sách tồn</label>
                                <input
                                    name="stock"
                                    type="number"
                                    className="form-control"
                                    id="stock"
                                    onChange={onChangeInput}
                                    value={inputData.stock || ""}
                                />
                            </div>
                        </div>
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
                                    <th>Tên Sách</th>
                                    <th>Thể loại</th>
                                    <th>Năm xuất bản</th>
                                    <th>Mô tả</th>
                                    <th>Nội dung</th>
                                    <th>Tổng số </th>
                                    <th>Số tồn</th>
                                    <th colSpan={2} >Tùy chọn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    booksData.map((item, index) =>

                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.category_id?.name}</td>
                                            <td>{moment(item.year_creation).format('DD/MM/YYYY')}</td>
                                            <td>{item.description}</td>
                                            <td>{item.content}</td>
                                            <td>{item.total}</td>
                                            <td>{item.stock}</td>
                                            <th>
                                                <Link to={`/update-book/${item._id}`}>
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


        </>
    )
}

export default TableAuthors;