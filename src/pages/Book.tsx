import { useMemo, useState, type FormEvent } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { OpenBadge } from "../components/OpenBadge"
import { WhatsAppIcon } from "../components/WhatsAppIcon"
import { BRAND, SERVICES, TIME_SLOTS } from "../data/catalog"
import { useShopStatus } from "../lib/useShopStatus"
import { buildWhatsAppMessage, whatsappUrl } from "../lib/whatsapp"
import type { BookingForm } from "../types"

const FORM_KEY = "peluqueria-turno"

const EMPTY_FORM: BookingForm = {
  name: "",
  phone: "",
  serviceId: "",
  day: "",
  slot: "",
  notes: "",
}

function readForm(serviceId: string): BookingForm {
  try {
    const raw = localStorage.getItem(FORM_KEY)
    const parsed = raw ? { ...EMPTY_FORM, ...(JSON.parse(raw) as Partial<BookingForm>) } : EMPTY_FORM
    if (serviceId) parsed.serviceId = serviceId
    return parsed
  } catch {
    return { ...EMPTY_FORM, serviceId }
  }
}

export function Book() {
  const status = useShopStatus()
  const [params] = useSearchParams()
  const serviceFromUrl = params.get("servicio") ?? ""
  const [form, setForm] = useState<BookingForm>(() =>
    typeof window === "undefined" ? EMPTY_FORM : readForm(serviceFromUrl),
  )
  const [error, setError] = useState<string | null>(null)

  const preview = useMemo(
    () => (form.name.trim() ? buildWhatsAppMessage(form, !status.open) : ""),
    [form, status.open],
  )

  function update<K extends keyof BookingForm>(key: K, value: BookingForm[K]) {
    setForm((current) => {
      const next = { ...current, [key]: value }
      localStorage.setItem(FORM_KEY, JSON.stringify(next))
      return next
    })
  }

  function validate(): string | null {
    if (!form.name.trim() || form.name.trim().length < 2) return "Ingresá tu nombre."
    if (form.phone.replace(/\D/g, "").length < 8) return "Ingresá un teléfono válido."
    if (!form.serviceId) return "Elegí un servicio."
    if (!form.day) return "Indicá el día preferido."
    if (!form.slot) return "Indicá el horario preferido."
    return null
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const message = validate()
    if (message) {
      setError(message)
      return
    }
    setError(null)
    window.open(whatsappUrl(buildWhatsAppMessage(form, !status.open)), "_blank", "noopener,noreferrer")
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr]">
      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-display text-sm tracking-[0.3em] text-red">TURNOS</p>
            <h1 className="mt-1 font-display text-4xl uppercase text-cream">Reservar</h1>
            <p className="mt-2 text-sm text-muted">Servicio, día y horario. El salón confirma por WhatsApp.</p>
          </div>
          <OpenBadge />
        </div>
        {!status.open && (
          <p className="mt-5 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
            El salón está cerrado ahora ({BRAND.hoursLabel}). Podés enviar igual; va con aviso de fuera de horario.
          </p>
        )}
        <div className="mt-8 rounded-2xl border border-white/10 bg-card p-6">
          <p className="font-display text-lg uppercase text-cream">El turno se confirma en el salón</p>
          <p className="mt-2 text-sm text-muted">
            Esta solicitud no reserva el horario en automático. Revisá los servicios en{" "}
            <Link to="/servicios" className="text-red hover:text-cream">
              la carta
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-card p-5 sm:p-6">
        <h2 className="font-display text-2xl uppercase text-cream">Solicitud de turno</h2>
        <form className="mt-5 space-y-4" onSubmit={onSubmit}>
          <input value={form.name} onChange={(e) => update("name", e.target.value)} className="input" autoComplete="name" placeholder="Nombre" aria-label="Nombre" required />
          <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="input" inputMode="tel" autoComplete="tel" placeholder="Teléfono" aria-label="Teléfono" required />
          <select value={form.serviceId} onChange={(e) => update("serviceId", e.target.value)} className="input" aria-label="Servicio" required>
            <option value="">Servicio</option>
            {SERVICES.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
          <input value={form.day} onChange={(e) => update("day", e.target.value)} className="input" type="date" aria-label="Día preferido" required />
          <select value={form.slot} onChange={(e) => update("slot", e.target.value)} className="input" aria-label="Horario" required>
            <option value="">Horario preferido</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} className="input min-h-24" placeholder="Algo para tener en cuenta" aria-label="Información adicional" />
          {error && <p className="text-sm text-red">{error}</p>}
          <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 font-display uppercase tracking-wider text-white hover:brightness-110">
            <WhatsAppIcon />
            Enviar por WhatsApp
          </button>
        </form>
        {preview && (
          <pre className="mt-5 overflow-x-auto whitespace-pre-wrap rounded-xl bg-ink p-4 text-xs text-cream-2">{preview}</pre>
        )}
      </section>
    </div>
  )
}
