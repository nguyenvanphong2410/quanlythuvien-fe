import React from 'react'
import HeaderAdmin from '../../components/layouts/HeaderAdmin'
import Sidebar from '../../components/layouts/Sidebar'
import TableEmployees from '../../components/layouts/TableEmployees'

const Employees = () => {
    return (
        <>
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderAdmin />
                        <TableEmployees />
                    </div>
                </div >
            </div >
        </>
    )
}

export default Employees