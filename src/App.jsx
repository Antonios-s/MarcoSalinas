import { ArrowLeft, ArrowUp, ArrowUpRight, ArrowRight, AtSign, Check, Copy, GitBranch, Mail, Menu, Moon, Plus, Save, Sparkles, Sun, Trash2, X, RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import './App.css'

const currentYear = new Date().getFullYear()
const contactEmail = 'marcosalinassolis1234@gmail.com'

const defaultProjects = []

const services = [
  ['01', 'Desarrollo web', 'Sitios rápidos, responsivos y pensados para crecer con tu empresa.'],
  ['02', 'Automatización', 'Flujos con n8n, Python y APIs que conectan tus herramientas y reducen tareas repetitivas.'],
  ['03', 'Experiencias digitales', 'Interfaces claras que convierten ideas complejas en productos fáciles de usar.'],
]

const technologyGroups = [
  ['Lenguajes', ['JavaScript', 'TypeScript', 'Python']],
  ['Frontend y backend', ['React', 'Node.js', 'REST APIs']],
  ['Automatización y testing', ['n8n', 'Selenium', 'Puppeteer']],
  ['Herramientas', ['GitHub Actions', 'Docker']],
  ['Bases de datos', ['PostgreSQL', 'MySQL', 'MongoDB']],
]

const skillLevels = [
  ['JavaScript', 'Intermedio', 72],
  ['React', 'Intermedio', 68],
  ['Python', 'Intermedio', 70],
  ['Selenium', 'Intermedio', 66],
  ['REST APIs', 'Intermedio', 64],
  ['PostgreSQL', 'Fundamentos', 46],
  ['Docker', 'Fundamentos', 42],
  ['GitHub Actions', 'Fundamentos', 44],
]

const strengths = ['Resolución de problemas', 'Pensamiento analítico', 'Documentación técnica', 'Trabajo remoto', 'Atención al detalle', 'Comunicación con equipos']

const careerSnapshot = [
  ['Rol objetivo', 'Web · Automatización · Soporte'],
  ['Modalidad', 'Remoto · Híbrido · Presencial'],
  ['Ubicación', 'Cali, Colombia'],
  ['Estado', 'Disponible para trabajar'],
]

const _targetRoles = [
  ['01', 'Desarrollador web junior', 'Construcción de interfaces responsivas, componentes React e integración con APIs.'],
  ['02', 'Automatización con Python', 'Scripts, scraping y flujos que reducen tareas manuales y errores repetitivos.'],
  ['03', 'Soporte técnico nivel 2', 'Diagnóstico de incidentes, documentación, bases de datos y atención de casos complejos.'],
]

const teamContributions = [
  ['01', 'Comunicación clara', 'Explico problemas técnicos de forma sencilla y mantengo visibles los avances.'],
  ['02', 'Documentación útil', 'Dejo procesos, decisiones y soluciones escritos para que el equipo pueda reutilizarlos.'],
  ['03', 'Aprendizaje continuo', 'Me adapto a nuevas herramientas y convierto cada reto en una oportunidad de mejora.'],
  ['04', 'Responsabilidad técnica', 'Cuido los detalles, pruebo lo que construyo y doy seguimiento hasta cerrar cada tarea.'],
]

const _growthFocus = [
  ['01', 'TypeScript', 'Fortalecer tipado, mantenibilidad y calidad en aplicaciones React.'],
  ['02', 'Testing E2E', 'Convertir pruebas automatizadas en una parte natural del desarrollo.'],
  ['03', 'Despliegue', 'Seguir profundizando en Docker, CI/CD y publicación de aplicaciones.'],
]

const _achievements = [
  ['Automatización', 'Creación de flujos con Python, Selenium y scraping para reducir trabajo repetitivo.'],
  ['Calidad técnica', 'Pruebas E2E, documentación y seguimiento de incidencias para entregar soluciones más confiables.'],
  ['Soporte especializado', 'Diagnóstico de incidentes complejos, APIs REST y bases de datos en entornos de atención técnica.'],
]

const recruiterPaths = {
  web: { title: 'Desarrollo web', description: 'Revisa mis proyectos, React y experiencia construyendo interfaces responsivas e integraciones con APIs.', section: '#work', subject: 'Desarrollo%20web', focus: 'Interfaces y producto digital', tools: 'React · JavaScript · REST APIs' },
  automation: { title: 'Automatización', description: 'Conoce mi trabajo con Python, Selenium, scraping y flujos orientados a reducir tareas repetitivas.', section: '#services', subject: 'Automatización', focus: 'Procesos más rápidos y confiables', tools: 'Python · Selenium · n8n' },
  support: { title: 'Soporte técnico', description: 'Mira mi experiencia en diagnóstico de incidentes, bases de datos, APIs y documentación técnica.', section: '#experience', subject: 'Soporte%20técnico', focus: 'Resolución y continuidad operativa', tools: 'APIs · Bases de datos · Documentación' },
}

const projectFilters = ['Todos', 'Web', 'Automatización', 'E-commerce']

const portfolioMap = [
  ['01', 'Perfil', '#about'],
  ['02', 'Proyectos', '#work'],
  ['03', 'Servicios', '#services'],
  ['04', 'Proceso', '#process'],
  ['05', 'Experiencia', '#experience'],
  ['06', 'Contacto', '#contact'],
]

const training = [
  ['React de cero a experto', '2024'],
  ['Automatización & Scraping', '2022'],
  ['Técnico de Sistemas / Software', '2019 — 2020'],
]

const processSteps = [
  ['01', 'Descubrimiento', 'Entiendo el problema, los usuarios y el resultado que necesita tu negocio.'],
  ['02', 'Estrategia', 'Ordeno la información y defino una solución concreta antes de escribir código.'],
  ['03', 'Construcción', 'Desarrollo, integro herramientas y pruebo cada parte en distintos dispositivos.'],
  ['04', 'Lanzamiento', 'Publico la solución y dejo una base clara para medir, mantener y seguir creciendo.'],
]

const faqs = [
  ['¿Qué tipo de proyectos puedo desarrollar?', 'Sitios corporativos, landing pages, dashboards, automatizaciones, integraciones entre APIs y herramientas internas para equipos.'],
  ['¿Trabajas con equipos remotos?', 'Sí. Podemos trabajar de forma remota con reuniones breves, documentación clara y entregas visibles durante todo el proceso.'],
  ['¿Qué necesitas para comenzar?', 'Una conversación de 30 minutos sobre el problema, el objetivo y las restricciones. Con eso puedo proponer un siguiente paso concreto.'],
]

const experience = [
  ['2022 — 2023', 'Desarrollador web & Automatizador', 'Firma Calidad SG · Freelance', 'Aplicaciones web responsivas, automatización con Python y Selenium, Web Scraping, CI/CD con GitHub Actions y pruebas E2E.'],
  ['2021 — Actualidad', 'Técnico nivel 2', 'Synerjoy BPO · Colombia', 'Diagnóstico de incidentes complejos, bases de datos, APIs REST, documentación técnica y atención de tickets con metodologías Scrum y Kanban.'],
]

function ProjectManager({ projects, onSave }) {
  const [draftProjects, setDraftProjects] = useState(projects)
  const [saved, setSaved] = useState(false)

  const updateProject = (index, field, value) => {
    setDraftProjects((current) => current.map((project, projectIndex) => projectIndex === index ? { ...project, [field]: value } : project))
  }

  const addProject = () => {
    if (draftProjects.length >= 6) return
    setDraftProjects((current) => [...current, { number: String(current.length + 1).padStart(2, '0'), title: 'Nuevo proyecto', type: 'Tipo de proyecto', tools: 'Tecnologías', year: String(currentYear), image: '', className: 'project-card--blue' }])
  }

  const removeProject = (index) => setDraftProjects((current) => current.filter((_, projectIndex) => projectIndex !== index).map((project, projectIndex) => ({ ...project, number: String(projectIndex + 1).padStart(2, '0') })))

  const handleImage = (index, file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => updateProject(index, 'image', reader.result)
    reader.readAsDataURL(file)
  }

  const saveProjects = () => {
    if (draftProjects.some((project) => !project.title.trim() || !project.year.trim())) return
    onSave(draftProjects)
    setSaved(true)
    window.setTimeout(() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }), 120)
    window.setTimeout(() => setSaved(false), 2200)
  }

  return <section className="project-manager mx-auto max-w-7xl px-6 py-20 lg:px-10"><div className="section-heading"><p className="eyebrow section-label">Editor de proyectos</p><p className="section-note">Solo visible en modo administrador.<br />Los cambios se guardan en este navegador.</p></div><div className="manager-list">{draftProjects.map((project, index) => <article className="manager-card" key={`${project.number}-${index}`}><div className="manager-card-heading"><span>Proyecto {project.number}</span><button type="button" className="manager-delete" onClick={() => removeProject(index)} aria-label={`Eliminar ${project.title}`}><Trash2 size={17} /></button></div><div className="manager-fields"><label>Título<input value={project.title} onChange={(event) => updateProject(index, 'title', event.target.value)} required /></label><label>Año<input value={project.year} onChange={(event) => updateProject(index, 'year', event.target.value)} required /></label><label>Tipo / categoría<input value={project.type} onChange={(event) => updateProject(index, 'type', event.target.value)} /></label><label>Herramientas<input value={project.tools} onChange={(event) => updateProject(index, 'tools', event.target.value)} /></label><label className="manager-wide">Imagen desde tu computador<input type="file" accept="image/*" onChange={(event) => handleImage(index, event.target.files[0])} /></label></div>{project.image && <img className="manager-preview" src={project.image} alt={`Vista previa de ${project.title}`} />}</article>)}</div><div className="manager-actions"><button type="button" className="manager-add" onClick={addProject} disabled={draftProjects.length >= 6}><Plus size={17} /> Agregar proyecto</button><button type="button" className="manager-save" onClick={saveProjects}><Save size={17} /> {saved ? 'Guardado · Ver proyectos' : 'Guardar cambios'}</button></div></section>
}

