import React, { useState } from 'react';
import { Menu, Calendar, PhoneCall, Mail, MapPin, Newspaper, Sword, Users, Award, Zap, Target, BookOpen, Mountain, ChevronLeft, ChevronRight, Check, AlertCircle, Lightbulb, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCw } from 'lucide-react';
import { motion } from 'framer-motion';
import logoDojo from './assets/logo-dojo.png';

// --- Datos reales del dojo ---
// Última actualización: Logo integrado del dojo
const DOJO_INFO = {
  name: "Karate Do Shorin Ryu Shizenkan Okinawa",
  meaning: "Shizenkan: Lugar de lo natural",
  sensei: "Sergio Giambattistelli",
  dan: "6º Dan",
  description: "Dojo orientado a la formación integral: técnica, disciplina y valores. Escuela tradicional de Shorin Ryu con raíces en Okinawa. Conservamos la tradición respetando el pensamiento de los antiguos maestros."
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
  { day: "Lunes", time: "20:00 – 21:30", level: "Todos los niveles" },
  { day: "Miércoles", time: "20:00 – 21:30", level: "Todos los niveles" },
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

// Características del estilo Shōrin-ryū
const STYLE_CHARACTERISTICS = [
  {
    icon: Mountain,
    title: "Agilidad y Naturalidad",
    description: "Movimientos fluidos que respetan el equilibrio natural del cuerpo"
  },
  {
    icon: Zap,
    title: "Velocidad y Precisión",
    description: "Economía técnica con máxima eficiencia en cada movimiento"
  },
  {
    icon: Target,
    title: "Aplicaciones Prácticas",
    description: "Katas con bunkai enfocados en distancia corta y media"
  },
  {
    icon: BookOpen,
    title: "Base Tradicional",
    description: "Fundamentado en kihon, kata, postura y control del centro"
  }
];

// Objetivos de la escuela Shizenkan
const SCHOOL_OBJECTIVES = [
  "Ser Honrado",
  "Ser Respetuoso",
  "Ser Esforzado",
  "Defender la Verdad",
  "Hacer primar la razón por sobre la fuerza"
];

// Numeración japonesa tradicional
const JAPANESE_NUMBERS = [
  { number: "一", romaji: "ICHI", meaning: "Uno" },
  { number: "二", romaji: "NI", meaning: "Dos" },
  { number: "三", romaji: "SAN", meaning: "Tres" },
  { number: "四", romaji: "SHI", meaning: "Cuatro" },
  { number: "五", romaji: "GO", meaning: "Cinco" }
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

// Fukyugata Ichi - Kata completo paso a paso
const FUKYUGATA_ICHI = {
  name: "Fukyugata Ichi",
  kanji: "普及型一",
  romaji: "Fukyūgata Ichi",
  meaning: "Forma de difusión número uno",
  level: "Principiante",
  totalMovements: 20,
  creator: "Shoshin Nagamine",
  description: "Kata fundamental diseñado para enseñar los principios básicos del karate. Creado en 1940 para la promoción del karate en las escuelas de Okinawa.",
  embusenPattern: "linear_i",
  steps: [
    {
      number: 1,
      name: "Yoi",
      nameJp: "ヨイ",
      stance: { from: "Heisoku Dachi", to: "Hachiji Dachi" },
      technique: "Posición de preparación",
      direction: "Norte",
      directionIcon: "up",
      description: "Desde la posición de atención (pies juntos), abrir los pies al ancho de hombros en hachiji dachi (posición natural). Brazos relajados a los lados.",
      keyPoint: "Mantener la espalda recta, hombros relajados, mirada al frente con concentración. Respirar profundamente.",
      commonMistake: "Tensar los hombros o inclinar el cuerpo hacia adelante.",
      count: "Preparación"
    },
    {
      number: 2,
      name: "Gedan Barai (Derecha)",
      nameJp: "下段払い",
      stance: { from: "Hachiji Dachi", to: "Zenkutsu Dachi" },
      technique: "Barrido bajo con brazo derecho",
      direction: "Este (Girar 90° derecha)",
      directionIcon: "right",
      description: "Girar 90° hacia la derecha entrando en zenkutsu dachi (postura adelantada) con pierna derecha adelante. Ejecutar gedan barai (barrido bajo) con el brazo derecho.",
      keyPoint: "La cadera impulsa el giro. El puño termina sobre la rodilla adelantada. El brazo izquierdo se recoge al hikite (cadera).",
      commonMistake: "Girar solo los hombros sin mover la cadera. No completar el hikite.",
      count: "1"
    },
    {
      number: 3,
      name: "Oi Zuki Chudan",
      nameJp: "追い突き中段",
      stance: { from: "Zenkutsu Dachi", to: "Zenkutsu Dachi" },
      technique: "Estocada al nivel medio",
      direction: "Este (mismo rumbo)",
      directionIcon: "right",
      description: "Avanzar con la pierna izquierda en zenkutsu dachi mientras ejecutas oi zuki chudan (estocada al nivel medio) con el puño izquierdo.",
      keyPoint: "Sincronizar el avance del pie con el golpe. La cadera rota al momento del impacto.",
      commonMistake: "Golpear antes de completar el paso. Cadera no rota completamente.",
      count: "2"
    },
    {
      number: 4,
      name: "Gedan Barai (Izquierda)",
      nameJp: "下段払い",
      stance: { from: "Zenkutsu Dachi", to: "Zenkutsu Dachi" },
      technique: "Barrido bajo con brazo izquierdo",
      direction: "Oeste (Girar 180° izquierda)",
      directionIcon: "left",
      description: "Girar 180° hacia la izquierda sobre el pie adelantado, entrando en zenkutsu dachi con pierna izquierda adelante. Ejecutar gedan barai con brazo izquierdo.",
      keyPoint: "El giro es sobre la bola del pie derecho. Mantener la altura durante el giro.",
      commonMistake: "Levantarse durante el giro. Perder el equilibrio.",
      count: "3"
    },
    {
      number: 5,
      name: "Oi Zuki Chudan",
      nameJp: "追い突き中段",
      stance: { from: "Zenkutsu Dachi", to: "Zenkutsu Dachi" },
      technique: "Estocada al nivel medio",
      direction: "Oeste (mismo rumbo)",
      directionIcon: "left",
      description: "Avanzar con la pierna derecha en zenkutsu dachi mientras ejecutas oi zuki chudan con el puño derecho.",
      keyPoint: "Mantener el nivel constante durante el avance. Mirar al frente, no al suelo.",
      commonMistake: "Subir y bajar durante el paso. Perder la tensión del hikite.",
      count: "4"
    },
    {
      number: 6,
      name: "Gedan Barai (Derecha)",
      nameJp: "下段払い",
      stance: { from: "Zenkutsu Dachi", to: "Zenkutsu Dachi" },
      technique: "Barrido bajo con brazo derecho",
      direction: "Norte (Girar 90° derecha)",
      directionIcon: "up",
      description: "Girar 90° hacia la derecha entrando en zenkutsu dachi con pierna derecha adelante. Ejecutar gedan barai con brazo derecho.",
      keyPoint: "Este es el regreso a la línea central. Alinear correctamente el cuerpo hacia el norte.",
      commonMistake: "No completar el ángulo de 90°. Quedarse diagonal.",
      count: "5"
    },
    {
      number: 7,
      name: "Age Uke",
      nameJp: "上げ受け",
      stance: { from: "Zenkutsu Dachi", to: "Zenkutsu Dachi" },
      technique: "Bloqueo alto",
      direction: "Norte (mismo rumbo)",
      directionIcon: "up",
      description: "Avanzar con la pierna izquierda en zenkutsu dachi mientras ejecutas age uke (bloqueo alto) con el brazo izquierdo.",
      keyPoint: "El antebrazo debe quedar a la altura de la frente, formando un ángulo de 45°. Codo al ancho del hombro.",
      commonMistake: "Bloqueo demasiado adelante o demasiado atrás. Codo muy cerrado.",
      count: "6"
    },
    {
      number: 8,
      name: "Gyaku Zuki Chudan",
      nameJp: "逆突き中段",
      stance: { from: "Zenkutsu Dachi", to: "Zenkutsu Dachi" },
      technique: "Golpe inverso al nivel medio",
      direction: "Norte (mismo rumbo)",
      directionIcon: "up",
      description: "Sin moverse, ejecutar gyaku zuki chudan (golpe inverso) con el puño derecho mientras el brazo izquierdo regresa a hikite.",
      keyPoint: "La potencia viene de la rotación de cadera. Ambos movimientos (bloqueo y golpe) son simultáneos.",
      commonMistake: "Adelantar el hombro. No rotar la cadera completamente.",
      count: "7"
    },
    {
      number: 9,
      name: "Age Uke",
      nameJp: "上げ受け",
      stance: { from: "Zenkutsu Dachi", to: "Zenkutsu Dachi" },
      technique: "Bloqueo alto",
      direction: "Norte (mismo rumbo)",
      directionIcon: "up",
      description: "Avanzar con la pierna derecha en zenkutsu dachi mientras ejecutas age uke con el brazo derecho.",
      keyPoint: "Mantener el mismo ritmo y altura que el age uke anterior. Consistencia.",
      commonMistake: "Variar la altura o velocidad del movimiento.",
      count: "8"
    },
    {
      number: 10,
      name: "Gyaku Zuki Chudan",
      nameJp: "逆突き中段",
      stance: { from: "Zenkutsu Dachi", to: "Zenkutsu Dachi" },
      technique: "Golpe inverso al nivel medio",
      direction: "Norte (mismo rumbo)",
      directionIcon: "up",
      description: "Sin moverse, ejecutar gyaku zuki chudan con el puño izquierdo.",
      keyPoint: "Repetir con la misma potencia y técnica que el gyaku zuki anterior.",
      commonMistake: "Perder concentración en las repeticiones.",
      count: "9"
    },
    {
      number: 11,
      name: "Age Uke",
      nameJp: "上げ受け",
      stance: { from: "Zenkutsu Dachi", to: "Zenkutsu Dachi" },
      technique: "Bloqueo alto",
      direction: "Norte (mismo rumbo)",
      directionIcon: "up",
      description: "Avanzar con la pierna izquierda en zenkutsu dachi mientras ejecutas age uke con el brazo izquierdo.",
      keyPoint: "Tercera repetición: mantener la calidad técnica hasta el final.",
      commonMistake: "Apresurarse o perder la forma.",
      count: "10"
    },
    {
      number: 12,
      name: "Gyaku Zuki Chudan",
      nameJp: "逆突き中段",
      stance: { from: "Zenkutsu Dachi", to: "Zenkutsu Dachi" },
      technique: "Golpe inverso al nivel medio",
      direction: "Norte (mismo rumbo)",
      directionIcon: "up",
      description: "Sin moverse, ejecutar gyaku zuki chudan con el puño derecho.",
      keyPoint: "Último de la serie age uke - gyaku zuki. Máximo kime (foco).",
      commonMistake: "Relajarse antes de terminar la secuencia.",
      count: "11"
    },
    {
      number: 13,
      name: "Gedan Barai (Izquierda)",
      nameJp: "下段払い",
      stance: { from: "Zenkutsu Dachi", to: "Zenkutsu Dachi" },
      technique: "Barrido bajo con brazo izquierdo",
      direction: "Sur (Girar 270° izquierda)",
      directionIcon: "down",
      description: "Girar 270° hacia la izquierda (o 90° derecha por detrás) entrando en zenkutsu dachi con pierna izquierda adelante. Ejecutar gedan barai con brazo izquierdo.",
      keyPoint: "Gran giro que requiere control. Mantener el equilibrio durante toda la rotación.",
      commonMistake: "Perder el balance. No completar el ángulo completo.",
      count: "12"
    },
    {
      number: 14,
      name: "Shuto Uke (Izquierda)",
      nameJp: "手刀受け",
      stance: { from: "Zenkutsu Dachi", to: "Kokutsu Dachi" },
      technique: "Bloqueo con canto de mano izquierda",
      direction: "Sur (mismo rumbo)",
      directionIcon: "down",
      description: "Avanzar con la pierna derecha en kokutsu dachi (postura atrás) mientras ejecutas shuto uke con la mano izquierda. Mano derecha adelante, palma abierta.",
      keyPoint: "70% del peso en la pierna trasera. Ambas manos abiertas. Cadera de frente.",
      commonMistake: "Poner mucho peso adelante. Cerrar las manos.",
      count: "13"
    },
    {
      number: 15,
      name: "Shuto Uke (Derecha)",
      nameJp: "手刀受け",
      stance: { from: "Kokutsu Dachi", to: "Kokutsu Dachi" },
      technique: "Bloqueo con canto de mano derecha",
      direction: "Sur (mismo rumbo)",
      directionIcon: "down",
      description: "Avanzar con la pierna izquierda en kokutsu dachi mientras ejecutas shuto uke con la mano derecha. Mano izquierda adelante.",
      keyPoint: "Mantener la misma altura y forma que el shuto uke anterior.",
      commonMistake: "Cambiar la distribución de peso entre repeticiones.",
      count: "14"
    },
    {
      number: 16,
      name: "Shuto Uke (Izquierda)",
      nameJp: "手刀受け",
      stance: { from: "Kokutsu Dachi", to: "Kokutsu Dachi" },
      technique: "Bloqueo con canto de mano izquierda",
      direction: "Sur (mismo rumbo)",
      directionIcon: "down",
      description: "Avanzar con la pierna derecha en kokutsu dachi mientras ejecutas shuto uke con la mano izquierda.",
      keyPoint: "Tercera repetición: consistencia en la técnica.",
      commonMistake: "Variar la altura o el ángulo.",
      count: "15"
    },
    {
      number: 17,
      name: "Shuto Uke (Derecha)",
      nameJp: "手刀受け",
      stance: { from: "Kokutsu Dachi", to: "Kokutsu Dachi" },
      technique: "Bloqueo con canto de mano derecha",
      direction: "Sur (mismo rumbo)",
      directionIcon: "down",
      description: "Avanzar con la pierna izquierda en kokutsu dachi mientras ejecutas shuto uke con la mano derecha.",
      keyPoint: "Última repetición de shuto uke. Mantener precisión.",
      commonMistake: "Apresurarse hacia el final.",
      count: "16"
    },
    {
      number: 18,
      name: "Mae Geri + Oi Zuki",
      nameJp: "前蹴り・追い突き",
      stance: { from: "Kokutsu Dachi", to: "Zenkutsu Dachi" },
      technique: "Patada frontal + Estocada",
      direction: "Sur (mismo rumbo)",
      directionIcon: "down",
      description: "Ejecutar mae geri (patada frontal) con la pierna derecha, luego bajar en zenkutsu dachi y ejecutar oi zuki chudan con el puño derecho. Kiai!",
      keyPoint: "Este movimiento lleva KIAI (grito). Máxima potencia y espíritu. La patada y el golpe son dos tiempos.",
      commonMistake: "No hacer kiai. Perder el equilibrio en la patada.",
      count: "17 - KIAI!"
    },
    {
      number: 19,
      name: "Gedan Barai (Derecha)",
      nameJp: "下段払い",
      stance: { from: "Zenkutsu Dachi", to: "Zenkutsu Dachi" },
      technique: "Barrido bajo con brazo derecho",
      direction: "Norte (Girar 180°)",
      directionIcon: "up",
      description: "Girar 180° hacia atrás (sobre el pie adelantado) entrando en zenkutsu dachi con pierna derecha adelante. Ejecutar gedan barai con brazo derecho.",
      keyPoint: "Regresar a la posición inicial (mirando al norte). Giro controlado.",
      commonMistake: "Perder la orientación. No quedar en la línea original.",
      count: "18"
    },
    {
      number: 20,
      name: "Yame",
      nameJp: "ヤメ",
      stance: { from: "Zenkutsu Dachi", to: "Hachiji Dachi" },
      technique: "Finalización",
      direction: "Norte (mismo rumbo)",
      directionIcon: "up",
      description: "Recoger la pierna izquierda hacia la derecha, volviendo a hachiji dachi (posición natural). Brazos a los lados. Respirar.",
      keyPoint: "Volver a la calma con control. Mostrar zanshin (conciencia residual). Luego, cerrar los pies a heisoku dachi.",
      commonMistake: "Relajarse completamente antes de terminar el saludo final.",
      count: "Finalización"
    }
  ]
};

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
    { href: "#estilo", label: "Nuestro Estilo" },
    { href: "#objetivos", label: "Objetivos" },
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
            <span className="font-japanese text-2xl">自然</span>
            <span className="mx-2 text-gray-400">|</span>
            <span className="font-japanese text-2xl">館</span>
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Shizen (自然) - Naturaleza • Kan (館) - Dojo
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

function OurStyle() {
  return (
    <section id="estilo" className="py-16 bg-gradient-to-br from-slate-50 to-blue-50/30 border-b">
      <Container>
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              El Estilo Shōrin-ryū
            </h2>
            <p className="text-2xl sm:text-3xl text-blue-700 font-medium mb-2">
              <span className="font-japanese">少林流</span>
            </p>
            <p className="text-sm text-gray-600 mb-6">
              Shōrin (少林) - Pequeño Bosque • Ryū (流) - Escuela
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Card className="bg-white/80 backdrop-blur">
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong className="text-gray-900">Shōrin-ryū</strong> es uno de los estilos tradicionales más antiguos del karate de <strong>Okinawa</strong>.
                El término se traduce como "escuela del pequeño bosque" y se asocia históricamente a la idea de "Shaolin",
                como referencia cultural a las influencias chinas presentes en el karate okinawense.
              </p>
              <p className="text-gray-700 leading-relaxed">
                En su desarrollo moderno, Shōrin-ryū se organizó formalmente en el siglo XX y se vincula con el linaje del <strong>Shuri-te</strong>,
                una de las grandes corrientes tradicionales de Okinawa.
              </p>
            </Card>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold text-center text-gray-900 mb-8">
            Características del Estilo
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STYLE_CHARACTERISTICS.map((characteristic, index) => {
              const IconComponent = characteristic.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white/90 backdrop-blur">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white mb-4 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {characteristic.title}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {characteristic.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-10">
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Nuestro dojo conserva la tradición del Shōrin-ryū respetando el pensamiento de los antiguos maestros,
            enfocándose en la formación integral: técnica, disciplina y valores.
          </p>
        </div>
      </Container>
    </section>
  );
}

function SchoolObjectives() {
  return (
    <section id="objetivos" className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <Container>
        <SectionTitle 
          icon={Award} 
          title="Los 5 Objetivos de la Escuela Shizenkan" 
          subtitle="五つの原則 - Go-tsu no Gensoku - Los principios fundamentales de Okinawa"
        />
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Nuestra escuela conserva la tradición de este arte respetando el pensamiento de los antiguos maestros y haciendo cumplir sus objetivos fundamentales.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SCHOOL_OBJECTIVES.map((objective, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex flex-col items-center justify-center text-white shadow-lg border-2 border-red-500">
                      <div className="text-2xl font-bold leading-none">{JAPANESE_NUMBERS[index].number}</div>
                      <div className="text-xs font-medium opacity-90">{JAPANESE_NUMBERS[index].romaji}</div>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-red-200 to-transparent"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    {objective}
                  </h3>
                  <div className="w-full h-1 bg-gradient-to-r from-red-500 to-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Estos principios fundamentales guían cada clase y forman la base de nuestro sistema de valores, 
              transmitiendo la sabiduría de los antiguos maestros de Okinawa.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function News() {
  return (
    <section id="noticias" className="py-12">
      <Container>
        <SectionTitle icon={Newspaper} title="Noticias" subtitle="Comunicaciones oficiales del dojo" />
        <div className="max-w-2xl mx-auto">
          <Card className="text-center py-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <Newspaper className="w-10 h-10 text-gray-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              No hay noticias por el momento
            </h3>
            <p className="text-gray-600 mb-4">
              Esta sección se actualizará con las últimas novedades del dojo, 
              eventos, exámenes y comunicaciones importantes.
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
              Regresa pronto para ver las actualizaciones
            </div>
          </Card>
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
          <p className="mt-2 text-sm text-gray-600">* Clases para todos los niveles: principiantes, intermedios y avanzados.</p>
        </Card>
      </Container>
    </section>
  );
}

function VocabKatas({ navigateToKata }) {
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

            {/* Destacar Fukyugata Ichi con guía interactiva */}
            <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="font-bold text-indigo-900">Fukyugata Ichi</div>
                    <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full font-medium">
                      Guía interactiva
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 mb-1">Ceremonia a la luna (Forma fundamental)</div>
                  <div className="text-xs text-indigo-600">Creador: Shoshin Nagamine</div>
                </div>
                <div className="text-xl text-indigo-400 ml-3 font-japanese">
                  ふきゅかた
                </div>
              </div>
              <button
                onClick={() => navigateToKata(FUKYUGATA_ICHI)}
                className="w-full mt-3 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                Aprende este kata paso a paso
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Lista de otros katas */}
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

function KataLearning({ kata = FUKYUGATA_ICHI, navigateToHome }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [learnedSteps, setLearnedSteps] = useState(new Set());
  const [showAllSteps, setShowAllSteps] = useState(false);

  const step = kata.steps[currentStep];
  const progress = Math.round((learnedSteps.size / kata.totalMovements) * 100);

  const toggleLearned = (stepNumber) => {
    const newLearned = new Set(learnedSteps);
    if (newLearned.has(stepNumber)) {
      newLearned.delete(stepNumber);
    } else {
      newLearned.add(stepNumber);
    }
    setLearnedSteps(newLearned);
  };

  const nextStep = () => {
    if (currentStep < kata.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      // Scroll suave solo hasta el contenedor del paso (no al tope de la página)
      setTimeout(() => {
        const stepCard = document.getElementById('current-step-card');
        if (stepCard) {
          const offsetTop = stepCard.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      }, 50);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Scroll suave solo hasta el contenedor del paso
      setTimeout(() => {
        const stepCard = document.getElementById('current-step-card');
        if (stepCard) {
          const offsetTop = stepCard.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      }, 50);
    }
  };

  const goToStep = (index) => {
    setCurrentStep(index);
    setShowAllSteps(false);
    // Scroll hasta el contenedor del paso
    setTimeout(() => {
      const stepCard = document.getElementById('current-step-card');
      if (stepCard) {
        const offsetTop = stepCard.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    }, 50);
  };

  const getDirectionIcon = (icon) => {
    switch(icon) {
      case 'up': return <ArrowUp className="w-5 h-5" />;
      case 'down': return <ArrowDown className="w-5 h-5" />;
      case 'left': return <ArrowLeft className="w-5 h-5" />;
      case 'right': return <ArrowRight className="w-5 h-5" />;
      default: return <RotateCw className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50/30">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b shadow-sm">
        <Container className="flex items-center justify-between h-16">
          <button
            onClick={navigateToHome}
            className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors font-medium"
          >
            <ChevronLeft className="w-5 h-5" />
            Volver al Dojo
          </button>
          <div className="flex items-center gap-3">
            <img src={logoDojo} alt="Logo Dojo" className="h-8 w-auto" />
            <span className="font-bold text-gray-900">Shizenkan</span>
          </div>
          <a
            href="#inicio"
            onClick={(e) => { e.preventDefault(); navigateToHome(); }}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            🏠 Inicio
          </a>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Aprende un Kata
          </h1>
          <p className="text-gray-600">Guía paso a paso interactiva</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Kata Header */}
          <Card className="mb-6 bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-none">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-2">{kata.name}</h3>
              <p className="text-2xl font-japanese mb-2">{kata.kanji}</p>
              <p className="text-indigo-100 text-sm mb-4">{kata.meaning}</p>
              <div className="flex justify-center gap-6 text-sm">
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  Nivel: {kata.level}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Creador: {kata.creator}
                </span>
                <span className="flex items-center gap-1">
                  <Sword className="w-4 h-4" />
                  {kata.totalMovements} movimientos
                </span>
              </div>
            </div>
          </Card>

          {/* Description */}
          <Card className="mb-6">
            <p className="text-gray-700 leading-relaxed">{kata.description}</p>
          </Card>

          {/* Embusen Diagram */}
          <Card className="mb-6">
            <h4 className="font-semibold mb-4 text-center">Embusen (Patrón del Kata)</h4>
            <div className="bg-gray-50 rounded-xl p-8 flex justify-center">
              <div className="text-center font-mono text-sm text-gray-600">
                <div className="mb-2">↑ NORTE (Inicio)</div>
                <div className="border-2 border-indigo-400 rounded-lg p-6 bg-white inline-block">
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div>Este →</div>
                      <div className="text-xs text-gray-500">(mov 2-3)</div>
                    </div>
                    <div className="border-l-2 border-t-2 border-r-2 border-b-2 border-gray-400 px-8 py-12 relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2">
                        <div className="text-indigo-600 font-bold">▲</div>
                        <div className="text-xs">6-12</div>
                      </div>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full mt-2">
                        <div className="text-xs">13-18</div>
                        <div className="text-indigo-600 font-bold">▼</div>
                      </div>
                      <div className="text-center text-xs text-gray-500">
                        Patrón en "I"<br/>lineal
                      </div>
                    </div>
                    <div className="text-left">
                      <div>← Oeste</div>
                      <div className="text-xs text-gray-500">(mov 4-5)</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2">↓ SUR (Final: mov 19-20)</div>
              </div>
            </div>
          </Card>

          {/* Progress Bar */}
          <Card className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Tu Progreso</span>
              <span className="text-sm text-gray-600">{learnedSteps.size} / {kata.totalMovements} movimientos</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </Card>

          {/* Step Navigator */}
          {!showAllSteps ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card id="current-step-card" className="mb-4 border-2 border-indigo-200">
                <div className="flex items-center justify-between mb-4 pb-4 border-b">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Movimiento {step.number} de {kata.totalMovements}
                  </h4>
                  <button
                    onClick={() => toggleLearned(step.number)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      learnedSteps.has(step.number)
                        ? 'bg-green-100 text-green-700 border-2 border-green-300'
                        : 'bg-gray-100 text-gray-600 border-2 border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    {learnedSteps.has(step.number) ? 'Aprendido' : 'Marcar como aprendido'}
                  </button>
                </div>

                {/* Step Title */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-indigo-600 mb-1">{step.name}</h3>
                  <p className="text-xl font-japanese text-gray-600 mb-2">{step.nameJp}</p>
                  <p className="text-gray-700 font-medium">{step.technique}</p>
                </div>

                {/* Stance and Direction */}
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-xs text-blue-600 font-medium mb-1">POSTURA</div>
                    <div className="text-sm">
                      <span className="text-gray-600">{step.stance.from}</span>
                      <span className="mx-2">→</span>
                      <span className="font-semibold text-gray-900">{step.stance.to}</span>
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-xs text-purple-600 font-medium mb-1">DIRECCIÓN</div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                      {getDirectionIcon(step.directionIcon)}
                      {step.direction}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6 bg-gray-50 rounded-lg p-4">
                  <div className="text-xs text-gray-600 font-medium mb-2">📝 INSTRUCCIÓN</div>
                  <p className="text-gray-800 leading-relaxed">{step.description}</p>
                </div>

                {/* Key Point */}
                <div className="mb-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg p-4">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-green-700 font-medium mb-1">PUNTO CLAVE</div>
                      <p className="text-sm text-gray-800">{step.keyPoint}</p>
                    </div>
                  </div>
                </div>

                {/* Common Mistake */}
                <div className="mb-6 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-amber-700 font-medium mb-1">ERROR COMÚN</div>
                      <p className="text-sm text-gray-800">{step.commonMistake}</p>
                    </div>
                  </div>
                </div>

                {/* Count */}
                <div className="text-center py-3 bg-indigo-50 rounded-lg">
                  <div className="text-xs text-indigo-600 font-medium mb-1">CUENTA</div>
                  <div className="text-2xl font-bold text-indigo-600">{step.count}</div>
                </div>
              </Card>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-indigo-300 bg-white hover:bg-indigo-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Anterior
                </button>

                <button
                  onClick={() => setShowAllSteps(true)}
                  className="px-6 py-3 rounded-xl border-2 border-gray-300 bg-white hover:bg-gray-50 transition-all text-sm"
                >
                  Ver todos los pasos
                </button>

                <button
                  onClick={nextStep}
                  disabled={currentStep === kata.steps.length - 1}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Siguiente
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ) : (
            /* All Steps View */
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-bold text-gray-900">Todos los Movimientos</h4>
                <button
                  onClick={() => setShowAllSteps(false)}
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  ← Volver al paso actual
                </button>
              </div>
              <div className="space-y-2">
                {kata.steps.map((s, index) => (
                  <button
                    key={s.number}
                    onClick={() => goToStep(index)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      index === currentStep
                        ? 'border-indigo-400 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          learnedSteps.has(s.number) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {learnedSteps.has(s.number) ? <Check className="w-5 h-5" /> : s.number}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{s.name}</div>
                          <div className="text-sm text-gray-600">{s.technique}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        {getDirectionIcon(s.directionIcon)}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          )}
        </div>
      </Container>

      {/* Footer */}
      <footer className="py-8 border-t bg-white text-center text-sm text-gray-600">
        <Container>
          <div className="flex justify-center mb-4">
            <img src={logoDojo} alt="Logo Dojo Shizenkan" className="h-12 w-auto opacity-70" />
          </div>
          <div className="mb-2">
            © {new Date().getFullYear()} {DOJO_INFO.name}
          </div>
          <div className="text-xs text-gray-500">
            Sensei {DOJO_INFO.sensei} — {DOJO_INFO.dan}
          </div>
          <button
            onClick={navigateToHome}
            className="mt-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            ← Regresar al sitio principal
          </button>
        </Container>
      </footer>
    </div>
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
              <li className="flex items-center gap-2"><PhoneCall className="w-4 h-4"/> +54 9 351 481 0200</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4"/> info@alouette.com.ar</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4"/> Av Fernando Fader 3945, Córdoba</li>
              <li className="text-xs text-gray-500 mt-2">
                <span className="font-medium">Centro Alouette</span><br/>
                Centro de Actividades Físicas y Terapéuticas
              </li>
              <li>
                <a className="underline text-blue-600" href="https://www.alouette.com.ar/" target="_blank" rel="noopener noreferrer">
                  Visitar sitio web de Alouette
                </a>
              </li>
              <li>
                <a className="underline text-blue-600" href="https://maps.google.com/?q=Av+Fernando+Fader+3945,+Córdoba,+Argentina" target="_blank" rel="noopener noreferrer">
                  📍 Ver en Google Maps
                </a>
              </li>
            </ul>
          </Card>
        </div>
      </Container>
    </section>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedKata, setSelectedKata] = useState(null);

  const navigateToKata = (kata) => {
    setSelectedKata(kata);
    setCurrentPage('kata');
    window.scrollTo(0, 0);
    window.location.hash = 'kata/' + kata.name.toLowerCase().replace(/\s/g, '-');
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    setSelectedKata(null);
    window.scrollTo(0, 0);
    window.location.hash = '';
  };

  // Main Page
  if (currentPage === 'home') {
    return (
      <div className="font-sans text-gray-900">
        <Navbar />
        <Hero />
        <OurStyle />
        <SchoolObjectives />
        <News />
        <Classes />
        <VocabKatas navigateToKata={navigateToKata} />
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

  // Kata Learning Page
  if (currentPage === 'kata') {
    return (
      <div className="font-sans text-gray-900">
        <KataLearning kata={selectedKata} navigateToHome={navigateToHome} />
      </div>
    );
  }
}
