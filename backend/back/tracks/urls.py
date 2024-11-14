from django.urls import path
from .views import (
    TrackListCreateView,
    TrackRetrieveUpdateDestroyView,
    UserAddTrackPlaylistView,
    UserRemoveTrackFromPlaylistView,
    SpotifyImportTrackView,
<<<<<<< HEAD
    TrackSearchView
=======
    TrackSerachView,
>>>>>>> backend
)


urlpatterns = [
    path('tracks/', TrackListCreateView.as_view(), name='track-list-create'),
    path('tracks/<uuid:pk>/', TrackRetrieveUpdateDestroyView.as_view(), name='track-detail'),

    path('import-track-spotify/', SpotifyImportTrackView.as_view(), name='import-track-spotify'),

    path('playlists/<uuid:pk>/add-track/', UserAddTrackPlaylistView.as_view(), name='user-add-track'),
    path('playlists/<uuid:pk>/remove-track/', UserRemoveTrackFromPlaylistView.as_view(), name='user-remove-track'),
    path('track-search/', TrackSerachView.as_view(), name='search_track'), 

    path('tracks/search/', TrackSearchView.as_view(), name='track-search'),

]