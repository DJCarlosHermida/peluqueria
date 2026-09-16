import type { Service, ServiceId } from "../types"

export const BRAND = {
  name: "NOMBRE",
  tagline: "SLOGAN",
  type: "Peluquería",
  zone: "Barrio de ejemplo",
  hoursLabel: "Martes a sábados · 9:00 a 19:00 hs",
  phoneDisplay: "091 332 854",
  whatsappE164: "59891332854",
  timezone: "America/Montevideo",
} as const

export const SCHEDULE: ({ open: number; close: number } | null)[] = [
  null,
  null,
  { open: 9, close: 19 },
  { open: 9, close: 19 },
  { open: 9, close: 19 },
  { open: 9, close: 19 },
  { open: 9, close: 19 },
]

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`

export const SERVICES: Service[] = [
  {
    id: "corte",
    name: "Corte",
    description: "Corte de dama o caballero. Lavado incluido.",
    duration: "45 min",
    priceLabel: "Consultar",
    image: img("photo-1560066984-138dadb4c035"),
    featured: true,
  },
  {
    id: "ninos",
    name: "Corte infantil",
    description: "Corte para niños, con paciencia y en un ambiente cómodo.",
    duration: "30 min",
    priceLabel: "Consultar",
    image: img("photo-1673865641132-d4302e15f8d4"),
  },
  {
    id: "color",
    name: "Color",
    description: "Coloración, mechas o balayage según el cabello.",
    duration: "2 hs",
    priceLabel: "Consultar",
    image: img("photo-1522337360788-8b13dee7a37e"),
  },
  {
    id: "tratamiento",
    name: "Tratamiento",
    description: "Nutrición, keratina o botox capilar.",
    duration: "1 h 30",
    priceLabel: "Consultar",
    image: img("photo-1519699047748-de8e457a634e"),
  },
  {
    id: "barba",
    name: "Barba y perfilado",
    description: "Arreglo de barba, cejas y perfilado.",
    duration: "30 min",
    priceLabel: "Consultar",
    image: img("photo-1599351431202-1e0f0137899a"),
  },
  {
    id: "manicura",
    name: "Manicura",
    description: "Manicura tradicional o esmaltado semipermanente.",
    duration: "50 min",
    priceLabel: "Consultar",
    image: img("photo-1604654894610-df63bc536371"),
  },
]

export const TIME_SLOTS = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"] as const

export function getService(id: string): Service | undefined {
  return SERVICES.find((item) => item.id === id)
}

const specialty = (id: ServiceId, label: string, detail: string, featured = false) => ({
  id,
  label,
  detail,
  image: getService(id)!.image,
  to: `/servicios#${id}`,
  featured,
})

export const SPECIALTIES = [
  specialty("corte", "Corte", "Dama y caballero", true),
  specialty("ninos", "Niños", "Corte infantil", false),
  specialty("color", "Color", "Mechas, balayage y coloración"),
  specialty("barba", "Barba", "Arreglo y perfilado"),
] as const

export const FEATURES = [
  { id: "turno", title: "Turno ordenado", text: "El salón recibe servicio, día y horario en un solo mensaje." },
  { id: "servicios", title: "Servicios a la vista", text: "Corte, color, niños, barba y manicura sin idas y vueltas." },
  { id: "horario", title: "Horario del salón", text: "El sitio avisa si estás pidiendo turno fuera de atención." },
] as const
