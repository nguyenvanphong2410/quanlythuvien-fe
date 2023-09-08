import React from 'react'
import HeaderAdmin from '../../components/layouts/HeaderAdmin'
import Sidebar from '../../components/layouts/Sidebar'
import TableBooks from '../../components/layouts/TableBooks'

const Books = () => {
    return (
        <>
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderAdmin />
                        <TableBooks />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Books