import FooterInfo from "./FooterInfo"
import { Col } from 'reactstrap';
import { variables } from '../variables';

export default function Footer() {
    return (
        <div className="app__home__footer">
            <Col xs="3" >
                <ul>
                    <div>
                        <img src={variables.MEDIA_URL + "logo.png"} alt="img" />
                    </div>
                    <FooterInfo>
                        <i className="bi bi-map"></i>
                        Khu phố 6, Thủ Đức, Thành phố Hồ Chí Minh
                    </FooterInfo>
                    <FooterInfo>
                        <i className="bi bi-telephone-fill"></i>
                        <a href="tel:028 3725 2002">028 3725 2002</a>
                    </FooterInfo>
                    <FooterInfo>
                        <i className="bi bi-chat-dots"></i>
                        <a href="mailto:ctsv@uit.edu.vn">ctsv@uit.edu.vn</a>
                        
                    </FooterInfo>
                    <FooterInfo>
                        <i className="bi bi-alarm"></i>
                        8:00 - 22:00
                    </FooterInfo>
                </ul>
            </Col>
            <Col xs="3">
                <ul>
                    <div>
                        Về Website H-N
                    </div>
                    <FooterInfo is_a={true}>
                        <i className="bi bi-info-circle"></i>
                        Giới thiệu về H-N
                    </FooterInfo>
                    <FooterInfo is_a={true}>
                        <i className="bi bi-info-circle"></i>
                        Câu hỏi thường gặp
                    </FooterInfo>
                    <FooterInfo is_a={true}>
                        <i className="bi bi-info-circle"></i>
                        Điều khoản dịch vụ
                    </FooterInfo>
                    <FooterInfo is_a={true}>
                        <i className="bi bi-info-circle"></i>
                        Hướng dẫn thanh toán
                    </FooterInfo>
                    <FooterInfo is_a={true}>
                        <i className="bi bi-info-circle"></i>
                        Góc chia sẻ
                    </FooterInfo>
                    <FooterInfo is_a={true}>
                        <i className="bi bi-info-circle"></i>
                        Chính sách bảo mật
                    </FooterInfo>
                </ul>
            </Col>
            <Col xs="3">
                <ul>
                    <div>
                        Hợp tác liên kết
                    </div>
                    <FooterInfo is_a={true}>
                        <i className="bi bi-info-circle"></i>
                        Đăng ký giảng viên
                    </FooterInfo>
                    <FooterInfo is_a={true}>
                        <i className="bi bi-info-circle"></i>
                        Giải pháp e-learning
                    </FooterInfo>
                    <FooterInfo is_a={true}>
                        <i className="bi bi-info-circle"></i>
                        Đào tạo doanh nghiệp
                    </FooterInfo>
                </ul>
            </Col>
            <Col xs="3">
                <ul>
                    <span>
                        Tải app H-N
                    </span>
                    <li>
                        <a href="/">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1200px-Download_on_the_App_Store_Badge.svg.png" alt="img" />
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1200px-Google_Play_Store_badge_EN.svg.png" alt="img" />
                        </a>
                    </li>
                </ul>
                <ul>
                    <span>Kết nối với H-N</span>
                    <li>
                        <a href="/">
                            <img src="https://www.youtube.com/img/desktop/supported_browsers/yt_logo_rgb_light.png" alt="" />
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Facebook_New_Logo_(2015).svg/1200px-Facebook_New_Logo_(2015).svg.png" alt="" />
                        </a>
                    </li>
                </ul>
            </Col>
        </div>
    )
}