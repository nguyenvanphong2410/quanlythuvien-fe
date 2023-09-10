import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createEmployee } from "../../services/Api";

const Register = () => {
    const navigate = useNavigate();
    const [inputData, setInputData] = useState({});
    const [messageError, setMessageError] = useState("");

    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;


    //handleOnChangeEmail
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
        console.log(inputData)
    }

    const onCLickSubmit = (e) => {
        e.preventDefault();

        const isCheckEmail = reg.test(inputData.email);

        const isTrueName = specialChars.test(inputData.name)

        //Kiểm tra 
        if (!inputData.name || !inputData.email || !inputData.password || !inputData.phone) {
            setMessageError('Vui lòng điền đầy đủ thông tin !')
        } else if (!isTrueName) {
            setMessageError('Tên nhân viên không hợp lệ !')
        } else if (!isCheckEmail) {
            setMessageError('Email không hợp lệ !')
        } else {
            createEmployee(inputData, {})
                .then((data) => {
                    if (data.data.data.status === "OK") {
                        alert(data.data.data.message)
                        navigate('/login');
                    }
                    else if (data.data.data.status === "ERR") {
                        setMessageError(data.data.message)
                    }
                })
                .catch((data) => {
                    setMessageError(data?.response?.data?.message)
                })
        }
    }

    return (
        <>
            <div className="container ">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-7 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                {/* Nested Row within Card Body */}
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Đăng ký</h1>
                                            </div>
                                            {messageError && (
                                                <p className="text-danger text-center">{messageError}</p>
                                            )}
                                            <form className="user">
                                                <div className="form-group ">
                                                    <input
                                                        name="name"
                                                        type="text"
                                                        required
                                                        className="form-control form-control-user"
                                                        id="exampleFirstName"
                                                        placeholder="Full name"
                                                        onChange={onChangeInput}
                                                        value={inputData.name || ""}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        name="email"
                                                        type="email"
                                                        className="form-control form-control-user"
                                                        id="exampleInputEmail"
                                                        placeholder="Email address"
                                                        onChange={onChangeInput}
                                                        value={inputData.email || ""}
                                                    />
                                                </div>
                                                <div className="form-group ">
                                                    <input
                                                        name="password"
                                                        type="password"
                                                        className="form-control form-control-user"
                                                        id="exampleInputPassword"
                                                        placeholder="Password"
                                                        onChange={onChangeInput}
                                                        value={inputData.password || ""}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        name="phone"
                                                        type="text"
                                                        maxLength={10}
                                                        className="form-control form-control-user"
                                                        id="exampleInputPhone"
                                                        placeholder="Phone"
                                                        onChange={onChangeInput}
                                                        value={inputData.phone || ""}
                                                    />
                                                </div>
                                                <button
                                                    onClick={onCLickSubmit} type="submit" name="sbm"
                                                    className="btn btn-success btn-user btn-block">
                                                    Đăng ký
                                                </button>
                                            </form>
                                            <hr />
                                            <div className="text-center">
                                                <Link className="small" to="/login">Đã có tài khoản &gt; Đăng nhập</Link>
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
export default Register;