import { Link } from "react-router-dom";
import { getAllCategoriesBook } from "../../services/Api";
import { useEffect, useState } from "react";

const Sidebar = () => {
    const [categoriesData, setCategoriesData] = useState([]);

    // useEffect(() => {

    //     // Lấy getAuthors
    //     getAllCategoriesBook({})
    //         .then(({ data }) => setCategoriesData(data.data));
    // }, [])

    return (
        <>
            {/* Sidebar */}
            <ul className="navbar-nav bg-gradient-dark sidebar sidebar-dark accordion " id="accordionSidebar">
                {/* Sidebar - Brand */}
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-book" />
                    </div>
                    <div className="sidebar-brand-text mx-3">
                        <h2>QLTV</h2>
                    </div>
                </Link>

                {/* Divider */} <hr className="sidebar-divider my-0" />

                {/* Nav Item */}
                <li className="nav-item ml-3 active">
                    <Link className="nav-link" to="/employees">
                        <i className="fas fa-fw fa-user" />
                        <span className="ml-2">Nhân viên</span>
                    </Link>

                </li>
                {/* Nav Item */}
                <li className="nav-item ml-3 active">
                    <Link className="nav-link" to="/authors">
                        <i className="fas fa-fw fa-user" />
                        <span className="ml-2">Tác giả</span>
                    </Link>

                </li>

                 {/* Nav Item - Pages Collapse Menu */}
                 <li className="nav-item ml-3 active" >
                    <Link className="nav-link collapsed" to="/categories" data-toggle="" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                        <i className="fas fa-fw fa-folder" />
                        <span className="ml-2">Thể loại</span>
                    </Link>
                </li>

                {/* Nav Item */}
                <li className="nav-item ml-3 active">
                    <Link className="nav-link" to="/books">
                        <i className="fas fa-book" />
                        <span className="ml-2">Sách</span>
                    </Link>
                </li>

               
                {/* Divider */}
                <hr className="sidebar-divider d-none d-md-block" />

            </ul>
            {/* End of Sidebar */}
        </>
    )
}

export default Sidebar;