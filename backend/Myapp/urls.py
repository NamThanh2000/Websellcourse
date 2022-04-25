from django.conf import urls
from django.urls import re_path as url
from Myapp import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    url(r'^khoahoc$',views.khoahocApi),
    url(r'^khoahoc/([0-9]+)$',views.khoahocApi),

    url(r'^hocvien$',views.hocvienApi),
    url(r'^hocvien/([0-9]+)$',views.hocvienApi),

    url(r'^binhluan$',views.binhluanApi),
    url(r'^binhluan/([0-9]+)$',views.binhluanApi),

    url(r'^giaovien$',views.giaovienApi),
    url(r'^giaovien/([0-9]+)$',views.giaovienApi), 

    url(r'^danhgia$',views.danhgiaApi),
    url(r'^danhgia/([0-9]+)$',views.danhgiaApi), 

    url(r'^baigiang$',views.baigiangApi),
    url(r'^baigiang/([0-9]+)$',views.baigiangApi), 

    url(r'^khoahochocvien$',views.khoahochocvienApi),
    url(r'^khoahochocvien/([0-9]+)$',views.khoahochocvienApi),   
    
    url(r'^giohang$',views.giohangApi),
    url(r'^giohang/([0-9]+)$',views.giohangApi), 

    url(r'^savefile',views.SaveFile)
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)