import InfoBox from "../infoBox/InfoBox";
import {FaUsers} from "react-icons/fa";
import {BiUserCheck, BiUserMinus, BiUserX} from "react-icons/bi";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {CALC_SUSPENDED_USER, CALC_VERIFIED_USER} from "../../redux/features/auth/authSlice";

// icons
const icon1 = <FaUsers size={40} color='#fff'/>
const icon2 = <BiUserCheck size={40} color='#fff'/>
const icon3 = <BiUserMinus size={40} color='#fff'/>
const icon4 = <BiUserX size={40} color='#fff'/>

const UserStats = () => {
    const {users, verifiedUsers, suspendedUsers} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(CALC_VERIFIED_USER());
        dispatch(CALC_SUSPENDED_USER());
    }, [dispatch, users]);

    const unVerifiedUsers = users.length - verifiedUsers;

    return (
        <>
            <div className="w-full">
                <h3 className='mt-4'>User Stats</h3>
                <div className="flex flex-wrap justify-center" style={{margin: "auto"}}>
                    <InfoBox icon={icon1} title={'Total Users'} count={users.length} bgColor='bg-[#b624ff]'/>
                    <InfoBox icon={icon2} title={'Verified Users'} count={verifiedUsers} bgColor='bg-[#32963d]'/>
                    <InfoBox icon={icon3} title={'Unverified Users'} count={unVerifiedUsers} bgColor='bg-[#03a5fc]'/>
                    <InfoBox icon={icon4} title={'Suspended Users'} count={suspendedUsers} bgColor='bg-[#c41849]'/>
                </div>
            </div>
        </>
    );
};

export default UserStats;