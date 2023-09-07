import { Link, useNavigate, useParams } from "react-router-dom";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import Sidebar from "../../components/layouts/Sidebar";
import { getAuthorDetails } from "../../services/Api";
import { useEffect, useState } from "react";
import moment from "moment";

const AuthorDetails = () => {

    const params = useParams();
    const id = params.id;

    const [authorDetailsData, setAuthorDetailsData] = useState(null);

    useEffect(() => {
        getAuthorDetails(id)
            .then(({ data }) => {
                setAuthorDetailsData(data.data);
            });
    }, [id]);

    return (
        <>
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <nav className="navbar navbar-expand navbar-light bg-dark topbar mb-4 static-top shadow">
                            <ul className="navbar-nav ml-auto">
                                <HeaderAdmin />
                            </ul>
                        </nav>
                        <div className="container-fluid">
                            <div>
                                <div className="col-5">
                                    {/* <h1 style={{ fontWeight: "bold" }}>Chi tiết Tác giả</h1> */}
                                </div>
                                <div className="col-7"></div>
                            </div>

                            {/* content */}
                            <>
                                <div>
                                    {/* Documnet Details */}
                                    <div id="">
                                        <div id="" className="">

                                            <div id="" className="">

                                                

                                                <div className="row">
                                                    <div className="col-lg-3"></div>
                                                    <div className="col-lg-6">
                                                    <h3 style={{ fontWeight: "bold" }} className="text-dark mb-4">Tác giả {authorDetailsData?.name}</h3>
                                                        <div className="row">
                                                            <div className="col-lg-5">
                                                                <img style={{ width: "230px", height: '300px', borderRadius:'30%' }}
                                                                    src="https://png.pngtree.com/png-vector/20200614/ourlarge/pngtree-businessman-user-avatar-character-vector-illustration-png-image_2242909.jpg" alt="img-book-details" />
                                                            </div>
                                                            <div className="col-lg-7">
                                                                <ul>
                                                                    <li><span style={{ fontWeight: "bold" }}>Ngày sinh: </span>{moment(authorDetailsData?.date_of_birth).format('DD/MM/YYYY')}</li>
                                                                    <li><span style={{ fontWeight: "bold" }}>Các đầu sách:</span>
                                                                        <ul>
                                                                             {authorDetailsData?.book_ids.map((item, index) =>
                                                                                <>
                                                                                    <li key={index}>{item?.name}</li>
                                                                                </>
                                                                            )}
                                                                        </ul>
                                                                    </li>
                                                                </ul>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3"></div>
                                                </div>


                                            </div>
                                        </div>
                                        <div id="" className="">
                                                <h2 className="section-heading text-dark">Tiểu sử</h2>
                                                <p className="text-justify">
                                                    <div dangerouslySetInnerHTML={{ __html: `${authorDetailsData?.story}` }} />
                                                </p>
                                        </div>

                                    </div>
                                    {/*	End document*/}


                                </div>

                            </>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AuthorDetails;