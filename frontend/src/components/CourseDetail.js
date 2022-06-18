import { Col, Row } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useContext } from 'react';
import { Context } from '../contexts/Context';
import { variables } from '../variables';
import { useHistory } from "react-router-dom";

function filterBaiGiang(arrBaiGiang) {
    const objBaiGiang = arrBaiGiang.filter((baiGiang) => {
        return '/course/' + baiGiang.MaKhoaHoc === window.location.pathname;
    });
    return objBaiGiang;
}
function filterKhoaHoc(arrKhoaHoc) {
    const [objKhoaHoc] = arrKhoaHoc.filter((khoaHoc) => {
        return '/course/' + khoaHoc.MaKhoaHoc === window.location.pathname;
    });
    return objKhoaHoc;
}
function filterGiaoVien(arrGiaoVien, gv) {
    const [objGiaoVien] = arrGiaoVien.filter((giaoVien) => {
        return giaoVien.MaGiaoVien === Number(gv);
    });
    return objGiaoVien;
}

function filterSoHocVien(arrHocVien) {
    const objHocVien = arrHocVien.filter((hocVien) => {
        return '/course/' + hocVien.MaKhoaHoc === window.location.pathname;
    });
    return objHocVien.length;
}

function filterSoKhoaHoc(magiaovien, arrSoKhoaHoc, arrkhoahochocvien) {
    let countHocVien = 0;
    const objSoKhoaHoc = arrSoKhoaHoc.filter((sokhoahoc) => {
        return magiaovien === Number(sokhoahoc.MaGiaoVien);
    });
    for (let i = 0; i < objSoKhoaHoc.length; i++) {
        for (let j = 0; j < arrkhoahochocvien.length; j++) {
            if (objSoKhoaHoc[i].MaKhoaHoc === Number(arrkhoahochocvien[j].MaKhoaHoc)) {
                ++countHocVien;
            }
        }
    }
    return {
        khoahoc: objSoKhoaHoc.length,
        hocvien: countHocVien
    };
}

function filterDanhGiaKhoaHoc(getkhoahoc, danhGia) {
    const objSoKhoaHoc = danhGia.filter((danhgia) => {
        return getkhoahoc.MaKhoaHoc === Number(danhgia.MaKhoaHoc);
    });
    let star5 = 0, star4 = 0, star3 = 0, star2 = 0, star1 = 0;
    for (let i of objSoKhoaHoc) {
        if (i.DiemDanhGia === 5) {
            ++star5;
        }
        else if (i.DiemDanhGia === 4) {
            ++star4;
        }
        else if (i.DiemDanhGia === 3) {
            ++star3;
        }
        else if (i.DiemDanhGia === 2) {
            ++star2;
        }
        else if (i.DiemDanhGia === 1) {
            ++star1;
        }
    }
    if (star5 + star4 + star3 + star2 + star1 === 0) {
        return {
            star5,
            star4,
            star3,
            star2,
            star1,
            total: 0,
            average: 0
        }
    }
    return {
        star5,
        star4,
        star3,
        star2,
        star1,
        total: star5 + star4 + star3 + star2 + star1,
        average: (star5 * 5 + star4 * 4 + star3 * 3 + star2 * 2 + star1 * 1) / (star5 + star4 + star3 + star2 + star1)
    }
}

