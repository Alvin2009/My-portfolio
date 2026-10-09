(function(){
var S=[["Virtual Assistance","Administrative support, organization, online research, data entry, scheduling, and digital organization.","M4 6h16M4 12h16M4 18h10"],
["Website Design &amp; Development","Responsive websites for small businesses and Instagram-based brands, built around your brand, goals, and audience on platforms including WordPress, Wix, and GoDaddy.","M3 5h18v14H3zM3 9h18M7 7h.01"],
["Social Media Management","Content support, social media organization, digital presence management, and Facebook advertising.","M12 21s-7-4.6-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.4-7 10-7 10z"],
["Graphic Design","Clean digital graphics and visual communication using tools such as Canva.","M12 3l9 9-9 9-9-9zM12 8v8"],
["Digital Marketing","Social media marketing, Facebook Ads, and digital campaign support.","M4 20V10M10 20V4M16 20v-8M22 20H2"],
["Data &amp; Administrative Support","Data entry, Google Workspace, spreadsheets, documentation, and organized digital workflows.","M4 4h16v16H4zM4 10h16M10 4v16"]];
var sv=document.getElementById('sv');
S.forEach(function(s,i){sv.insertAdjacentHTML('beforeend','<div class="card rv" style="--d:'+(i%3)*.1+'s"><div class="n"><span>0'+(i+1)+'</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+s[2]+'"/></svg></div><h3>'+s[0]+'</h3><p>'+s[1]+'</p></div>')});
// ADD PROJECTS HERE. Each project is: ["Name","https://live-link","Category","One-line description","optional screenshot path"]
// To show a real screenshot: commit it to the repo (for example images/estora-suites.jpg), then add that path as a 5th item in the project array.
// Without it, a clearly labelled preview frame is shown instead.
var P=[["ESTORA Suites","https://estorasuites.netlify.app/","Personal Project · Real Estate Website","ESTORA Suites is a luxury real estate website concept designed to present a residential space through an immersive, cinematic digital experience. The project explores elegant visual storytelling, modern layouts, atmospheric imagery, and refined interactions to create a premium property presentation. It is a fictional personal concept, not a real listing or client work."]];
var pj=document.getElementById('pj');
if(P.length){var pe0=document.getElementById('pe');if(pe0)pe0.remove()}
P.forEach(function(p){var dom=p[1].replace(/^https?:\/\//,'').replace(/\/$/,''),
mock='<div class="mock"><div class="dots"><i></i><i></i><i></i><u>'+dom+'</u></div><div class="t">'+p[0]+'</div><div class="s">Real estate website concept</div><div class="b"></div><div class="b b2"></div><span class="pill">Open live site</span></div>',
img=p[4]?'<img src="'+p[4]+'" alt="Screenshot of the '+p[0]+' website" loading="lazy" decoding="async">':'';
pj.insertAdjacentHTML('beforeend','<article class="pr rv"><a class="pv2" href="'+p[1]+'" target="_blank" rel="noopener noreferrer" tabindex="-1" aria-hidden="true">'+mock+img+'</a><div class="pt"><small>'+p[2]+'</small><h3>'+p[0]+'</h3><p>'+p[3]+'</p><a class="btn p" href="'+p[1]+'" target="_blank" rel="noopener noreferrer" aria-label="View live project: '+p[0]+' (opens in a new tab)">View Live Project <span>→</span></a></div></article>')});
Array.prototype.forEach.call(pj.querySelectorAll('.pv2 img'),function(im){im.addEventListener('error',function(){im.remove()})});

var nav=document.getElementById('nav'),bg=document.getElementById('bg'),lk=document.getElementById('lk');
addEventListener('scroll',function(){nav.classList.toggle('sm',scrollY>60)},{passive:true});
bg.setAttribute('aria-controls','lk');
function cm(){lk.classList.remove('o');bg.setAttribute('aria-expanded','false');bg.setAttribute('aria-label','Open menu');bg.textContent='☰'}
bg.onclick=function(){var o=lk.classList.toggle('o');bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Close menu':'Open menu');bg.textContent=o?'✕':'☰'};
addEventListener('keydown',function(e){if(e.key==='Escape'&&lk.classList.contains('o')){cm();bg.focus()}});
lk.addEventListener('click',function(e){if(e.target.tagName==='A')cm()});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
/* once a card has revealed, drop the reveal class so its hover transitions are crisp */
var to=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var el=e.target;to.unobserve(el);setTimeout(function(){el.classList.remove('rv')},1400)}})},{threshold:.12});
document.querySelectorAll('.card.rv,.badge.rv').forEach(function(el){to.observe(el)});

var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;

/* ===== Hero: floating 3D laptop ===== */
try{
if(!window.THREE)throw 0;
var cv=document.getElementById('c'),mob=innerWidth<860;
var r=new THREE.WebGLRenderer({canvas:cv,antialias:!mob,alpha:true,powerPreference:'high-performance'});
r.setPixelRatio(Math.min(devicePixelRatio,mob?1.25:1.75));
r.outputEncoding=THREE.sRGBEncoding;r.toneMapping=THREE.ACESFilmicToneMapping;r.toneMappingExposure=1.05;
var sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(40,1,.1,60);cam.position.set(0,1.5,8);

/* reflections: a soft, warm studio (large softboxes, no coloured neon) */
var pn=function(es,w,h,hex,k,x,y,z){var m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color(hex).multiplyScalar(k),side:THREE.DoubleSide}));m.position.set(x,y,z);m.lookAt(0,0,0);es.add(m)};
try{var pm=new THREE.PMREMGenerator(r),es=new THREE.Scene();
es.add(new THREE.Mesh(new THREE.BoxGeometry(30,30,30),new THREE.MeshBasicMaterial({color:0x0c1a14,side:THREE.BackSide})));
pn(es,14,5,0xfff3e0,3.6,0,10,4);pn(es,5,10,0xd4e2d8,2,-11,2,2);pn(es,5,10,0xb9d5c5,1.5,11,0,3);pn(es,12,4,0x2f6b52,1.4,0,-3,-10);pn(es,10,3,0xfff3e0,1.4,0,4,-9);
sc.environment=pm.fromScene(es,.03).texture;pm.dispose()}catch(e){}
sc.add(new THREE.AmbientLight(0xd4e2d8,.35));
var kl=new THREE.DirectionalLight(0xfff1dc,1.0);kl.position.set(3,6,5);sc.add(kl);
var wl=new THREE.PointLight(0xffe6c4,.8,18);wl.position.set(-5,1.5,3);sc.add(wl);
var gl=new THREE.PointLight(0xb9d5c5,.7,18);gl.position.set(5,.5,2);sc.add(gl);

