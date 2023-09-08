import React from 'react'
import HeaderAdmin from '../../components/layouts/HeaderAdmin'
import Sidebar from '../../components/layouts/Sidebar'
import TableAuthors from '../../components/layouts/TableAuthors'

const Author = () => {
    return (
        <>
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderAdmin />
                        <TableAuthors />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Author