function ProjectDetail({ project, projects, onClose, onNavigate }) {
  useEffect(() => {
    if (!project) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

  const projectIndex = projects.findIndex((item) => item.number === project.number)
  if (projectIndex === -1 || projects.length === 0) return null
  const previousProject = projects[(projectIndex - 1 + projects.length) % projects.length]
  const nextProject = projects[(projectIndex + 1) % projects.length]

  return <div className="project-dialog-backdrop" role="presentation" onClick={onClose}><article className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" onClick={(event) => event.stopPropagation()}><button className="project-dialog-close" type="button" onClick={onClose} aria-label="Cerrar detalle del proyecto"><X size={21} /></button><div className="project-dialog-image" style={{ backgroundImage: `url(${project.image})` }}><span>{project.number} / {project.year}</span></div><div className="project-dialog-content"><p className="eyebrow">{project.type}</p><h2 id="project-dialog-title">{project.title}</h2><div className="project-dialog-grid"><div><span>El reto</span><p>{project.challenge || 'Definir una experiencia digital clara para resolver una necesidad concreta.'}</p></div><div><span>La solución</span><p>{project.solution || 'Una solución web modular, accesible y preparada para evolucionar.'}</p></div><div><span>Resultado</span><p>{project.result || 'Una base digital lista para seguir creciendo.'}</p></div><div><span>Herramientas</span><p>{project.tools}</p></div></div><div className="project-dialog-actions"><a className="text-link" href={`mailto:${contactEmail}?subject=Quiero%20hablar%20sobre%20${encodeURIComponent(project.title)}`}>Hablemos de un proyecto similar <ArrowUpRight size={17} /></a><div className="project-dialog-navigation"><button type="button" onClick={() => onNavigate(previousProject)} aria-label={`Ver proyecto anterior: ${previousProject.title}`}><ArrowLeft size={16} /></button><span>{projectIndex + 1} / {projects.length}</span><button type="button" onClick={() => onNavigate(nextProject)} aria-label={`Ver proyecto siguiente: ${nextProject.title}`}><ArrowRight size={16} /></button></div></div></div></article></div>
}

function ContactForm() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`Oportunidad laboral · ${formData.get('name')}`)
    const body = encodeURIComponent(`Nombre: ${formData.get('name')}\nCorreo: ${formData.get('email')}\n\n${formData.get('message')}`)
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return <form className="contact-form" onSubmit={handleSubmit}><div className="contact-form-heading"><p className="eyebrow">Contacto directo</p><p>Cuéntame brevemente sobre la oportunidad.</p></div><div className="contact-form-fields"><label>Nombre<input name="name" type="text" placeholder="Tu nombre" required /></label><label>Correo<input name="email" type="email" placeholder="tu@empresa.com" required /></label><label className="contact-form-wide">Mensaje<textarea name="message" placeholder="¿Qué tipo de perfil estás buscando?" rows="4" required /></label></div><div className="contact-form-footer"><button className="manager-save" type="submit">{sent ? 'Correo preparado' : 'Enviar mensaje'} <ArrowUpRight size={16} /></button><span>Se abrirá tu aplicación de correo.</span></div></form>
}

function TripleClickTop() {
  const [clicks, setClicks] = useState(0)
  const reveal = () => setClicks((current) => current >= 2 ? 3 : current + 1)

  return <div className="triple-click-top">{clicks === 3 ? <a className="triple-click-guide triple-click-link" href="#top"><Sparkles size={14} /> ¡Desbloqueado! Volver al inicio <ArrowUp size={14} /></a> : <button className="triple-click-guide" type="button" onClick={reveal} aria-label={`Reto rápido: haz clic tres veces para mostrar volver al inicio, ${clicks} de 3`}><span className="triple-click-message">Reto rápido</span><span className="triple-click-dots">{[0, 1, 2].map((dot) => <i className={dot < clicks ? 'is-active' : ''} key={dot} />)}</span><span className="triple-click-count">{clicks}/3</span></button>}</div>
}

function CursorFollower() {
  const [position, setPosition] = useState({ x: -40, y: -40, visible: false })

  useEffect(() => {
    const handlePointerMove = (event) => setPosition({ x: event.clientX, y: event.clientY, visible: true })
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  return <div className={`cursor-follower ${position.visible ? 'is-visible' : ''}`} style={{ left: position.x, top: position.y }} aria-hidden="true"><span /></div>
}

function _PortfolioMap() {
  return <section className="portfolio-map-section mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24"><div className="section-heading"><p className="eyebrow section-label">Mapa del portafolio</p><p className="section-note">Un recorrido breve<br />por mi perfil.</p></div><div className="portfolio-map">{portfolioMap.map(([number, title, href]) => <a href={href} className="portfolio-map-item" key={title}><span>{number}</span><strong>{title}</strong><ArrowUpRight size={16} /></a>)}</div><TripleClickTop /></section>
}

function NowPanel() {
  return <section className="now-section mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24"><div className="now-panel"><div className="now-heading"><span className="now-pulse" /><p className="eyebrow">Ahora mismo</p></div><h2>Aprendiendo, construyendo y buscando el próximo reto.</h2><div className="now-details"><span>Aprendiendo <strong>TypeScript · Testing E2E</strong></span><span>Construyendo <strong>Experiencias web y automatizaciones</strong></span><span>Buscando <strong>Oportunidades junior</strong></span></div></div><TripleClickTop /></section>
}

const presentationSlides = [
  ['01', 'Hola, soy Marco Antonio Salinas Solis.', 'Desarrollador web · Automatización · Soporte técnico'],
  ['02', 'Perfil profesional', 'React, Python, APIs REST y soporte técnico nivel 2.'],
  ['03', 'Proyectos', 'Interfaces, sistemas digitales y experiencias web.'],
  ['04', 'Cómo trabajo', 'Descubrimiento · Estrategia · Construcción · Lanzamiento'],
  ['05', 'Experiencia', 'Desarrollo web, automatización y resolución de incidentes.'],
  ['06', 'Disponible para trabajar', 'Remoto · Híbrido · Presencial · Cali, Colombia'],
]

const getPreferredSpanishVoice = (voices) => {
  const spanishVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith('es'))
  const maleNamePattern = /jorge|pablo|raul|raúl|carlos|miguel|juan|antonio|daniel|diego|luis|google español/i
  const colombianVoice = spanishVoices.find((voice) => voice.lang.toLowerCase() === 'es-co')
  return spanishVoices.find((voice) => /pablo/i.test(voice.name))
    || colombianVoice
    || spanishVoices.find((voice) => maleNamePattern.test(voice.name))
    || spanishVoices[0]
}

function PresentationShow({ onClose }) {
  const [slideIndex, setSlideIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [preferredVoice, setPreferredVoice] = useState(null)
  const [speaking, setSpeaking] = useState(false)
  const [speechRate, setSpeechRate] = useState(.76)
  const [replayToken, setReplayToken] = useState(0)
  const pausedRef = useRef(paused)
  const narrationIdRef = useRef(0)
  const slide = presentationSlides[slideIndex]
  const voiceSupported = 'speechSynthesis' in window

  useEffect(() => {
    pausedRef.current = paused
    if (paused || (voiceEnabled && voiceSupported)) return undefined
    const timer = window.setTimeout(() => setSlideIndex((current) => (current + 1) % presentationSlides.length), 4000)
    return () => window.clearTimeout(timer)
  }, [paused, voiceEnabled, voiceSupported, slideIndex])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') setSlideIndex((current) => (current + 1) % presentationSlides.length)
      if (event.key === 'ArrowLeft') setSlideIndex((current) => (current - 1 + presentationSlides.length) % presentationSlides.length)
      if (event.key === ' ') setPaused((current) => !current)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  useEffect(() => {
    if (!('speechSynthesis' in window)) return undefined
    const updateVoice = () => setPreferredVoice(getPreferredSpanishVoice(window.speechSynthesis.getVoices()))
    updateVoice()
    window.speechSynthesis.addEventListener('voiceschanged', updateVoice)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', updateVoice)
  }, [])

  useEffect(() => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return undefined
    const narrationId = narrationIdRef.current + 1
    narrationIdRef.current = narrationId
    window.speechSynthesis.cancel()
    const narration = new SpeechSynthesisUtterance(`Diapositiva ${slide[0]}. ${slide[1]}. ${slide[2]}`)
    narration.lang = preferredVoice?.lang || 'es-CO'
    narration.rate = speechRate
    narration.pitch = .46
    narration.volume = .96
    if (preferredVoice) narration.voice = preferredVoice
    narration.onstart = () => setSpeaking(true)
    narration.onend = () => {
      setSpeaking(false)
      if (narrationId === narrationIdRef.current && !pausedRef.current) {
        setSlideIndex((current) => (current + 1) % presentationSlides.length)
      }
    }
    narration.onerror = () => setSpeaking(false)
    window.speechSynthesis.speak(narration)
    return () => {
      window.speechSynthesis.cancel()
      setSpeaking(false)
    }
  }, [slide, voiceEnabled, preferredVoice, speechRate, replayToken])

  useEffect(() => {
    if (!voiceSupported || !voiceEnabled) return undefined
    if (paused) window.speechSynthesis.pause()
    else window.speechSynthesis.resume()
    return undefined
  }, [paused, voiceEnabled, voiceSupported])

  const replaySlide = () => setReplayToken((current) => current + 1)
  return <div className="presentation-show" role="dialog" aria-modal="true" aria-labelledby="presentation-title"><div className="presentation-show-top"><span>Marco Salinas · Presentación</span><div className="presentation-top-actions">{voiceSupported && <button className={voiceEnabled ? 'voice-active' : ''} type="button" onClick={() => setVoiceEnabled((current) => !current)} aria-label={voiceEnabled ? 'Silenciar voz Jarvis' : 'Activar voz Jarvis'}>{voiceEnabled ? 'Voz Jarvis' : 'Jarvis apagado'}</button>}<button type="button" onClick={onClose} aria-label="Cerrar presentación"><X size={20} /></button></div></div><div className="presentation-slide" key={slideIndex}><span className="presentation-slide-number">{slide[0]} / 06</span><div className={`presentation-voice-status ${speaking ? 'is-speaking' : ''}`} aria-live="polite"><span className="presentation-voice-bars" aria-hidden="true"><i /><i /><i /><i /></span>{speaking ? 'Leyendo diapositiva' : 'Narración en pausa'}</div><h2 id="presentation-title">{slide[1]}</h2><p className="presentation-subtitle" aria-live="polite">{slide[2]}</p></div><div className="presentation-show-bottom"><div className="presentation-progress">{presentationSlides.map((item, index) => <button type="button" className={index === slideIndex ? 'is-active' : ''} onClick={() => setSlideIndex(index)} aria-label={`Ir a diapositiva ${index + 1}`} key={item[0]} />)}</div><div className="presentation-controls"><button type="button" onClick={() => setSlideIndex((current) => (current - 1 + presentationSlides.length) % presentationSlides.length)} aria-label="Diapositiva anterior"><ArrowLeft size={17} /></button><button type="button" onClick={() => setPaused((current) => !current)} aria-label={paused ? 'Reanudar presentación' : 'Pausar presentación'}>{paused ? 'Reanudar' : 'Pausa'}</button><button type="button" onClick={replaySlide} aria-label="Repetir narración"><RotateCcw size={16} /></button><label className="presentation-speed">Velocidad <select value={speechRate} onChange={(event) => setSpeechRate(Number(event.target.value))} aria-label="Velocidad de narración"><option value=".68">Lenta</option><option value=".76">Jarvis</option><option value=".92">Rápida</option></select></label><button type="button" onClick={() => setSlideIndex((current) => (current + 1) % presentationSlides.length)} aria-label="Diapositiva siguiente"><ArrowRight size={17} /></button></div></div></div>
}

function IntroLoader() {
  const [visible, setVisible] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (!visible) return undefined
    const leaveTimer = window.setTimeout(() => setLeaving(true), 2550)
    const hideTimer = window.setTimeout(() => setVisible(false), 3000)
    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(hideTimer)
    }
  }, [visible])

  if (!visible) return null
  return <div className={`intro-loader ${leaving ? 'is-leaving' : ''}`} role="status" aria-label="Bienvenido al portafolio"><div className="intro-loader-inner"><p className="eyebrow intro-loader-welcome">Bienvenido a mi portafolio</p><h2>Hola, soy<br /><em>Marco Antonio<br />Salinas Solis.</em></h2><p className="intro-loader-message">Qué bueno tenerte aquí.</p><div className="intro-loader-footer"><span>Desarrollador web</span><span className="intro-loader-line" /><span>✦</span></div></div></div>
}

function RecruiterGuide() {
  const [path, setPath] = useState(null)
  const [query, setQuery] = useState('')
  const [assistantMessage, setAssistantMessage] = useState('')
  const recommendation = path ? recruiterPaths[path] : null
  const choosePath = (nextPath, message = '') => {
    setPath(nextPath)
    setAssistantMessage(message)
  }
  const analyzeQuery = (event) => {
    event.preventDefault()
    const normalizedQuery = query.toLowerCase()
    if (/python|selenium|scrap|automat|flujo|n8n/.test(normalizedQuery)) {
      choosePath('automation', 'Detecté una necesidad relacionada con automatización.')
    } else if (/soporte|incidente|ticket|mesa|base de datos|api|diagnóstico/.test(normalizedQuery)) {
      choosePath('support', 'Detecté una necesidad relacionada con soporte técnico.')
    } else if (/react|javascript|frontend|front-end|web|interfaz|sitio/.test(normalizedQuery)) {
      choosePath('web', 'Detecté una necesidad relacionada con desarrollo web.')
    } else {
      setAssistantMessage('Puedo orientarte en desarrollo web, automatización o soporte técnico.')
      setPath(null)
    }
  }
  const exploreRecommendation = (event) => {
    event.preventDefault()
    const target = document.querySelector(recommendation.section)
    if (!target) return
    window.history.replaceState(null, '', recommendation.section)
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    target.classList.add('route-highlight')
    window.setTimeout(() => target.classList.remove('route-highlight'), 1800)
  }

  return <section className="recruiter-guide-section mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24"><div className="recruiter-guide"><div className="recruiter-guide-heading"><span className="recruiter-guide-icon"><Sparkles size={18} /></span><div><p className="eyebrow">Guía inteligente para reclutadores</p><h2>Cuéntame qué perfil estás buscando.</h2></div></div><form className="recruiter-query" onSubmit={analyzeQuery}><label htmlFor="recruiter-query-input">Escribe una necesidad o tecnología<input id="recruiter-query-input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ej. busco alguien para Python y scraping" /></label><button type="submit" aria-label="Analizar necesidad"><Sparkles size={16} /> Analizar</button></form>{assistantMessage && <p className="assistant-message" aria-live="polite">{assistantMessage}</p>}<div className="recruiter-guide-options"><button type="button" className={path === 'web' ? 'is-selected' : ''} onClick={() => choosePath('web')}>Desarrollo web</button><button type="button" className={path === 'automation' ? 'is-selected' : ''} onClick={() => choosePath('automation')}>Automatización</button><button type="button" className={path === 'support' ? 'is-selected' : ''} onClick={() => choosePath('support')}>Soporte técnico</button></div>{recommendation && <div className="recruiter-recommendation"><div><span className="eyebrow">Ruta recomendada</span><h3>{recommendation.title}</h3><p>{recommendation.description}</p><div className="recommendation-facts"><span><b>Enfoque</b>{recommendation.focus}</span><span><b>Herramientas</b>{recommendation.tools}</span></div></div><div className="recruiter-recommendation-actions"><a className="text-link" href={recommendation.section} onClick={exploreRecommendation}>Explorar sección <ArrowUpRight size={17} /></a><a className="text-link" href={`mailto:${contactEmail}?subject=Oportunidad%20en%20${recommendation.subject}`}>Hablar sobre esta ruta <ArrowUpRight size={17} /></a></div></div>}</div><TripleClickTop /></section>
}

void RecruiterGuide

function RecruiterMode({ onClose }) {
  const [selectedPath, setSelectedPath] = useState('web')
  const selected = recruiterPaths[selectedPath]

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return <div className="recruiter-mode-backdrop" role="presentation" onClick={onClose}><section className="recruiter-mode" role="dialog" aria-modal="true" aria-labelledby="recruiter-mode-title" onClick={(event) => event.stopPropagation()}><button className="recruiter-mode-close" type="button" onClick={onClose} aria-label="Cerrar modo reclutador"><X size={21} /></button><div className="recruiter-mode-header"><span className="recruiter-guide-icon"><Sparkles size={18} /></span><div><p className="eyebrow">Perfil rápido · 30 segundos</p><h2 id="recruiter-mode-title">Modo reclutador</h2></div></div><div className="recruiter-mode-layout"><div className="recruiter-mode-summary"><p className="recruiter-mode-intro">Desarrollador web colombiano disponible para oportunidades junior en desarrollo web, automatización y soporte técnico nivel 2.</p><div className="recruiter-mode-facts"><div><span>Ubicación</span><strong>Cali, Colombia</strong></div><div><span>Modalidad</span><strong>Remoto · Híbrido · Presencial</strong></div><div><span>Disponibilidad</span><strong className="recruiter-available">Disponible para trabajar</strong></div></div></div><div className="recruiter-mode-paths"><p className="eyebrow">Selecciona un enfoque</p><div className="recruiter-mode-tabs">{Object.entries(recruiterPaths).map(([key, value]) => <button type="button" className={selectedPath === key ? 'is-selected' : ''} onClick={() => setSelectedPath(key)} key={key}>{value.title}</button>)}</div><div className="recruiter-mode-result"><span className="eyebrow">Aporte principal</span><h3>{selected.focus}</h3><p>{selected.description}</p><span className="recruiter-mode-tools">{selected.tools}</span></div></div></div><div className="recruiter-mode-actions"><a className="hero-primary-link" href="/Hoja_de_Vida_Marco_Salinas_.docx" download="CV-Marco-Antonio-Salinas-Solis.docx">Descargar CV <ArrowUpRight size={17} /></a><a className="text-link" href="https://www.linkedin.com/in/marcosalinasdev/" target="_blank" rel="noreferrer">Ver LinkedIn <ArrowUpRight size={17} /></a><a className="text-link" href={`mailto:${contactEmail}?subject=Oportunidad%20en%20${selected.subject}`}>Contactar <ArrowUpRight size={17} /></a></div></section></div>
}

function SpiderEasterEgg({ onClose }) {
  const spiderImages = ['/spider.jpg', '/spider1.avif', '/spider2.jpg']
  const [imageIndex, setImageIndex] = useState(0)
  const [cursorPosition, setCursorPosition] = useState({ x: -60, y: -60 })

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  useEffect(() => {
    const imageTimer = window.setInterval(() => setImageIndex((current) => (current + 1) % spiderImages.length), 4200)
    return () => window.clearInterval(imageTimer)
  }, [spiderImages.length])

  useEffect(() => {
    const handlePointerMove = (event) => setCursorPosition({ x: event.clientX, y: event.clientY })
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  const nextImage = () => setImageIndex((current) => (current + 1) % spiderImages.length)

  return <div className="spider-easter-egg-backdrop" role="presentation" onClick={onClose}><div className="spider-cursor" style={{ left: cursorPosition.x, top: cursorPosition.y }} aria-hidden="true"><span>🕷️</span></div><section className="spider-easter-egg" role="dialog" aria-modal="true" aria-labelledby="spider-easter-egg-title" onClick={(event) => event.stopPropagation()}><button className="spider-easter-egg-close" type="button" onClick={onClose} aria-label="Cerrar detalle especial"><X size={20} /></button><div className="spider-easter-egg-art"><div className="spider-web" /><button className={`spider-silhouette ${imageIndex < 2 ? 'is-featured' : ''}`} type="button" onClick={nextImage} aria-label="Mostrar siguiente imagen"><img className="spider-image-in" key={spiderImages[imageIndex]} src={spiderImages[imageIndex]} alt={`Spider-Man, imagen ${imageIndex + 1} de ${spiderImages.length}`} /></button><div className="spider-gallery-dots" aria-label="Navegación de imágenes">{spiderImages.map((image, index) => <button type="button" className={index === imageIndex ? 'is-active' : ''} onClick={() => setImageIndex(index)} aria-label={`Mostrar imagen ${index + 1}`} key={image} />)}</div><span className="spider-art-label">SPIDER / 0{imageIndex + 1}</span></div><div className="spider-easter-egg-copy"><p className="eyebrow">Detalle especial</p><h2 id="spider-easter-egg-title">Con gran código,<br /><em>gran responsabilidad.</em></h2><p>Una pequeña señal para recordar que la creatividad también es parte de cómo construyo.</p><button className="hero-primary-link" type="button" onClick={onClose}>Volver al portafolio <ArrowUpRight size={17} /></button></div></section></div>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [recruiterModeOpen, setRecruiterModeOpen] = useState(false)
  const [projectFilter, setProjectFilter] = useState('Todos')
  const [presentationMode, setPresentationMode] = useState(false)
  const [spiderEasterEggOpen, setSpiderEasterEggOpen] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const [darkMode, setDarkMode] = useState(() => window.localStorage.getItem('marco-theme') === 'dark')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [projectList, setProjectList] = useState(() => {
    try {
      const storedProjects = JSON.parse(window.localStorage.getItem('marco-projects'))
      return Array.isArray(storedProjects) ? storedProjects : defaultProjects
    } catch {
      return defaultProjects
    }
  })
  const isAdmin = new URLSearchParams(window.location.search).get('admin') === '1'

  useEffect(() => {
    const sections = document.querySelectorAll('main > section')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('is-active-section', entry.isIntersecting))
    }, { threshold: 0.1, rootMargin: '-15% 0px -25% 0px' })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleShortcut = (event) => {
      if (event.target.matches('input, textarea')) return
      const key = event.key.toLowerCase()
      if (key === 'h') window.location.hash = 'top'
      if (key === 'p') document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
      if (key === 'c') document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
      if (key === 'r') setRecruiterModeOpen(true)
      if (key === 'v') setPresentationMode((current) => !current)
    }
    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  useEffect(() => {
    let frameId
    const updateProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0
      setScrollProgress(progress)
    }
    const handleScroll = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(updateProgress)
    }
    updateProgress()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const saveProjects = (nextProjects) => {
    setProjectList(nextProjects)
    window.localStorage.setItem('marco-projects', JSON.stringify(nextProjects))
  }
  const toggleTheme = () => {
    setDarkMode((isDark) => {
      const nextMode = !isDark
      window.localStorage.setItem('marco-theme', nextMode ? 'dark' : 'light')
      return nextMode
    })
  }

  const copyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(contactEmail)
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = contactEmail
        textArea.style.position = 'fixed'
        textArea.style.opacity = '0'
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        textArea.remove()
      }
      setEmailCopied(true)
      window.setTimeout(() => setEmailCopied(false), 2200)
    } catch {
      setEmailCopied(false)
    }
  }

  const moveHeroArt = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const horizontalShift = ((event.clientX - bounds.left) / bounds.width - .5) * 16
    const verticalShift = ((event.clientY - bounds.top) / bounds.height - .5) * 16
    event.currentTarget.style.setProperty('--shift-x', `${horizontalShift}px`)
    event.currentTarget.style.setProperty('--shift-y', `${verticalShift}px`)
  }

  const resetHeroArt = (event) => {
    event.currentTarget.style.setProperty('--shift-x', '0px')
    event.currentTarget.style.setProperty('--shift-y', '0px')
  }

  const visibleProjects = projectList.filter((project) => {
    if (projectFilter === 'Todos') return true
    const projectText = `${project.title} ${project.type} ${project.tools}`.toLowerCase()
    const filterTerms = { Web: ['web', 'react', 'javascript', 'diseño'], Automatización: ['automatización', 'selenium', 'python', 'scraping'], 'E-commerce': ['e-commerce', 'comercio'] }
    return filterTerms[projectFilter].some((term) => projectText.includes(term))
  })

  return (
    <>
      <IntroLoader />
      <CursorFollower />
      <div className="reading-progress" aria-hidden="true"><span style={{ width: `${scrollProgress}%` }} /></div>
      <a className="skip-link" href="#main-content">Saltar al contenido</a>
    <main id="main-content" className={`${darkMode ? 'theme-dark' : ''} ${presentationMode ? 'presentation-mode' : ''} ${highContrast ? 'high-contrast' : ''}`}>
      <nav className="site-nav mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="Marco Antonio Salinas Solis, inicio">MS<span>.</span></a>
        <div className="nav-links hidden items-center gap-9 md:flex">
          <a href="#about">Sobre mí</a>
          <a href="#work">Proyectos</a>
          <a href="#services">Servicios</a>
          <a href="#process">Proceso</a>
          <a href="#experience">Experiencia</a>
          <a href="#contact">Contacto</a>
        </div>
        <div className="nav-actions"><a className="nav-status" href={`mailto:${contactEmail}?subject=Contacto%20desde%20mi%20portafolio`}><span className="nav-status-dot" /><span className="nav-status-label">Disponible<span className="nav-status-break" /> para trabajar</span></a><button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'} title={darkMode ? 'Modo claro' : 'Modo oscuro'}>{darkMode ? <Sun size={17} /> : <Moon size={17} />}</button><button className="presentation-toggle" type="button" onClick={() => setPresentationMode((current) => !current)} aria-label="Activar modo presentación">{presentationMode ? 'Salir' : 'Presentar'}</button><button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setMenuOpen((isOpen) => !isOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button></div>
        {menuOpen && <div id="mobile-menu" className="mobile-menu"><a href="#about" onClick={closeMenu}>Sobre mí</a><a href="#work" onClick={closeMenu}>Proyectos</a><a href="#services" onClick={closeMenu}>Servicios</a><a href="#process" onClick={closeMenu}>Proceso</a><a href="#experience" onClick={closeMenu}>Experiencia</a><a href="#faq" onClick={closeMenu}>Preguntas frecuentes</a><a href="#github" onClick={closeMenu}>GitHub</a><a href="#contact" onClick={closeMenu}>Contacto</a><a className="mobile-cv" href="/Hoja_de_Vida_Marco_Salinas_.docx" download="CV-Marco-Antonio-Salinas-Solis.docx" onClick={closeMenu}>Descargar CV <ArrowUpRight size={17} /></a></div>}
      </nav>

      <section id="top" className="hero mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:px-10 lg:pb-28 lg:pt-20">
        <div className="hero-copy">
          <p className="eyebrow reveal">Disponible para trabajar <span>— {currentYear}</span></p>
          <h1 className="reveal reveal-delay-1">Desarrollador web<br /><em>y automatizador.</em></h1>
          <p className="hero-intro reveal reveal-delay-2">Soy Marco Antonio Salinas Solis. Construyo interfaces con React, conecto APIs y automatizo tareas repetitivas con Python. Disponible para oportunidades junior.</p>
          <div className="hero-actions reveal reveal-delay-3"><a className="hero-primary-link" href="#work">Ver proyectos <ArrowUpRight size={17} /></a><a className="text-link" href="#about">Conocer mi perfil <ArrowUpRight size={17} /></a><button className="hero-recruiter-button" type="button" onClick={() => setRecruiterModeOpen(true)}><Sparkles size={15} /> Modo reclutador</button></div>
          <p className="hero-route-note"><Sparkles size={13} /> También puedes elegir una ruta profesional más abajo.</p>
        </div>
        <div className="hero-art reveal reveal-delay-2" aria-label="Oficina de desarrollo de software con varios computadores y puestos de trabajo vacíos" role="img" onPointerMove={moveHeroArt} onPointerLeave={resetHeroArt}>
          <div className="art-caption"><span>Fig. 001</span><span>Make it matter.</span></div>
          <div className="art-sticker">NEW<br />IDEAS<br /><span>↗</span></div>
          <div className="art-shape art-shape--sun" />
          <div className="art-shape art-shape--line" />
        </div>
      </section>

      <div className="ticker" aria-hidden="true"><div className="ticker-track">DESARROLLO WEB <span>✳</span> AUTOMATIZACIÓN <span>✳</span> EXPERIENCIAS DIGITALES <span>✳</span> DESARROLLO WEB <span>✳</span> AUTOMATIZACIÓN <span>✳</span> EXPERIENCIAS DIGITALES <span>✳</span></div></div>

      <section id="about" className="about-section mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[0.7fr_1.3fr] lg:px-10 lg:py-36">
        <p className="eyebrow section-label">01 / Sobre mí</p>
        <div><p className="about-statement">Desarrollo soluciones <span>eficientes</span> para problemas reales.</p><p className="about-body">Soy Marco Salinas Solís, desarrollador web colombiano especializado en React, automatización con Python, APIs REST y soporte técnico. Estoy disponible para oportunidades junior, desarrollo web, automatización y soporte técnico.</p><div className="about-actions"><a className="text-link" href={`mailto:${contactEmail}?subject=Contacto%20desde%20mi%20portafolio`}>Conoce más sobre mí <ArrowUpRight size={17} /></a><a className="text-link" href="/Hoja_de_Vida_Marco_Salinas_.docx" download="CV-Marco-Antonio-Salinas-Solis.docx">Descargar CV <ArrowUpRight size={17} /></a></div><div className="about-metrics"><div><strong>4+</strong><span>Años aprendiendo y construyendo</span></div><div><strong>3</strong><span>Áreas de especialidad</span></div><div><strong>100%</strong><span>Compromiso con cada proyecto</span></div></div></div>
        <TripleClickTop />
      </section>

      <NowPanel />

      <section className="snapshot-section mx-auto max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32"><div className="snapshot-heading"><p className="eyebrow section-label">Resumen para reclutadores</p><p className="section-note">La información clave<br />en una sola mirada.</p></div><div className="snapshot-grid">{careerSnapshot.map(([label, value], index) => <div className="snapshot-item" key={label}><span className="snapshot-number">0{index + 1}</span><span className="snapshot-label">{label}</span><strong>{value}</strong></div>)}</div><TripleClickTop /></section>

      <section id="work" className="work-section mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-36">
        <div className="section-heading"><p className="eyebrow section-label">02 / Proyectos</p><p className="section-note">Una selección de conceptos,<br />interfaces y sistemas digitales.</p></div>
        {projectList.length > 0 && <div className="project-filters" aria-label="Filtrar proyectos">{projectFilters.map((filter) => <button type="button" className={projectFilter === filter ? 'is-selected' : ''} key={filter} onClick={() => setProjectFilter(filter)}>{filter}</button>)}<button type="button" onClick={() => setHighContrast((current) => !current)}>{highContrast ? 'Contraste normal' : 'Alto contraste'}</button><button type="button" onClick={() => navigator.clipboard?.writeText(window.location.href)}>Copiar enlace</button></div>}
        <div className="projects">
          {visibleProjects.filter(Boolean).map((project) => (
              <button className={`project-card ${project.className}`} type="button" onClick={() => setSelectedProject(project)} aria-label={`Ver detalles del proyecto ${project.title}`} key={project.number}>
              <div className="project-image" style={{ backgroundImage: project.image ? `url(${project.image})` : undefined }}><span className="project-index">{project.number} / {projectList.length.toString().padStart(2, '0')}</span><span className="project-image-label">{project.label || 'Proyecto seleccionado'}</span><div className="project-tech-tags">{(project.tools || '').split(' · ').filter(Boolean).map((tool) => <span key={tool}>{tool}</span>)}</div><span className="project-detail-hint">Abrir caso <ArrowUpRight size={14} /></span><span className="project-arrow"><ArrowUpRight size={22} /></span></div>
              <div className="project-meta"><div><p className="project-type">{project.type}</p><h2>{project.title}</h2><div className="project-footer"><span className="project-tools">{project.tools}</span><span className="project-action">Ver detalles <ArrowUpRight size={14} /></span></div></div><span className="project-year">{project.year}</span></div>
              </button>
          ))}
        </div>
        {visibleProjects.length === 0 && <div className="projects-empty"><strong>Proyectos en preparación</strong><p>Aún no hay proyectos publicados. Pronto compartiré aquí una selección de mis trabajos.</p></div>}
        <TripleClickTop />
      </section>

      <section id="services" className="services-section mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="section-heading"><p className="eyebrow section-label">03 / Servicios</p><p className="section-note">Herramientas digitales para<br />hacer avanzar tu negocio.</p></div>
        <div className="services-list">
          {services.map(([number, title, description]) => (
            <div className="service-row" key={number}><span className="service-number">{number}</span><h2>{title}</h2><p>{description}</p><ArrowUpRight size={21} /></div>
          ))}
        </div>
        <div className="tech-stack"><p className="eyebrow">Tecnologías y herramientas</p><div className="tech-groups">{technologyGroups.map(([heading, tools]) => <div className="tech-group" key={heading}><h3>{heading}</h3><div className="tech-list">{tools.map((technology) => <span key={technology}>{technology}</span>)}</div></div>)}</div></div>
        <div className="skills-section"><div className="skills-heading"><div><p className="eyebrow">Tecnologías y nivel actual</p><p className="skills-caption">Las barras son una referencia visual, no un porcentaje exacto.</p></div><p className="section-note">Herramientas que utilizo<br />en desarrollo y soporte.</p></div><div className="skill-legend"><span><b>Intermedio</b> Uso frecuente en proyectos</span><span><b>Fundamentos</b> Base práctica y aprendizaje continuo</span></div><div className="skills-list">{skillLevels.map(([skill, level, score], index) => <div className="skill-row" key={skill}><div className="skill-topline"><span className="skill-number">0{index + 1}</span><span className="skill-name">{skill}</span><span className="skill-level">{level}</span><strong className="skill-score">{score}%</strong></div><div className="skill-meter" aria-label={`${skill}: nivel ${level}`}><span style={{ width: `${score}%` }} /></div></div>)}</div></div>
        <TripleClickTop />
      </section>
      <section className="team-section mx-auto max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32"><div className="section-heading"><p className="eyebrow section-label">Cómo aporto</p><p className="section-note">Lo que puedes esperar<br />cuando trabajamos juntos.</p></div><div className="team-grid">{teamContributions.map(([number, title, description]) => <article className="team-card" key={title}><span>{number}</span><h2>{title}</h2><p>{description}</p></article>)}</div><TripleClickTop /></section>
      <section id="process" className="process-section mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="section-heading"><p className="eyebrow section-label">04 / Proceso</p><p className="section-note">Una forma de trabajar<br />clara y colaborativa.</p></div>
        <div className="process-list">{processSteps.map(([number, title, description]) => <article className="process-step" key={number}><span>{number}</span><h2>{title}</h2><p>{description}</p></article>)}</div>
        <TripleClickTop />
      </section>

      <section id="faq" className="faq-section mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="section-heading"><p className="eyebrow section-label">Preguntas frecuentes</p><p className="section-note">Lo esencial antes<br />de comenzar.</p></div>
        <div className="faq-list">{faqs.map(([question, answer]) => <details className="faq-item" key={question}><summary>{question}<Plus size={19} /></summary><p>{answer}</p></details>)}</div>
        <TripleClickTop />
      </section>

      <section className="availability-section mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="availability-copy"><span className="availability-dot" /><div><p className="eyebrow">Disponibilidad actual</p><h2>Disponible para trabajar y asumir nuevos retos profesionales.</h2></div><a className="text-link" href={`mailto:${contactEmail}?subject=Oportunidad%20laboral`}>Hablemos de una oportunidad <ArrowUpRight size={17} /></a></div><TripleClickTop />
      </section>

      <section id="experience" className="experience-section mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="section-heading"><p className="eyebrow section-label">06 / Experiencia</p><p className="section-note">Desarrollo, automatización<br />y soporte técnico.</p></div>
        <div className="experience-list">{experience.map(([period, role, company, description]) => <article className="experience-row" key={role}><span className="experience-period">{period}</span><div><h2>{role}</h2><p className="experience-company">{company}</p><p className="experience-description">{description}</p></div></article>)}</div>
        <div className="education-row"><p className="eyebrow">Formación</p><div>{training.map(([course, year]) => <p key={course}>{course} <span>· {year}</span></p>)}</div></div>
        <div className="strengths-row"><p className="eyebrow">Fortalezas profesionales</p><div className="strengths-list">{strengths.map((strength) => <span key={strength}>{strength}</span>)}</div></div>
        <TripleClickTop />
      </section>

      <section id="github" className="github-section mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-28"><div className="section-heading"><p className="eyebrow section-label">Perfiles profesionales</p><p className="section-note">Código, experiencia<br />y trayectoria.</p></div><div className="github-card"><div><p className="eyebrow">GitHub · Antonios-s</p><h2>Consulta mi código y mi trayectoria profesional.</h2></div><div className="github-actions"><a className="text-link" href="https://github.com/Antonios-s" target="_blank" rel="noreferrer">Ver GitHub <ArrowUpRight size={17} /></a><a className="text-link" href="https://www.linkedin.com/in/marcosalinasdev/" target="_blank" rel="noreferrer">Ver LinkedIn <ArrowUpRight size={17} /></a></div></div><TripleClickTop /></section>

      {isAdmin && <ProjectManager projects={projectList} onSave={saveProjects} />}

      <ProjectDetail project={selectedProject} projects={projectList} onClose={() => setSelectedProject(null)} onNavigate={setSelectedProject} />

      {recruiterModeOpen && <RecruiterMode onClose={() => setRecruiterModeOpen(false)} />}
      {presentationMode && <PresentationShow onClose={() => setPresentationMode(false)} />}
      {spiderEasterEggOpen && <SpiderEasterEgg onClose={() => setSpiderEasterEggOpen(false)} />}

      <a className="whatsapp-float" href="https://wa.me/573202751177?text=Hola%20Marco,%20quiero%20hablar%20sobre%20un%20proyecto" target="_blank" rel="noreferrer" aria-label="Contactar por WhatsApp"><span>WhatsApp</span><ArrowUpRight size={17} /></a>

      <footer id="contact" className="site-footer mx-auto max-w-7xl px-6 pb-8 pt-24 lg:px-10 lg:pt-36"><p className="eyebrow section-label">07 / Contacto</p><h2>¿Buscas a alguien para tu<br /><em>equipo?</em></h2><div className="contact-intro"><div className="contact-actions"><a className="email-link" href={`mailto:${contactEmail}?subject=Oportunidad%20laboral`}>{contactEmail} <ArrowUpRight size={29} strokeWidth={1.5} /></a><button className="copy-email" type="button" onClick={copyEmail} aria-label="Copiar correo electrónico">{emailCopied ? <Check size={17} /> : <Copy size={17} />}<span aria-live="polite">{emailCopied ? 'Correo copiado' : 'Copiar correo'}</span></button></div><ContactForm /><div className="contact-note"><p className="contact-location">Cali, Colombia <span>·</span> <a href="https://wa.me/573202751177" target="_blank" rel="noreferrer">+57 320 275 1177</a></p><p className="contact-copy">Estoy disponible para trabajar.<br />Hablemos sobre la oportunidad.</p></div></div><div className="footer-bottom"><span>© {currentYear} Marco Antonio Salinas Solis</span><div className="social-links"><a href="https://github.com/Antonios-s" target="_blank" rel="noreferrer" aria-label="GitHub"><GitBranch size={18} /></a><a href="https://www.linkedin.com/in/marcosalinasdev/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><AtSign size={18} /></a><a href={`mailto:${contactEmail}?subject=Oportunidad%20laboral`} aria-label="Correo electrónico"><Mail size={18} /></a></div><span>Diseñado y construido con intención.</span><button className="footer-spider-signal" type="button" onClick={() => setSpiderEasterEggOpen(true)} aria-label="Abrir detalle especial inspirado en Spider-Man"><span>SPIDER / 01</span><i /><i /><i /></button><a className="back-to-top" href="#top" aria-label="Volver al inicio"><ArrowUp size={19} /></a></div></footer>
    </main>
    </>
  )
}

export default App