var root=new THREE.Group();sc.add(root);
var rig=new THREE.Group();root.add(rig);
var lap=new THREE.Group();lap.position.set(0,-.95,.1);rig.add(lap);

/* materials: dark, brushed metal */
var alu=new THREE.MeshStandardMaterial({color:0x5c6b63,metalness:1,roughness:.36});
var dark=new THREE.MeshStandardMaterial({color:0x0c1a14,metalness:.6,roughness:.4});
var keyM=new THREE.MeshStandardMaterial({color:0x18211c,metalness:.4,roughness:.55});

/* rounded slab (base + lid) */
function rr(w,h,rad){var s=new THREE.Shape(),x=-w/2,y=-h/2;s.moveTo(x+rad,y);s.lineTo(x+w-rad,y);s.quadraticCurveTo(x+w,y,x+w,y+rad);s.lineTo(x+w,y+h-rad);s.quadraticCurveTo(x+w,y+h,x+w-rad,y+h);s.lineTo(x+rad,y+h);s.quadraticCurveTo(x,y+h,x,y+h-rad);s.lineTo(x,y+rad);s.quadraticCurveTo(x,y,x+rad,y);return s}
function slab(w,d,t,rad,bt,mat){var bs=.012,g=new THREE.ExtrudeGeometry(rr(w-2*bs,d-2*bs,rad),{depth:t-2*bt,bevelEnabled:true,bevelThickness:bt,bevelSize:bs,bevelSegments:4,curveSegments:mob?8:14});var m=new THREE.Mesh(g,mat);m.rotation.x=-Math.PI/2;return m}

