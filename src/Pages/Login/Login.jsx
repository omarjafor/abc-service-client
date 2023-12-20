import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";


const Login = () => {
    const [authError, setAuthError] = useState('');
   
    const { signIn, googleLogin, facebookLogin, twitterLogin, githubLogin } = useAuth()

    const handleSignIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        const toastId = toast.loading('User Login in....')
        signIn(email, password)
        .then(res => {
            const loggedInUser = res.user;
            const user = { email: loggedInUser.email}
            
            axios.post('http://localhost:5000/jwt', user, { withCredentials: true })
            .then(res => {
                if (res.data.success) {
                    toast.success('User Login Successful', { id: toastId });
                    navigate(location?.state ? location.state : '/');
                }
            })
            form.reset();
        })
        .catch(err => {
            console.log(err.message);
            setAuthError('Check Your Email or Password');
            toast.error('Login Failed', { id: toastId })
        })
    }

    const handleGoogleLogin = () => {
        const toastId = toast.loading('User Login in....')
        googleLogin()
        .then(res => {
            console.log(res.user)
            const loggedInUser = res.user;
            const user = { email: loggedInUser.email }
            axios.post('http://localhost:5000/jwt', user, { withCredentials: true })
                .then(res => {
                    if (res.data.success) {
                        toast.success('User Login Successful', { id: toastId });
                        navigate(location?.state ? location.state : '/');
                    }
                })
            // toast.success('User Login Successfull', { id: toastId })
            // navigate(location?.state ? location.state : '/');
        })
        .catch(err => {
            console.log(err.message);
            toast.error('Login Failed', { id: toastId })
        })
    }

    const handleFacebookLogin = () => {
        const toastId = toast.loading('User Login in....')
        facebookLogin()
            .then(res => {
                console.log(res.user)
                toast.success('User Login Successfull', { id: toastId })
                navigate(location?.state ? location.state : '/');
            })
            .catch(err => {
                console.log(err.message);
                toast.error('Login Failed', { id: toastId })
            })
    } 

    const handleTwitterLogin = () => {
        const toastId = toast.loading('User Login in....')
        twitterLogin()
            .then(res => {
                console.log(res.user)
                toast.success('User Login Successfull', { id: toastId })
                navigate(location?.state ? location.state : '/');
            })
            .catch(err => {
                console.log(err.message);
                toast.error('Login Failed', { id: toastId })
            })
    }

    const handleGithubLogin = () => {
        const toastId = toast.loading('User Login in....')
        githubLogin()
            .then(res => {
                console.log(res.user)
                toast.success('User Login Successfull', { id: toastId })
                navigate(location?.state ? location.state : '/');
            })
            .catch(err => {
                console.log(err.message);
                toast.error('Login Failed', { id: toastId })
            })
    }

    return (
        <section className="relative flex flex-wrap lg:h-screen lg:items-center">
            <Helmet>
                <title>Abc Service | Login</title>
            </Helmet>
            <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl dark:text-white">Get Started Today!</h1>
                </div>

                <form onSubmit={handleSignIn} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>

                        <div className="relative">
                            <input
                                type="email" name="email"
                                className="w-full rounded-lg border border-solid border-blue-400 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter email"
                            />

                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>

                        <div className="relative">
                            <input
                                type="password" name="password"
                                className="w-full rounded-lg border border-solid border-blue-400 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter password"
                            />

                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div className="">
                        <p className="text-base text-gray-500 dark:text-gray-300">
                            Don&apos;t have an account? &nbsp;
                            <Link className="underline text-black dark:text-white font-semibold" to='/register'>Sign up</Link>
                        </p>

                        <button
                            type="submit"
                            className="w-full my-4 rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white hover:text-black hover:bg-green-400"
                        >
                            Sign in
                        </button>
                        {
                            authError && <p className="text-red-600"> {authError} </p>
                        }
                    </div>
                </form>
                <div className="flex mt-3 w-11/12 mx-auto space-x-4 justify-center justify-items-center items-center">
                    <button
                        className="block select-none relative mb-4 place-items-center align-middle"
                        onClick={handleGoogleLogin}
                        data-ripple-light="true"
                    >
                        <img src="https://i.ibb.co/5Wy5sXn/google.png" alt="" className="h-12 w-12 mx-auto" />
                    </button>
                    <button
                        className="block select-none relative mb-4 place-items-center align-middle"
                        onClick={handleFacebookLogin}
                        data-ripple-light="true"
                    >
                        <img src="https://i.ibb.co/qsscgfD/facebook.png" alt="" className="h-12 w-12 mx-auto" />
                    </button>
                    <button
                        className="block select-none relative mb-4 place-items-center align-middle"
                        onClick={handleTwitterLogin}
                        data-ripple-light="true"
                    >
                        <img src="https://i.ibb.co/3rfR0H7/twitter.png" alt="" className="h-12 w-12 mx-auto" />
                    </button>
                    <button
                        className="block select-none relative mb-4 place-items-center align-middle"
                        onClick={handleGithubLogin}
                        data-ripple-light="true"
                    >
                        <img src="https://i.ibb.co/xf4HYnH/github.png" alt="" className="h-12 w-12 mx-auto" />
                    </button>
                </div>
            </div>

            <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
                <img
                    alt="Welcome"
                    src="https://images.unsplash.com/photo-1603912699214-92627f304eb6?auto=format&fit=crop&q=80&w=1925&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>
        </section>
    );
};

export default Login;