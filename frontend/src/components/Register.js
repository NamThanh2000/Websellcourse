import { useState } from 'react';
import { Link } from 'react-router-dom';
import { variables } from '../variables';
import { useContext } from 'react';
import { Context } from '../contexts/Context';
import { useHistory } from "react-router-dom";

export default function Register() {
    const { hocVien, setHocVien } = useContext(Context);
    const history = useHistory();

    const [nameEmpty, setNameEmpty] = useState('');
    const [emailEmpty, setEmailEmpty] = useState('');
    const [emailInvalid, setEmailInvalid] = useState('');
    const [birthEmpty, setBirthEmpty] = useState('');
    const [passwordEmpty, setPasswordEmpty] = useState('');
    const [passwordLimit, setPasswordLimit] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [password, setPassword] = useState('');

    const [checkName, setCheckName] = useState('');
    const [checkEmail, setCheckEmail] = useState('');
    const [checkBirth, setCheckBirth] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [checkConfirmPassword, setCheckConfirmPassword] = useState(true);
    const [checkGender, setCheckGender] = useState('male');

    const [emailExist, setEmailExist] = useState("");

    function refreshData() {
        fetch(variables.API_URL + "hocvien")
            .then(res => res.json())
            .then((result) => setHocVien(result))
            .catch(err => { });
    }

    function handleName(e) {
        setCheckName(e.target.value);
        if (e.target.value === '') {
            setNameEmpty(' showerror');
        }
    }
    function handleClickName() {
        setNameEmpty('');
    }


    function handleEmail(e) {
        setCheckEmail(e.target.value);
        if (e.target.value === '') {
            setEmailEmpty(' showerror');
        }
        else if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(e.target.value)) {
            setEmailInvalid(' showerror');
        }
    }
    function handleClickEmail() {
        setEmailEmpty('');
        setEmailInvalid('')
    }


    function handleBirth(e) {
        setCheckBirth(e.target.value);
        if (e.target.value === '') {
            setBirthEmpty(' showerror');
        }
    }
    function handleClickBirth() {
        setBirthEmpty('');
    }

    function handlePassword(e) {
        setCheckPassword(e.target.value);
        if (e.target.value === '') {
            setPasswordEmpty(' showerror');
        }
        else if ((e.target.value).length <= 8 || (e.target.value).length >= 25) {
            setPasswordLimit(' showerror');
            setPassword(e.target.value);
        }
        else {
            setPassword(e.target.value);
        }
        if (e.target.value !== '') {
            setCheckConfirmPassword(false);
        }
    }
    function handleClickPassword() {
        setPasswordEmpty('');
        setPasswordLimit('');
    }


    function handleConfirmPassword(e) {
        if (e.target.value !== password) {
            setConfirmPassword(' showerror');
        }
        else {
            setCheckConfirmPassword(true);
        }
    }
    function handleClickConfirmPassword() {
        setConfirmPassword('');
    }


    function handleGender(e) {
        setCheckGender(e.target.value);
    }


    function createClick() {
        const existHocVien = hocVien.some((value) => {
            return value.EmailHocVien === checkEmail;
        });
        if (existHocVien) {
            setEmailExist(" showerror")
        }
        else {
            history.push("/login");
            fetch(variables.API_URL + 'hocvien', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    TenHocVien: checkName.trim(),
                    EmailHocVien: checkEmail,
                    MatKhau: checkPassword,
                    NgaySinh: checkBirth,
                    AnhHocVien: "hv-default.jpg",
                    GioiTinh: checkGender,
                    SoDuTaiKhoan: 0
                })
            })
                .then(res => res.json())
                .then((result) => {
                    refreshData();
                }, (error) => {
                })
        }
    }

    function handleSubmit() {
        if (!checkName) {
            setNameEmpty(' showerror');
        }
        if (!checkEmail) {
            setEmailEmpty(' showerror');
        }
        if (!checkBirth) {
            setBirthEmpty(' showerror');
        }
        if (!checkPassword) {
            setPasswordEmpty(' showerror');
        }
        if (!checkConfirmPassword) {
            setConfirmPassword(' showerror');
        }
        if (checkName && checkEmail && checkBirth && checkPassword && checkConfirmPassword && !nameEmpty && !emailEmpty && !emailInvalid && !birthEmpty && !passwordEmpty && !passwordLimit && !confirmPassword) {
            createClick();
        }
    }


    return <div className="form-register">
        <div className="form-register__container">
            <img className="form-register__container__logo" src={variables.MEDIA_URL + "logo.png"} alt="img" />
            <div className="form-register__container__form">
                <div className="form-register__container__form__title">
                    ĐĂNG KÝ
                </div>
                <div className={"form-register__container__form__status" + emailExist}>
                    <div>Có lỗi:</div>
                    - Email đã tồn tại
                </div>
                <input
                    onBlur={handleName}
                    onClick={handleClickName}
                    className="form-register__container__form__iput-name"
                    type="text" placeholder="Họ và tên"
                />
                <div className={"form-register__container__form__error" + nameEmpty}>
                    Vui lòng nhập họ tên
                </div>
                <input
                    onBlur={handleEmail}
                    onClick={handleClickEmail}
                    className="form-register__container__form__iput-email"
                    type="text" placeholder="Email" />
                <div className={"form-register__container__form__error" + emailEmpty}>
                    Vui lòng nhập email
                </div>
                <div className={"form-register__container__form__error" + emailInvalid}>
                    Email không hợp lệ
                </div>
                <input
                    onBlur={handleBirth}
                    onClick={(e) => {
                        handleClickBirth(e);
                        e.currentTarget.type = "date";
                        e.currentTarget.focus();
                    }}
                    className="form-register__container__form__iput-birth"
                    type="text"
                    placeholder="Ngày sinh"
                />
                <div className={"form-register__container__form__error" + birthEmpty}>
                    Vui lòng nhập ngày sinh
                </div>
                <input
                    onBlur={handlePassword}
                    onClick={handleClickPassword}
                    className="form-register__container__form__iput-password"
                    type="password" placeholder="Mật khẩu"
                />
                <div className={"form-register__container__form__error" + passwordEmpty}>
                    Vui lòng nhập mật khẩu
                </div>
                <div className={"form-register__container__form__error" + passwordLimit}>
                    Password phải từ 8 đến 25 ký tự
                </div>
                <input
                    onBlur={handleConfirmPassword}
                    onClick={handleClickConfirmPassword}
                    className="form-register__container__form__iput-confirm-password"
                    type="password" placeholder="Xác nhận mật khẩu"
                />
                <div className={"form-register__container__form__error" + confirmPassword}>
                    Mật khẩu nhập lại không chính xác
                </div>

                <div className="form-register__container__form__gender">
                    <label htmlFor="male">
                        Nam
                        <input onClick={handleGender} value="male" type="radio" id="male" name="gender" defaultChecked />
                    </label>
                    <label htmlFor="female">
                        Nữ
                        <input onClick={handleGender} value="female" type="radio" id="female" name="gender" />
                    </label>
                </div>
                <button
                    onClick={handleSubmit}
                    type="submit"
                    className="form-register__container__form__submit"
                >ĐĂNG KÝ
                </button>
                <div className="form-register__container__form__change-form">
                    Bạn đã có tài khoản? <Link className="form-register__container__form__change-form__link" to="/login">
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    </div>
}