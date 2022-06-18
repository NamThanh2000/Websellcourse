import { useContext, useEffect, useState } from 'react';
import { Context } from '../contexts/Context';
import { Row, Col } from 'reactstrap';
import { variables } from '../variables';
import React from "react";
import ReactDOM from "react-dom";

export default function InfoUser() {
    const { loginStatus, setLoginStatus, setHocVien, avartar, setAvartar } = useContext(Context);
    const [checkShowPassword, setCheckShowPassword] = useState(false);

    const [dataEditInfoName, setDataEditInfoName] = useState("");
    const [checkEditInfoName, setCheckEditInfoName] = useState(false);

    const [dataEditInfoPassWord, setDataEditInfoPassWord] = useState("");
    const [checkEditInfoPassWord, setCheckEditInfoPassWord] = useState(false);

    const [dataEditInfoBirth, setDataEditInfoBirth] = useState("");
    const [checkEditInfoBirth, setCheckEditInfoBirth] = useState(false);

    const [dataEditInfoGentle, setDataEditInfoGentle] = useState("");
    const [checkEditInfoGentle, setCheckEditInfoGentle] = useState(false);

    const [reCharge, setReCharge] = useState("");

    const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM })

    function refreshData() {
        fetch(variables.API_URL + "hocvien")
            .then(res => res.json())
            .then((result) => setHocVien(result))
            .catch(err => { });
    }

    useEffect(() => {
        if (loginStatus) {
            setDataEditInfoName(loginStatus.TenHocVien);
            setDataEditInfoPassWord(loginStatus.MatKhau);
            setDataEditInfoBirth(loginStatus.NgaySinh);
            setDataEditInfoGentle(loginStatus.GioiTinh);
        }
    }, [loginStatus])

    function handleChangeInfo() {
        const dataChange = {
            ...loginStatus,
            TenHocVien: dataEditInfoName,
            MatKhau: dataEditInfoPassWord,
            NgaySinh: dataEditInfoBirth,
            GioiTinh: dataEditInfoGentle
        }
        fetch(variables.API_URL + 'hocvien', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataChange)
        })
            .then(res => res.json())
            .then((result) => {
                refreshData();
            }, (error) => {
            })
        localStorage.removeItem("18521124");
        localStorage.setItem('18521124', JSON.stringify(dataChange));
        setLoginStatus(dataChange);
        setCheckEditInfoName(false);
        setCheckEditInfoPassWord(false);
        setCheckEditInfoBirth(false);
        setCheckEditInfoGentle(false);
    }

    function handleChangeAvatar(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("img", e.target.files[0], "hv-" + loginStatus.MaHocVien + ".png");
        if (loginStatus && loginStatus.AnhHocVien !== "hocvien/hv-" + loginStatus.MaHocVien + ".png") {
            const dataChange = {
                ...loginStatus,
                AnhHocVien: "hocvien/hv-" + loginStatus.MaHocVien + ".png",
            }
            fetch(variables.API_URL + 'hocvien', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataChange)
            })
                .then(res => res.json())
                .then((result) => {
                    refreshData();
                }, (error) => {
                })
            localStorage.removeItem("18521124");
            localStorage.setItem('18521124', JSON.stringify(dataChange));
        }
        fetch(variables.API_URL + 'savefile', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then((result) => {
                setAvartar(loginStatus && variables.MEDIA_URL + loginStatus.AnhHocVien + "?" + Date.now());
            }, (error) => {
            })
    }

    const createOrder = (data, actions) => {
        let bill = Number(reCharge);
        if (!bill) bill = 1;
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: bill,
                    },
                },
            ],
        });
    };
    const onApprove = (data, actions) => {
        if (data) {
        }
        return actions.order.capture();
    };

    return (
        <div className="app__home__container__rowbody__info-user">
            <Row className="app__home__container__rowbody__info-user__row">
                <Col xs="12" className="app__home__container__rowbody__info-user__col">
                    <div className="app__home__container__rowbody__info-user__header">
                        Thông tin học viên
                    </div>
                </Col>
                <Col xs="3">
                    <div className="app__home__container__rowbody__info-user__avatar">
                        <img src={avartar} alt="img" />
                        <label htmlFor="upload" >Thay đổi ảnh đại diện</label>
                        <input onChange={handleChangeAvatar} id="upload" type="file" accept=".jpg, .jpeg, .png" />
                    </div>
                </Col>
                <Col xs="3" className="app__home__container__rowbody__info-user__col">
                    <div className="app__home__container__rowbody__info-user__container-items">
                        <div>
                            Họ Và Tên
                        </div>
                        <div>
                            Email Hoặc Số Điện Thoại
                        </div>
                        <div>
                            Mật Khẩu
                        </div>
                        <div>
                            Ngày sinh
                        </div>
                        <div>
                            Giới Tính
                        </div>
                    </div>
                </Col>
                <Col xs="6">
                    <div className="app__home__container__rowbody__info-user__container-dataitems">
                        <div>
                            {checkEditInfoName ? <>
                                <input onChange={(e) => { setDataEditInfoName(e.target.value) }} type="text" value={dataEditInfoName} />
                                <i onClick={(e) => {
                                    setDataEditInfoName(loginStatus.TenHocVien);
                                    setCheckEditInfoName(false)
                                }} className="bi bi-reply-fill"></i>
                            </> : <>
                                <input type="text" value={dataEditInfoName} disabled />
                                <i onClick={() => { setCheckEditInfoName(true) }} className="bi bi-pencil-square"></i>
                            </>
                            }
                        </div>
                        <div>
                            {loginStatus && loginStatus.EmailHocVien}
                        </div>
                        <div>
                            {checkEditInfoPassWord ? <>
                                <input onChange={(e) => { setDataEditInfoPassWord(e.target.value) }} type="text" value={dataEditInfoPassWord} />
                                <i onClick={(e) => {
                                    setDataEditInfoPassWord(loginStatus.MatKhau);
                                    setCheckEditInfoPassWord(false)
                                }} className="bi bi-reply-fill"></i>
                            </> : <>
                                {checkShowPassword ? <input type="text" value={dataEditInfoPassWord} disabled /> : <input type="text" value="******" disabled />}
                                <i onClick={() => { setCheckEditInfoPassWord(true) }} className="bi bi-pencil-square"></i>
                            </>}

                        </div>
                        <div>
                            {checkEditInfoBirth ? <>
                                <input onChange={(e) => { setDataEditInfoBirth(e.target.value) }} type="date" value={dataEditInfoBirth} />
                                <i onClick={(e) => {
                                    setDataEditInfoBirth(loginStatus.NgaySinh);
                                    setCheckEditInfoBirth(false)
                                }} className="bi bi-reply-fill"></i>
                            </> : <>
                                <input type="date" value={dataEditInfoBirth} disabled />
                                <i onClick={() => { setCheckEditInfoBirth(true) }} className="bi bi-pencil-square"></i>
                            </>}

                        </div>
                        {checkEditInfoGentle ?
                            <span className="app__home__container__rowbody__info-user__container-dataitems__gentle">
                                <input onClick={() => { setDataEditInfoGentle("male") }} type="radio" id="male" name="gentle" value="male" defaultChecked={dataEditInfoGentle === "male" && true} />
                                <label htmlFor="male">Nam</label>
                                <input onClick={() => { setDataEditInfoGentle("female") }} type="radio" id="female" name="gentle" value="female" defaultChecked={dataEditInfoGentle === "female" && true} />
                                <label htmlFor="female">Nữ</label>
                                <i onClick={() => {
                                    loginStatus.GioiTinh === "male" ? setDataEditInfoGentle("male") : setDataEditInfoGentle("female");
                                    setCheckEditInfoGentle(false)
                                }} className="bi bi-reply-fill"></i>
                            </span> : <div>
                                <input type="text" value={dataEditInfoGentle === "female" ? "Nữ" : "Nam"} disabled />
                                <i onClick={() => { setCheckEditInfoGentle(true) }} className="bi bi-pencil-square"></i>
                            </div>}
                    </div>
                </Col>
                <Col xs="12" className="app__home__container__rowbody__info-user__col">
                    <div className="app__home__container__rowbody__info-user__submit">
                        <button onClick={handleChangeInfo} type="submit">Sửa</button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}