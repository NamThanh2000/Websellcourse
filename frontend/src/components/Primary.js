import { Row, Col } from 'reactstrap';
import Course from './Course';
import { useContext } from 'react';
import { Context } from '../contexts/Context';

function filterGiaoVien(course, arrGiaoVien) {
    const [objGiaoVien] = arrGiaoVien.filter((giaoVien) => {
        return giaoVien.MaGiaoVien === Number(course.MaGiaoVien);
    });
    if(objGiaoVien) {
        return objGiaoVien.TenGiaoVien;
    }
}

export default function Primary() {
    const {  khoaHoc, giaoVien } = useContext(Context);

    function renderCourse(){
        let countCourse = 0;
        return khoaHoc.map((course) => {
            if(course.LoaiKhoaHoc === '1' && countCourse < 8) {
                ++countCourse;
                const tenGiaoVien = filterGiaoVien(course, giaoVien)
                return <Col key={course.MaKhoaHoc} xs="3">
                    <Course course={course} tenGiaoVien={tenGiaoVien} />
                </Col>
            }
            return null;
        })
    }

    return (
        <Row className="app__home__container__rowbody__course">
            <div className="app__home__container__rowbody__course__title">
                KHÓA HỌC DÀNH CHO HỌC SINH CẤP 1
            </div>
            {renderCourse()}
        </Row>
    )
}