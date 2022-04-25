from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from Myapp.models import *
from Myapp.serializers import *

from django.core.files.storage import default_storage


@csrf_exempt
def khoahocApi(request, id=0):
    if request.method=='GET':
        khoa_hoc = KhoaHoc.objects.all()
        khoa_hoc_serializer=KhoaHocSerializer(khoa_hoc,many=True)
        return JsonResponse(khoa_hoc_serializer.data,safe=False)
    elif request.method=='POST':
        khoa_hoc_data=JSONParser().parse(request)
        khoa_hoc_serializer=KhoaHocSerializer(data=khoa_hoc_data)
        if khoa_hoc_serializer.is_valid():
            khoa_hoc_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        khoa_hoc_data=JSONParser().parse(request)
        khoa_hoc=KhoaHoc.objects.get(MaKhoaHoc=khoa_hoc_data['MaKhoaHoc'])
        khoa_hoc_serializer=KhoaHocSerializer(khoa_hoc,data=khoa_hoc_data)
        if khoa_hoc_serializer.is_valid():
            khoa_hoc_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        khoa_hoc=KhoaHoc.objects.get(MaKhoaHoc=id)
        khoa_hoc.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def hocvienApi(request, id=0):
    if request.method=='GET':
        hoc_vien = HocVien.objects.all()
        hoc_vien_serializer=HocVienSerializer(hoc_vien,many=True)
        return JsonResponse(hoc_vien_serializer.data,safe=False)
    elif request.method=='POST':
        hoc_vien_data=JSONParser().parse(request)
        hoc_vien_serializer=HocVienSerializer(data=hoc_vien_data)
        if hoc_vien_serializer.is_valid():
            hoc_vien_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        hoc_vien_data=JSONParser().parse(request)
        hoc_vien=HocVien.objects.get(MaHocVien=hoc_vien_data['MaHocVien'])
        hoc_vien_serializer=HocVienSerializer(hoc_vien,data=hoc_vien_data)
        if hoc_vien_serializer.is_valid():
            hoc_vien_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        hoc_vien=HocVien.objects.get(MaHocVien=id)
        hoc_vien.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def binhluanApi(request, id=0):
    if request.method=='GET':
        binh_luan = BinhLuan.objects.all()
        binh_luan_serializer=BinhLuanSerializer(binh_luan,many=True)
        return JsonResponse(binh_luan_serializer.data,safe=False)
    elif request.method=='POST':
        binh_luan_data=JSONParser().parse(request)
        binh_luan_serializer=BinhLuanSerializer(data=binh_luan_data)
        if binh_luan_serializer.is_valid():
            binh_luan_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        binh_luan_data=JSONParser().parse(request)
        binh_luan=BinhLuan.objects.get(MaBinhLuan=binh_luan_data['MaBinhLuan'])
        binh_luan_serializer=BinhLuanSerializer(binh_luan,data=binh_luan_data)
        if binh_luan_serializer.is_valid():
            binh_luan_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        khoa_hoc=BinhLuan.objects.get(MaBinhLuan=id)
        khoa_hoc.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def giaovienApi(request, id=0):
    if request.method=='GET':
        giao_vien = GiaoVien.objects.all()
        giao_vien_serializer=GiaoVienSerializer(giao_vien,many=True)
        return JsonResponse(giao_vien_serializer.data,safe=False)
    elif request.method=='POST':
        giao_vien_data=JSONParser().parse(request)
        giao_vien_serializer=GiaoVienSerializer(data=giao_vien_data)
        if giao_vien_serializer.is_valid():
            giao_vien_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        giao_vien_data=JSONParser().parse(request)
        giao_vien=GiaoVien.objects.get(MaGiaoVien=giao_vien_data['MaGiaoVien'])
        giao_vien_serializer=GiaoVienSerializer(giao_vien,data=giao_vien_data)
        if giao_vien_serializer.is_valid():
            giao_vien_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        giao_vien=GiaoVien.objects.get(MaGiaoVien=id)
        giao_vien.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def danhgiaApi(request, id=0):
    if request.method=='GET':
        danh_gia = DanhGia.objects.all()
        danh_gia_serializer=DanhGiaSerializer(danh_gia,many=True)
        return JsonResponse(danh_gia_serializer.data,safe=False)
    elif request.method=='POST':
        danh_gia_data=JSONParser().parse(request)
        danh_gia_serializer=DanhGiaSerializer(data=danh_gia_data)
        if danh_gia_serializer.is_valid():
            danh_gia_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        danh_gia_data=JSONParser().parse(request)
        danh_gia=DanhGia.objects.get(MaDanhGia=danh_gia_data['MaDanhGia'])
        danh_gia_serializer=DanhGiaSerializer(danh_gia,data=danh_gia_data)
        if danh_gia_serializer.is_valid():
            danh_gia_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        danh_gia=DanhGia.objects.get(MaDanhGia=id)
        danh_gia.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def khoahochocvienApi(request, id=0):
    if request.method=='GET':
        khoa_hoc_hoc_vien = KhoaHocHocVien.objects.all()
        khoa_hoc_hoc_vien_serializer=KhoaHocHocVienSerializer(khoa_hoc_hoc_vien,many=True)
        return JsonResponse(khoa_hoc_hoc_vien_serializer.data,safe=False)
    elif request.method=='POST':
        khoa_hoc_hoc_vien_data=JSONParser().parse(request)
        khoa_hoc_hoc_vien_serializer=KhoaHocHocVienSerializer(data=khoa_hoc_hoc_vien_data)
        if khoa_hoc_hoc_vien_serializer.is_valid():
            khoa_hoc_hoc_vien_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        khoa_hoc_hoc_vien_data=JSONParser().parse(request)
        khoa_hoc_hoc_vien=KhoaHocHocVien.objects.get(MaKetHop=khoa_hoc_hoc_vien_data['MaKetHop'])
        khoa_hoc_hoc_vien_serializer=KhoaHocHocVienSerializer(khoa_hoc_hoc_vien,data=khoa_hoc_hoc_vien_data)
        if khoa_hoc_hoc_vien_serializer.is_valid():
            khoa_hoc_hoc_vien_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        khoa_hoc_hoc_vien=KhoaHocHocVien.objects.get(MaKetHop=id)
        khoa_hoc_hoc_vien.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def baigiangApi(request, id=0):
    if request.method=='GET':
        bai_giang = BaiGiang.objects.all()
        bai_giang_serializer=BaiGiangSerializer(bai_giang,many=True)
        return JsonResponse(bai_giang_serializer.data,safe=False)
    elif request.method=='POST':
        bai_giang_data=JSONParser().parse(request)
        bai_giang_serializer=BaiGiangSerializer(data=bai_giang_data)
        if bai_giang_serializer.is_valid():
            bai_giang_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        bai_giang_data=JSONParser().parse(request)
        bai_giang=BaiGiang.objects.get(MaBaiGiang=bai_giang_data['MaBaiGiang'])
        bai_giang_serializer=BaiGiangSerializer(bai_giang,data=bai_giang_data)
        if bai_giang_serializer.is_valid():
            bai_giang_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        bai_giang=BaiGiang.objects.get(MaBaiGiang=id)
        bai_giang.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def giohangApi(request, id=0):
    if request.method=='GET':
        gio_hang = GioHang.objects.all()
        gio_hang_serializer=GioHangSerializer(gio_hang,many=True)
        return JsonResponse(gio_hang_serializer.data,safe=False)
    elif request.method=='POST':
        gio_hang_data=JSONParser().parse(request)
        gio_hang_serializer=GioHangSerializer(data=gio_hang_data)
        if gio_hang_serializer.is_valid():
            gio_hang_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        gio_hang_data=JSONParser().parse(request)
        gio_hang=GioHang.objects.get(MaGioHang=gio_hang_data['MaGioHang'])
        gio_hang_serializer=GioHangSerializer(gio_hang,data=gio_hang_data)
        if gio_hang_serializer.is_valid():
            gio_hang_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        gio_hang=GioHang.objects.get(MaGioHang=id)
        gio_hang.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def SaveFile(request):
    if request.method == 'POST':
        file=request.FILES['img']
        if default_storage.exists("hocvien/" + file.name):
            default_storage.delete("hocvien/" + file.name)
        file_name=default_storage.save("hocvien/" + file.name,file)
        return JsonResponse(file_name,safe=False)