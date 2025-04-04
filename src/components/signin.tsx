import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { EyeOpen, EyeClose } from "@/icons/eyeicon"
import axios from "axios"
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email,setemail]=useState("");
  const [Password,setPassword]=useState("");
  const [showpassword,setshowpassword]=useState(false);
  const [Error ,setError]=useState("")
  const navigate=useNavigate();

  const togglePassword=()=>{
    setshowpassword(!showpassword);
}

// sending request to backend
  async function handlesubmit(event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>):Promise<void>{
    event.preventDefault();
    try{
      const response=await axios.post("http://localhost:3000/api/v1/users/signin",{
        email,
        password:Password
      })
      // console.log(response)
      if(response?.data?.token){
        const jwt=response.data.token;
        localStorage.setItem("token",jwt);
        alert("you looged in");
        navigate("/homepage")
      }else{
        setError("Login failed. Please try again.")
      }

      }catch(error:any){
        console.error("Login error:", error.response?.data.message || error.message);
        setError(error.response?.data?.message );
      }
    }

    function handleGoogleLogin(){
     window.location.href="http://localhost:3000/api/v1/users/auth/google";
    };

  
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e)=>setemail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="flex">
                <Input 
                   id="password" 
                   type={showpassword? "text":"password"} 
                   required 
                   className="w-65 sm:w-84"
                   value={Password}
                   onChange={(e)=>setPassword(e.target.value)} />
                 <div className="-translate-x-9 " onClick={togglePassword}>
                 {showpassword? <EyeOpen/> : <EyeClose/>}
                 </div>
                 </div>
                 <Link
                   to="/forgotpassword"
                    className=" inline-block text-sm underline-offset-4 hover:underline "
                  >
                    Forgot your password?
                  </Link>
                
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full transition-all duration-200 transform hover:-translate-0.5" onClick={handlesubmit}>
                  Login
                </Button>
                <Button variant="outline" className="w-full transition-all duration-200 transform hover:-translate-0.5" onClick={handleGoogleLogin}>
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
              {/* Show error message if exists */}
              {Error && <p style={{ color: "red" }}>{Error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  )

}