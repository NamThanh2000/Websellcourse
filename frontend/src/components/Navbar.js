import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { variables } from '../variables';
import { useContext } from 'react';
import { Context } from '../contexts/Context';
import { useHistory } from "react-router-dom";

export default function Header() {
  const { loginStatus, setLoginStatus, dataSearch, setDataSearch, dataCart, setDataCart, setDataUser, avartar } = useContext(Context);
  const history = useHistory();

  function handleLogout() {
    setLoginStatus(null);
    setDataUser(null);
    setDataCart([])
    localStorage.removeItem("18521124");
    history.push("");
  }

  function checkLogin() {
    if (loginStatus) {
      return (
        <>
          <Col xs="2">
            <div className="app__home__container__rownav__navbar__my-courses">
              <Link to="/my-courses">KHÓA HỌC CỦA TÔI</Link>
            </div>
          </Col>
          <Col xs="1">
            <div className="app__home__container__rownav__navbar__avatar">
              <img src={avartar} alt="img" />
              {loginStatus.TenHocVien.split(" ")[loginStatus.TenHocVien.split(" ").length - 1]}
              <ul>
                <li>
                  <Link to="/info-user">
                    Thông tin tài khoản
                    <i className="bi bi-person"></i>
                  </Link>
                </li>
                <li onClick={handleLogout} >
                  Đăng xuất
                  <i className="bi bi-box-arrow-right"></i>
                </li>
              </ul>
            </div>
          </Col>
        </>
      )
    }
    else {
      return (
        <>
          <Col xs="1">
            <div className="app__home__container__rownav__navbar__login">
              <Link to="/login">ĐĂNG NHẬP</Link>
            </div>
          </Col>
          <Col xs="2">
            <div className="app__home__container__rownav__navbar__register">
              <Link to="/register">ĐĂNG KÝ</Link>
            </div>
          </Col>
        </>
      )
    }
  }
  return (
    <>
      <Col xs="3">
        <div className="app__home__container__rownav__navbar__linkicon">
          <Link to="">
            <img src={variables.MEDIA_URL + "logo.png"} alt="img" />
          </Link>
        </div>
      </Col>
      <Col xs="5">
        <div className="app__home__container__rownav__navbar__search">
          <input
            className="app__home__container__rownav__navbar__search__input"
            type="text"
            placeholder="Tìm khóa học..."
            onChange={(e) => { setDataSearch(e.target.value) }}
            value={dataSearch}
          />
          <Link
            to="/search"
            className="app__home__container__rownav__navbar__search__button"
          >
            <i className="bi bi-search app__home__container__rownav__navbar__search__button__icon"></i>
          </Link>
        </div>
      </Col>
      <Col xs="1">
        <div className="app__home__container__rownav__navbar__cart">
          <Link to="/cart">
            <i className="bi bi-cart3">
              {dataCart.length === 0 || <div>{dataCart.length}</div>}
            </i>
          </Link>
        </div>
      </Col>
      {checkLogin()}
    </>
  )
}
