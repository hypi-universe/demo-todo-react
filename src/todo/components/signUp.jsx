import React, { useState } from "react";

import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';
// import { useCookies } from "react-cookie";
const LoginQuery = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
		sessionToken
	  }
  }
`;
const Signup = () => {
	// const [cookie, setCookie, removeCookie] = useCookies();
// 	const  [addTodo,{ result, loading, err }] = useMutation(
// 		gql`
// 		mutation {
// 		  createAccount(
// 			  value: {
// 				  username: $username,
// 				  password: { value: $password }
// 			  }
// 			  ) {
// 				  id
// 				  created
// 				  createdBy
// 			  }
// 		 }
// 		`,
//       {variables: {
// 		variables: {
// 			username: "ola",
// 			password: "the password"
// 	  }
// 	}});
	const [isLogin, setIsLogin] = useState(false);
	const [error, setError] = useState("");
	const [username, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	
	const [login,{data }] = useLazyQuery(gql`
	query login($username: String!
		$password: String!){
		login(
		  username: $username,
		  password: $password
		  ){
			sessionToken
		  }
	  }      
	`,{
		fetchPolicy: 'network-only',
	});
	const [signup,{ result, loading, }] = useMutation(
        gql`
		mutation createAccount(
			$username: String!
			$password: String!
		  ) {
			createAccount(
			  value: {
				username: $username
				password: { value: $password }
			  }
			) {
			  id
			  created
			  createdBy
			}
		  }
		`
    );

//   if (loading) return 'Loading...';
//   if (error) return `Error! ${error.message}`;
//   console.log(`this should be a token: ${data}`);
//   console.log(data);
// 	console.log(username, password, phoneNumber);
// 	// console.log(cookie);

	const handleSubmit = async (e, endpoint) => {
		e.preventDefault();
		if (!isLogin && password !== confirmPassword) {
			setError("Make sure password match!");
			return;
		}
		// const response = await fetch(
		// 	`${process.env.REACT_APP_SERVERURL}/${endpoint}`,
		// 	{
		// 		method: "POST",
		// 		headers: { "Content-Type": "application/json" },
		// 		body: JSON.stringify({ username, password, phoneNumber }),
		// 	}		
		// );
		login(
			{
				variables: {
					username: username, password: password
			  }
			}
		  )
		  .then((result) => {
			console.log("did bro even get here?")
			console.log("this should be a token: ",result);
			console.log(result);
			let token = result?.data?.login.sessionToken;
				localStorage.setItem('token', token);
				location.reload();
		  });
								// const handleUpdate = useCallback(
					
	};
	
	const handleSignup = async (e, endpoint) => {
		e.preventDefault();
		if (!isLogin && password !== confirmPassword) {
			setError("Make sure password match!");
			return;
		}
		// const response = await fetch(
		// 	`${process.env.REACT_APP_SERVERURL}/${endpoint}`,
		// 	{
		// 		method: "POST",
		// 		headers: { "Content-Type": "application/json" },
		// 		body: JSON.stringify({ username, password, phoneNumber }),
		// 	}		
		// );
		signup(
			{
				variables: {
					username: username,
					password: password
			  }
			}
		  )
		  .then((result) => {
			console.log("did bro even get here?")
			console.log("this should be a token: ",result);
			console.log(result);
			login(
				{
					variables: {
						username: username,
						password: password
				  }
				}
			  )
			  .then((result) => {
				console.log("did bro even get here?")
				console.log("this should be a token: ",result);
				console.log(result);
				let token = result?.data?.login.sessionToken;
				localStorage.setItem('token', token);
				location.reload();
			  });
		  });
								// const handleUpdate = useCallback(
								// 	(title) => {
										
							
								// 		// if (title.length === 0)
								// 		// 	removeItem(id);
								// 		// else
								// 		// 	updateItem(id, title);
							
								// 		// setIsWritable(false);
								// 	},
								// 	// [id, removeItem, updateItem]
								// );
				  console.log(`this should be a token: ${data}`);
				  console.log(data);
		// const data = await response.json();

		// if (data.detail) {
		// 	console.log("Data", data);
		// 	setError(data.detail);
		// } else {
		// 	// setCookie("Email", data.username);
		// 	// setCookie("AuthToken", data.token);
		// 	// window.location.reload();
		// }
	};
	return (
		<div className="flex flex-row w-100 min-h-screen bg-[#C5D2E4]">
			<div className="w-[100%] sm:flex sm:justify-center sm:items-center  hidden">
				{/* <img
					src={`logo.png`}
					alt=""
					className="w-[7rem] absolute top-6 left-4 flex md:hidden"
				/> */}
				<div className="relative mt-[9rem]">
					{/* <img
						className="absolute left-[-10rem]  top-[-15rem]"
						src={`icon1.png`}
						alt=""
					/>
					<img
						className="absolute right-[-10rem]  top-[-18rem]"
						src={`icon1.png`}
						alt=""
					/>
					<img
						src={`icon2.png`}
						alt=""
						className="md:w-[15rem] md:ml-[4rem] xl:w-full "
					/> */}
				</div>
			</div>
			<div className="bg-[#7E9AB7] z-10  md:m-[5rem] md:rounded-lg md:w-full xl:w-[60%]  w-full flex p-8 justify-center items-center ">
				{/* <img
					src={`logo.png`}
					alt=""
					className="w-[7rem] absolute top-6 left-4 "
				/>
				<img
					className="absolute w-[30rem] opacity-40 flex md:hidden right-[3%] z-[-1] top-[20%]"
					src={`icon1.png`}
					alt=""
				/> */}
				<div className="">
					<div className="  md:col-span-1">
						<h2 className="md:text-3xl text-xl  font-semibold text-white text-center mb-[1rem] md:mb-[3rem]">
							{isLogin ? "Welcome Back" : "Create Your account"}
						</h2>
						{/* <h2 className="text-xl font-semibold  text-center text-gray-800 mb-4">
              {isLogin ? "Login" : "Signup"}
            </h2> */}

						<form className="space-y-4">
							<div>
								<label className="block text-white text-sm font-medium  mb-1">
									Username
								</label>
								<input
									type="username"
									className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
									required
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-white mb-1">
									Password
								</label>
								<input
									type="password"
									className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
									required
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							{!isLogin && (
								<div>
									<label className="block text-sm font-medium text-white mb-1">
										Confirm Password
									</label>
									<input
										type="password"
										onChange={(e) => setConfirmPassword(e.target.value)}
										className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
										required
									/>
								</div>
							)}
							{error && <p>{error}</p>}
							<div>
								{isLogin ? (
									<button
										onClick={(e) => handleSubmit(e, "login")}
										type="submit"
										className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
									>
										Login
									</button>
								) : (
									<button
										onClick={(e) => handleSignup(e, "signup")}
										type="submit"
										className="w-full bg-[#0682C8] text-white py-2 px-4 rounded-md hover:bg-[#5487a4]] focus:outline-none"
									>
										Get Started
									</button>
								)}
							</div>
						</form>
						<p className="mt-4 text-center text-white flex">
							{isLogin ? "Don't have an account? " : "Already have an account?"}

							<span
								onClick={() => setIsLogin(!isLogin)}
								className="text-blue-800 ml-2 cursor-pointer hover:text-blue-500"
							>
								{!isLogin ? "Log in" : "Sign up"}
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;
