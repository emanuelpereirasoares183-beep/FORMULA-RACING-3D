const V='frm3d-v1',SHELL=['/','/manifest.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.origin===location.origin&&u.pathname.startsWith('/painel'))return;
 const put=x=>{if(x&&(x.ok||x.type==='opaque')){const cp=x.clone();caches.open(V).then(c=>c.put(r,cp))}return x};
 if(/cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net/.test(u.host)){e.respondWith(caches.match(r).then(h=>h||fetch(r).then(put)));return}
 if(u.origin===location.origin){e.respondWith(fetch(r).then(put).catch(()=>caches.match(r).then(h=>h||(r.mode==='navigate'?caches.match('/'):undefined))))}});
