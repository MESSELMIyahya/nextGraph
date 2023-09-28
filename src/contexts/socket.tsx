'use client';
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import io , {Socket} from 'socket.io-client';

// ctx type 
interface CTXType {
    Connected : boolean;
    Socket:Socket;
}

const ctx = createContext<CTXType>({} as CTXType);


// types 
interface Props {
    children:React.ReactNode;
    socketUrl:string;
}


export default function SocketProvider ({children,socketUrl}:Props){

    const [connected , setConnected] = useState<boolean>(false);

    const socket = useMemo(()=>{
        const con = io(socketUrl);
        return con.connect();
    },[]);




    // functions 

    // effects 
    useEffect(()=>{

        if(socket){
            socket.on("connect", () => {
                console.log('connected'); 
                console.log(socket.id);
                setConnected(true)
            });
              
            socket.on("disconnect", () => {
                console.log('disconnected'); 
                setConnected(false);
            });
        }



    },[socket]);

    return(<ctx.Provider value={{Connected:connected,Socket:socket}}>{children}</ctx.Provider>);
}



// hook 
type OnSocketType = (ev:string,callback:(data:any)=>void)=>void;
type EmitSocketType = (ev:string,data:any)=>void;

type useSocketType = ()=>{Connected:boolean,On:OnSocketType,Emit:EmitSocketType};

export const useSocket : useSocketType = ()=>{
    const {Connected,Socket} = useContext(ctx);
    const On : OnSocketType = (ev,cb)=> Socket.on(ev,cb);
    const Emit : EmitSocketType = (ev,cb)=> Socket.emit(ev,cb);
    return {Connected,On,Emit};
}
