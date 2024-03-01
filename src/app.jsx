import { useReducer } from "react";
import { Header } from "./todo/components/header";
import { Main } from "./todo/components/main";
import { Footer } from "./todo/components/footer";
// import SignupPage from "./todo/components/signUp";
import { gql, useQuery } from '@apollo/client';
import Login from "./todo/components/signUp";

import { todoReducer } from "./todo/reducer";

// import "./app.css";

import {
	ApolloClient,
	ApolloLink,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export function App() {
	// const hist = createBrowserHistory();

	const httpLink = createHttpLink({
		uri: "https://api.hypi.app/graphql/",
	});
	const uri = 'https://api.hypi.app/graphql/';
	const authToken = "eyJhbGciOiJSUzI1NiJ9.eyJoeXBpLmxvZ2luIjp0cnVlLCJoeXBpLnVzZXJuYW1lIjoiYmFua2FpIiwiaHN2IjotMSwiYXVkIjoiMDFIUEVNNkZURDhRV0hUQlRNTjdROEs2VzkiLCJpYXQiOjE3MDg4MzQ2MDAsImV4cCI6MTcxMTQyNjYwMCwic3ViIjoiMDFocWY3NTkyMzZ2aGJ0OHI0anIwMTVzYXYiLCJuYmYiOjE3MDg4MzQ2MDB9.5Tt9IGliCUrUpcLLW1Cfs6znvfbbpFsyx_gGDueDcR4Z8sTApjjcZANubUjDZFj17OddARrddOD9Cz5iogw9tzH4pElxZexa4KRmVEbFk5W-hf8n3LmlSdbwyovPA0SdStuM9-i2yLkqfkvY8KIo5eUK8y0N-OmC3tH0LiICrClUMcvWWuUj_Bwj-zsZi3MD2U8REg2Hk3evS6Zzhb0aXtf5Tmgy6QVAX8oUDDLc8r4gKnGgBmbNXN9STitJNPGWos8EPMsZO02Ko4_rJ8VlOB-UlgQ_XrBc8IkXNVNwfutOJ5-_VTcNv28ywdaxotxKBTwfrbTBzD9idN-sEfe9ng"; 
	
  const auth = setContext((operation, context) => (localStorage.getItem('token') ? {
    headers: {
      "authorization" : `${authToken}`,        
      "hypi-domain": "theorising-romance.apps.hypi.app"
      },
  }:{
    headers: {       
        "hypi-domain": "theorising-romance.apps.hypi.app"
      },
  }));
  const link = ApolloLink.from([auth, createHttpLink({uri, withCredentials: true})]);
  const cache = new InMemoryCache();

	const client = new ApolloClient({
		link: link,
		cache: cache,
	});

	const [todos, dispatch] = useReducer(todoReducer, []);

	// const {data } = useQuery(gql`
	// {
	//   login(
	// 	username: "ola",
	// 	password: "Sa8pl8A88"
	// 	){
	// 	  sessionToken
	// 	}
	// }      
	// `);
	console.log("did bro even get here");
	client.watchQuery({
		query: gql`
		{
		  login(
			username: "ola",
			password: "Sa8pl8A88"
			){
			  sessionToken
			}
		}      
		`,
		fetchPolicy: 'network-only'
	  }).subscribe((result) => {
		// console.log("did bro even get here?")
		// // // this.todosService.deserializeItem(result?.data?.find.edges ?? [])
		// // this.token = result?.data?.login.sessionToken;
		// // if (this.token == null) {
		// //   this.authenticate = "Failed retry";
		// // }
		// // else{
		// //   localStorage.setItem('token', this.token);
		// //   location.reload();
		// // }
	  
		// // this.loading = result.loading;
		// // this.error = result.error;
		// console.log(`this should be a token: ${result}`);
		// console.log(result);
	  });
	  if (localStorage.getItem('token')) {
		return (
		<>
				<ApolloProvider client={client}>
					<Header dispatch={dispatch} />
					<Main todos={todos} dispatch={dispatch} />
					<Footer todos={todos} dispatch={dispatch} />
				</ApolloProvider>
			</>
		);
	  }
	  else{
		return (
			<>
			<ApolloProvider client={client}>
				<Login />
			</ApolloProvider>
		</>
		); 
	  }
}
