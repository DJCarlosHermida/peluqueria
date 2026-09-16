import { BRAND, getService } from "../data/catalog"
import type { BookingForm } from "../types"

export function buildWhatsAppMessage(form: BookingForm, closed: boolean): string {
  const service = form.serviceId ? getService(form.serviceId) : undefined

  return [
    `Turno ${BRAND.type} ${BRAND.name}`,
    closed ? "(Solicitud enviada fuera de horario)" : null,
    `Nombre: ${form.name.trim()}`,
    `Tel: ${form.phone.trim()}`,
    service ? `Servicio: ${service.name}` : "Servicio: (a confirmar)",
    form.day ? `Día preferido: ${form.day}` : null,
    form.slot ? `Horario preferido: ${form.slot}` : null,
    form.notes.trim() ? `Comentario: ${form.notes.trim()}` : null,
  ]
    .filter((line): line is string => line !== null)
    .join("\n")
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${BRAND.whatsappE164}?text=${encodeURIComponent(message)}`
}

export function whatsappBlankUrl(): string {
  return `https://wa.me/${BRAND.whatsappE164}`
}
