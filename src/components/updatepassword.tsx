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
import { useLocation } from "react-router-dom";
// import axios from "axios"
// import { useNavigate } from "react-router-dom"; 



export function UpdatePassword({
  className,
  ...props
}: React.ComponentProps<"div">) {
      const [Password,setPassword]=useState("");
      const [confirmPassword,setconfirmPassword]=useState("");
      const [showpassword,setshowpassword]=useState(false);
      const [showConfirmPassword,setshowConfirmPassword]=useState(false);
      const [Error ,setError]=useState("")
      const location = useLocation();
      const email = location.state?.email || "No Email Provided"; 
    //   const navigate=useNavigate();

    async function handlesubmit(event:React.FormEvent<HTMLFormElement>){
      event.preventDefault();
      if(Password!==confirmPassword){
        return setError("password is not matching")
      }
      try {
        const response=await axios.post("http://localhost:3000/api/v1/users/resetpasswordotp",{
            email:email,
            password:Password
        })
        console.log(response)
      } catch (error) {
        console.log(error);
      }
    }

      const togglePassword=()=>{
        setshowpassword(!showpassword);
    }
    const toggleConfirmPassoword=()=>{
      setshowConfirmPassword(!showConfirmPassword)
    }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    <div className="w-full max-w-sm">
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
          Enter new password in below fields
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password"> New Password</Label>  
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
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm New Password</Label>  
                </div>
                <div className="flex ">
                <Input id="password" type={showConfirmPassword? "text":"password"} required className="w-65 sm:w-84"
                 value={confirmPassword}
                 onChange={(e)=>setconfirmPassword(e.target.value)} />
                 <div className="-translate-x-9" onClick={toggleConfirmPassoword}>
                 {showConfirmPassword? <EyeOpen/>:<EyeClose/>}
                 </div>
                 </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Update Password
                </Button>
              </div>
            </div>
          </form>
           {/* Show error message if exists */}
           {/* {Error && <p style={{ color: "red" }}>{Error}</p>} */}
        </CardContent>

      </Card>
    </div>
    </div>
    </div>
  )
}
