import { Row, Col } from 'reactstrap';
import Carousel from 'react-bootstrap/Carousel';
import ListCourse from "./ListCourse";
import { useContext } from 'react';
import { Context } from '../contexts/Context';
import { variables } from '../variables';

export default function Category() {
    const { khoaHoc } = useContext(Context);

    return <Row className="app__home__container__rowbody__category">
        <Col xs="3">
            <ul className="app__home__container__rowbody__category__listcourses">
                <ListCourse
                    content={"Khóa học cho học sinh cấp 1"}
                    linkContent={
                        {
                            "Lớp 1": "Lớp 1",
                            "Lớp 2": "Lớp 2",
                            "Lớp 3": "Lớp 3",
                            "Lớp 4": "Lớp 4",
                            "Lớp 5": "Lớp 5"
                        }
                    }
                />
                <ListCourse
                    content={"Khóa học cho học sinh cấp 2"}
                    linkContent={
                        {
                            "Lớp 6": "Lớp 6",
                            "Lớp 7": "Lớp 7",
                            "Lớp 8": "Lớp 8",
                            "Lớp 9": "Lớp 9"
                        }
                    }
                />
                <ListCourse
                    content={"Khóa học cho học sinh cấp 3"}
                    linkContent={
                        {
                            "Lớp 10": "Lớp 10",
                            "Lớp 11": "Lớp 11",
                            "Lớp 12": "Lớp 12",
                        }
                    }
                />
            </ul>
        </Col>
        <Col xs="9">
            <Carousel fade>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100"
                        src={variables.MEDIA_URL + khoaHoc[Math.floor(Math.random()*khoaHoc.length)]?.LinkAnhKhoaHoc}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100"
                        src={variables.MEDIA_URL + khoaHoc[Math.floor(Math.random()*khoaHoc.length)]?.LinkAnhKhoaHoc}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100"
                        src={variables.MEDIA_URL + khoaHoc[Math.floor(Math.random()*khoaHoc.length)]?.LinkAnhKhoaHoc}
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        </Col>
    </Row>
}