// import { useState } from "react";
// import toast from "react-hot-toast";
// export default function TestPage(){

import { useState } from "react";
import toast from "react-hot-toast";
import { createClient } from "@supabase/supabase-js";
import uploadMedia from "../lib/uploadMedia";

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJza2d2Y3NicmJsbHRmaGRremdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2NjUyNjYsImV4cCI6MjA5NzI0MTI2Nn0.wuMdgFpffz3i0RoKVqLF83HAChWVGGo-RaHBY7RrE1U"
const url = "https://bskgvcsbrblltfhdkzgi.supabase.co"

const supabase = createClient(url , key)

export default function TestPage(){

    const [file , setFile] = useState(null)

    // function uploadFile(){

    //     uploadMedia(file).then(
    //         (res)=>{
    //             console.log(res)
    //             toast.success("file uploaded Successfully")
    //         }
    //     ).catch(
    //         (err)=>{
    //             toast.error("Upload failed")
    //             console.log(err)
    //         }
    //     )

    // }

    async function uploadFile(){

        try {

            const res = await uploadMedia(file)
            console.log(res)
            toast.success("Uploaded!")
            
        } catch (error) {
            console.log(error)
            toast.error("Upload failed")
        }

    }

    return(
    <div className="w-full h-full flex items-center justify-center">
        <input type="file"  onChange={
            (e)=>{

                setFile(e.target.files[0])
                
            }
        } />
        <button className="p-2 bg-green-600 rounded-lg text-white" onClick={uploadFile}>Submit</button>
    </div>
)
   
}

// anon key - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJza2d2Y3NicmJsbHRmaGRremdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2NjUyNjYsImV4cCI6MjA5NzI0MTI2Nn0.wuMdgFpffz3i0RoKVqLF83HAChWVGGo-RaHBY7RrE1U
// project url - https://bskgvcsbrblltfhdkzgi.supabase.co


//     const [status , setStatus] = useState("Idle")
//     const [count , setCount] = useState("1")
    

    

//     return(
//         <div className="w-full h-full flex flex-col items-center justify-center">
//             <h1 className="text-3xl font-bold">{status}</h1>
//             <div className="w-75 h-[50px] flex items-center justify-center">

//                 <button onClick={
//                     () => {
//                         //status = "On";
//                         setStatus("On");
//                         toast.success("Status is now On");
                        
//                         }

//                     } className="p-2 text-white m-2 bg-green-600">Turn On</button>

//                 <button onClick={() => {
//                                 // status = "Off"; 
//                                 setStatus("Off");
//                                 toast.error("Status is now Off");
                                
//                             }}
//                      className="p-2 text-white m-2 bg-red-600">Turn Off</button>

//                 <button onClick={() => {
//                                 // status = "Idle"; 
//                                 setStatus("Idle");
//                                 toast('Idle Mode On', {icon: '💡',});
                                
//                             }}
//                          className="p-2 text-white m-2 bg-yellow-600">Idle</button>
//             </div>
//             <h1 className="text-3xl font-bold">{count}</h1>
//             <div className="w-75 h-[50px] flex justify-center items-center">
//                 <button onClick={() => 
//                     {
//                         setCount("1");
//                     }
//                 } className="p-2 text-white m-2 bg-green-600">1
                
//                 </button>
//                 <button onClick={() => 
//                     {
//                         setCount("2");
//                     }
//                 } className="p-2 text-white m-2 bg-red-600">2
                
//                 </button>
//                 <button onClick={() => 
//                     {
//                         setCount("3");
                        
//                     }
//                 } className="p-2 text-white m-2 bg-yellow-600">3
                
//                 </button>
//             </div>

            

//         </div>
//     )
// }




// //alignement and postioning in CSS

// // export default function TestPage(){
// //     return(
// //         <div className="w-full h-full">
// //             <div className="flex flex-col relative justify-center items-center w-[600px] h-[600px] bg-yellow-300 ">
// //                 <div className="top-10 left-10 w-[100px] h-[100px] bg-red-600 ">
// //                 </div>
// //                 <div className="fixed right-10 bottom-10 w-[100px] h-[100px] bg-green-600 ">
// //                 </div>
// //                 <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-blue-600">
// //                 </div>
// //                 <div className="w-[100px] h-[100px] bg-white">
// //                 </div>
// //                 <div className="w-[100px] h-[100px] bg-black">
// //                 </div>
// //             </div>
// //         </div>
// //     )
// // }



