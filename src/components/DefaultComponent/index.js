import React, { useEffect } from 'react'
import HeaderAdmin from '../layouts/HeaderAdmin'
import Sidebar from '../layouts/Sidebar'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';

const DefaultComponent = () => {

    // const navigate = useNavigate();


    // // Lấy token 
    // const token = Cookies.get('access_token');
    // //  kiểm tra token 
    // if (token && !sessionStorage.getItem('tokenChecked')) {
    //     sessionStorage.setItem('tokenChecked', 'true');
    //     window.location.href = '/';
    //     // navigate('/')
    // } else if (!token) {
    //     // window.location.href = '/login';
    //     navigate('/login')

    // }
    return (
        <>
            {/* Page Wrapper */}
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">

                    {/* Main Content */}
                    <div id="content">

                        {/* Topbar */}
                        <nav className="navbar navbar-expand navbar-light bg-dark topbar mb-3 static-top shadow">
                            {/* Topbar Navbar */}
                            <ul className="navbar-nav ml-auto">
                                <HeaderAdmin />
                            </ul>
                        </nav>
                        {/* End of Topbar */}
                        {/* Begin Page Content */}
                        <div className="container-fluid">
                            <h1>Trang quản trị Quản Lí Thư Viện</h1>
                        </div>
                        {/* End Page Content */}
                    </div>
                </div>
            </div>

        </>
    )
}

export default DefaultComponent