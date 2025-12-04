const Card = ({children, cardClass}) => {
    return (
        <>
            <div className={`border border-transparent rounded shadow-[0_5px_15px_rgba(0,0,0,0.1)] overflow-hidden ${cardClass}`}>
                {children}
            </div>
        </>
    );
};

export default Card;