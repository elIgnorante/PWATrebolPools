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
    <section
      className="relative overflow-hidden bg-[#F5F8FF] px-4 py-16 sm:px-6 sm:py-20"
      aria-labelledby="pwa-toolkit"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-8 h-48 w-48 rounded-full bg-[#C7E7FF]/50 blur-3xl sm:h-64 sm:w-64" />
        <div className="absolute -bottom-16 right-0 h-56 w-56 rounded-full bg-[#D7F2DF]/60 blur-3xl sm:h-72 sm:w-72" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#3D9034]">PWA ready</p>
            <h2 id="pwa-toolkit" className="text-3xl font-bold text-[#101828] sm:text-4xl">
              Kit de capacidades del dispositivo
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[#475467]">
              Geolocalización, notificaciones, vibración y almacenamiento offline para que Trebol Pools funcione sin interrupciones.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-wide text-[#344054]">
            <span className="rounded-full bg-white/70 px-3 py-1 shadow-sm ring-1 ring-white/70">{isOnline ? 'En línea' : 'Sin conexión'}</span>
            <span className="rounded-full bg-[#EEF2FF] px-3 py-1 shadow-sm ring-1 ring-white/70">Manifest + SW</span>
            <span className="rounded-full bg-[#FFF4E5] px-3 py-1 shadow-sm ring-1 ring-white/70">IndexedDB</span>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <article className="flex h-full flex-col gap-4 rounded-3xl border border-white/80 bg-white/80 p-6 shadow-[0_14px_40px_rgba(16,24,40,0.08)] backdrop-blur-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#166534]">Geolocalización</p>
                <h3 className="text-lg font-semibold text-[#101828]">Ubicación</h3>
              </div>
              <button
                onClick={requestLocation}
                className="rounded-full bg-[#3D9034] px-3 py-2 text-xs font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#2F6F28]"
              >
                Obtener
              </button>
            </div>
            <p className="text-sm leading-6 text-[#475467]">
              Localiza tu proyecto para cotizar rutas y disponibilidad técnica.
            </p>
            <div className="space-y-3 text-sm">
              {location && (
                <p className="rounded-lg bg-[#F0FDF4] px-3 py-2 font-semibold text-[#166534] shadow-inner">
                  Lat: {location.latitude} · Lng: {location.longitude}
                </p>
              )}
              {locationError && <p className="text-xs text-red-600">{locationError}</p>}
            </div>
          </article>

          <article className="flex h-full flex-col gap-4 rounded-3xl border border-white/80 bg-white/80 p-6 shadow-[0_14px_40px_rgba(16,24,40,0.08)] backdrop-blur-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#4338CA]">Engagement</p>
                <h3 className="text-lg font-semibold text-[#101828]">Notificaciones</h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={sendLocalNotification}
                  className="rounded-full bg-[#EAF4EA] px-3 py-2 text-xs font-semibold text-[#166534] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#d5edd7]"
                >
                  Probar
                </button>
                <button
                  onClick={vibrateDevice}
                  className="rounded-full bg-[#EEF2FF] px-3 py-2 text-xs font-semibold text-[#4338CA] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#E0E7FF]"
                >
                  Vibrar
                </button>
              </div>
            </div>
            <p className="text-sm leading-6 text-[#475467]">
              Acepta notificaciones para recibir avances de obra y recordatorios.
            </p>
            <p className="rounded-lg bg-[#FFF4E5] px-3 py-2 text-xs text-[#854D0E] shadow-inner">
              Las notificaciones funcionan offline y se muestran desde el Service Worker.
            </p>
          </article>

          <article className="flex h-full flex-col gap-4 rounded-3xl border border-white/80 bg-white/80 p-6 shadow-[0_14px_40px_rgba(16,24,40,0.08)] backdrop-blur-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#0F172A]">Datos offline</p>
                <h3 className="text-lg font-semibold text-[#101828]">Tendencias</h3>
              </div>
              <span className="rounded-full bg-[#F1F5F9] px-3 py-1 text-[11px] font-semibold text-[#0F172A] shadow-sm">Sync</span>
            </div>
            <p className="text-sm leading-6 text-[#475467]">
              Datos remotos cacheados en IndexedDB para consulta offline.
            </p>
            {isLoading && <p className="text-sm text-[#344054]">Sincronizando datos...</p>}
            {error && <p className="text-xs text-red-600">{error}</p>}
            <ul className="space-y-3 text-sm text-[#101828]">
              {insights.map((insight) => (
                <li key={insight.id} className="rounded-xl bg-[#F8FAFC] p-3 shadow-inner">
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
