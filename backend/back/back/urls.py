from django.contrib import admin
from django.urls    import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include("authentication_.urls")),
    path('api/v1/', include('rest_framework_social_oauth2.urls')),

    path('api/v1/', include("albums.urls")),
    path('api/v1/', include("artists.urls")),
    path('api/v1/', include("tracks.urls")),
    path('api/v1/', include("playlists.urls")),
    path('api/v1/', include("recommendations.urls"))
]
