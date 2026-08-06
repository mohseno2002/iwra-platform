/* منصة مصلحة الري — عامل الخدمة v2.6.9
   تنصيب متسامح: أي ملف ناقص لا يُفشل التثبيت. بيانات Firebase/Sheets لا تُعترض. */
var CACHE_NAME='iwra-v2.6.9';
var CORE=['./','./index.html','./manifest.webmanifest'];
var EXTRA=['./icons/icon-192.png','./icons/icon-512.png','./icons/icon-180.png','./icons/icon-maskable-512.png'];
self.addEventListener('install',function(e){
 e.waitUntil(caches.open(CACHE_NAME).then(function(c){
  return Promise.all(CORE.concat(EXTRA).map(function(u){return c.add(u).catch(function(){})}))
 }).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){
 e.waitUntil(caches.keys().then(function(ks){
  return Promise.all(ks.filter(function(k){return k!==CACHE_NAME}).map(function(k){return caches.delete(k)}))
 }).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
 var u;try{u=new URL(e.request.url)}catch(x){return}
 if(e.request.method!=='GET'||u.origin!==self.location.origin)return;
 if(e.request.mode==='navigate'){
  e.respondWith(fetch(e.request).then(function(r){
   var cp=r.clone();caches.open(CACHE_NAME).then(function(c){c.put('./index.html',cp)});return r
  }).catch(function(){return caches.match('./index.html')}));return}
 e.respondWith(caches.match(e.request).then(function(r){
  return r||fetch(e.request).then(function(rr){
   var cp=rr.clone();caches.open(CACHE_NAME).then(function(c){c.put(e.request,cp)});return rr})}))});
