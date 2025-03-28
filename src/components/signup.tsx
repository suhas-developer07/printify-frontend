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



export function RegistrationForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
      const [email,setemail]=useState("");
      const [Username,setUsername]=useState("");
      const [Password,setPassword]=useState("");
      const [confirmPassword,setconfirmPassword]=useState("");
      const [showpassword,setshowpassword]=useState(false);
      const [showConfirmPassword,setshowConfirmPassword]=useState(false);
      const [Error ,setError]=useState("")
      const navigate=useNavigate();

      const togglePassword=()=>{
        setshowpassword(!showpassword);
    }
    const toggleConfirmPassoword=()=>{
      setshowConfirmPassword(!showConfirmPassword)
    }

   async  function handlesubmit(event:any){

      event.preventDefault();
      console.log(Username);
      if(Password!==confirmPassword){
        return setError("password do not matching")
      }
      try{
        const response=await axios.post("http://localhost:3000/api/v1/users/signup",{
          username:Username,
          email,
          password:Password
        })
        if(response.data.newuser){
          navigate("/signin");
        }else{
          setError("Login failed. Please try again.")
        }
      }catch(error){
        console.error("Signup error:", error.response?.data || error.message);
        setError(error.response?.data?.message);
      }
    }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>
          Enter the details below to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
            <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter Username "
                  value={Username}
                  onChange={(e)=>setUsername(e.target.value)}
                  required
                />
              </div>
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
                <div className="flex ">
                <Input 
                   id="password" 
                   type={showpassword? "text":"password"} 
                   required 
                   className="w-84"
                   value={Password}
                   onChange={(e)=>setPassword(e.target.value)} />
                 <div className="-translate-x-9 " onClick={togglePassword}>
                 {showpassword? <EyeOpen/> : <EyeClose/>}
                 </div>
                 </div>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm Password</Label>  
                </div>
                <div className="flex ">
                <Input id="password" type={showConfirmPassword? "text":"password"} required className="w-84"
                 value={confirmPassword}
                 onChange={(e)=>setconfirmPassword(e.target.value)} />
                 <div className="-translate-x-9" onClick={toggleConfirmPassoword}>
                 {showConfirmPassword? <EyeOpen/>:<EyeClose/>}
                 </div>
                 </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" onClick={handlesubmit}>
                  Signup
                </Button>
              </div>
              <div className=" text-center text-sm">
              Already have an account?{" "}
              <a href="/signin" className="underline underline-offset-4">
                Sign in
              </a>
            </div>
            </div>
          </form>
           {/* Show error message if exists */}
           {Error && <p style={{ color: "red" }}>{Error}</p>}
        </CardContent>

      </Card>
    </div>
  )
}
