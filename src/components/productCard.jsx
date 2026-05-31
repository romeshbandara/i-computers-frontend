import "./productCard.css"

export default function ProductCard(props){

    console.log(props)
    

    return(
        <div className="bg-blue-700 w-60 h-[330.5px]">
            <img src={props.image} alt={props.name} />
            <h1>{props.name}</h1>
            <p>{props.price}</p>
        </div>
    )

}

