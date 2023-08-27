import React from 'react'
import HeaderAdmin from '../../components/layouts/HeaderAdmin'
import Sidebar from '../../components/layouts/Sidebar'
import TableBooks from '../../components/layouts/TableBooks'

const Books = () => {
    return (
        <>
            {/* Page Wrapper */}
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">

                    {/* Main Content */}
                    <div id="content">

                        {/* Topbar */}
                        <nav className="navbar navbar-expand navbar-light bg-dark topbar mb-4 static-top shadow">
                            {/* Topbar Navbar */}
                            <ul className="navbar-nav ml-auto">
                                <HeaderAdmin />
                            </ul>
                        </nav>
                        {/* End of Topbar */}
                        {/* Begin Page Content */}
                        <div className="container-fluid">
                            <TableBooks/>
                        </div>
                        {/* End Page Content */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Books