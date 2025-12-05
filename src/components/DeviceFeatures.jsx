import { useEffect, useState } from 'react'
import { triggerLocalNotification } from '../pwa/register-sw'
import { usePoolInsights } from '../hooks/usePoolInsights'

export const DeviceFeatures = () => {
  const [location, setLocation] = useState(null)
  const [locationError, setLocationError] = useState('')
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true)
  const { insights, isLoading, error } = usePoolInsights()

  useEffect(() => {
    const updateStatus = () => setIsOnline(navigator.onLine)
    window.addEventListener('online', updateStatus)
    window.addEventListener('offline', updateStatus)
    return () => {
      window.removeEventListener('online', updateStatus)
      window.removeEventListener('offline', updateStatus)
    }
  }, [])

  const requestLocation = () => {
    if (!('geolocation' in navigator)) {
      setLocationError('La geolocalización no está disponible en este dispositivo')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude.toFixed(4),
          longitude: pos.coords.longitude.toFixed(4)
        })
        setLocationError('')
      },
      () => setLocationError('No pudimos leer tu ubicación. Intenta nuevamente con GPS activo'),
      { enableHighAccuracy: true, timeout: 8000 }
    )
  }

  const sendLocalNotification = async () => {
    if (!('Notification' in window)) return
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      await triggerLocalNotification('Trebol Pools', 'Mantendremos tus datos sincronizados aún sin internet.')
    }
  }

  const vibrateDevice = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100, 50, 200])
    }
  }

  return (
    <section className="bg-white/80 px-6 py-14 shadow-inner" aria-labelledby="pwa-toolkit">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#3D9034]">PWA ready</p>
            <h2 id="pwa-toolkit" className="text-3xl font-bold text-[#101828]">
              Kit de capacidades del dispositivo
            </h2>
            <p className="mt-2 text-sm text-[#475467]">
              Geolocalización, notificaciones, vibración y almacenamiento offline para que Trebol Pools funcione sin interrupciones.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wide text-[#344054]">
            <span className="rounded-full bg-[#EAF4EA] px-3 py-1">{isOnline ? 'En línea' : 'Sin conexión'}</span>
            <span className="rounded-full bg-[#EEF2FF] px-3 py-1">Manifest + SW</span>
            <span className="rounded-full bg-[#FFF4E5] px-3 py-1">IndexedDB</span>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-[#E4E7EC] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#101828]">Ubicación</h3>
              <button
                onClick={requestLocation}
                className="rounded-full bg-[#3D9034] px-3 py-2 text-xs font-medium text-white hover:bg-[#2F6F28]"
              >
                Obtener
              </button>
            </div>
            <p className="mt-3 text-sm text-[#475467]">
              Localiza tu proyecto para cotizar rutas y disponibilidad técnica.
            </p>
            {location && (
              <p className="mt-3 rounded-lg bg-[#F0FDF4] px-3 py-2 text-sm font-medium text-[#166534]">
                Lat: {location.latitude} · Lng: {location.longitude}
              </p>
            )}
            {locationError && <p className="mt-3 text-xs text-red-600">{locationError}</p>}
          </article>

          <article className="rounded-2xl border border-[#E4E7EC] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#101828]">Notificaciones</h3>
              <div className="flex gap-2">
                <button
                  onClick={sendLocalNotification}
                  className="rounded-full bg-[#EAF4EA] px-3 py-2 text-xs font-medium text-[#166534] hover:bg-[#d5edd7]"
                >
                  Probar
                </button>
                <button
                  onClick={vibrateDevice}
                  className="rounded-full bg-[#EEF2FF] px-3 py-2 text-xs font-medium text-[#4338CA] hover:bg-[#E0E7FF]"
                >
                  Vibrar
                </button>
              </div>
            </div>
            <p className="mt-3 text-sm text-[#475467]">
              Acepta notificaciones para recibir avances de obra y recordatorios.
            </p>
            <p className="mt-4 rounded-lg bg-[#FFF4E5] px-3 py-2 text-xs text-[#854D0E]">
              Las notificaciones funcionan offline y se muestran desde el Service Worker.
            </p>
          </article>

          <article className="rounded-2xl border border-[#E4E7EC] bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-[#101828]">Tendencias</h3>
            <p className="mt-3 text-sm text-[#475467]">
              Datos remotos cacheados en IndexedDB para consulta offline.
            </p>
            {isLoading && <p className="mt-4 text-sm text-[#344054]">Sincronizando datos...</p>}
            {error && <p className="mt-4 text-xs text-red-600">{error}</p>}
            <ul className="mt-4 space-y-3 text-sm text-[#101828]">
              {insights.map((insight) => (
                <li key={insight.id} className="rounded-lg bg-[#F8FAFC] p-3 shadow-inner">
                  <p className="font-semibold">{insight.title}</p>
                  <p className="text-xs text-[#475467]">{insight.body}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}
