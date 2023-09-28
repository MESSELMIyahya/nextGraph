'use client';

import { useSocket } from "@/contexts/socket";
import { useEffect, useState } from "react";

export default function (){

  const { Emit , On , Connected } = useSocket();

  // messages
  const [messages , setMessages]= useState<string[]>([]);
  // text
  const [text,setText] = useState<string>('');

  // send mess 

  function SendMess (){
    if(text){
      Emit('send-message',text);
    }
  }


  // effects

  useEffect(()=>{

    On('new-message',(m:string)=>{
      if(m){
        setMessages(e=>[...e,m])
      }
    })

  },[])

  return (<>
    <h2 className="text-md text-neutral-900">
    You are {
      Connected ? <span className="text-green-500">connected</span> : <span className="text-red-700">not connected</span>
    }


    <div className="my-2">
      <button onClick={SendMess} className="text-white font-medium rounded-md bg-blue-600 px-3 py-1">Send</button>
      <input type="text" className="px-3 py-1 bg-neutral-300 rounded-md" 
        onChange={(e)=>setText(e.target.value)}     
      />
    </div>


    </h2>

    { Connected ? <div className="my-3">Messages List</div> : '' }


    {
      messages.map(e=><h4 className="text-sm px-1 text-blue-600 my-1">{e}</h4>)
    }


  
  </>)
}