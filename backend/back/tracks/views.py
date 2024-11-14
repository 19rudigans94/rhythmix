from rest_framework             import generics
from .models                    import Track
from .serializers               import TrackSerializer
from services.spotify_service   import import_track_from_spotify
from rest_framework             import response


from rest_framework.response    import Response
from rest_framework.permissions import IsAuthenticated
from playlists.serializers      import PlaylistSerializer
from rest_framework.views       import APIView
from django.core.cache          import cache
<<<<<<< HEAD
from rest_framework import status
import os
import json
=======
from rest_framework             import status


>>>>>>> backend

class TrackListCreateView(generics.ListCreateAPIView):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer

<<<<<<< HEAD
    def get_queryset(self):
        track_name = self.request.query_params.get('search')

        if track_name:
            cache_key = f"track_search_{track_name}"
            cached_tracks = cache.get(cache_key)

            if cached_tracks:
                return cached_tracks
            
            tracks = Track.objects.filter(title__icontains=track_name)
            if tracks.exists():
                cache.set(cache_key, tracks, timeout=3600)
                return tracks
            else:
                result = import_track_from_spotify(track_name)
                if "successfully" in result.lower():
                    new_tracks = Track.objects.filter(title__icontains=track_name)
                    cache.set(cache_key, new_tracks, timeout=86400)
                    return new_tracks
        return super().get_queryset()


=======
>>>>>>> backend

class TrackRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer



class SpotifyImportTrackView(APIView):
    def post(self, request):
        track_name = request.data.get('track_name')

        if not track_name:
            return response.Response({"error": "Track name is required"} ,status=400)
        
        result = import_track_from_spotify(track_name)
        
        if "successfully" in result.lower():
            return response.Response({"message": result}, status=200)
        else:


            return response.Response({"errors": result}, status=400)
        

class UserAddTrackPlaylistView(generics.UpdateAPIView):
    serializer_class = PlaylistSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        playlist = self.get_object()
        track_id = request.data.get('track_id')
        try:
            track = Track.objects.get(id=track_id)
            playlist.tracks.add(track)

            # Обновляем кеш
            cache_key = f"playlist_{playlist.id}_tracks"
            cache.delete(cache_key)  # Очистка кеша после обновления

            return Response({'message': f'Track "{track.title}" added to playlist "{playlist.name}".'}, status=status.HTTP_200_OK)
        except Track.DoesNotExist:
            return Response({'error': 'Track not found'}, status=status.HTTP_404_NOT_FOUND)



class UserRemoveTrackFromPlaylistView(generics.UpdateAPIView):
    serializer_class = PlaylistSerializer
    permission_classes = [IsAuthenticated]

    def update (self, request, *args, **kwargs):
        playlist = self.get_object()
        track_id = request.data.get('track_id')

        try:
            track = Track.objects.get(id=track)
            playlist.tracks.remove(track)
            return  Response({'message': f'Track "{track.title} removed from playlist "{playlist.name}".'}, status=status.HTTP_200_OK)
        except Track.DoesNotExist:
            return Response({'error': 'Track not found'}, status=status.HTTP_404_NOT_FOUND)
        

class TrackSearchView(APIView):
    def get(self, request):
        track_name = request.query.params.get('serach')

<<<<<<< HEAD
        if not track_name:
            return Response({"error": "Search parametr 'serach' is required"},status=400)
        
        cloud_storage_path = '/cloud_storage'
        tracks = []

        for filename in os.listdir(cloud_storage_path):
            if filename.endswith('.json'):
                with open(os.path.join(cloud_storage_path, filename), 'r') as file:
                    track_data=json.load(file)
                    if track_name.lowe() in track_data['title'].lower():
                        tracks.append(track_data)
        if tracks:
            return Response(tracks, status=200)
        else:
            return Response({'message': "No tracks found"}, status=404)
=======
class TrackSerachView(APIView):
    """
        Представление для поиска треков
    """
    def get(self, request):
        track_name = request.query_params.get('search')

        if not track_name:
            return Response({'error': 'Search parametds is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        cache_key = f"tracks_search_{track_name}"
        cached_tracks = cache.get(cache_key)

        if cached_tracks:
            return Response(cached_tracks, status=status.HTTP_200_OK)
        
        tracks = Track.objects.filter(title__icontains=track_name)
        if tracks.exists():
            serialezed_tracks = TrackSerializer(tracks, many=True).data
            cache.set(cache_key, serialezed_tracks,timeout=36000)
            return Response(serialezed_tracks, status=status.HTTP_200_OK)
        
        result = import_track_from_spotify(track_name)
        if "successfully" in result.lower():
            new_track = Track.objects.filter(title__icontains=track_name)
            serialized_new_tracks = TrackSerializer(new_track, many=True).data
            cache.set(cache_key, serialized_new_tracks, timeout=36000)
            return Response(serialized_new_tracks, status=status.HTTP_200_OK)
        return Response({'error': 'Track not found'}, status=status.HTTP_404_NOT_FOUND)
    
        
        
        
>>>>>>> backend
