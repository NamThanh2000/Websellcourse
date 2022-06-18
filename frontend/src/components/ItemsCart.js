import { variables } from '../variables';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../contexts/Context';


export default function ItemsCart({ course, tenGiaoVien }) {
    const { setGioHang } = useContext(Context);

    function refreshData() {
        fetch(variables.API_URL + "giohang")
            .then(res => res.json())
            .then((result) => setGioHang(result))
            .catch(err => { });
    }

    function handleDeleteItem() {
        fetch(variables.API_URL + "giohang/" + course.MaGioHang, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then((result) => {
                refreshData();
            }, (error) => {
            })
    }

    return (
        <div className="app__home__container__rowbody__items-cart-container">
            <Link className="app__home__container__rowbody__items-cart__link" to={"/course/" + course.MaKhoaHoc}>
                <div className="app__home__container__rowbody__items-cart__link__container">
                    <img src={variables.MEDIA_URL + course.LinkAnhKhoaHoc} alt="img" />
                    <div className="app__home__container__rowbody__items-cart__link__container__body__info">
                        <div>
                            {course.TenKhoaHoc}
                        </div>
                        <div>
                            {tenGiaoVien}
                        </div>
                    </div>
                    <div className="app__home__container__rowbody__items-cart__link__container__body__cost">
                        <div>
                            {Math.round(((course.GiaKhoaHoc * (1 - course.KhuyenMai / 100)) * 1000) / 1000)}
                            <sup>đ</sup>
                        </div>
                        <div>
                            {course.GiaKhoaHoc}
                            <sup>đ</sup>
                        </div>
                    </div>

                </div>
            </Link>
            <div onClick={handleDeleteItem} className="app__home__container__rowbody__items-cart__delete">
                <i className="bi bi-x-circle-fill"></i>
            </div>
        </div>
    )
}