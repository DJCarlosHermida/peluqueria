import { CalendarClock, ClipboardList, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { Hero, HomeExtras } from "../components/Hero"

const STEPS = [
  { n: "01", title: "Elegí el servicio", text: "Corte, infantil, color, tratamiento, barba o manicura.", Icon: ClipboardList },
  { n: "02", title: "Día y horario", text: "Indicá cuándo preferís venir. El salón confirma el turno.", Icon: CalendarClock },
  { n: "03", title: "Enviá por WhatsApp", text: "La solicitud llega armada. Sin idas y vueltas.", Icon: MessageCircle },
] as const

export function Home() {
  return (
    <>
      <Hero />
      <HomeExtras />
      <section className="border-y border-white/10 bg-ink-2">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="max-w-2xl">
            <p className="font-display text-sm tracking-[0.3em] text-red">CÓMO PEDIR TURNO</p>
            <h2 className="mt-2 font-display text-3xl uppercase text-cream sm:text-5xl">¿Reservamos?</h2>
            <p className="mt-3 text-sm text-muted sm:text-base">
              En tres pasos el salón recibe servicio, día y horario.
            </p>
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {STEPS.map((step) => (
              <li key={step.n} className="rounded-2xl border border-white/10 bg-ink p-6">
                <span className="font-display text-3xl leading-none text-red">{step.n}</span>
                <step.Icon className="mt-5 h-6 w-6 text-cream-2" />
                <h3 className="mt-3 font-display text-xl uppercase text-cream">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
          <Link
            to="/reservar"
            className="mt-10 inline-flex rounded-xl bg-red px-8 py-3 font-display uppercase tracking-wider text-ink hover:bg-red-2"
          >
            Pedir turno
          </Link>
        </div>
      </section>
    </>
  )
}
