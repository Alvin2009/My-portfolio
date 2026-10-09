(function(){
var d=document,b=d.body,rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
function $(s){return Array.prototype.slice.call(d.querySelectorAll(s))}
/* loader */
var ld=d.getElementById('ld'),cn=d.getElementById('lcn'),done=0;
function fin(){if(done)return;done=1;ld.classList.add('go');setTimeout(function(){b.classList.add('ready')},600);setTimeout(function(){ld.classList.add('off');ld.style.display='none'},1800)}
var t0=performance.now(),D=rm?200:1200;
(function tk(n){var p=Math.min(1,(n-t0)/D),e=1-Math.pow(1-p,3);cn.textContent=Math.round(e*100);ld.style.setProperty('--p',e);if(p<1)requestAnimationFrame(tk);else setTimeout(fin,250)})(t0);
setTimeout(fin,4500);
try{
/* word-by-word headings */
function sp(n,c){Array.prototype.slice.call(n.childNodes).forEach(function(x){
if(x.nodeType===3){var f=d.createDocumentFragment();x.textContent.split(/(\s+)/).forEach(function(s){if(!s)return;if(/^\s+$/.test(s)){f.appendChild(d.createTextNode(' '))}else{var w=d.createElement('span'),i=d.createElement('i');w.className='w';i.style.setProperty('--i',c.k++);i.textContent=s;w.appendChild(i);f.appendChild(w)}});x.parentNode.replaceChild(f,x)}
else if(x.nodeType===1&&x.tagName!=='BR')sp(x,c)})}
$('h1,h2').forEach(function(h){sp(h,{k:0})});
/* scroll: progress, hero depth, timeline, process */
var pg=d.getElementById('pg'),hero=d.querySelector('.hero'),tl=d.querySelector('.tl'),st=d.querySelector('.steps'),tkd=0;
function prog(el){var r=el.getBoundingClientRect(),p=(innerHeight*.65-r.top)/r.height;el.style.setProperty('--p',Math.max(0,Math.min(1,p)).toFixed(3))}
function sc(){var y=scrollY,h=d.documentElement.scrollHeight-innerHeight,vh=innerHeight;pg.style.transform='scaleX('+(h>0?y/h:0)+')';
if(!rm&&y<vh*1.2){hero.style.transform='translateY('+(y*.12)+'px)';hero.style.opacity=Math.max(0,1-y/(vh*.8))}
prog(tl);prog(st)}
addEventListener('scroll',function(){if(!tkd){tkd=1;requestAnimationFrame(function(){tkd=0;sc()})}},{passive:true});addEventListener('resize',sc);sc();
var ls=$('.links a:not(.btn)'),so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)ls.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})})},{rootMargin:'-45% 0px -50% 0px'});
$('main section[id]').forEach(function(s){so.observe(s)});
var so2=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');so2.unobserve(e.target)}})},{threshold:.6});
$('.s4').forEach(function(s){so2.observe(s)});
}catch(e){}
})();
