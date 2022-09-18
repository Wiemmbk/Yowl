import DefaultBook from "../../images/logo/default_book_cover_light.png"


const Card = (props) => {

    return (

        <div id="card"
            key={props.id}
            className="flex gap-4 items-center bg-light-purple dark:bg-purple w-full h-[130px] rounded-lg px-4 mt-2">

            {/* Image par défaut du livre */}
            {typeof(props.image) !== "undefined" ?
                <img src={props.image.thumbnail} alt="bookImage" className="rounded-lg h-[90px] w-[90px]  object-cover"></img>
                : 
                <img src={DefaultBook} alt="Book" className="rounded-lg h-[90px] w-[90px]  object-cover" />
            }

            <div id="book_info"
                className="flex flex-col items-start">


                {/* Titre du livre */}
                <div className="overflow-hidden">
                    <p className="font-Poppins text-orange font-semibold text-left text-lg">{props.title}</p>
                </div>

                {/* Résumé du livre */}
                <div className="h-[75px] overflow-hidden">
                    <p className="font-Poppins text-cream text-left text-md">{props.description}</p>
                </div>

            </div>

        </div>

    )
}

export default Card;