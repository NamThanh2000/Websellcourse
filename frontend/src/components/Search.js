import { Row, Col } from 'reactstrap';
import Course from './Course';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../contexts/Context';
import Pagination from 'react-bootstrap/Pagination';

function filterGiaoVien(course, arrGiaoVien) {
    const [objGiaoVien] = arrGiaoVien.filter((giaoVien) => {
        return giaoVien.MaGiaoVien === Number(course.MaGiaoVien);
    });
    if (objGiaoVien) {
        return objGiaoVien.TenGiaoVien;
    }
}


export default function Search() {
    const { dataSearch, khoaHoc, giaoVien } = useContext(Context);

    const [pageCount, setPageCount] = useState([]);
    const [pageCurrent, setPageCurrent] = useState(0);
    const [countResult, setCountResult] = useState(0);

    useEffect(() => {
        let test, test2 = [], test3 = [];
        test = khoaHoc.map((course) => {
            const existCourse = course.TenKhoaHoc.toString().toLowerCase().includes(
                dataSearch.toString().trim().toLowerCase()
            )
            if(dataSearch === "Lớp 1" && course.LoaiKhoaHoc !== '1') return null
            if (existCourse && dataSearch) {
                const tenGiaoVien = filterGiaoVien(course, giaoVien)
                return <Col key={course.MaKhoaHoc} xs="3">
                    <Course course={course} tenGiaoVien={tenGiaoVien} />
                </Col>
            }
            return null;
        });
        for (let i of test) {
            if (i) {
                test2.push(i);
            }
        }
        for (let i = 0; i < test2.length; i = i + 8) {
            test3.push(test2.slice(i, i + 8));
        }
        setCountResult(test2.length);
        setPageCount(test3);
    }, [dataSearch, khoaHoc, giaoVien])
    return (
        <div className="app__home__container__rowbody__search">
            <Row className="app__home__container__rowbody__search-row">
                <Col className="app__home__container__rowbody__search-col">
                    <div className="app__home__container__rowbody__search__header">
                        <div>Kết quả tìm kiếm: {dataSearch}</div>
                        <div>Tìm thấy: { countResult } kết quả</div>
                    </div>
                </Col>
            </Row>
            <Row className="app__home__container__rowbody__search-row">
                {pageCount[pageCurrent]}
            </Row>
            <Row className="app__home__container__rowbody__search-row">
                <Pagination>
                    <Pagination.First onClick={() => { setPageCurrent(0) }} >
                        <i className="bi bi-arrow-left-circle-fill"></i>
                    </Pagination.First>
                    {pageCount.map((page, index) => {
                        return <Pagination.Item active={index === pageCurrent} key={index} onClick={() => { setPageCurrent(index) }}>{index + 1}</Pagination.Item>
                    })}
                    <Pagination.Last onClick={() => { setPageCurrent(pageCount.length - 1) }}>
                        <i className="bi bi-arrow-right-circle-fill"></i>
                    </Pagination.Last>
                </Pagination>
            </Row>
        </div>
    )
}