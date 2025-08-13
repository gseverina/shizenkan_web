import React, { useState } from 'react';
import { Menu, Calendar, PhoneCall, Mail, MapPin, Newspaper, Sword, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import logoDojo from './assets/logo-dojo.png';

// --- Datos reales del dojo ---
const DOJO_INFO = {
  name: "Karate Do Shorin Ryu Shizenkan Okinawa",
  meaning: "Shizenkan: Lugar de lo natural",
  sensei: "Sergio Giambattistelli",
  dan: "6º Dan",
  description: "Dojo orientado a la formación integral: técnica, disciplina y valores. Escuela tradicional de Shorin Ryu con raíces en Okinawa."
};

const NEWS = [
  {
    title: "Examen de Kyu – Septiembre",
    date: "2025-09-20",
    body: "Inscripción abierta hasta el 10/09. Traer karategi completo y carnet."
  },
  {
    title: "Seminario de Kobudo",
    date: "2025-10-05",
    body: "Sensei invitado. Cupos limitados."
  }
];

const CLASSES = [
  { day: "Lunes", time: "18:00 – 19:00", level: "Infantiles" },
  { day: "Lunes", time: "19:00 – 20:30", level: "Juveniles/Adultos" },
  { day: "Miércoles", time: "18:00 – 19:00", level: "Infantiles" },
  { day: "Miércoles", time: "19:00 – 20:30", level: "Juveniles/Adultos" },
  { day: "Sábados", time: "10:00 – 11:30", level: "Todos los niveles" },
];

// Vocabulario real extraído del documento
const VOCAB = [
  {
    group: "Saludos y Etiqueta",
    items: [
      {ja: "Rei", es: "Saludo"},
      {ja: "Kiotsuke", es: "Atención"},
      {ja: "Kiotsuke Rei", es: "Atención, saludar"},
      {ja: "Seiza Rei", es: "Sentarse correctamente, saludar"},
      {ja: "Sensei ni Rei", es: "Saludar al maestro"},
      {ja: "Shomen ni Rei", es: "Saludar al frente"},
      {ja: "Otagai ni Rei", es: "Saludar al compañero"}
    ]
  },
  {
    group: "Personas del Dojo",
    items: [
      {ja: "Sensei", es: "Maestro"},
      {ja: "Seito Deshi", es: "Alumno, estudiante o discípulo"},
      {ja: "Uchi Deshi", es: "Estudiante personal"},
      {ja: "Senpai", es: "Alumno de mayor graduación"},
      {ja: "Kohay", es: "Alumno de menor graduación"},
      {ja: "Dohay", es: "Compañero de igual categoría"}
    ]
  },
  {
    group: "Técnicas de Bloqueo",
    items: [
      {ja: "Yodan Uke", es: "Bloqueo nivel alto"},
      {ja: "Chudan Uke", es: "Bloqueo nivel medio"},
      {ja: "Gedan Uke/Barai", es: "Bloqueo/barrido nivel bajo"},
      {ja: "Soto Uke", es: "Bloqueo hacia fuera"},
      {ja: "Uchi Uke", es: "Bloqueo hacia dentro"},
      {ja: "Shuto Uke", es: "Bloqueo canto de la mano"}
    ]
  },
  {
    group: "Técnicas de Brazos",
    items: [
      {ja: "Oi Tsuki", es: "Estocada a fondo"},
      {ja: "Gyaku Tsuki", es: "Golpe con base de pie cruzada"},
      {ja: "Uraken", es: "Golpe con el revés del puño"},
      {ja: "Teisho Tsuki", es: "Golpe frontal con la palma"}
    ]
  },
  {
    group: "Técnicas de Piernas",
    items: [
      {ja: "Mae Geri", es: "Patada adelante"},
      {ja: "Mawashi Geri", es: "Patada circular"},
      {ja: "Yoko Geri", es: "Patada al costado"},
      {ja: "Ushiro Geri", es: "Patada hacia atrás"},
      {ja: "Mikazuki Geri", es: "Patada creciente"},
      {ja: "Kakato Geri", es: "Patada con talón"}
    ]
  }
];

// Katas reales del estilo
const KATAS = [
  { 
    name: "Kihon Kata (Shodan – Rokudan)", 
    desc: "Energía de base (Primera causa)",
    creator: "Choshin Chibana",
    kanji: "きほんかた"
  },
  { 
    name: "Fukyukata (Ichi – Ni)", 
    desc: "Ceremonia a la luna (Forma fundamental)",
    creator: "Shosin Nagamine (Ichi) / Chojun Miyagi (Ni)",
    kanji: "ふきゅかた"
  },
  { 
    name: "Naihanchi (Shodan, Nidan, Sandan)", 
    desc: "Jinete de viento (Caballo de hierro)",
    creator: "Sokon Matsumura (atribuido)",
    kanji: "ないはんち"
  },
  { 
    name: "Pinan (Shodan – Godan)", 
    desc: "Paz y tranquilidad (La vía de la paz)",
    creator: "Yasutsune Itosu (Anko Itosu)",
    kanji: "ぴなん"
  },
  { 
    name: "Kusanku (Sho – Dai)", 
    desc: "Saludo al sol (Observando el cielo)",
    creator: "Yasutsune Itosu (Sho) / Anko Itosu (Dai)",
    kanji: "くしゃんく"
  },
  { 
    name: "Passai (Sho – Dai)", 
    desc: "Atravesar la muralla (Penetrar la fortaleza)",
    creator: "Anko Itosu (Sho) / Sokon Matsumura (Dai)",
    kanji: "ぱっさい"
  },
  { 
    name: "Chinto", 
    desc: "Grulla sobre una roca (Garza sobre una roca)",
    creator: "Sokon Matsumura",
    kanji: "ちんと"
  },
  { 
    name: "Gojushiho", 
    desc: "Profundidad de las manos (Cincuenta y cuatro pasos)",
    creator: "Sokon Matsumura",
    kanji: "ごじゅしほ"
  },
  { 
    name: "Jion", 
    desc: "Sonido del templo",
    creator: "Tradicional",
    kanji: "じあん"
  },
  { 
    name: "Seisan (Hangetsu)", 
    desc: "Camino de los 13 pasos (Media luna)",
    creator: "Tradicional",
    kanji: "セイサン"
  }
];

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl shadow-sm p-6 border bg-white ${className}`}>{children}</div>
);

const SectionTitle = ({ icon: Icon, title, subtitle }) => (
  <div className="mb-6 flex items-center gap-3">
    {Icon && <Icon className="w-6 h-6" aria-hidden />}
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold">{title}</h2>
      {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
    </div>
  </div>
);

function Navbar() {
  const [open, setOpen] = useState(false);
  const items = [
    { href: "#inicio", label: "Inicio" },
    { href: "#noticias", label: "Noticias" },
    { href: "#clases", label: "Clases" },
    { href: "#vocabulario", label: "Vocabulario y Katas" },
    { href: "#contacto", label: "Contacto" }
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b">
      <Container className="flex h-14 items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3">
          <img src={logoDojo} alt="Logo Dojo Shizenkan" className="h-10 w-auto" />
          <span className="font-bold tracking-wide text-lg">Shizenkan</span>
        </a>
        <button className="sm:hidden" onClick={() => setOpen((v) => !v)} aria-label="Abrir menú">
          <Menu />
        </button>
        <ul className="hidden sm:flex gap-6 text-sm">
          {items.map((i) => (
            <li key={i.href}><a className="hover:opacity-70" href={i.href}>{i.label}</a></li>
          ))}
        </ul>
      </Container>
      {open && (
        <div className="sm:hidden border-t">
          <Container>
            <ul className="py-3 grid gap-2">
              {items.map((i) => (
                <li key={i.href}><a className="block py-1.5" href={i.href} onClick={() => setOpen(false)}>{i.label}</a></li>
              ))}
            </ul>
          </Container>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <div id="inicio" className="bg-gradient-to-b from-gray-50 to-white border-b">
      <Container className="py-14 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <img src={logoDojo} alt="Logo Dojo Shizenkan" className="h-24 w-auto drop-shadow-lg" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {DOJO_INFO.name}
          </h1>
          <p className="text-lg sm:text-xl text-blue-600 font-medium mt-2">
            {DOJO_INFO.meaning}
          </p>
          <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              Sensei {DOJO_INFO.sensei}
            </span>
            <span className="flex items-center gap-1">
              <Award className="w-4 h-4" />
              {DOJO_INFO.dan}
            </span>
          </div>
        </motion.div>
        <p className="max-w-2xl mt-4 text-gray-700">
          {DOJO_INFO.description} Aquí encontrarás noticias, horarios, información de exámenes y material de estudio.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#noticias" className="px-5 py-2 rounded-xl border shadow-sm hover:shadow transition">Ver noticias</a>
          <a href="#clases" className="px-5 py-2 rounded-xl border shadow-sm hover:shadow transition">Horarios</a>
        </div>
      </Container>
    </div>
  );
}

function News() {
  return (
    <section id="noticias" className="py-12">
      <Container>
        <SectionTitle icon={Newspaper} title="Noticias" subtitle="Comunicaciones oficiales del dojo" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEWS.map((n, idx) => (
            <Card key={idx}>
              <div className="text-xs text-gray-500">{new Date(n.date).toLocaleDateString()}</div>
              <h3 className="mt-1 font-semibold">{n.title}</h3>
              <p className="mt-2 text-sm text-gray-700">{n.body}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Classes() {
  return (
    <section id="clases" className="py-12 bg-gray-50">
      <Container>
        <SectionTitle icon={Calendar} title="Clases" subtitle="Horarios y niveles" />
        <Card>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CLASSES.map((c, i) => (
              <div key={`${c.day}-${i}`} className="rounded-xl border p-4">
                <div className="text-sm text-gray-500">{c.day}</div>
                <div className="font-semibold">{c.time}</div>
                <div className="text-sm">{c.level}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-600">* Traer karategi y botella de agua. Llegar 10 minutos antes.</p>
        </Card>
      </Container>
    </section>
  );
}

function VocabKatas() {
  const [open, setOpen] = useState(0);
  return (
    <section id="vocabulario" className="py-12">
      <Container>
        <SectionTitle icon={Sword} title="Vocabulario y Katas" subtitle="Material de estudio para alumnos" />
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-semibold mb-3">Vocabulario (muestra)</h3>
            <ul className="space-y-2">
              {VOCAB.map((g, i) => (
                <li key={g.group}>
                  <button
                    className="w-full text-left p-3 rounded-xl border hover:bg-gray-50"
                    onClick={() => setOpen(i === open ? -1 : i)}
                    aria-expanded={open === i}
                  >
                    <span className="font-medium">{g.group}</span>
                  </button>
                  {open === i && (
                    <div className="mt-2 pl-3">
                      <ul className="text-sm list-disc ml-4">
                        {g.items.map((it, j) => (
                          <li key={j}><span className="font-medium">{it.ja}</span>: {it.es}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              Este es un extracto. Reemplaza/expande el listado con el material completo del dojo.
            </p>
          </Card>

          <Card>
            <h3 className="font-semibold mb-3">Katas del estilo Shorin Ryu</h3>
            <ul className="space-y-3">
              {KATAS.map((k) => (
                <li key={k.name} className="p-4 rounded-xl border hover:bg-gray-50 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{k.name}</div>
                      <div className="text-sm text-gray-700 mt-1">{k.desc}</div>
                      <div className="text-xs text-blue-600 mt-1">Creador: {k.creator}</div>
                    </div>
                    {k.kanji && (
                      <div className="text-lg text-gray-400 ml-3 font-japanese">
                        {k.kanji}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              Sistema completo de katas del estilo Shorin Ryu Shizenkan, desde básicos hasta avanzados.
            </p>
          </Card>
        </div>
      </Container>
    </section>
  );
}

function Contact() {
  return (
    <section id="contacto" className="py-12 bg-gray-50 border-t">
      <Container>
        <SectionTitle title="Contacto" subtitle="Inscripciones y consultas" />
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <form onSubmit={(e) => e.preventDefault()} className="grid sm:grid-cols-2 gap-4">
              <input className="border rounded-xl p-3" placeholder="Nombre" required />
              <input className="border rounded-xl p-3" placeholder="Email" type="email" required />
              <input className="border rounded-xl p-3 sm:col-span-2" placeholder="Asunto" />
              <textarea className="border rounded-xl p-3 sm:col-span-2" rows={4} placeholder="Mensaje" />
              <button className="px-5 py-2 rounded-xl border shadow-sm hover:shadow w-fit">Enviar</button>
            </form>
          </Card>
          <Card>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><PhoneCall className="w-4 h-4"/> +54 9 351 000 0000</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4"/> dojo@example.com</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4"/> Calle 123, Córdoba</li>
              <li>
                <a className="underline" href="#">Google Maps</a>
              </li>
            </ul>
          </Card>
        </div>
      </Container>
    </section>
  );
}

export default function App() {
  return (
    <div className="font-sans text-gray-900">
      <Navbar />
      <Hero />
      <News />
      <Classes />
      <VocabKatas />
      <Contact />
      <footer className="py-8 border-t text-center text-sm text-gray-600">
        <div className="flex justify-center mb-4">
          <img src={logoDojo} alt="Logo Dojo Shizenkan" className="h-12 w-auto opacity-70" />
        </div>
        <div className="mb-2">
          © {new Date().getFullYear()} {DOJO_INFO.name}
        </div>
        <div className="text-xs text-gray-500">
          Sensei {DOJO_INFO.sensei} — {DOJO_INFO.dan}
        </div>
      </footer>
    </div>
  );
}
