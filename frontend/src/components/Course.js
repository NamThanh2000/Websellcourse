import { variables } from '../variables';
import { Link } from 'react-router-dom';

export default function Course({ course, tenGiaoVien }) {

    return (
        <Link className="app__home__container__rowbody__course__link" to={"/course/" + course.MaKhoaHoc}>
            <div className="app__home__container__rowbody__course__link__container">
                <div className="app__home__container__rowbody__course__link__container__promotion">
                    {"-" + course.KhuyenMai + "%"}
                </div>
                <img src={variables.MEDIA_URL + course.LinkAnhKhoaHoc} alt="img" />
                <div className="app__home__container__rowbody__course__link__container__body">
                    <div className="app__home__container__rowbody__course__link__container__body__title">
                        {course.TenKhoaHoc}
                    </div>
                    <div className="app__home__container__rowbody__course__link__container__body__info">
                        <div className="app__home__container__rowbody__course__link__container__body__name">
                            {tenGiaoVien}
                        </div>
                        <div className="app__home__container__rowbody__course__link__container__body__cost">
                            <div>
                                {course.GiaKhoaHoc}
                                <sup>đ</sup>
                            </div>
                            <div>
                                {Math.round(((course.GiaKhoaHoc * (1 - course.KhuyenMai / 100)) * 1000) / 1000)}
                                <sup>đ</sup>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}