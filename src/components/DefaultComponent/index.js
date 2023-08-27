import React from 'react'
import HeaderAdmin from '../layouts/HeaderAdmin'
import Sidebar from '../layouts/Sidebar'

const DefaultComponent = () => {
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