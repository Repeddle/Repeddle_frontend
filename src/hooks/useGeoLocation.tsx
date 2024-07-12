import { useEffect, useState } from "react"

export default function useGeoLocation(show?: boolean) {
  const [location, setLocation] = useState<{
    loaded: boolean
    coordinates?: { lat: string; lng: string }
    error?: { code: number; message: string }
  }>({
    loaded: false,
    coordinates: {
      lat: "",
      lng: "",
    },
  })

  const onSuccess = async (location: GeolocationPosition) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude.toString(),
        lng: location.coords.longitude.toString(),
      },
    })
  }
  const onError = (error: { code: number; message: string }) => {
    setLocation({
      loaded: true,
      error,
    })
  }

  useEffect(() => {
    if (!show) return
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      })
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  }, [show])

  return location
}
