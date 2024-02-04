type RecommendationProps = {
    title: string,
    onSelect: () => void,
}
const RecommendationEtiquetteBar: React.FC<RecommendationProps> = ({title, onSelect}) =>{
    return <div onClick={()=>{
        onSelect()
    }} className="flex items-center text-xs text-black bg-white hover:bg-blue-500 hover:text-white border-blue-500 border justify-center px-2 py-2 rounded-full">
        <h1 className=" text-center">
            {title}
        </h1>
    </div>
}

export default RecommendationEtiquetteBar