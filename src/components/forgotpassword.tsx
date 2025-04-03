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
import {  LoadingSpinner} from "@/icons/loading"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
 

export function Forgettenpassword({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email,setemail]=useState("");
 
  const [Error ,setError]=useState("");
  const [Loading ,setLoading]=useState(false);
  const navigate=useNavigate();


// sending request to backend
async function handlesubmit(event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>){
    event.preventDefault();
    if(email===""){
      setError("please enter an email");
      return;
    }
    try {
       setLoading(true)
        const response=await axios.post("http://localhost:3000/api/v1/users/forgotpassword",{
            email
        });
        if(response){
          console.log(response.data.message)
         setError(response.data.message || "please enter the OTP sent to your email")
        }   
        navigate("/enterOtp",{state:{email}});
    } catch (error:any) {
        console.error(error.response.data.message);
        setError(error.response.data.message || "An error occurred");
}finally{
  setLoading(false)
}
}
 console.log(Loading)
  
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Forgot Password</CardTitle>
          <CardDescription>
           Enter your email below to receive a password reset OTP
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
                    <CardDescription>
               A Passsword reset OTP sent to be provided email address
              </CardDescription>
              </div>

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full transition-all duration-200 transform hover:-translate-0.5" onClick={handlesubmit}>
                 {Loading?<LoadingSpinner/>:"Send OTP"}
                </Button>
               
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Remembered your password?{" "}
              <Link to="/signin" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
              {/* Show error message if exists */}
              {Error.startsWith("Please")?<p style={{ color: "green" }}>{Error}</p>: <p style={{ color: "red" }}>{Error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  )

}
