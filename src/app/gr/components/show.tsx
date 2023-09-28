'use client';

import { useEffect } from "react";
import {useQuery} from '@apollo/experimental-nextjs-app-support/ssr';
import { useMutation } from '@apollo/client'
import {gql} from '@apollo/client';

const query = gql`
query GetProducts {
  products {
    title
    description,
    image,
    id
    price,
    author{
      name,
      email,
    }
  }
}
`;


const createUser = gql`
mutation addUser($gg: RegisterUserTyp!){
  registerNewUser(user: $data) {
    email,
    name,
    id
  } 
}

`;

export default function ShowFun (){

    const {data:productsData,networkStatus} = useQuery(query);

    const [mutatfun,{data:DataMut,loading}] = useMutation(createUser);

    useEffect(()=>{
        console.log('here mutation');
        
        console.log(DataMut);
    },[DataMut]);
    
    useEffect(()=>{
        console.log(productsData);
    },[productsData]);


    return (<>
        {
            loading ? 'loading...' : ""
        }
        Hello from Graphql :) {networkStatus}

        <button onClick={()=>mutatfun({variables:{
            "gg": {
                "email":"thebt@gmail.com",
                "name":"Thebt"
            },
        }})}>Click Me</button>
    
    </>)
}