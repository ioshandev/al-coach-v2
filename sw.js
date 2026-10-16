const V='al-v3',CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'],EXT=["https://fonts.googleapis.com/css2?family=Sora:wght@500;700;800&family=Inter:wght@400;500;600&family=Noto+Sans+Sinhala:wght@400;600&display=swap", "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js", "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all([...CORE.map(u=>c.add(u).catch(()=>{})),...EXT.map(u=>fetch(u,{mode:'no-cors'}).then(r=>c.put(u,r)).catch(()=>{}))])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.hostname==='generativelanguage.googleapis.com')return;
 if(r.mode==='navigate'){
  const upd=fetch(r).then(x=>{if(x&&x.ok&&!x.redirected){const y=x.clone();caches.open(V).then(c=>c.put('index.html',y))}return x}).catch(()=>null);
  e.respondWith(caches.match('index.html').then(h=>{if(h){e.waitUntil(upd);return h}return upd.then(x=>x||new Response('Offline',{status:503}))}));return}
 e.respondWith(caches.match(r).then(h=>h||fetch(r).then(x=>{if(x&&(x.ok||x.type==='opaque')){const y=x.clone();caches.open(V).then(c=>c.put(r,y))}return x})))});