/* base */
var base=slab(3.2,2.2,.1,.18,.012,alu);base.position.y=-.05+.012;lap.add(base);
var rim=new THREE.Mesh(new THREE.PlaneGeometry(2.78,1.08),new THREE.MeshStandardMaterial({color:0x0a130f,metalness:.7,roughness:.35}));rim.rotation.x=-Math.PI/2;rim.position.set(0,.0502,-.35);lap.add(rim);
var deck=new THREE.Mesh(new THREE.PlaneGeometry(2.7,1.0),new THREE.MeshBasicMaterial({color:0x08100c}));deck.rotation.x=-Math.PI/2;deck.position.set(0,.0506,-.35);lap.add(deck);
/* keys */
var km=new THREE.InstancedMesh(new THREE.BoxGeometry(.165,.034,.165),keyM,62),dm=new THREE.Object3D(),ki=0;
for(var rw=0;rw<4;rw++)for(var cc=0;cc<14;cc++){dm.position.set(-1.235+cc*.19,.067,-.75+rw*.19);dm.updateMatrix();km.setMatrixAt(ki++,dm.matrix)}
[-1.235,-1.045,-.855,.855,1.045,1.235].forEach(function(x){dm.position.set(x,.067,.01);dm.updateMatrix();km.setMatrixAt(ki++,dm.matrix)});
lap.add(km);
var sp=new THREE.Mesh(new THREE.BoxGeometry(1.32,.034,.165),keyM);sp.position.set(0,.067,.01);lap.add(sp);
/* trackpad */
var tpb=new THREE.Mesh(new THREE.PlaneGeometry(1.14,.66),new THREE.MeshStandardMaterial({color:0x0c1511,metalness:.8,roughness:.4}));tpb.rotation.x=-Math.PI/2;tpb.position.set(0,.0504,.68);lap.add(tpb);
var tp=new THREE.Mesh(new THREE.PlaneGeometry(1.1,.62),new THREE.MeshStandardMaterial({color:0x1f2b25,metalness:.85,roughness:.24}));tp.rotation.x=-Math.PI/2;tp.position.set(0,.0508,.68);lap.add(tp);
/* hinge */
var hinge=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,2.5,20),dark);hinge.rotation.z=Math.PI/2;hinge.position.set(0,.065,-1.07);lap.add(hinge);

/* lid + screen */
var lid=new THREE.Group();lid.position.set(0,.065,-1.07);lid.rotation.x=-1.92;lap.add(lid);
var lb=slab(3.2,2.0,.07,.16,.01,alu);lb.position.set(0,.01,1.0);lid.add(lb);
var bez=new THREE.Mesh(new THREE.PlaneGeometry(3.06,1.95),new THREE.MeshBasicMaterial({color:0x050b08}));bez.rotation.x=Math.PI/2;bez.position.set(0,-.002,1.0);lid.add(bez);

