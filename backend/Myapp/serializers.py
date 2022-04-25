from django.db.models import fields
from rest_framework import serializers
from Myapp.models import *

class KhoaHocSerializer(serializers.ModelSerializer):
    class Meta:
        model = KhoaHoc
        fields = ('MaKhoaHoc', 'TenKhoaHoc', 'MaGiaoVien', 'LinkAnhKhoaHoc', 'LinkVideoBaiGiang', 'GiaKhoaHoc', 'KhuyenMai', 'LoaiKhoaHoc', 'ThongTinKhoaHoc')

class HocVienSerializer(serializers.ModelSerializer):
    class Meta:
        model = HocVien
        fields = ('MaHocVien', 'TenHocVien', 'EmailHocVien', 'MatKhau', 'NgaySinh', 'AnhHocVien', 'GioiTinh', 'SoDuTaiKhoan')

class BinhLuanSerializer(serializers.ModelSerializer):
    class Meta:
        model = BinhLuan
        fields = ('MaBinhLuan', 'MaKhoaHoc', 'MaHocVien', 'NoiDung', 'ThoiGianBinhLuan')

class GiaoVienSerializer(serializers.ModelSerializer):
    class Meta:
        model = GiaoVien
        fields = ('MaGiaoVien', 'TenGiaoVien', 'AnhGiaoVien', 'ThongTinGiaoVien')
    
class DanhGiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DanhGia
        fields = ('MaDanhGia', 'MaKhoaHoc', 'MaHocVien', 'DiemDanhGia')

class KhoaHocHocVienSerializer(serializers.ModelSerializer):
    class Meta:
        model = KhoaHocHocVien
        fields = ('MaKetHop', 'MaKhoaHoc', 'MaHocVien')

class BaiGiangSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaiGiang
        fields = ('MaBaiGiang', 'MaKhoaHoc', 'LinkBaiGiang', 'LinkPoster', 'SoThuTu')

class GioHangSerializer(serializers.ModelSerializer):
    class Meta:
        model = GioHang
        fields = ('MaGioHang', 'MaKhoaHoc', 'MaHocVien')