import { createClient } from "@supabase/supabase-js"

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJza2d2Y3NicmJsbHRmaGRremdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2NjUyNjYsImV4cCI6MjA5NzI0MTI2Nn0.wuMdgFpffz3i0RoKVqLF83HAChWVGGo-RaHBY7RrE1U"
const url = "https://bskgvcsbrblltfhdkzgi.supabase.co"

const supabase = createClient(url , key)

export default function uploadMedia(file){
    
    return new Promise(
        (resolve, reject)=>{
            if(file == null){
                reject("No file selected")
            }else{


                const timeStamp = new Date().getTime()

                const fileName = timeStamp+"_"+file.name

                supabase.storage.from("images").upload(fileName, file).then(
                ()=>{
                    const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl

                    resolve(publicUrl)
                    
                }
            ).catch(
                (err)=>{
                    reject(err)   
                }
            )
            
            }
        }
    )
}