export default function CourseDetail() {
    const { baiGiang, dataUser, giaoVien, khoaHoc, khoaHocHocVien, binhLuan, setBinhLuan, loginStatus, setLoginStatus, hocVien, dataCart, setGioHang, setKhoaHocHocVien, avartar, danhGia, setDanhGia } = useContext(Context);
    const history = useHistory();

    const [baiGiangSelector, setBaiGiangSelector] = useState(null);
    const [giaoVienSelector, setGiaoVienSelector] = useState(null);
    const [khoaHocSelector, setKhoaHocSelector] = useState(null);

    const [baiGiangChecked, setBaiGiangChecked] = useState(null);
    const [iconShowSelector, setIconShowSelector] = useState(1);

    const [soHocVienCuaKhoaHoc, setSoHocVienCuaKhoaHoc] = useState(null);
    const [infoGiaVien, setInfoGiaVien] = useState(null);

    const [commentCurrent, setCommentCurrent] = useState("");

    const [permissionUser, setPermissionUser] = useState(false);

    const [khoaHocChecked, setKhoaHocChecked] = useState(false);

    const [checkEditComment, setCheckEditComment] = useState(null);

    const [commentEditCurrent, setCommentEditCurrent] = useState("");

    const [scoreReview, setScoreReview] = useState(0);
    const [rateScoreReview, setRateScoreReview] = useState(null);
    const [rateScoreReviewHocVienSelector, setRateScoreReviewHocVienSelector] = useState(null);

    function refreshData() {
        fetch(variables.API_URL + "giohang")
            .then(res => res.json())
            .then((result) => setGioHang(result))
            .catch(err => { });
        fetch(variables.API_URL + "khoahochocvien")
            .then(res => res.json())
            .then((result) => setKhoaHocHocVien(result))
            .catch(err => { });
        fetch(variables.API_URL + "binhluan")
            .then(res => res.json())
            .then((result) => setBinhLuan(result))
            .catch(err => { });
        fetch(variables.API_URL + "danhgia")
            .then(res => res.json())
            .then((result) => setDanhGia(result))
            .catch(err => { });
    }

    useEffect(() => {
        const getbaigiang = filterBaiGiang(baiGiang);
        if (getbaigiang) {
            setBaiGiangSelector(getbaigiang);
        }
        const getkhoahoc = filterKhoaHoc(khoaHoc);
        if (getkhoahoc) {
            setKhoaHocSelector(getkhoahoc);
            const getgiaovien = filterGiaoVien(giaoVien, getkhoahoc.MaGiaoVien);
            if (getgiaovien) {
                setGiaoVienSelector(getgiaovien);
                setInfoGiaVien(filterSoKhoaHoc(getgiaovien.MaGiaoVien, khoaHoc, khoaHocHocVien))
            }
            const getdanhgiakhoahoc = filterDanhGiaKhoaHoc(getkhoahoc, danhGia)
            setRateScoreReview(getdanhgiakhoahoc);

            const [checkResultDanhGia] = danhGia.filter((danhgia) => {
                return loginStatus && getkhoahoc.MaKhoaHoc === Number(danhgia.MaKhoaHoc) && loginStatus.MaHocVien === Number(danhgia.MaHocVien)
            });
            setRateScoreReviewHocVienSelector(checkResultDanhGia);
            setScoreReview(checkResultDanhGia ? checkResultDanhGia.DiemDanhGia : 0)
        }
        setSoHocVienCuaKhoaHoc(filterSoHocVien(khoaHocHocVien));
    }, [baiGiang, giaoVien, khoaHoc, khoaHocHocVien, dataUser, danhGia, loginStatus])

    useEffect(() => {
        if (dataUser) {
            const checkUser = dataUser.some((khoaHocRegistered) => {
                return '/course/' + khoaHocRegistered === window.location.pathname;
            });
            if (checkUser) {
                setPermissionUser(true);
            }
        }
    }, [dataUser])

    useEffect(() => {
        if (khoaHocSelector && dataCart.some((itemCart) => {
            return itemCart.MaKhoaHoc === khoaHocSelector.MaKhoaHoc
        })) {
            setKhoaHocChecked(true);
        }
    }, [dataCart, khoaHocSelector])

    function handleClick(value) {
        if (value) {
            setBaiGiangChecked({
                poster: value.LinkPoster,
                video: value.LinkBaiGiang
            })
            setIconShowSelector(value.SoThuTu);
        }
    }
    function getVideo() {
        if (baiGiangChecked) {
            return (
                <video
                    className="app__home__container__rowbody__course-detail__body-video"
                    controls="false"
                    poster={variables.MEDIA_URL + baiGiangChecked.poster}
                    src={variables.MEDIA_URL + baiGiangChecked.video}
                />
            )
        }
        else {
            if (baiGiangSelector) {
                if (baiGiangSelector[0]) {
                    return (
                        <video className="app__home__container__rowbody__course-detail__body-video"
                            controls poster={variables.MEDIA_URL + baiGiangSelector[0].LinkPoster}
                            src={variables.MEDIA_URL + baiGiangSelector[0].LinkBaiGiang}
                        />
                    )
                }
            }
            return null;
        }
    }

    function handleChangeComment(e) {
        setCommentCurrent(e.target.value);
    }
    function handleChangeEditComment(e) {
        setCommentEditCurrent(e.target.value);
    }

    function handleSubmitComment() {
        if (commentCurrent) {
            let today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            fetch(variables.API_URL + 'binhluan', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    MaKhoaHoc: khoaHocSelector.MaKhoaHoc,
                    MaHocVien: loginStatus.MaHocVien,
                    NoiDung: commentCurrent,
                    ThoiGianBinhLuan: date
                })
            })
                .then(res => res.json())
                .then((result) => {
                    refreshData();
                }, (error) => {
                })
            setCommentCurrent("");
        }
    }
    function handleSubmitEditComment(maBinhLuan) {
        if (commentEditCurrent) {
            let today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            fetch(variables.API_URL + 'binhluan', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    MaBinhLuan: maBinhLuan,
                    MaKhoaHoc: khoaHocSelector.MaKhoaHoc,
                    MaHocVien: loginStatus.MaHocVien,
                    NoiDung: commentEditCurrent,
                    ThoiGianBinhLuan: date
                })
            })
                .then(res => res.json())
                .then((result) => {
                    refreshData();
                }, (error) => {
                })
            setCommentEditCurrent("");
            setCheckEditComment(null);
        }
    }
    function handleAddCart() {
        if (!dataCart.includes(khoaHocSelector) && loginStatus) {
            fetch(variables.API_URL + 'giohang', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    MaKhoaHoc: String(khoaHocSelector.MaKhoaHoc),
                    MaHocVien: String(loginStatus.MaHocVien)
                })
            })
                .then(res => res.json())
                .then((result) => {
                    refreshData();
                }, (error) => {
                })
        }
        else if (!loginStatus) {
            history.push("/login");
        }
    }
    function handleBuyCourse() {
        let coursePrime = khoaHocSelector && Math.round(((khoaHocSelector.GiaKhoaHoc * (1 - khoaHocSelector.KhuyenMai / 100)) * 1000) / 1000)
        coursePrime = parseInt(coursePrime / 23800);
        if (!coursePrime) coursePrime = 1;
        if (loginStatus) {
            if (loginStatus.SoDuTaiKhoan >= coursePrime) {
                const dataChange = {
                    ...loginStatus,
                    SoDuTaiKhoan: loginStatus.SoDuTaiKhoan - coursePrime
                }
                setLoginStatus(dataChange)
                localStorage.removeItem("18521124");
                localStorage.setItem('18521124', JSON.stringify(dataChange));
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
                fetch(variables.API_URL + 'khoahochocvien', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        MaKhoaHoc: String(khoaHocSelector.MaKhoaHoc),
                        MaHocVien: String(loginStatus.MaHocVien)
                    })
                })
                    .then(res => res.json())
                    .then((result) => {
                        refreshData();
                    }, (error) => {
                    })
            } else {
                history.push("/info-user");
            }
        }
        else{
            history.push("/login");
        }
    }
    function handleSubmitReview() {
        if (rateScoreReviewHocVienSelector) {
            fetch(variables.API_URL + 'danhgia', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    MaDanhGia: rateScoreReviewHocVienSelector.MaDanhGia,
                    MaKhoaHoc: String(khoaHocSelector.MaKhoaHoc),
                    MaHocVien: String(loginStatus.MaHocVien),
                    DiemDanhGia: scoreReview
                })
            })
                .then(res => res.json())
                .then((result) => {
                    refreshData();
                }, (error) => {
                })

        }
        else {
            fetch(variables.API_URL + 'danhgia', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    MaKhoaHoc: String(khoaHocSelector.MaKhoaHoc),
                    MaHocVien: String(loginStatus.MaHocVien),
                    DiemDanhGia: scoreReview
                })
            })
                .then(res => res.json())
                .then((result) => {
                    refreshData();
                }, (error) => {
                })
        }
    }
    return <>
        <Row className="app__home__container__rowbody__course-detail-row">
            <Col className="app__home__container__rowbody__course-detail-col" xs="12">
                <div className="app__home__container__rowbody__course-detail__header">
                    <div className="app__home__container__rowbody__course-detail__header__title">
                        {khoaHocSelector && khoaHocSelector.TenKhoaHoc}
                    </div>
                    <div className="app__home__container__rowbody__course-detail__header__info">
                        <div className="app__home__container__rowbody__course-detail__header__info__teacher">
                            <img src={giaoVienSelector && variables.MEDIA_URL + giaoVienSelector.AnhGiaoVien} alt="img" />
                            <div>{giaoVienSelector && giaoVienSelector.TenGiaoVien}</div>
                        </div>
                        <div className="app__home__container__rowbody__course-detail__header__info__numberofstudents">
                            <i className="bi bi-people"></i>
                            <div>
                                {soHocVienCuaKhoaHoc} học viên
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
        <Row className="app__home__container__rowbody__course-detail-row">
            <Col className="app__home__container__rowbody__course-detail-col" xs="8">
                {getVideo()}
            </Col>
            <Col className="app__home__container__rowbody__course-detail-col" xs="4">
                {permissionUser && (
                    <div className="app__home__container__rowbody__course-detail__body-list">
                        {baiGiangSelector.map((value) => {
                            if (value) {
                                let showPlay = null, showPause = null;
                                if (value.SoThuTu === iconShowSelector) {
                                    showPause = <i className="bi bi-pause-fill app__home__container__rowbody__course-detail__body-list__item__icon-pause"></i>
                                } else {
                                    showPlay = <i className="bi bi-play-fill app__home__container__rowbody__course-detail__body-list__item__icon-play"></i>
                                }
                                return (
                                    <div
                                        onClick={() => { handleClick(value) }}
                                        key={value.MaBaiGiang}
                                        className="app__home__container__rowbody__course-detail__body-list__item"
                                    >
                                        <img src={variables.MEDIA_URL + value.LinkPoster} alt="img" />
                                        <div>
                                            {"Bài học " + value.SoThuTu}
                                        </div>
                                        {showPlay}
                                        {showPause}
                                    </div>
                                )
                            }
                            return null;
                        })}
                    </div>)
                }
                {!permissionUser && (
                    <div className="app__home__container__rowbody__course-detail__body-payment">
                        <div className="app__home__container__rowbody__course-detail__body-payment__promotion">
                            GIẢM GIÁ {khoaHocSelector && khoaHocSelector.KhuyenMai}%
                        </div>
                        <div className="app__home__container__rowbody__course-detail__body-payment__info">
                            <div className="app__home__container__rowbody__course-detail__body-payment__info__cost">
                                <div>
                                    <i className="bi bi-credit-card"></i>
                                    {khoaHocSelector && Math.round(((khoaHocSelector.GiaKhoaHoc * (1 - khoaHocSelector.KhuyenMai / 100)) * 1000) / 1000)}
                                    <sup>đ</sup>
                                </div>
                                <div>
                                    {khoaHocSelector && khoaHocSelector.GiaKhoaHoc}
                                    <sup>đ</sup>
                                </div>
                            </div>
                            <div className="app__home__container__rowbody__course-detail__body-payment__info__btn-add-cart">
                                {!khoaHocChecked &&
                                    <button onClick={handleAddCart}>
                                        <i className="bi bi-cart3"></i>
                                        THÊM VÀO GIỎ HÀNG
                                    </button>
                                }
                                {khoaHocChecked &&
                                    <button disabled>
                                        <i className="bi bi-bag-check-fill"></i>
                                        ĐÃ THÊM VÀO GIỎ
                                    </button>
                                }
                            </div>
                            <div className="app__home__container__rowbody__course-detail__body-payment__info__total-course">
                                <i className="bi bi-clock-history"></i>
                                Giáo trình: <span>{baiGiangSelector && baiGiangSelector.length} bài giảng</span>
                            </div>
                            <div className="app__home__container__rowbody__course-detail__body-payment__info__lifecycle">
                                <i className="bi bi-bootstrap-reboot"></i>
                                Sở hữu khóa học trọn đời
                            </div>
                        </div>
                    </div>)
                }
            </Col>
        </Row>
        <Row className="app__home__container__rowbody__course-detail-row">
            <Col className="app__home__container__rowbody__course-detail-col" xs="8">
                <div className="app__home__container__rowbody__course-detail__body-intro">
                    <div>
                        Giới thiệu khóa học
                    </div>
                    <div>
                        {khoaHocSelector && khoaHocSelector.ThongTinKhoaHoc}
                    </div>
                </div>
            </Col>
        </Row>
        <Row className="app__home__container__rowbody__course-detail-row">
            <Col className="app__home__container__rowbody__course-detail-col" xs="8">
                <div className="app__home__container__rowbody__course-detail__body-info-teacher">
                    <div className="app__home__container__rowbody__course-detail__body-info-teacher__header">
                        {giaoVienSelector && giaoVienSelector.TenGiaoVien}
                    </div>
                    <div className="app__home__container__rowbody__course-detail__body-info-teacher__body">
                        <div className="app__home__container__rowbody__course-detail__body-info-teacher__body__basis">
                            <img src={giaoVienSelector && variables.MEDIA_URL + giaoVienSelector.AnhGiaoVien} alt="img" />
                            <div>
                                <i className="bi bi-people-fill"></i>
                                <span>{infoGiaVien && infoGiaVien.hocvien}</span>
                                học viên
                            </div>
                            <div>
                                <i className="bi bi-play-btn-fill"></i>
                                <span>{infoGiaVien && infoGiaVien.khoahoc}</span>
                                khóa học
                            </div>
                        </div>
                        <div className="app__home__container__rowbody__course-detail__body-info-teacher__body__detail">
                            <div>{giaoVienSelector && giaoVienSelector.TenGiaoVien}</div>
                            {giaoVienSelector && giaoVienSelector.ThongTinGiaoVien}
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
        <Row className="app__home__container__rowbody__course-detail-row">
            <Col className="app__home__container__rowbody__course-detail-col" xs="8">
                <div className="app__home__container__rowbody__course-detail__body-review">
                    <div className="app__home__container__rowbody__course-detail__body-review__header">
                        Đánh giá của học viên
                    </div>
                    <div className="app__home__container__rowbody__course-detail__body-review__body">
                        <div className="app__home__container__rowbody__course-detail__body-review__body__total">
                            <div>{rateScoreReview && rateScoreReview.average.toFixed(1)}</div>
                            <div>
                                {rateScoreReview && rateScoreReview.average === 0 ? <i className="bi bi-star"></i> : null}
                                {rateScoreReview && rateScoreReview.average > 0 && rateScoreReview.average <= 0.5 ? <i className="bi bi-star-half"></i> : null}
                                {rateScoreReview && rateScoreReview.average > 0.5 && rateScoreReview.average <= 1 ? <i className="bi bi-star-fill"></i> : null}
                                {rateScoreReview && rateScoreReview.average > 1 ? <i className="bi bi-star-fill"></i> : null}

                                {rateScoreReview && rateScoreReview.average <= 1 ? <i className="bi bi-star"></i> : null}
                                {rateScoreReview && rateScoreReview.average > 1 && rateScoreReview.average <= 1.5 ? <i className="bi bi-star-half"></i> : null}
                                {rateScoreReview && rateScoreReview.average > 1.5 && rateScoreReview.average <= 2 ? <i className="bi bi-star-fill"></i> : null}
                                {rateScoreReview && rateScoreReview.average > 2 ? <i className="bi bi-star-fill"></i> : null}

                                {rateScoreReview && rateScoreReview.average <= 2 ? <i className="bi bi-star"></i> : null}
                                {rateScoreReview && rateScoreReview.average > 2 && rateScoreReview.average <= 2.5 ? <i className="bi bi-star-half"></i> : null}
                                {rateScoreReview && rateScoreReview.average > 2.5 && rateScoreReview.average <= 3 ? <i className="bi bi-star-fill"></i> : null}
                                {rateScoreReview && rateScoreReview.average > 3 ? <i className="bi bi-star-fill"></i> : null}

                                {rateScoreReview && rateScoreReview.average <= 3 ? <i className="bi bi-star"></i> : null}
                                {rateScoreReview && rateScoreReview.average > 3 && rateScoreReview.average <= 3.5 ? <i className="bi bi-star-half"></i> : null}
                                {rateScoreReview && rateScoreReview.average > 3.5 && rateScoreReview.average <= 4 ? <i className="bi bi-star-fill"></i> : null}
                                {rateScoreReview && rateScoreReview.average > 4 ? <i className="bi bi-star-fill"></i> : null}

                                {rateScoreReview && rateScoreReview.average <= 4 ? <i className="bi bi-star"></i> : null}
                                {rateScoreReview && rateScoreReview.average > 4 && rateScoreReview.average <= 4.5 ? <i className="bi bi-star-half"></i> : null}
                                {rateScoreReview && rateScoreReview.average > 4.5 && rateScoreReview.average <= 5 ? <i className="bi bi-star-fill"></i> : null}
                            </div>
                            <div>{rateScoreReview && rateScoreReview.total} đánh giá</div>
                        </div>
                        <div className="app__home__container__rowbody__course-detail__body-review__detail">
                            <div className="app__home__container__rowbody__course-detail__body-review__detail__item">
                                <div>
                                    <ProgressBar now={rateScoreReview && (rateScoreReview.total === 0 ? 0 : (rateScoreReview.star5 * 100 / rateScoreReview.total))} />
                                </div>
                                <div>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <span>{rateScoreReview && (rateScoreReview.total === 0 ? 0 : parseInt(rateScoreReview.star5 * 100 / rateScoreReview.total)) + " %"}</span>
                                </div>
                            </div>
                            <div className="app__home__container__rowbody__course-detail__body-review__detail__item">
                                <div>
                                    <ProgressBar now={rateScoreReview && (rateScoreReview.total === 0 ? 0 : (rateScoreReview.star4 * 100 / rateScoreReview.total))} />
                                </div>
                                <div>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star"></i>
                                    <span>{rateScoreReview && (rateScoreReview.total === 0 ? 0 : parseInt(rateScoreReview.star4 * 100 / rateScoreReview.total)) + " %"}</span>
                                </div>
                            </div>
                            <div className="app__home__container__rowbody__course-detail__body-review__detail__item">
                                <div>
                                    <ProgressBar now={rateScoreReview && (rateScoreReview.total === 0 ? 0 : (rateScoreReview.star3 * 100 / rateScoreReview.total))} />
                                </div>
                                <div>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star"></i>
                                    <i className="bi bi-star"></i>
                                    <span>{rateScoreReview && (rateScoreReview.total === 0 ? 0 : parseInt(rateScoreReview.star3 * 100 / rateScoreReview.total)) + " %"}</span>
                                </div>
                            </div>
                            <div className="app__home__container__rowbody__course-detail__body-review__detail__item">
                                <div>
                                    <ProgressBar now={rateScoreReview && (rateScoreReview.total === 0 ? 0 : (rateScoreReview.star2 * 100 / rateScoreReview.total))} />
                                </div>
                                <div>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star"></i>
                                    <i className="bi bi-star"></i>
                                    <i className="bi bi-star"></i>
                                    <span>{rateScoreReview && (rateScoreReview.total === 0 ? 0 : parseInt(rateScoreReview.star2 * 100 / rateScoreReview.total)) + " %"}</span>
                                </div>
                            </div>
                            <div className="app__home__container__rowbody__course-detail__body-review__detail__item">
                                <div>
                                    <ProgressBar now={rateScoreReview && (rateScoreReview.total === 0 ? 0 : (rateScoreReview.star1 * 100 / rateScoreReview.total))} />
                                </div>
                                <div>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star"></i>
                                    <i className="bi bi-star"></i>
                                    <i className="bi bi-star"></i>
                                    <i className="bi bi-star"></i>
                                    <span>{rateScoreReview && (rateScoreReview.total === 0 ? 0 : parseInt(rateScoreReview.star1 * 100 / rateScoreReview.total)) + " %"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {permissionUser && <div className="app__home__container__rowbody__course-detail__body-review__footer">
                        <div>Chạm để xếp hạng:</div>
                        {scoreReview < 1 ? <i onClick={() => { setScoreReview(1) }} className="bi bi-star"></i> : <i onClick={() => { setScoreReview(1) }} className="bi bi-star-fill"></i>}
                        {scoreReview < 2 ? <i onClick={() => { setScoreReview(2) }} className="bi bi-star"></i> : <i onClick={() => { setScoreReview(2) }} className="bi bi-star-fill"></i>}
                        {scoreReview < 3 ? <i onClick={() => { setScoreReview(3) }} className="bi bi-star"></i> : <i onClick={() => { setScoreReview(3) }} className="bi bi-star-fill"></i>}
                        {scoreReview < 4 ? <i onClick={() => { setScoreReview(4) }} className="bi bi-star"></i> : <i onClick={() => { setScoreReview(4) }} className="bi bi-star-fill"></i>}
                        {scoreReview < 5 ? <i onClick={() => { setScoreReview(5) }} className="bi bi-star"></i> : <i onClick={() => { setScoreReview(5) }} className="bi bi-star-fill"></i>}
                        <button onClick={handleSubmitReview} type='button'>Gửi đánh giá</button>
                    </div>}
                </div>
            </Col>
        </Row>
        <Row className="app__home__container__rowbody__course-detail-row">
            <Col className="app__home__container__rowbody__course-detail-col" xs="8">
                <div className="app__home__container__rowbody__course-detail__body-comment">
                    <div className="app__home__container__rowbody__course-detail__body-comment__header">
                        Nhận xét của học viên
                    </div>
                    <div className="app__home__container__rowbody__course-detail__body-comment__student">
                        {permissionUser && (
                            <div className="app__home__container__rowbody__course-detail__body-comment__student__detail">
                                <img src={avartar} alt="img" />
                                <div className="app__home__container__rowbody__course-detail__body-comment__student__detail__comment">
                                    <input
                                        onChange={handleChangeComment}
                                        value={commentCurrent} type="text"
                                        placeholder="Viết bình luận..."
                                    />
                                    <i onClick={handleSubmitComment} className="bi bi-cursor-fill"></i>
                                </div>
                            </div>
                        )}
                        {binhLuan.map((binhluanitem, index) => {
                            if (khoaHocSelector && Number(binhluanitem.MaKhoaHoc) === khoaHocSelector.MaKhoaHoc) {
                                const [objHocVien] = hocVien.filter((hv) => {
                                    return hv.MaHocVien === Number(binhluanitem.MaHocVien);
                                });
                                const [hocvienReview] = danhGia.filter((value) => {
                                    return khoaHocSelector && objHocVien && khoaHocSelector.MaKhoaHoc === Number(value.MaKhoaHoc) && objHocVien.MaHocVien === Number(value.MaHocVien)
                                });
                                function handleDeleteComment() {
                                    fetch(variables.API_URL + "binhluan/" + binhluanitem.MaBinhLuan, {
                                        method: 'DELETE'
                                    })
                                        .then(res => res.json())
                                        .then((result) => {
                                            refreshData();
                                        }, (error) => {
                                        })

                                }
                                if (checkEditComment && checkEditComment.MaBinhLuan === binhluanitem.MaBinhLuan) {
                                    return (
                                        <div key={index} className="app__home__container__rowbody__course-detail__body-comment__student__detail">
                                            <img src={avartar} alt="img" />
                                            <div className="app__home__container__rowbody__course-detail__body-comment__student__detail__comment">
                                                <input
                                                    onChange={handleChangeEditComment}
                                                    value={commentEditCurrent} type="text"
                                                />
                                                <i onClick={() => { handleSubmitEditComment(binhluanitem.MaBinhLuan) }} className="bi bi-pencil-fill"></i>
                                            </div>
                                            <div className="app__home__container__rowbody__course-detail__body-comment__student__detail__edit-delete">
                                                <i onClick={() => { setCheckEditComment(null) }} className="bi bi-x-lg"></i>
                                            </div>
                                        </div>
                                    )
                                }
                                return (
                                    <div key={index} className="app__home__container__rowbody__course-detail__body-comment__student__detail">
                                        {objHocVien && loginStatus && objHocVien.MaHocVien === loginStatus.MaHocVien ? <img src={avartar} alt="img" /> : <img src={objHocVien && variables.MEDIA_URL + objHocVien.AnhHocVien} alt="img" />}
                                        <div>
                                            <div>
                                                {objHocVien && objHocVien.TenHocVien}
                                                <span>
                                                    <i className="bi bi-clock-history"></i>
                                                    {binhluanitem.ThoiGianBinhLuan}
                                                </span>
                                            </div>
                                            <div>
                                                {hocvienReview && (hocvienReview.DiemDanhGia < 1 ? <i className="bi bi-star"></i> : <i className="bi bi-star-fill"></i>)}
                                                {hocvienReview && (hocvienReview.DiemDanhGia < 2 ? <i className="bi bi-star"></i> : <i className="bi bi-star-fill"></i>)}
                                                {hocvienReview && (hocvienReview.DiemDanhGia < 3 ? <i className="bi bi-star"></i> : <i className="bi bi-star-fill"></i>)}
                                                {hocvienReview && (hocvienReview.DiemDanhGia < 4 ? <i className="bi bi-star"></i> : <i className="bi bi-star-fill"></i>)}
                                                {hocvienReview && (hocvienReview.DiemDanhGia < 5 ? <i className="bi bi-star"></i> : <i className="bi bi-star-fill"></i>)}
                                            </div>
                                            <div>
                                                {binhluanitem.NoiDung}
                                            </div>
                                        </div>
                                        {objHocVien && loginStatus && objHocVien.MaHocVien === loginStatus.MaHocVien &&
                                            <div className="app__home__container__rowbody__course-detail__body-comment__student__detail__edit-delete">
                                                <i onClick={() => {
                                                    setCheckEditComment(binhluanitem);
                                                    setCommentEditCurrent(binhluanitem.NoiDung);
                                                }} className="bi bi-pencil-square"></i>
                                                <i onClick={() => { handleDeleteComment() }} className="bi bi-trash2-fill"></i>
                                            </div>
                                        }
                                    </div>
                                )
                            }
                            return null;
                        })}
                    </div>
                </div>
            </Col>
        </Row>
    </>
}