import { getClient } from "@/graphql/server";
import { gql } from '@apollo/client';
import ShowFun from "./components/show";


const query = gql`
query ExamleQuery {
  users {
    name,
    id,
    email,
    products {
      title,
      price     
    }
  }
}
`;

export default async function (){

    const {data} = await getClient().query({query:query, 
      context: {
        fetchOptions: {
          next: "nostore"
        },
    }})


    console.log(data);
      

    return (<>
    
        <ShowFun/>
    
    
    </>)
}