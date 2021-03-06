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
                    ????NG K??
                </div>
                <div className={"form-register__container__form__status" + emailExist}>
                    <div>C?? l???i:</div>
                    - Email ???? t???n t???i
                </div>
                <input
                    onBlur={handleName}
                    onClick={handleClickName}
                    className="form-register__container__form__iput-name"
                    type="text" placeholder="H??? v?? t??n"
                />
                <div className={"form-register__container__form__error" + nameEmpty}>
                    Vui l??ng nh???p h??? t??n
                </div>
                <input
                    onBlur={handleEmail}
                    onClick={handleClickEmail}
                    className="form-register__container__form__iput-email"
                    type="text" placeholder="Email" />
                <div className={"form-register__container__form__error" + emailEmpty}>
                    Vui l??ng nh???p email
                </div>
                <div className={"form-register__container__form__error" + emailInvalid}>
                    Email kh??ng h???p l???
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
                    placeholder="Ng??y sinh"
                />
                <div className={"form-register__container__form__error" + birthEmpty}>
                    Vui l??ng nh???p ng??y sinh
                </div>
                <input
                    onBlur={handlePassword}
                    onClick={handleClickPassword}
                    className="form-register__container__form__iput-password"
                    type="password" placeholder="M???t kh???u"
                />
                <div className={"form-register__container__form__error" + passwordEmpty}>
                    Vui l??ng nh???p m???t kh???u
                </div>
                <div className={"form-register__container__form__error" + passwordLimit}>
                    Password ph???i t??? 8 ?????n 25 k?? t???
                </div>
                <input
                    onBlur={handleConfirmPassword}
                    onClick={handleClickConfirmPassword}
                    className="form-register__container__form__iput-confirm-password"
                    type="password" placeholder="X??c nh???n m???t kh???u"
                />
                <div className={"form-register__container__form__error" + confirmPassword}>
                    M???t kh???u nh???p l???i kh??ng ch??nh x??c
                </div>

                <div className="form-register__container__form__gender">
                    <label htmlFor="male">
                        Nam
                        <input onClick={handleGender} value="male" type="radio" id="male" name="gender" defaultChecked />
                    </label>
                    <label htmlFor="female">
                        N???
                        <input onClick={handleGender} value="female" type="radio" id="female" name="gender" />
                    </label>
                </div>
                <button
                    onClick={handleSubmit}
                    type="submit"
                    className="form-register__container__form__submit"
                >????NG K??
                </button>
                <div className="form-register__container__form__change-form">
                    B???n ???? c?? t??i kho???n? <Link className="form-register__container__form__change-form__link" to="/login">
                        ????ng nh???p
                    </Link>
                </div>
            </div>
        </div>
    </div>
}