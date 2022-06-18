import { Row, Col } from 'reactstrap';
import Course from './Course';
import { useContext } from 'react';
import { Context } from '../contexts/Context';

function filterGiaoVien(course, arrGiaoVien) {
    const [objGiaoVien] = arrGiaoVien.filter((giaoVien) => {
        return giaoVien.MaGiaoVien === Number(course.MaGiaoVien);
    });
    if (objGiaoVien) {
        return objGiaoVien.TenGiaoVien;
    }
}

export default function MyCourses() {
    const { dataUser, khoaHoc, giaoVien } = useContext(Context);

    return (
        <div className="app__home__container__rowbody__my-courses">
            <Row className="app__home__container__rowbody__my-courses-row">
                <Col className="app__home__container__rowbody__my-courses-col">
                    <div className="app__home__container__rowbody__my-courses__header">
                        <div>Khóa học của bạn</div>
                    </div>
                </Col>
            </Row>
            <Row className="app__home__container__rowbody__my-courses-row">
                {khoaHoc.map((course) => {
                    if (dataUser.includes(course.MaKhoaHoc)) {
                        const tenGiaoVien = filterGiaoVien(course, giaoVien)
                        return <Col key={course.MaKhoaHoc} xs="3">
                            <Course course={course} tenGiaoVien={tenGiaoVien} />
                        </Col>
                    }
                    return null;
                })}
            </Row>
        </div>
    )
}