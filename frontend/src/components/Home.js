import Navbar from "./Navbar";
import Body from "./Body";
import Cart from "./Cart";
import Footer from "./Footer";
import Search from "./Search";
import InfoUser from "./InfoUser";
import CourseDetail from "./CourseDetail";
import MyCourses from "./MyCourses";
import { Container, Row } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';

export default function Home() {
    
    return (
        <div className="app__home">
            <Container>
                <Row className="app__home__container__rownav">
                    <Navbar />
                </Row>
                <Row className="app__home__container__rowbody">
                    <Switch>
                        <Route path='/course' component={CourseDetail} />
                        <Route path='/cart' component={Cart} />
                        <Route path='/search' component={Search} />
                        <Route path='/my-courses' component={MyCourses} />
                        <Route path='/info-user' component={InfoUser} />
                        <Route path='' component={Body} />
                    </Switch>
                </Row>
                <Row>
                    <Footer />
                </Row>
            </Container>
        </div>
    )
}