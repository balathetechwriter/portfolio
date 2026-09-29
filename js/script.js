const nav=document.querySelector('.nav');
const glow=document.querySelector('.cursor-glow');
const portrait=document.querySelector('#portraitMorph');
const doc=document.querySelector('#morphDoc');
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
  if(sticky) sticky.classList.toggle('morphing', current > .06 && current < .92);
  if(portrait){
    const x=50+(76-50)*p,y=54+(50-54)*p,size=44+(22-44)*p,rot=1-1.5*p;
    portrait.style.left=`${x}%`;portrait.style.top=`${y}%`;portrait.style.width=`${Math.max(20,size)}vw`;
    portrait.style.transform=`translate(-50%,-50%) rotate(${rot}deg)`;
    portrait.style.filter=`drop-shadow(0 ${35-17*p}px ${45-20*p}px rgba(20,20,20,${.13-.04*p}))`;
  }
  if(heroName){const out=clamp(current/.34);heroName.style.opacity=String(1-out);heroName.style.transform=`translate(-50%,${-50-9*out}%) scale(${1-.08*out})`;heroName.style.filter=`blur(${out*5}px)`}
  if(heroRole){const inP=smoothstep(clamp((current-.18)/.48));heroRole.style.opacity=String(inP);heroRole.style.transform=`translateY(-50%) translateX(${(1-inP)*-5}vw)`}
  if(doc){const dp=smoothstep(clamp((current-.72)/.28));doc.style.opacity=dp;doc.style.transform=`translate(${18-dp*24}vw,${10-dp*8}vh) rotate(${7-dp*7}deg) scale(${.78+dp*.22})`}
  if(scrollHint)scrollHint.style.opacity=String(1-clamp(current/.2));
  if(blobs.length){blobs[0].style.transform=`translate(${current*-12}vw,${current*8}vh) scale(${1+current*.25})`;blobs[1].style.transform=`translate(${current*12}vw,${current*-10}vh)`;blobs[2].style.transform=`translate(${current*8}vw,${current*5}vh) scale(${1-current*.2})`}
  requestAnimationFrame(frame)
}
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>30),{passive:true});requestAnimationFrame(frame);
document.addEventListener('mousemove',e=>{if(glow){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'}});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.section,.work-card,.skill-group,.exp-row,.education-card,.interest-cloud span').forEach(el=>{el.classList.add('reveal');observer.observe(el)});
document.querySelectorAll('[data-transition]').forEach(link=>link.addEventListener('click',e=>{e.preventDefault();const href=link.href;document.querySelector('.page-wipe').classList.add('play');setTimeout(()=>location.href=href,520)}));