/* screen: abstract website-design interface, drawn on a canvas (no readable text) */
var SW=1024,SH=640,sb=document.createElement('canvas'),sd=document.createElement('canvas');sb.width=sd.width=SW;sb.height=sd.height=SH;
var PAL=['#B9D5C5','#2E8A68','#E8EFE5','rgba(185,213,197,.55)','rgba(241,239,232,.78)'];
var CODE=[[0,[[60,2],[90,4],[40,3]]],[1,[[50,0],[110,4]]],[1,[[80,1],[60,3],[70,4]]],[2,[[40,2],[130,4]]],[2,[[100,3],[50,0]]],[2,[[70,1],[90,4],[30,3]]],[1,[[30,2]]],[0,[]],[0,[[70,2],[80,4]]],[1,[[60,0],[120,3]]],[1,[[90,1],[70,4],[40,0]]],[2,[[50,2],[100,4]]],[2,[[120,3],[40,1]]],[1,[[30,2]]],[0,[[40,2]]],[0,[[110,3],[60,0]]]];
var CY0=130,CH=29,CUR_X=538,CUR_Y=CY0+5*CH;
var CHX=634,CHW=216,PTS=[560,530,545,500,510,465,480,440];
(function(){var c=sb.getContext('2d');
function rect(x,y,w,h,rad,fill,stroke){c.beginPath();c.moveTo(x+rad,y);c.arcTo(x+w,y,x+w,y+h,rad);c.arcTo(x+w,y+h,x,y+h,rad);c.arcTo(x,y+h,x,y,rad);c.arcTo(x,y,x+w,y,rad);c.closePath();if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=1.5;c.stroke()}}
function glow(x,y,rad,col){var g=c.createRadialGradient(x,y,0,x,y,rad);g.addColorStop(0,col);g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(x-rad,y-rad,rad*2,rad*2)}
var bgG=c.createLinearGradient(0,0,SW,SH);bgG.addColorStop(0,'#0d2a20');bgG.addColorStop(1,'#12392b');c.fillStyle=bgG;c.fillRect(0,0,SW,SH);
glow(120,80,300,'rgba(36,150,110,.10)');glow(SW-80,SH-60,360,'rgba(185,213,197,.08)');
/* window bar */
rect(0,0,SW,46,0,'rgba(241,239,232,.04)');
[['#C38B55',28],['#B9D5C5',52],['#E8EFE5',76]].forEach(function(d){c.fillStyle=d[0];c.beginPath();c.arc(d[1],23,6,0,6.283);c.fill()});
rect(130,12,300,22,11,'rgba(241,239,232,.06)');rect(150,20,120,6,3,'rgba(185,213,197,.5)');
/* sidebar */
rect(20,66,170,544,16,'rgba(23,77,58,.8)','rgba(185,213,197,.18)');
var sw=[80,64,90,56,72,84,60,70];
for(var i=0;i<8;i++){var y=96+i*44;if(i===1)rect(30,y-9,150,36,10,'rgba(36,150,110,.22)');rect(42,y,18,18,5,PAL[i%3]);rect(70,y+5,sw[i],8,4,i===1?'rgba(241,239,232,.85)':'rgba(185,213,197,.42)')}
/* editor */
rect(210,66,380,544,16,'rgba(12,30,23,.92)','rgba(185,213,197,.18)');
rect(228,82,92,26,8,'rgba(36,150,110,.24)');rect(240,92,56,6,3,'rgba(241,239,232,.75)');rect(330,82,72,26,8,'rgba(241,239,232,.05)');rect(342,92,40,6,3,'rgba(185,213,197,.5)');
CODE.forEach(function(L,i){var y=CY0+i*CH,x=262+L[0]*26;rect(228,y+4,14,8,3,'rgba(185,213,197,.25)');L[1].forEach(function(s){rect(x,y+4,s[0],10,5,PAL[s[1]]);x+=s[0]+10})});
/* preview card */
rect(610,66,394,250,16,'rgba(18,52,40,.92)','rgba(185,213,197,.18)');
var hg=c.createLinearGradient(630,86,984,196);hg.addColorStop(0,'#2E8A68');hg.addColorStop(1,'#174D3A');rect(630,86,354,110,12,hg);
rect(650,108,180,16,8,'rgba(241,239,232,.92)');rect(650,136,260,8,4,'rgba(241,239,232,.55)');rect(650,154,210,8,4,'rgba(241,239,232,.4)');rect(650,172,92,20,10,'rgba(241,239,232,.95)');
for(var m=0;m<3;m++){var mx2=630+m*122;rect(mx2,212,110,84,12,'rgba(241,239,232,.05)','rgba(185,213,197,.18)');c.fillStyle=PAL[m];c.beginPath();c.arc(mx2+24,236,10,0,6.283);c.fill();rect(mx2+14,258,70,8,4,'rgba(241,239,232,.7)');rect(mx2+14,274,48,6,3,'rgba(185,213,197,.5)')}
/* analytics card */
rect(610,336,394,274,16,'rgba(18,52,40,.92)','rgba(185,213,197,.18)');
rect(634,358,90,10,5,'rgba(241,239,232,.82)');rect(634,378,60,7,3.5,'rgba(185,213,197,.5)');rect(930,352,52,18,9,'rgba(36,150,110,.28)');
c.strokeStyle='rgba(185,213,197,.14)';c.lineWidth=1;[440,480,520,560].forEach(function(gy){c.beginPath();c.moveTo(CHX,gy);c.lineTo(CHX+CHW,gy);c.stroke()});
var ag=c.createLinearGradient(0,430,0,590);ag.addColorStop(0,'rgba(185,213,197,.26)');ag.addColorStop(1,'rgba(185,213,197,0)');
c.beginPath();c.moveTo(CHX,590);PTS.forEach(function(py,k){c.lineTo(CHX+k*CHW/7,py)});c.lineTo(CHX+CHW,590);c.closePath();c.fillStyle=ag;c.fill();
c.strokeStyle='#B9D5C5';c.lineWidth=3;c.lineJoin='round';c.beginPath();PTS.forEach(function(py,k){var px=CHX+k*CHW/7;k?c.lineTo(px,py):c.moveTo(px,py)});c.stroke();
PTS.forEach(function(py,k){if(k<PTS.length-1){c.fillStyle='#143d2f';c.strokeStyle='#B9D5C5';c.lineWidth=2;c.beginPath();c.arc(CHX+k*CHW/7,py,4.5,0,6.283);c.fill();c.stroke()}});
/* ring + bars */
c.strokeStyle='rgba(185,213,197,.18)';c.lineWidth=10;c.beginPath();c.arc(930,468,46,0,6.283);c.stroke();
rect(910,460,40,8,4,'rgba(241,239,232,.82)');rect(916,476,28,6,3,'rgba(185,213,197,.5)');
[[540,.8,0],[560,.55,1],[580,.7,2]].forEach(function(b){rect(880,b[0],100,8,4,'rgba(185,213,197,.18)');rect(880,b[0],100*b[1],8,4,PAL[b[2]])})
})();
var sx2=sd.getContext('2d');
var tex=new THREE.CanvasTexture(sd);tex.encoding=THREE.sRGBEncoding;tex.anisotropy=Math.min(8,r.capabilities.getMaxAnisotropy());
tex.generateMipmaps=!!r.capabilities.isWebGL2;tex.minFilter=tex.generateMipmaps?THREE.LinearMipmapLinearFilter:THREE.LinearFilter;
function drawScreen(T){var c=sx2;c.clearRect(0,0,SW,SH);c.drawImage(sb,0,0);
var li=Math.floor(T*1.4)%CODE.length;c.fillStyle='rgba(185,213,197,.07)';c.fillRect(214,CY0+li*CH-5,372,CH);
if(Math.sin(T*5)>0){c.fillStyle='#B9D5C5';c.fillRect(CUR_X,CUR_Y,9,18)}
var ang=(.62+.06*Math.sin(T*.7))*6.283,rg=c.createLinearGradient(884,468,976,468);rg.addColorStop(0,'#2E8A68');rg.addColorStop(1,'#E8EFE5');
c.strokeStyle=rg;c.lineWidth=10;c.lineCap='round';c.beginPath();c.arc(930,468,46,-1.5708,-1.5708+ang);c.stroke();
var pr=5+2*Math.sin(T*2.6),ex=CHX+CHW,ey=PTS[7];c.fillStyle='rgba(185,213,197,.2)';c.beginPath();c.arc(ex,ey,pr+4,0,6.283);c.fill();c.fillStyle='#E8EFE5';c.beginPath();c.arc(ex,ey,5,0,6.283);c.fill();
tex.needsUpdate=true}
drawScreen(0);
var scr=new THREE.Mesh(new THREE.PlaneGeometry(2.96,1.85),new THREE.MeshBasicMaterial({map:tex,toneMapped:false}));scr.rotation.x=Math.PI/2;scr.position.set(0,-.004,1.02);lid.add(scr);
/* faint glass reflection */
var gcv=document.createElement('canvas');gcv.width=gcv.height=256;var gx=gcv.getContext('2d'),gg=gx.createLinearGradient(0,0,256,256);
gg.addColorStop(0,'rgba(255,255,255,0)');gg.addColorStop(.38,'rgba(255,255,255,0)');gg.addColorStop(.46,'rgba(255,255,255,.12)');gg.addColorStop(.52,'rgba(255,255,255,.02)');gg.addColorStop(.6,'rgba(255,255,255,0)');gg.addColorStop(1,'rgba(255,255,255,0)');gx.fillStyle=gg;gx.fillRect(0,0,256,256);
var glass=new THREE.Mesh(new THREE.PlaneGeometry(2.96,1.85),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(gcv),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false}));glass.rotation.x=Math.PI/2;glass.position.set(0,-.006,1.02);lid.add(glass);
/* gentle light from the screen onto the keyboard */
var sl=new THREE.PointLight(0xfff0d8,.4,5);sl.position.set(0,.9,1.6);lap.add(sl);

