import { Row, Col } from 'reactstrap';
import Course from './Course';
import { useContext } from 'react';
import { Context } from '../contexts/Context';

function filterGiaoVien(course, arrGiaoVien) {
    const [objGiaoVien] = arrGiaoVien.filter((giaoVien) => {
        return giaoVien.MaGiaoVien === course.MaGiaoVien ? true : false;
    });
    if(objGiaoVien) {
        return objGiaoVien.TenGiaoVien;
    }
}

export default function Senior() {
    const {  khoaHoc, giaoVien } = useContext(Context);

    return (
        <Row className="app__home__container__rowbody__course">
            <div className="app__home__container__rowbody__course__title">
                KHÓA HỌC DÀNH CHO HỌC SINH CẤP 3
            </div>
            {khoaHoc.map((course) => {
                if (course.LoaiKhoaHoc === '3') {
                    const tenGiaoVien = filterGiaoVien(course, giaoVien)
                    return <Col key={course.MaKhoaHoc} xs="3">
                        <Course course={course} tenGiaoVien={tenGiaoVien} />
                    </Col>
                }
                return null;
            })}
        </Row>
    )
}