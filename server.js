import http from 'node:http';
import { readFile } from 'node:fs/promises';
const port = Number(process.env.PORT || 3000);
const assets = new Map([['/',['index.html','text/html']],['/app.js',['app.js','text/javascript']],['/style.css',['style.css','text/css']]]);
http.createServer(async (req,res) => {
  if(req.url === '/api/health') { res.writeHead(200,{'Content-Type':'application/json'}); return res.end(JSON.stringify({status:'ok',mode:'demo',integrationsConnected:false})); }
  const asset=assets.get(req.url);
  if(!asset || req.method !== 'GET') {res.writeHead(404);return res.end('Not found');}
  try {const body=await readFile(new URL(`./public/${asset[0]}`,import.meta.url)); res.writeHead(200,{'Content-Type':`${asset[1]}; charset=utf-8`,'X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'self'; style-src 'self'; script-src 'self'; base-uri 'none'; frame-ancestors 'none'"});res.end(body);} catch {res.writeHead(500);res.end('Unable to load application');}
}).listen(port,'0.0.0.0',()=>console.log(`Valdespou listening on port ${port} (demo mode)`));
