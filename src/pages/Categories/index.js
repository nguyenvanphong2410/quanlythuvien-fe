import React from 'react'
import HeaderAdmin from '../../components/layouts/HeaderAdmin'
import Sidebar from '../../components/layouts/Sidebar'
import TableCategories from '../../components/layouts/TableCategories'

const Categories = () => {
    return (
        <>
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderAdmin />
                        <TableCategories />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Categories