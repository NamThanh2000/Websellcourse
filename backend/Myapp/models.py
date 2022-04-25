from django.db import models

# Create your models here.
class KhoaHoc(models.Model):
    MaKhoaHoc = models.AutoField(primary_key=True)
    TenKhoaHoc = models.CharField(max_length=100)
    MaGiaoVien = models.CharField(max_length=100)
    LinkAnhKhoaHoc = models.CharField(max_length=100)
    LinkVideoBaiGiang = models.CharField(max_length=100)
    GiaKhoaHoc = models.IntegerField()
    KhuyenMai = models.IntegerField()
    LoaiKhoaHoc = models.CharField(max_length=100)
    ThongTinKhoaHoc = models.CharField(max_length=1000)

class HocVien(models.Model):
    MaHocVien = models.AutoField(primary_key=True)
    TenHocVien = models.CharField(max_length=100)
    EmailHocVien = models.CharField(max_length=100)
    MatKhau = models.CharField(max_length=100)
    NgaySinh = models.DateField()
    AnhHocVien = models.CharField(max_length=100)
    GioiTinh = models.CharField(max_length=100)
    SoDuTaiKhoan = models.IntegerField()

class BinhLuan(models.Model):
    MaBinhLuan = models.AutoField(primary_key=True)
    MaKhoaHoc = models.CharField(max_length=100)
    MaHocVien = models.CharField(max_length=100)
    NoiDung = models.CharField(max_length=500)
    ThoiGianBinhLuan = models.DateField()

class GiaoVien(models.Model):
    MaGiaoVien = models.AutoField(primary_key=True)
    TenGiaoVien = models.CharField(max_length=100)
    AnhGiaoVien = models.CharField(max_length=100)
    ThongTinGiaoVien = models.CharField(max_length=1000)

class DanhGia(models.Model):
    MaDanhGia = models.AutoField(primary_key=True)
    MaKhoaHoc = models.CharField(max_length=100)
    MaHocVien = models.CharField(max_length=100)
    DiemDanhGia = models.IntegerField()

class KhoaHocHocVien(models.Model):
    MaKetHop = models.AutoField(primary_key=True)
    MaKhoaHoc = models.CharField(max_length=100)
    MaHocVien = models.CharField(max_length=100)

class BaiGiang(models.Model):
    MaBaiGiang = models.AutoField(primary_key=True)
    MaKhoaHoc = models.CharField(max_length=100)
    LinkBaiGiang = models.CharField(max_length=100)
    LinkPoster = models.CharField(max_length=100)
    SoThuTu = models.IntegerField()

class GioHang(models.Model):
    MaGioHang = models.AutoField(primary_key=True)
    MaKhoaHoc = models.CharField(max_length=100)
    MaHocVien = models.CharField(max_length=100)
