import { useEffect, useState, createContext } from 'react';
import { variables } from '../variables';

export const Context = createContext()

export default function ContextProvider({ children }) {
    const [loginStatus, setLoginStatus] = useState(null);
    const [dataUser, setDataUser] = useState(null);
    const [dataSearch, setDataSearch] = useState("");
    const [dataCart, setDataCart] = useState([]);

    const [khoaHoc, setKhoaHoc] = useState([]);
    const [giaoVien, setGiaoVien] = useState([]);
    const [baiGiang, setBaiGiang] = useState([]);
    const [hocVien, setHocVien] = useState([]);
    const [khoaHocHocVien, setKhoaHocHocVien] = useState([]);
    const [binhLuan, setBinhLuan] = useState([]);
    const [gioHang, setGioHang] = useState([]);
    const [danhGia, setDanhGia] = useState([]);

    const [avartar, setAvartar] = useState();

    useEffect(() => {
        fetch(variables.API_URL + "khoahoc")
            .then(res => res.json())
            .then((result) => setKhoaHoc(result))
            .catch(err => { });
        fetch(variables.API_URL + "giaovien")
            .then(res => res.json())
            .then((result) => setGiaoVien(result))
            .catch(err => { });
        fetch(variables.API_URL + "baigiang")
            .then(res => res.json())
            .then((result) => setBaiGiang(result))
            .catch(err => { });
        fetch(variables.API_URL + "hocvien")
            .then(res => res.json())
            .then((result) => setHocVien(result))
            .catch(err => { });
        fetch(variables.API_URL + "khoahochocvien")
            .then(res => res.json())
            .then((result) => setKhoaHocHocVien(result))
            .catch(err => { });
        fetch(variables.API_URL + "binhluan")
            .then(res => res.json())
            .then((result) => setBinhLuan(result))
            .catch(err => { });
        fetch(variables.API_URL + "giohang")
            .then(res => res.json())
            .then((result) => setGioHang(result))
            .catch(err => { });
        fetch(variables.API_URL + "danhgia")
            .then(res => res.json())
            .then((result) => setDanhGia(result))
            .catch(err => { });
        if (localStorage.getItem("18521124")) {
            setLoginStatus(JSON.parse(localStorage.getItem("18521124")));
        }
    }, [])

    useEffect(() => {
        setAvartar(loginStatus && variables.MEDIA_URL + loginStatus.AnhHocVien + "?" + Date.now());
    }, [loginStatus])

    useEffect(() => {
        if (loginStatus) {
            const arrExistKhoaHoc = [];
            const existKhoaHocHocVien = khoaHocHocVien.filter((khhv) => {
                return Number(khhv.MaHocVien) === loginStatus.MaHocVien;
            });
            for (let i of existKhoaHocHocVien) {
                arrExistKhoaHoc.push(Number(i.MaKhoaHoc))
            };
            setDataUser(arrExistKhoaHoc);
        }
    }, [khoaHocHocVien, loginStatus])

    useEffect(() => {
        if (loginStatus) {
            const existGioHang = gioHang.filter((gh) => {
                return Number(gh.MaHocVien) === loginStatus.MaHocVien;
            });
            const existKhoaHocOfGioHang = existGioHang.map((gh) => {
                let khSelector = khoaHoc.find((kh) => {
                    return kh.MaKhoaHoc === Number(gh.MaKhoaHoc);
                })
                khSelector = {
                    MaGioHang: gh.MaGioHang,
                    ...khSelector
                }
                return khSelector
            });
            setDataCart(existKhoaHocOfGioHang);
        }
    }, [gioHang, khoaHoc, loginStatus])

    const contextData = {
        loginStatus,
        setLoginStatus,
        khoaHoc,
        setKhoaHoc,
        giaoVien,
        setGiaoVien,
        baiGiang,
        setBaiGiang,
        hocVien,
        setHocVien,
        dataUser,
        setDataUser,
        khoaHocHocVien,
        setKhoaHocHocVien,
        binhLuan,
        setBinhLuan,
        dataSearch,
        setDataSearch,
        dataCart,
        setDataCart,
        gioHang,
        setGioHang,
        avartar,
        setAvartar,
        danhGia,
        setDanhGia
    }
    return (
        <Context.Provider value={contextData}>
            {children}
        </Context.Provider>
    )
}
