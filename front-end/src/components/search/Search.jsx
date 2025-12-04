import {BiSearch} from "react-icons/bi";

const Search = ({value, onChange}) => {

    return (
        <>
            <div className="my-[5px] mx-0 relative flex-1">
                <BiSearch size={18} className="absolute top-1/2 left-4 -translate-y-1/2"/>
                <input type="text" placeholder='Search Users' value={value} onChange={onChange} className="block text-[1.6rem] font-light px-4 py-4 pl-12 my-4 mx-auto w-full border border-[#777] rounded outline-none"/>
            </div>
        </>
    );
};

export default Search;