import { useState } from "react"

export default function ImageSlideShow(props){


    const images = props.images

    const imageIndex = 1
    
    const [activeImageIndex,setActiveImageIndex] = useState(images?.length > imageIndex ? imageIndex : 0)

    return(
        <div className="w-[500px] h-[600px] flex flex-col  ">
            <img src={images[activeImageIndex]} className="w-full h-500px object-contain px-4"/>
            <div className="w-ful h-[100px] flex justify-center items-center gap-2">
               { 
                    images.map((image,index)=>{
                        return(
                            <img src={image} key={index} className={"w-[80px] h-[80px] object-contain cursor-pointer "+(index==activeImageIndex&&"border-2")} 
                            onClick={()=>{setActiveImageIndex(index)}}/>
                        )
                    })
                }
            </div>
        </div>
    )
}