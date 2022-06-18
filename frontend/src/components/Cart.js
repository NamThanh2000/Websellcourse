import { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import { Context } from '../contexts/Context';
import ItemsCart from './ItemsCart';
import React from "react";
import ReactDOM from "react-dom";
import { variables } from '../variables';
import { useHistory } from "react-router-dom";


function filterGiaoVien(course, arrGiaoVien) {
    const [objGiaoVien] = arrGiaoVien.filter((giaoVien) => {
        return giaoVien.MaGiaoVien === Number(course.MaGiaoVien);
    });
    if (objGiaoVien) {
        return objGiaoVien.TenGiaoVien;
    }
}


export default function Cart() {
    const { dataCart, giaoVien, loginStatus, setGioHang, setKhoaHocHocVien } = useContext(Context);
    const history = useHistory();

    const [bill, setBill] = useState(0);
    const [paid, setPaid] = useState(false);

    const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM })

    function refreshData() {
        fetch(variables.API_URL + "giohang")
            .then(res => res.json())
            .then((result) => setGioHang(result))
            .catch(err => { });
        fetch(variables.API_URL + "khoahochocvien")
            .then(res => res.json())
            .then((result) => setKhoaHocHocVien(result))
            .catch(err => { });
    }

    useEffect(() => {
        if (paid) {
            setPaid(false);
        }
    }, [paid])

    useEffect(() => {
        setBill(dataCart.reduce((total, value) => {
            return total + Math.round(((value.GiaKhoaHoc * (1 - value.KhuyenMai / 100)) * 1000) / 1000);
        }, 0));
    }, [dataCart])

    const createOrder = (data, actions) => {
        let totalBill = parseInt(bill / 23800);
        if (!totalBill) totalBill = 1;
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: totalBill,
                    },
                },
            ],
        });
    };

    const onApprove = (data, actions) => {
        if (data) {
            // setPaid(true);
            dataCart.forEach(element => {
                fetch(variables.API_URL + 'khoahochocvien', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        MaKhoaHoc: String(element.MaKhoaHoc),
                        MaHocVien: String(loginStatus.MaHocVien)
                    })
                })
                    .then(res => res.json())
                    .then((result) => {
                        refreshData();
                    }, (error) => {
                    })
                fetch(variables.API_URL + "giohang/" + element.MaGioHang, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then((result) => {
                        refreshData();
                    }, (error) => {
                    })
            });
        }
        return actions.order.capture();
    };

    function checkDataCart() {
        if (dataCart.length > 0) {
            return (
                <div className="app__home__container__rowbody__items-cart">
                    <Row className="app__home__container__rowbody__items-cart-row">
                        <Col className="app__home__container__rowbody__items-cart-col">
                            <div className="app__home__container__rowbody__items-cart__header">
                                Có {dataCart.length} khóa học trong giỏ hàng
                            </div>
                        </Col>
                    </Row>
                    <Row className="app__home__container__rowbody__items-cart-row">
                        {dataCart.map((course) => {
                            const tenGiaoVien = filterGiaoVien(course, giaoVien)
                            return <Col key={course.MaKhoaHoc} xs="12">
                                <ItemsCart course={course} tenGiaoVien={tenGiaoVien} />
                            </Col>
                        })}
                    </Row>
                    <Row className="app__home__container__rowbody__items-cart-row">
                        <Col className="app__home__container__rowbody__items-cart-col">
                            <div className="app__home__container__rowbody__items-cart__footer">
                                <div>Tổng cộng: {bill}<sup>đ</sup></div>
                                <div className="app__home__container__rowbody__items-cart__footer__paypal">
                                    <PayPalButton
                                        createOrder={(data, actions) => createOrder(data, actions)}
                                        onApprove={(data, actions) => onApprove(data, actions)}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            )
        }
        else {
            return (
                <div className="app__home__container__rowbody__cart">
                    <div className="app__home__container__rowbody__cart__title">Giỏ hàng (0 khóa học)</div>
                    <i className="bi bi-cart3 app__home__container__rowbody__cart__icon"></i>
                    <div className="app__home__container__rowbody__cart__content-1">Hiện tại giỏ hàng của bạn chưa có khóa học nào.</div>
                    <div className="app__home__container__rowbody__cart__content-2">Vui lòng lựa chọn khóa học mà bạn muốn học.</div>
                    <button onClick={() => {
                        history.push("")
                    }} type="submit" className="app__home__container__rowbody__cart__button">Xem danh sách khóa học</button>
                </div>
            )
        }
    }

    return checkDataCart();
}