const nav=document.querySelector('.nav');
const glow=document.querySelector('.cursor-glow');
const portrait=document.querySelector('#portraitMorph');
const hero=document.querySelector('.morph-hero');
const heroName=document.querySelector('#heroName');
const heroRole=document.querySelector('#heroRole');
const scrollHint=document.querySelector('.scroll-hint');
const sticky=document.querySelector('.morph-sticky');
const blobs=[...document.querySelectorAll('.color-blob')];
let target=0,current=0;
const clamp=(n,a=0,b=1)=>Math.min(b,Math.max(a,n));
const smoothstep=t=>t*t*(3-2*t);
function frame(){
  if(hero){const r=hero.getBoundingClientRect();const max=Math.max(1,hero.offsetHeight-innerHeight);target=clamp(-r.top/max)}
  current+=(target-current)*0.085;
  const p=smoothstep(current);
  if(sticky) sticky.classList.toggle('morphing',current>.06&&current<.92);
  if(portrait){
    const morphP=smoothstep(clamp((current-.10)/.62));
    const x=76+(72-76)*morphP, y=58+(50-58)*morphP, size=42+(31-42)*morphP;
    portrait.style.left=`${x}%`; portrait.style.top=`${y}%`; portrait.style.width=`${Math.max(20,size)}vw`;
    portrait.style.transform=`translate(-50%,-50%) rotate(${-.8*morphP}deg)`;
    portrait.style.filter=`drop-shadow(0 ${30-12*p}px ${40-18*p}px rgba(20,20,20,${.14-.04*p}))`;
  }
  if(heroName){
    const out=smoothstep(clamp((current-.16)/.38));
    heroName.style.opacity=String(1-out);
    heroName.style.transform=`translateY(${(-50-5*out)}%) translateX(${-3*out}vw) scale(${1-.025*out})`;
    heroName.style.filter=`blur(${out*2.5}px)`;
  }
  if(heroRole){
    const inP=smoothstep(clamp((current-.28)/.42));
    heroRole.style.opacity=String(inP);
    heroRole.style.transform=`translateY(-50%) translateX(${(1-inP)*-5}vw)`;
  }
  if(scrollHint)scrollHint.style.opacity=String(1-clamp(current/.18));
  if(blobs.length){
    blobs[0].style.transform=`translate(${current*-10}vw,${current*7}vh) scale(${1+current*.2})`;
    blobs[1].style.transform=`translate(${current*10}vw,${current*-8}vh)`;
    blobs[2].style.transform=`translate(${current*6}vw,${current*4}vh) scale(${1-current*.15})`;
  }
  requestAnimationFrame(frame);
}
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>30),{passive:true});
requestAnimationFrame(frame);
document.addEventListener('mousemove',e=>{if(glow){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'}});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.section,.work-card,.skill-group,.exp-row,.education-card,.interest-cloud span').forEach(el=>{el.classList.add('reveal');observer.observe(el)});
document.querySelectorAll('[data-transition]').forEach(link=>link.addEventListener('click',e=>{e.preventDefault();const href=link.href;document.querySelector('.page-wipe').classList.add('play');setTimeout(()=>location.href=href,520)}));
