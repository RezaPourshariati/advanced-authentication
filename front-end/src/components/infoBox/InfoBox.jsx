const InfoBox = ({bgColor, title, count, icon}) => {
    return (
        <>
            <div className={`w-full h-28 max-w-[22rem] mr-4 mb-4 flex justify-start items-center flex-wrap text-white transform translate-y-0 transition-all duration-300 hover:cursor-pointer hover:-translate-y-2 ${bgColor}`} style={{borderRadius: '10px'}}>
                <span className='px-8 text-white'>{icon}</span>
                <span className="[&>*]:text-white">
                    <p>{title}</p>
                    <h4>{count}</h4>
                </span>
            </div>
        </>
    );
};

export default InfoBox;