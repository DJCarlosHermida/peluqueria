import { Navigate, Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"
import { Book } from "./pages/Book"
import { Home } from "./pages/Home"
import { Services } from "./pages/Services"

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Services />} />
        <Route path="/reservar" element={<Book />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
