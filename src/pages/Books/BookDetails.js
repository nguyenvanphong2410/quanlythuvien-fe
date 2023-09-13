import { Link, useNavigate, useParams } from "react-router-dom";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import Sidebar from "../../components/layouts/Sidebar";
import { getBookDetails } from "../../services/Api";
import { useEffect, useState } from "react";
import moment from "moment";

const BookDetails = () => {

    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    const [bookDetailsData, setBookDetailsData] = useState(null);

    useEffect(() => {
        getBookDetails(id)
            .then(({ data }) => {
                setBookDetailsData(data.data);
            });
    }, [id]);
    return (
        <>
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderAdmin />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-3"></div>
                                <div className="col-lg-6">
                                    <h4 className="text-dark mb-4" style={{ fontWeight: "bold" }}>Sách {bookDetailsData?.name}</h4>
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <img style={{ width: "200px", height: '300px', borderRadius: '13px' }}
                                                src="https://bloganchoi.com/wp-content/uploads/2021/11/1f035d318d5f6ce4deccf5e4ab3c0efc.jpg" alt="img-book-details" />
                                        </div>
                                        <div className="col-lg-7">
                                            <ul>
                                                <li><span style={{ fontWeight: "bold" }}>Thể loại:</span> {bookDetailsData?.category_id?.name}</li>
                                                <li><span style={{ fontWeight: "bold" }}>Tác giả:</span>
                                                    <ul>
                                                        {bookDetailsData?.author_ids.map((item, index) =>
                                                            <>
                                                                <li>{item?.name}</li>
                                                            </>
                                                        )}

                                                    </ul>
                                                </li>
                                                <li><span style={{ fontWeight: "bold" }}>Năm sáng tác: </span>{moment(bookDetailsData?.year_creation).format('DD/MM/YYYY')}</li>
                                                <li><span style={{ fontWeight: "bold" }}>Tổng số lượng: </span> {bookDetailsData?.total}</li>
                                                <li><span style={{ fontWeight: "bold" }}>Số lượng tồn: </span> {bookDetailsData?.stock}</li>
                                                <li><span style={{ fontWeight: "bold" }}>Mô tả: </span> <p className="text-justify">{bookDetailsData?.description}</p></li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-lg-3"></div>
                                <div className="ml-5 mr-5">
                                    <h2 className="section-heading text-dark">Nội dung </h2>
                                    <div className="text-justify">
                                        <div dangerouslySetInnerHTML={{ __html: `${bookDetailsData?.content}` }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookDetails;