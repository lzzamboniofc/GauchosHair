import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown,
  ChevronLeft, ChevronRight, Instagram, MapPin, Menu, MoveHorizontal,
  Scissors, X, Clock3, ExternalLink, Phone, Image as ImageIcon
} from 'lucide-react';
import { site } from './content';
import './style.css';

const sections = [
  ['Início','inicio'], ['Sobre','sobre'], ['Serviços','servicos'],
  ['Equipe','equipe'], ['Galeria','galeria'], ['Avaliações','avaliacoes'],
  ['Dúvidas','duvidas'], ['Contato','contato']
];
const asset = (src) => src && src.startsWith('/images/') ? `${import.meta.env.BASE_URL}${src.slice(1)}` : src;
const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Brand({ footer=false }) {
  return <a href="#inicio" className={`brand ${footer?'brand-footer':''}`} aria-label="Gaúchos Hair Itu — voltar ao início">
    {site.logo ? <img className="brand-official" src={asset(site.logo)} alt="Logotipo da Gaúchos Hair Itu" /> : <span className="brand-symbol" aria-hidden="true">G<span>H</span></span>}
    <span className="brand-copy"><strong>GAÚCHOS <span>HAIR</span></strong><small>BARBEARIA · ITU / SP</small></span>
  </a>;
}
function Booking({ className='', children, label, arrow=true, href }) {
  const url = href || site.appbarber || site.instagram;
  const fallback = !href && !site.appbarber;
  return <a href={url} target="_blank" rel="noopener noreferrer" className={`button ${className}`}
    aria-label={label || (fallback?'Consultar agendamento no Instagram':'Agendar pelo AppBarber')}
    title={fallback?'Link direto do AppBarber ainda não fornecido. Consulte a equipe pelo Instagram.':undefined}>
    <span>{children || (fallback?'Consultar agendamento':'Agendar pelo AppBarber')}</span>{arrow && <ArrowUpRight size={18} aria-hidden="true" />}
  </a>;
}
function OfficialPhoto({src,alt,kind='',className='',loading='lazy'}) {
  if (!src && kind === 'hero' && site.logo) {
    return <div className={`visual ${className}`}><div className="branded-hero-logo"><div className="hero-emblem-halo" aria-hidden="true"/><img src={asset(site.logo)} className="hero-emblem" alt="" decoding="async" aria-hidden="true"/></div></div>;
  }
  return <div className={`visual ${className} ${src?'visual-has-photo':''}`}>
    {src ? <img src={asset(src)} alt={alt} loading={loading} decoding="async" /> :
      <div className={`visual-art visual-${kind || 'editorial'}`} aria-label="Espaço reservado para fotografia oficial">
        <div className="visual-circles" aria-hidden="true"/><div className="visual-frame" aria-hidden="true" />
        {site.logo ? <img className="visual-watermark" src={asset(site.logo)} alt="" aria-hidden="true" loading="lazy"/> : <span className="visual-monogram" aria-hidden="true">GH</span>}
        <span className="visual-note">FOTOGRAFIA OFICIAL<br/>A INSERIR</span>
      </div>}
  </div>;
}
function SectionHeading({kicker,children,description,light=false}) {
  return <div className={`section-heading ${light?'heading-ink':''}`}><p className="kicker">{kicker}</p><h2>{children}</h2>{description && <p className="section-description">{description}</p>}</div>;
}
function useBodyLock(active) {
  useEffect(()=>{ if(!active) return; const prev=document.body.style.overflow; document.body.style.overflow='hidden'; return()=>document.body.style.overflow=prev; },[active]);
}
function Header() {
  const [scrolled,setScrolled]=useState(false), [open,setOpen]=useState(false);
  useBodyLock(open);
  useEffect(()=>{ const handle=()=>setScrolled(window.scrollY>32);handle(); window.addEventListener('scroll',handle,{passive:true});return()=>window.removeEventListener('scroll',handle);},[]);
  useEffect(()=>{ const onEsc=(e)=>{if(e.key==='Escape')setOpen(false)}; window.addEventListener('keydown',onEsc); return()=>window.removeEventListener('keydown',onEsc)},[]);
  const close=()=>setOpen(false);
  return <>
    <header className={`site-header ${scrolled||open?'is-solid':''}`}>
      <div className="header-inner"><Brand/>
        <nav className="desktop-nav" aria-label="Menu principal">{sections.map(([name,id])=><a key={id} href={`#${id}`}>{name}</a>)}</nav>
        <div className="header-side"><Booking className="button-sm header-book"/><button className="menu-trigger" onClick={()=>setOpen(v=>!v)} aria-label={open?'Fechar menu':'Abrir menu'} aria-expanded={open} aria-controls="mobile-menu">{open?<X size={23}/>:<Menu size={23}/>}</button></div>
      </div>
    </header>
    <nav id="mobile-menu" aria-label="Menu para celular" className={`mobile-menu ${open?'is-open':''}`} aria-hidden={!open}>
      <div className="mobile-menu-inner">{sections.map(([name,id])=><a key={id} href={`#${id}`} onClick={close}>{name}<ArrowUpRight size={17}/></a>)}<Booking className="mobile-book"/></div>
    </nav>
  </>;
}
function Hero() {
  return <section className="hero" id="inicio">
    <div className="hero-stage" aria-hidden="true"><OfficialPhoto src={site.heroImage} alt="Ambiente da Gaúchos Hair Itu" kind="hero" loading="eager"/></div>
    <div className="hero-screen"/>
    <div className="container hero-body">
      <div className="hero-text"><p className="kicker hero-kicker"><span className="kicker-line"/> GAÚCHOS HAIR · ITU</p>
        <h1>SEU ESTILO.<br/><em>SUA</em><br/>PRESENÇA.</h1>
        <p className="hero-subtitle">Um novo jeito de apresentar seu próximo visual. Conheça a Gaúchos Hair Itu e encontre o caminho para agendar.</p>
        <div className="hero-buttons"><Booking/><a className="button button-secondary" href="#servicos">Explorar o site <ArrowRight size={18}/></a></div>
      </div>
    </div>
    <a className="hero-scroll" href="#sobre" aria-label="Rolar para conhecer a barbearia">DESCUBRA <ArrowDown size={18}/></a>
    <span className="hero-side-label">BARBEARIA EM ITU · SÃO PAULO</span>
  </section>;
}
function About() {
  return <section className="about section-pad" id="sobre"><div className="container about-grid">
    <div className="about-picture reveal"><OfficialPhoto className="about-main-photo" src={site.aboutImage} kind="chair" alt="Espaço interno da barbearia Gaúchos Hair Itu"/><span className="picture-edge" aria-hidden="true"/></div>
    <div className="about-content reveal"><SectionHeading kicker="A GAÚCHOS HAIR">IDENTIDADE NÃO<br/>SE <em>IMPROVISA.</em></SectionHeading>
      <p>Seu corte faz parte de quem você é. Aqui, a proposta é simples: reunir o universo da Gaúchos Hair Itu em um só lugar, com acesso prático aos serviços, à equipe e ao agendamento.</p>
      <p className="subtle">A história e as imagens oficiais do espaço serão apresentadas após a confirmação dos materiais da barbearia.</p>
      <a className="under-link" href={site.instagram} target="_blank" rel="noreferrer">Acompanhe a Gaúchos Hair no Instagram <ArrowUpRight size={18}/></a>
    </div>
  </div></section>;
}
function ServiceModal({service,onClose}) {
  const ref=useRef(null);
  useBodyLock(true);
  useEffect(()=>{const onKey=e=>{if(e.key==='Escape')onClose();if(e.key==='Tab'){const els=Array.from(ref.current?.querySelectorAll('button,a,[tabindex]:not([tabindex="-1"])')||[]);if(!els.length)return;const first=els[0],last=els[els.length-1];if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus()}}};document.addEventListener('keydown',onKey);ref.current?.querySelector('button')?.focus();return()=>document.removeEventListener('keydown',onKey)},[onClose]);
  return <div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><div ref={ref} className="dialog" role="dialog" aria-modal="true" aria-labelledby="service-title"><button className="modal-close icon-button" onClick={onClose} aria-label="Fechar detalhes"><X/></button><p className="kicker">DETALHES DO SERVIÇO</p><h2 id="service-title">{service.name}</h2><p>{service.description}</p>{service.image&&<img className="dialog-photo" src={asset(service.image)} alt={service.name}/>} {service.gallery?.length>0 && <div className="dialog-gallery">{service.gallery.map((src,i)=><img src={asset(src)} alt={`${service.name} — exemplo ${i+1}`} loading="lazy" key={`${src}-${i}`}/>)}</div>}{service.benefits?.length>0&&<ul className="service-benefits">{service.benefits.map((x,i)=><li key={i}><Check size={17}/>{x}</li>)}</ul>}{(service.price||service.duration)&&<p className="service-facts">{service.duration && <span>Duração: {service.duration}</span>}{service.price&&<span>Valor: {service.price}</span>}</p>}<Booking/></div></div>;
}
function Services() {
  const [selected,setSelected]=useState(null);
  return <section className="services section-pad" id="servicos"><div className="container">
    <div className="services-top reveal"><SectionHeading kicker="SERVIÇOS">UM ESTILO QUE<br/><em>É SÓ SEU.</em></SectionHeading><p>Escolha seu próximo visual. Os serviços e valores oficiais poderão ser consultados no AppBarber assim que o link da unidade estiver configurado.</p></div>
    {site.services.length ? <div className="service-grid">{site.services.map((s,i)=><button key={s.id||s.name||i} className="service-tile reveal" onClick={()=>setSelected(s)}><div className="tile-image"><OfficialPhoto src={s.image} alt={`Exemplo de ${s.name}`}/></div><div className="tile-bottom"><div><h3>{s.name}</h3><span>{s.description}</span></div><ArrowUpRight size={21}/></div></button>)}</div>:
      <div className="service-placeholder reveal"><div className="service-illustration" aria-hidden="true"><Scissors strokeWidth={.8}/></div><div className="service-placeholder-copy"><p className="kicker">CATÁLOGO DE SERVIÇOS</p><h3>ESCOLHA SEU<br/><em>PRÓXIMO VISUAL.</em></h3><p>A lista de serviços está sendo preparada para receber as opções oficiais da Gaúchos Hair Itu. Sem preços ou procedimentos inventados.</p><div className="service-actions"><Booking/><a className="under-link" href={site.instagram} target="_blank" rel="noreferrer">Ver o Instagram <ArrowUpRight size={17}/></a></div></div></div>}
  </div>{selected&&<ServiceModal service={selected} onClose={()=>setSelected(null)}/>}</section>;
}
function Experience() {
  return <section className="experience"><div className="experience-copy reveal"><p className="kicker">SUA EXPERIÊNCIA</p><h2>O QUE FAZ<br/>A DIFERENÇA<br/><em>É O CUIDADO.</em></h2><p>Do primeiro contato à escolha do próximo horário, o site foi pensado para tornar sua visita mais simples.</p><div className="experience-list"><div><strong>ESCOLHA COM CONFIANÇA</strong><span>Conheça os serviços e os profissionais quando o catálogo oficial estiver disponível.</span></div><div><strong>AGENDE SEM COMPLICAÇÃO</strong><span>Agendamento pela plataforma AppBarber utilizada pela barbearia.</span></div><div><strong>ACOMPANHE O TRABALHO</strong><span>Veja os registros e novidades pelo Instagram oficial.</span></div></div><Booking className="button-dark"/></div><div className="experience-image reveal"><OfficialPhoto src={site.experienceImage} kind="tools" alt="Detalhes da Gaúchos Hair Itu"/></div></section>;
}
function Team() {
  return <section id="equipe" className="team section-pad"><div className="container"><div className="team-top reveal"><SectionHeading kicker="NOSSA EQUIPE">O TALENTO POR<br/>TRÁS DO <em>VISUAL.</em></SectionHeading><p>Conheça quem está por trás dos atendimentos da Gaúchos Hair Itu.</p></div>{site.professionals.length ? <div className="team-grid">{site.professionals.map((p,i)=><article className="team-card reveal" key={`${p.name}-${i}`}><OfficialPhoto src={p.image} alt={p.name}/><div className="team-info"><p className="kicker">{p.role}</p><h3>{p.name}</h3><p>{p.description}</p><Booking href={p.bookingUrl || undefined} className="button-sm">Consultar horário</Booking></div></article>)}</div> :
  <div className="team-pending reveal"><div className="team-pending-mark" aria-hidden="true"><img src={asset(site.logo)} alt="" style={{width:"100%",maxWidth:140,opacity:.76,objectFit:"contain"}} /></div><div><p className="kicker">EM PREPARAÇÃO</p><p>Os nomes e retratos oficiais dos profissionais serão adicionados aqui. Enquanto isso, acompanhe a equipe pelo Instagram da barbearia.</p><a className="under-link" target="_blank" rel="noreferrer" href={site.instagram}>Conhecer no Instagram <ArrowUpRight size={17}/></a></div></div>}</div></section>;
}
function Lightbox({items,index,setIndex,onClose}) {
  const dialog=useRef(null),start=useRef(null);
  useBodyLock(true);
  const current=items[index];
  useEffect(()=>{const onKey=e=>{if(e.key==='Escape')onClose();if(e.key==='ArrowRight')setIndex(v=>(v+1)%items.length);if(e.key==='ArrowLeft')setIndex(v=>(v-1+items.length)%items.length);if(e.key==='Tab'){e.preventDefault();const elements=[...dialog.current.querySelectorAll('button')];const next=(elements.indexOf(document.activeElement)+(e.shiftKey?-1:1)+elements.length)%elements.length;elements[next].focus()}};document.addEventListener('keydown',onKey);dialog.current?.querySelector('button')?.focus();return()=>document.removeEventListener('keydown',onKey)},[items.length,onClose,setIndex]);
  return <div className="lightbox" ref={dialog} role="dialog" aria-modal="true" aria-label="Galeria de fotografias" onClick={e=>{if(e.target===e.currentTarget)onClose()}} onTouchStart={e=>start.current=e.touches[0].clientX} onTouchEnd={e=>{if(start.current==null)return;const distance=e.changedTouches[0].clientX-start.current;if(Math.abs(distance)>50)setIndex(v=>(v+(distance<0?1:-1)+items.length)%items.length);start.current=null}}><button className="light-close icon-button" onClick={onClose} aria-label="Fechar galeria"><X/></button><button className="light-prev icon-button" onClick={()=>setIndex((index-1+items.length)%items.length)} aria-label="Fotografia anterior"><ChevronLeft/></button><img src={asset(current.src)} alt={current.alt}/><button className="light-next icon-button" onClick={()=>setIndex((index+1)%items.length)} aria-label="Próxima fotografia"><ChevronRight/></button><p className="light-caption">{current.alt}</p></div>;
}
function Gallery() {
  const cats=['Todas',...new Set(site.gallery.map(i=>i.category).filter(Boolean))];
  const [filter,setFilter]=useState('Todas'),[light,setLight]=useState(-1);
  const items=site.gallery.filter(g=>filter==='Todas'||g.category===filter);
  return <section id="galeria" className="gallery section-pad"><div className="container"><div className="gallery-heading reveal"><SectionHeading kicker="GALERIA">O VISUAL FALA<br/><em>POR SI.</em></SectionHeading><a href={site.instagram} className="under-link" target="_blank" rel="noreferrer">Acompanhar no Instagram <ArrowUpRight size={18}/></a></div>
   {site.gallery.length ? <><div className="gallery-filters" role="group" aria-label="Filtrar fotografias">{cats.map(cat=><button aria-pressed={filter===cat} className={filter===cat?'is-active':''} key={cat} onClick={()=>setFilter(cat)}>{cat}</button>)}</div><div className="gallery-grid">{items.map((g,i)=><button key={`${g.src}-${i}`} className="gallery-card" onClick={()=>setLight(i)} aria-label={`Ampliar: ${g.alt}`}><img src={asset(g.src)} alt={g.alt} loading="lazy"/><span><span>{g.category||'Galeria'}</span><ArrowUpRight/></span></button>)}</div></>:
   <div className="gallery-pending reveal"><div className="gallery-photo-sample"><OfficialPhoto kind="gallery" alt="Fotografia do trabalho da barbearia"/></div><div className="gallery-photo-sample"><OfficialPhoto kind="tools" alt="Fotografia do ambiente da barbearia"/></div><div className="gallery-message"><ImageIcon size={28} strokeWidth={1.2}/><h3>IMAGENS QUE<br/>CONTAM HISTÓRIAS.</h3><p>Esta galeria receberá fotografias reais do espaço, cortes e bastidores da Gaúchos Hair Itu.</p><a className="under-link" href={site.instagram} target="_blank" rel="noreferrer">Ver publicações oficiais <ArrowUpRight size={17}/></a></div></div>}
  </div>{light>=0 && <Lightbox items={items} index={light} setIndex={setLight} onClose={()=>setLight(-1)}/>}</section>;
}
function Comparison() {
  const [positions,setPositions]=useState({});
  if(!site.transformations.length)return null;
  return <section className="comparison section-pad"><div className="container"><SectionHeading kicker="TRANSFORMAÇÕES REAIS">ANTES <em>& DEPOIS.</em></SectionHeading><div className="comparison-grid">{site.transformations.map((t,i)=>{const value=positions[i]??50;return <div className="comparison-card" key={i}><div className="comparison-frame"><img src={asset(t.after)} alt={`Depois: ${t.alt||'transformação'}`}/><div className="comparison-before" style={{clipPath:`inset(0 ${100-value}% 0 0)`}}><img src={asset(t.before)} alt={`Antes: ${t.alt||'transformação'}`}/></div><div className="comparison-handle" style={{left:`${value}%`}}><MoveHorizontal/></div><input type="range" aria-label={`Arraste para comparar antes e depois ${i+1}`} value={value} min="0" max="100" onChange={e=>setPositions(v=>({...v,[i]:Number(e.target.value)}))}/><span className="comparison-label before-label">ANTES</span><span className="comparison-label after-label">DEPOIS</span></div>{t.alt&&<p>{t.alt}</p>}</div>})}</div></div></section>;
}
function Reviews() {
 return <section id="avaliacoes" className="reviews section-pad"><div className="container reviews-inner reveal"><SectionHeading kicker="REPUTAÇÃO">CONFIANÇA SE<br/><em>CONSTRÓI.</em></SectionHeading>{site.reviews.length ? <div className="reviews-grid">{site.reviews.map((r,i)=><blockquote key={i}><p>“{r.quote}”</p><footer><strong>{r.name}</strong><span>{r.source}{r.url&&<> · <a href={r.url} target="_blank" rel="noreferrer">Ver origem <ExternalLink size={12}/></a></>}</span></footer></blockquote>)}</div>:
 <div className="reviews-note"><p>Depoimentos de clientes serão publicados somente depois de verificados. Não usamos avaliações ou notas inventadas.</p><a className="under-link" href={site.instagram} target="_blank" rel="noreferrer">Visitar perfil oficial <ArrowUpRight size={17}/></a></div>}</div></section>;
}
function FAQ() {
 const [active,setActive]=useState(-1);
 return <section id="duvidas" className="faq section-pad"><div className="container faq-grid"><div className="reveal"><SectionHeading kicker="DÚVIDAS FREQUENTES">SIMPLES.<br/><em>DO SEU JEITO.</em></SectionHeading><p className="faq-intro">Tudo para você chegar com a informação certa. Políticas e condições específicas serão confirmadas com a equipe antes da publicação.</p></div><div className="faq-items reveal">{site.faq.map((f,i)=><div className="faq-item" key={i}><h3><button aria-controls={`faq-answer-${i}`} aria-expanded={active===i} onClick={()=>setActive(v=>v===i?-1:i)}>{f.question}<ChevronDown size={20} className={active===i?'is-rotated':''}/></button></h3><div id={`faq-answer-${i}`} className={`faq-answer ${active===i?'is-open':''}`} hidden={active!==i}><p>{f.answer}</p></div></div>)}</div></div></section>;
}
function Contact() {
 const route=site.mapsUrl || (site.address?`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`:'');
 return <section id="contato" className="contact section-pad"><div className="container contact-grid"><div className="contact-left reveal"><p className="kicker">VAMOS NOS ENCONTRAR?</p><h2>SEU PRÓXIMO<br/>VISUAL COMEÇA<br/><em>AQUI.</em></h2><p>Escolha como entrar em contato com a Gaúchos Hair Itu. O agendamento é feito pela plataforma utilizada pela barbearia.</p><div className="contact-buttons"><Booking className="button-dark"/><a className="button button-border-dark" href={site.instagram} target="_blank" rel="noreferrer">Instagram <Instagram size={18}/></a></div></div><div className="contact-details reveal"><div className="contact-detail"><MapPin size={21}/><div><strong>LOCALIZAÇÃO</strong><p>{site.address || 'Itu, São Paulo'}</p>{route&&<a href={route} target="_blank" rel="noreferrer">Como chegar <ArrowUpRight size={16}/></a>}{!route&&<small>Endereço completo a confirmar.</small>}</div></div><div className="contact-detail"><Clock3 size={21}/><div><strong>HORÁRIO DE ATENDIMENTO</strong><p>{site.hours||'Consulte os horários diretamente com a barbearia.'}</p></div></div><div className="contact-detail"><Instagram size={21}/><div><strong>INSTAGRAM OFICIAL</strong><a href={site.instagram} target="_blank" rel="noreferrer">@gauchoshairitu <ArrowUpRight size={16}/></a></div></div>{site.whatsapp&&<div className="contact-detail"><Phone size={21}/><div><strong>WHATSAPP</strong><a target="_blank" rel="noreferrer" href={`https://wa.me/${site.whatsapp.replace(/\D/g,'')}`}>Iniciar conversa <ArrowUpRight size={16}/></a></div></div>}{site.mapEmbedUrl&&<iframe className="contact-map" title="Mapa Gaúchos Hair Itu" src={site.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>}</div></div></section>;
}
function Footer() {
 return <footer className="footer"><div className="container"><div className="footer-top"><div><Brand footer/><p>Seu estilo. Sua presença.</p></div><div className="footer-navigation"><strong>EXPLORAR</strong><div>{[['Sobre','sobre'],['Serviços','servicos'],['Equipe','equipe'],['Galeria','galeria'],['Contato','contato']].map(([name,id])=><a key={id} href={`#${id}`}>{name}</a>)}</div></div><div className="footer-social"><strong>CONEXÕES</strong><a href={site.instagram} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={16}/></a><a href={site.appbarber||site.instagram} target="_blank" rel="noreferrer">{site.appbarber?'AppBarber':'Consultar agendamento'} <ArrowUpRight size={16}/></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Gaúchos Hair Itu. Site demonstrativo sujeito à validação de dados oficiais.</span><div><a href={`${import.meta.env.BASE_URL}privacidade.html`}>Privacidade</a><span>Desenvolvimento web · LZamboni</span></div></div></div></footer>;
}
function App() {
 useEffect(()=>{const elements=document.querySelectorAll('.reveal');if(reduced()||!('IntersectionObserver'in window)){elements.forEach(el=>el.classList.add('is-visible'));return;}const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -25px 0px'});elements.forEach(el=>io.observe(el));return()=>io.disconnect()},[]);
 return <><a href="#conteudo" className="skip-link">Pular para o conteúdo</a><Header/><main id="conteudo"><Hero/><About/><Services/><Experience/><Team/><Gallery/><Comparison/><Reviews/><FAQ/><Contact/></main><Footer/><Booking className="floating-book"/></>;
}
createRoot(document.getElementById('root')).render(<App/>);
