

import { createServer } from 'http';
import staticHandler from 'serve-handler';
import ws, { WebSocketServer } from 'ws';



//serve static folder
const server=createServer((req,res)=>{
  return staticHandler(req,res,{public: 'public'})
});


const wss=new WebSocketServer({server})


wss.on('connection',(client)=>{
  console.log('Client connecté !')
  client.on('message',(msg)=>{
    console.log(`Message:${msg}`);
    broadcast(msg)
  })
})


function broadcast(msg) {
  for(const client of wss.clients){
    if(client.readyState === ws.OPEN){
      client.send(msg)
    }
  }
}
server.listen(3000,()=>{
  console.log(`server listening...`);
})