/* soft contact shadow and a faint warm floor reflection */
function radTex(stops){var cn=document.createElement('canvas');cn.width=cn.height=256;var x=cn.getContext('2d'),g=x.createRadialGradient(128,128,0,128,128,128);stops.forEach(function(s){g.addColorStop(s[0],s[1])});x.fillStyle=g;x.fillRect(0,0,256,256);var t=new THREE.CanvasTexture(cn);t.encoding=THREE.sRGBEncoding;return t}
var sh=new THREE.Mesh(new THREE.PlaneGeometry(5,5),new THREE.MeshBasicMaterial({map:radTex([[0,'rgba(0,0,0,.7)'],[.5,'rgba(0,0,0,.25)'],[1,'rgba(0,0,0,0)']]),transparent:true,depthWrite:false}));sh.rotation.x=-Math.PI/2;sh.position.y=-1.72;sh.scale.set(1,.6,1);root.add(sh);
var ug=new THREE.Mesh(new THREE.PlaneGeometry(5.2,5.2),new THREE.MeshBasicMaterial({map:radTex([[0,'rgba(241,239,232,.09)'],[.6,'rgba(241,239,232,.02)'],[1,'rgba(0,0,0,0)']]),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));ug.rotation.x=-Math.PI/2;ug.position.y=-1.68;ug.scale.set(1,.6,1);root.add(ug);

var mx=0,my=0,sx=0,sy=0,vis=true,lastS=0,every=mob?110:66;
addEventListener('pointermove',function(e){mx=e.clientX/innerWidth*2-1;my=e.clientY/innerHeight*2-1});
function rs(){var w=cv.clientWidth,h=cv.clientHeight;r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();
var hw=Math.tan(20*Math.PI/180)*8.1*(w/h);
if(w>860){root.scale.setScalar(Math.min(1.35,hw*.26));root.position.set(hw*.5,.1,0)}
else{root.scale.setScalar(Math.min(.95,hw*.52));root.position.set(0,1.55,0)}}
rs();addEventListener('resize',rs);
new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(cv);
function loop(ts){requestAnimationFrame(loop);if(!vis||document.hidden)return;
var T=rm?0:ts*.001;
sx+=(mx-sx)*.05;sy+=(my-sy)*.05;
rig.rotation.y=-.25+Math.sin(T*.3)*.2+(rm?0:sx*.2);
rig.rotation.x=Math.sin(T*.45)*.02+(rm?0:sy*.08);
rig.rotation.z=Math.sin(T*.35)*.015;
rig.position.y=Math.sin(T*.7)*.08;
var k=1-rig.position.y*.5;sh.scale.set(k,.6*k,1);ug.scale.set(k,.6*k,1);
if(!rm&&ts-lastS>every){lastS=ts;drawScreen(T)}
cam.position.x+=(sx*.35-cam.position.x)*.04;cam.position.y+=(1.5-sy*.25-cam.position.y)*.04;cam.lookAt(0,0,0);
r.render(sc,cam)}
requestAnimationFrame(loop);
}catch(e){document.getElementById('c').style.display='none'}
})();
