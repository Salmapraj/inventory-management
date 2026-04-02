"use client";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
type FormData = {
  name?: string;
  email: string;
  password: string;
};

function AuthClient() {
const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();  
const [isSignIn, setIssignIn] = useState(true);
const [authError, setAuthError] = useState<string | null>(null);
const router = useRouter();

  const onSubmitt = async(fdata:FormData) => {
    setAuthError(null)

    try {
      if(!isSignIn){
      const { data:result, error } = await authClient.signUp.email({
        name: fdata.name! , // required
        email: fdata.email, // required
        password: fdata.password, // required
        callbackURL: "/dashboard",
      },
    {
        onRequest: (ctx) => {
            //show loading
console.log("singing up")
        },
        onSuccess: (ctx) => {
router.push("/dashboard")      
  },
        onError: (ctx) => {
            alert(ctx.error.message);
            console.log('err',ctx)
        },
      });
  
      if (error) {
        setAuthError(error.message || "Signup failed");
      } else {
        console.log("Signup success:", result);
      }

    }
    else{
       const { data:result, error } = await authClient.signIn.email({
        email: fdata.email, // required
        password: fdata.password, // required
        callbackURL: "/dashboard",
      });

      if (error) {
        setAuthError(error.message || "Signup failed");
      } else {
        console.log("Signin success:", result);
      }
    }
    } catch (error) {
          setAuthError("Something went wrong");

    }
  };
  return (
    
    <div className="text-gray-500 w-full max-w-md">
      <h1 className="text-3xl mb-5">{isSignIn ? "Welcome Back" : "Create an Account"}</h1>
      <form onSubmit={handleSubmit(onSubmitt)}>
        {!isSignIn && (
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"

></label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              {...register("name", { required: "email is required" })}
              className="w-full px-3 py-2 border mb-5  border-gray-300 rounded-lg text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="Enter your full name"
            />{" "}
            {errors.name && (
              <p style={{ color: "red" }}>{errors.name.message as string}</p>
            )}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            autoComplete="email"
            className="w-full mb-5  px-3 py-2 border text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message as string}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
             {...register("password", {
          required: "Password is required",
          minLength: { value: 6, message: "Password must be at least 6 characters" },
        })}
            className="w-full mb-5 px-3 py-2 border text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="Enter your password"
          />
                {errors.password && <p style={{ color: "red" }}>{errors.password.message as string}</p>}

        </div>

        <button type="submit" disabled={isSubmitting}   className="text-gray-100  mb-5 rounded-xl p-2 bg-black">
          {isSignIn ? "Sign In" : "Create an account"}
        </button>
      </form>

      <div>
        <button
          type="button"
          onClick={() => {
            setIssignIn(!isSignIn);
          }}
        >
          {isSignIn
            ? "Don't have an account? Sign Up"
            : "Already have an account? Sign In"}
        </button>
      </div>
    </div>
    
  );
}

export default AuthClient;


