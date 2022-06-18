import Primary from "./Primary";
import Category from "./Category";
import Junior from "./Junior";
import Senior from "./Senior";
import { Row, Col } from 'reactstrap';
export default function Body() {
    return <>
        <Category />
        <Primary />
        <Junior />
        <Senior />
        <Row className="app__home__container__rowbody__body-intro">
            <div className="app__home__container__rowbody__body-intro__header">
                3 LÝ DO BẠN NÊN HỌC ONLINE TẠI H-N
            </div>
            <Col xs="4">
                <div className="app__home__container__rowbody__body-intro__item">
                    <img src="https://unica.vn/media/images/icon-ts-1.png" alt="img" />
                    <div>Giảng viên uy tín</div>
                    <div>Bài giảng chất lượng</div>
                </div>
            </Col>
            <Col xs="4">
                <div className="app__home__container__rowbody__body-intro__item">
                    <img src="https://unica.vn/media/images/icon-ts-2.png" alt="img" />
                    <div>Thanh toán một lần</div>
                    <div>Học mãi mãi</div>
                </div>
            </Col>
            <Col xs="4">
                <div className="app__home__container__rowbody__body-intro__item">
                    <img src="https://unica.vn/media/images/icon-ts-3.png" alt="img" />
                    <div>Học trực tuyến</div>
                    <div>Hỗ trợ trực tiếp</div>
                </div>
            </Col>
        </Row>
    </>
}