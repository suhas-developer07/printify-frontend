import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


//const handleSubmit = () => {
//   const selectionArray = Object.entries(pdfSelections).map(([fileName, selectedPages]) => ({
//     fileName,
//     selectedPages
//   }));

//   fetch('/api/print-pdf', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(selectionArray)
//   })
//     .then(res => res.json())
//     .then(data => console.log("Server response:", data))
//     .catch(err => console.error("Error sending to backend:", err));
// };
