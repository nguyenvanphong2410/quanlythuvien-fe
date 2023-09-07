import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logoutEmployee } from "../../services/Api";
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";


const HeaderAdmin = () => {
    const navigate = useNavigate();

    // Lấy token 
    const token = Cookies.get('access_token');

    if (token) {
        const decode = jwt_decode(token);
        // console.log('decode login là: ', decode.payload.name)
        var nameUser = decode?.payload.name || "";
    }

    //  kiểm tra token 
    if (token && !sessionStorage.getItem('tokenChecked')) {
        sessionStorage.setItem('tokenChecked', 'true');
        window.location.href = '/';
        // navigate('/')
    } else if (!token) {
        // navigate('/login')
        window.location.href = '/login';
    } 

    const handleOnClickLogout = () => {
        Cookies.remove('access_token');
        console.log('log dang xuat')
        navigate('/')
        logoutEmployee().then(() => { });
    }
    return (
        <>

            {/* Nav Item - User Information */}
            <li className="nav-item dropdown no-arrow ">
                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="mr-2">{nameUser}</span>
                    <img className="img-profile rounded-circle" src="img/undraw_profile.svg" />
                </a>
                {/* Dropdown - User Information */}
                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                    <a className="dropdown-item" href="#">
                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                        Hồ sơ
                    </a>
                    <div className="dropdown-divider" />
                    <button className="dropdown-item" onClick={handleOnClickLogout}>
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                        Đăng xuất
                    </button>
                </div>
            </li>
        </>
    )
}

export default HeaderAdmin;