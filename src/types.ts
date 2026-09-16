export type ServiceId = "corte" | "ninos" | "color" | "tratamiento" | "barba" | "manicura"

export type Service = {
  id: ServiceId
  name: string
  description: string
  duration: string
  priceLabel: string
  image: string
  featured?: boolean
}

export type BookingForm = {
  name: string
  phone: string
  serviceId: string
  day: string
  slot: string
  notes: string
}
