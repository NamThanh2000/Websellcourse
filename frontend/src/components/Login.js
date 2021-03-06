import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../contexts/Context';
import { useHistory } from "react-router-dom";
import { variables } from '../variables';

export default function Login() {
    const { setLoginStatus, hocVien } = useContext(Context);
    const history = useHistory();

    const [emailEmpty, setEmailEmpty] = useState('');
    const [emailInvalid, setEmailInvalid] = useState('');
    const [passwordEmpty, setPasswordEmpty] = useState('');

    const [checkEmail, setCheckEmail] = useState('');
    const [checkPassword, setCheckPassword] = useState('');

    const [accountExist, setAccountExist] = useState("");

    function handleEmail(e) {
        setCheckEmail(e.target.value);
        if (e.target.value === '') {
            setEmailEmpty(' showerror');
        }
        else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
            setEmailInvalid(' showerror');
        }
    }
    function handleClickEmail() {
        setEmailEmpty('');
        setEmailInvalid('')
    }


    function handlePassword(e) {
        setCheckPassword(e.target.value);
        if (e.target.value === '') {
            setPasswordEmpty(' showerror');
        }
    }
    function handleClickPassword() {
        setPasswordEmpty('');
    }

    function handleSubmit() {
        if (!checkEmail) {
            setEmailEmpty(' showerror');
        }
        if (!checkPassword) {
            setPasswordEmpty(' showerror');
        }
        if (checkEmail && checkPassword && !emailEmpty && !emailInvalid && !passwordEmpty) {
            const [ existHocVien ] = hocVien.filter((value) => {
                return value.EmailHocVien === checkEmail;
            });
            if(existHocVien){
                if(existHocVien.MatKhau === checkPassword){
                    setLoginStatus(existHocVien);
                    localStorage.setItem('18521124', JSON.stringify(existHocVien));
                    history.push("");
                }
                else{
                    setAccountExist(" showerror")
                }
            }
            else{
                setAccountExist(" showerror")
            }
        }
        
    }

    return <div className="form-login">
        <div className="form-login__container">
            <img className="form-login__container__logo" src={variables.MEDIA_URL + "logo.png"} alt="img" />
            <div className="form-login__container__form">
                <div className="form-login__container__form__title">????NG NH???P</div>
                <div className={"form-register__container__form__status" + accountExist}>
                    <div>C?? l???i:</div>
                    - T??i kho???n hay m???t kh???u kh??ng ph?? h???p 
                </div>
                <input 
                    onBlur={handleEmail}
                    onClick={handleClickEmail}
                    className="form-login__container__form__iput-email"
                    type="text" placeholder="Nh???p email" />
                <div className={"form-login__container__form__error" + emailEmpty} >
                    Vui l??ng nh???p email
                </div>
                <div className={"form-login__container__form__error" + emailInvalid}>
                    Email kh??ng h???p l???
                </div>
                <input 
                    onBlur={handlePassword}
                    onClick={handleClickPassword}
                    className="form-login__container__form__iput-password" 
                    type="password" placeholder="Nh???p m???t kh???u" />
                <div className={"form-login__container__form__error" + passwordEmpty}>
                    Vui l??ng nh???p m???t kh???u
                </div>
                <button
                    onClick={handleSubmit}
                    type="submit" 
                    className="form-login__container__form__submit"
                >????NG NH???P</button>
                <div className="form-login__container__form__change-form">
                    B???n ch??a c?? t??i kho???n? <Link to="/register">????ng k?? m???i</Link>
                </div>
            </div>
        </div>
    </div>
}