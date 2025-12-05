export const Questions = ({data, onClick, isOpen}) => {
    return <div className="border-b border-black/25 last:border-b-0 overflow-hidden">
        <div onClick={onClick} className="flex justify-between gap-8 items-start cursor-pointer text-xl py-4">
            <h2>{data.question}</h2>
            <span className={`text-[#3D9034] text-2xl ${isOpen ? "rotate-180": "" } ease-in-out duration-500`} >{isOpen ? "-" : "+" }</span>
        </div>
        <p className={`text-lg opacity-75 ease-in-out duration-500 ${isOpen ? "max-h-96 " : "max-h-0"}`}>{data.answer}</p>
    </div>;
}

export default Questions;