import re

from django.contrib.auth import authenticate
from django.middleware import csrf
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from config.settings import local
from vanicomic.comic.models import BookMark, Comic, Chapter
from vanicomic.comic.serializers.chapter_serializers import ChapterSerializer
from vanicomic.users.api.serializers import UserSerializer
from vanicomic.users.models import User
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

from vanicomic.users.views import get_tokens_for_user


class LoginView(APIView):
    permission_classes = ([AllowAny])

    def post(self, request, format=None):
        data = request.data
        response = Response()
        username = data.get('username', None)
        password = data.get('password', None)
        user = authenticate(username=username, password=password)
        print(password)
        if user is not None:
            if user.is_active:
                data = get_tokens_for_user(user)

                # Dùng để set cookie nhưng chỉ với same domain
                response.set_cookie(
                    key=local.SIMPLE_JWT['AUTH_COOKIE'],
                    value=data["access"],
                    expires=local.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                    secure=local.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                    httponly=local.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                )
                csrf.get_token(request)
                response.data = {"Success": "Login successfully", "data": data}
                return response
            else:
                return Response({"No active": "This account is not active!!"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"Invalid": "Invalid username or password!!"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([AllowAny])
def auth_register(request):
    """
    Đăng kí tài khoản Vanicomic.
    """
    data = request.data
    email = data.get('email').strip()
    username = data.get('username').strip()
    password = data.get('password').strip()
    name = data.get('name').strip()

    try:
        validate_email(email)
    except ValidationError:
        return Response({
            'ok': False,
            'msg': 'Không đúng định dạng Email'
        })
    if User.objects.filter(email=email).exists():
        return Response({
            'ok': False,
            'msg': 'Email đã tồn tại!'
        })
    elif User.objects.filter(username=username).exists():
        return Response({
            'ok': False,
            'msg': 'Username này đã tồn tại!'
        })
    #
    # elif len(password) < 8:
    #     return Response({
    #         'ok': False,
    #         'msg': 'Mật khẩu phải chứa ích nhất 8 ký tự!'
    #     })
    #
    # elif re.search('[^A-Za-z0-9]',password) == None:
    #     return Response({
    #         'ok': False,
    #         'msg': 'Mật khẩu phải chứa ký tự thường, hoa, ký tự đặc biệt và số!'
    #     })
    #
    # elif len(name) < 8:
    #     return Response({
    #         'ok': False,
    #         'msg': 'Tên hiển thị phải chứa ích nhất 8 ký tự!'
    #     })

    user = User.objects.create(
        username=username,
        name=name,
        email=email,
        password=password
    )

    user.set_password(password)
    user.save()

    return Response({
        'ok': True,
        'msg': 'Tạo tài khoản thành công!'
    })



@api_view(['POST'])
@permission_classes([AllowAny])
def user_post_check_username_api_view(request):
    """
    Kiểm tra username
    """
    user = request.user

    if not user.is_authenticated:
        return Response({
            'ok': False,
            'msg': 'Vui lòng đăng nhập!'
        })

    username = request.data.get('username')

    if len(username) > 20:
        return Response({
            'ok': False,
            'msg': 'Username phải ít hơn 20 ký tự'
        })

    user = User.objects.filter(
        username=username.strip()
    ).first()

    if not user:
        return Response({
            'ok': True,
            'msg': 'Username chưa sử dụng'
        })
    else:
        return Response({
            'ok': False,
            'msg': 'Username đã sử dụng'
        })


@api_view(['POST'])
@permission_classes([AllowAny])
def user_post_check_email_api_view(request):
    """
    Kiểm tra email
    """
    user = request.user

    if not user.is_authenticated:
        return Response({
            'ok': False,
            'msg': 'Vui lòng đăng nhập!'
        })

    email = request.data.get('email')

    if len(email) > 20:
        return Response({
            'ok': False,
            'msg': 'Email phải ít hơn 20 ký tự'
        })

    if not re.fullmatch(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b", email):
        return Response({
            'ok': False,
            'msg': 'Email không hợp lệ'
        })

    user = User.objects.filter(
        email=email.strip()
    ).first()

    if not user:
        return Response({
            'ok': True,
            'msg': 'Email chưa sử dụng'
        })
    else:
        return Response({
            'ok': False,
            'msg': 'Email đã sử dụng'
        })


@api_view(['POST'])
@permission_classes([AllowAny])
def user_post_check_password_api_view(request):
    """
    Kiểm tra mật khẩu
    """
    user = request.user

    # if not user.is_authenticated:
    #     return Response({
    #         'ok': False,
    #         'msg': 'Vui lòng đăng nhập!'
    #     })

    user = User.objects.filter(
        username='thanhnam'
    ).first()

    password = request.data.get('password')

    if user.check_password(password.strip()):
        return Response({
            'ok': True,
            'msg': 'Mật khẩu chính xác'
        })
    else:
        return Response({
            'ok': False,
            'msg': 'Mật khẩu không chính xác'
        })


@api_view(['PUT'])
@permission_classes([AllowAny])
def user_put_edit_password_api_view(request):
    """
    Đổi mật khẩu
    """
    user = request.user

    # if not user.is_authenticated:
    #     return Response({
    #         'ok': False,
    #         'msg': 'Vui lòng đăng nhập!'
    #     })

    user = User.objects.filter(
        username='thanhnam'
    ).first()

    data = request.data
    password_old = data.get('password_old')
    password_new = data.get('password_new')

    if re.search("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$", password_new):
        return Response({
            'ok': False,
            'msg': 'Mật khẩu tối thiểu tám ký tự, có ít nhất một ký tự và một số'
        })

    if user.check_password(password_old.strip()):
        user.set_password(password_new.strip())
        user.save()
        return Response({
            'ok': True,
            'msg': 'Đổi mật khẩu thành công'
        })
    else:
        return Response({
            'ok': False,
            'msg': 'Mật khẩu cũ không chính xác'
        })


@api_view(['GET'])
@permission_classes([AllowAny])
def user_get_profile_api_view(request):
    """
    Lấy profile
    """
    user = request.user

    if not user.is_authenticated:
        return Response({
            'ok': False,
            'msg': 'Vui lòng đăng nhập!'
        })

    user = User.objects.filter(
        username=user.username
    ).first()

    if not user:
        return Response({
            'ok': False,
            'msg': 'Không tìm thấy User'
        })

    return Response({
        'ok': True,
        'data': UserSerializer(user).data
    })


@api_view(['PUT'])
@permission_classes([AllowAny])
def user_put_edit_profile_api_view(request):
    """
    Chỉnh sửa profile
    """
    user = request.user

    if not user.is_authenticated:
        return Response({
            'ok': False,
            'msg': 'Vui lòng đăng nhập!'
        })

    data = request.data
    name = data.get('name', '')

    if name:
        if len(name) > 20:
            return Response({
                'ok': False,
                'msg': 'Tên phải ít hơn 20 ký tự'
            })
        user.name = name.strip()

    username = data.get('username', '')
    if username:
        if len(username) > 20:
            return Response({
                'ok': False,
                'msg': 'Tên đăng nhập phải ít hơn 20 ký tự'
            })
        user.username = username.strip()
    email = data.get('email', '')
    if email:
        if len(email) > 20:
            return Response({
                'ok': False,
                'msg': 'Tên đăng nhập phải ít hơn 20 ký tự'
            })
        if not re.fullmatch(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b", email):
            return Response({
                'ok': False,
                'msg': 'Email không hợp lệ'
            })
        user.email = email.strip()

    user.save()

    return Response({
        'ok': True,
        'msg': 'Chỉnh sửa profile thành công'
    })


@api_view(['PUT'])
@permission_classes([AllowAny])
def user_put_edit_avatar_api_view(request):
    """
    Chỉnh sửa avatar
    """
    user = request.user

    if not user.is_authenticated:
        return Response({
            'ok': False,
            'msg': 'Vui lòng đăng nhập!'
        })

    data = request.data
    avatar = data.get('avatar')

    if not avatar:
        return Response({
            'ok': False,
            'msg': 'Chưa nhập ảnh!'
        })

    user.avatar = avatar
    user.save()

    return Response({
        'ok': True,
        'msg': 'Chỉnh sửa avatar thành công'
    })


@api_view(['GET'])
@permission_classes([AllowAny])
def user_get_comic_api_view(request):
    """
    Danh sách chương của user đang đọc gần đây (10 truyện)
    """

    user = request.user
    if not user.is_authenticated:
        return Response({
            'ok': False,
            'msg': 'Bạn chưa đăng nhập!'
        })

    user = User.objects.get(user_id=user.id)

    book_mark = BookMark.objects.filter(created_by_id=user.pk, status='A').values_list('chapter_id', flat=True)[:10]
    chapter = Chapter.objects.filter(pk__in=book_mark)

    return ChapterSerializer(chapter, many=True).data
