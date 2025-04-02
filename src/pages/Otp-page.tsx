import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom";


export function Otpform({
  className,
  ...props
}: React.ComponentProps<"div">) {
  
const [otp,setotp]=useState("");
const [Message,setMessage]=useState("");
const navigate=useNavigate();
const location = useLocation();
const email = location.state?.email || "No Email Provided"; 
// sending request to backend
async function handlesubmit(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault();
  if(otp===""){
    setMessage("Please enter otp ");
    return;
  }
  try{
    const response=await axios.post("http://localhost:3000/api/v1/users/resetpasswordotp",{
      token:otp
    });
  console.log(response.data.message);
  setMessage(response.data.message);
  navigate("/updatepassword",{state:{email}});
  }catch(error:any){
    console.error(error);
    console.log(error.response.data.message);
    setMessage(error.response.data.message)
  }
}

console.log(otp);
  
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    <div className="w-full max-w-sm">
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">OTP verification</CardTitle>
          <CardDescription>
          Please enter the OTP sent to your email in the field below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div>
                  <InputOTPDemo otp={otp} setotp={setotp}/>
                </div>
                <Button type="submit" className="w-full" onClick={handlesubmit}>
                 verify otp
                </Button>              
              </div>
            </div>
              {/* Show  message if exists */}
             {Message.startsWith("Invalid")? <p style={{color:"red"}}>{Message}</p>:<p style={{ color:"green"}}> {Message}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
    </div>
    </div>
  )

}

interface OTPprops{
  otp:string;
  setotp:(value:string)=>void;
}

const InputOTPDemo:React.FC<OTPprops>=({otp,setotp})=>{

  function handleOtpchange(value:string){
   setotp(value);
  }
  return (
    <InputOTP maxLength={6} value={otp} onChange={handleOtpchange}>
      <InputOTPGroup className="ml-1 sm:ml-9">
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}
