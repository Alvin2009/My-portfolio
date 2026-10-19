/* Minimal behaviour: menu toggle, active section link, gentle reveal. No dependencies. */
document.documentElement.classList.add('js');
document.addEventListener('DOMContentLoaded',function(){
  var btn=document.getElementById('menu-btn'),nav=document.getElementById('nav');
  function close(){nav.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.textContent='Menu'}
  btn.addEventListener('click',function(){var o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o);btn.textContent=o?'Close':'Menu'});
  nav.addEventListener('click',function(e){if(e.target.tagName==='A')close()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.classList.contains('open')){close();btn.focus()}});

  if(!('IntersectionObserver' in window)){document.querySelectorAll('.rv').forEach(function(el){el.classList.add('in')});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});

  var links={};document.querySelectorAll('#nav a[href^="#"]').forEach(function(a){links[a.getAttribute('href').slice(1)]=a});
  var so=new IntersectionObserver(function(es){es.forEach(function(e){var a=links[e.target.id];if(!a)return;if(e.isIntersecting){Object.keys(links).forEach(function(k){links[k].removeAttribute('aria-current')});a.setAttribute('aria-current','true')}})},{rootMargin:'-45% 0px -50% 0px'});
  Object.keys(links).forEach(function(id){var s=document.getElementById(id);if(s)so.observe(s)});
});
