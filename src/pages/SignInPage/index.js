import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginEmployee } from "../../services/Api";

const Login = () => {
    const navigate = useNavigate();

    const [inputData, setInputData] = useState({});
    const [employeeData, setEmployeeData] = useState("");

    //OnChangeInput
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setInputData((inputData) => ({
            ...inputData,
            [name]: value,
        }));
        console.log(inputData)
    };

    const OnClickLogin = (e) => {
        e.preventDefault();
        loginEmployee(inputData, {})
            .then((data) => {
                setInputData({});
                if (data.data.status === "OK") {
                    console.log('data', data.data)
                    // console.log("Token thuộc về", data.data?.access_token);
                    
                    //localStorage
                    localStorage.setItem('access_token', data.data?.access_token)

                    //Chuyển hướng
                    navigate('/admin');
                    
                } else if (data.data.status === "ERR") {
                    alert(data.data.message)
                }
            })

    }

    return (

        <>
            <div className="container">
                {/* Outer Row */}
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-7 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                {/* Nested Row within Card Body */}
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Đănh nhập</h1>
                                            </div>
                                            <form className="user">
                                                <div className="form-group">
                                                    <input
                                                        name="email"
                                                        type="email"
                                                        className="form-control form-control-user"
                                                        id="email"
                                                        onChange={onChangeInput}
                                                        placeholder="Email"
                                                    // value={inputData?.email || ""}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        name="password"
                                                        type="password"
                                                        className="form-control form-control-user"
                                                        id="password"
                                                        onChange={onChangeInput}
                                                        placeholder="Mật khẩu"
                                                    // value={inputData?.password || ""}

                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                    </div>
                                                </div>
                                                <button onClick={OnClickLogin} className="btn btn-primary btn-user btn-block">
                                                    Đăng nhập
                                                </button>

                                            </form>
                                            <hr />
                                            <div className="text-center">
                                                <Link className="small" to="/register">Tạo tài khoản mới</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Login;