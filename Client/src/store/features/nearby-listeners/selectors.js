import { createSelector } from '@reduxjs/toolkit'

const selectNearbyListenersState = (state) => state.nearbyListeners

export const selectNearbyListeners = createSelector(
  selectNearbyListenersState,
  (state) => state.listeners
)

export const selectNearbyListenersLoading = createSelector(
  selectNearbyListenersState,
  (state) => state.loading
)

export const selectNearbyListenersError = createSelector(
  selectNearbyListenersState,
  (state) => state.error
)

export const selectListenersByTrack = createSelector(
  selectNearbyListeners,
  (listeners) => {
    const byTrack = {}
    listeners.forEach(listener => {
      if (listener.currentTrack) {
        const trackId = listener.currentTrack.id
        if (!byTrack[trackId]) {
          byTrack[trackId] = []
        }
        byTrack[trackId].push(listener)
      }
    })
    return byTrack
  }
)