import {useEffect, useLayoutEffect, useState} from "react";
import Card from "../../components/card/Card";
import PageMenu from "../../components/pageMenu/PageMenu";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import {useDispatch, useSelector} from "react-redux";
import {getUser, selectUser, updateUser} from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import {toast} from "react-toastify";
import Notification from "../../components/notification/Notification";


const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;


export const shortenText = (text, n) => {
    if (text.length > n) return text.substring(0, n).concat("...");
    return text;
};

const Profile = () => {
    useRedirectLoggedOutUser("/login"); // Our Custom Hook
    const dispatch = useDispatch();

    const {isLoading, isLoggedIn, isSuccess, message, user} = useSelector((state) => state.auth);

    const initialState = {
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        bio: user?.bio || "",
        photo: user?.photo || "",
        role: user?.role || "",
        isVerified: user?.isVerified || false
    };

    const [profile, setProfile] = useState(initialState);
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    };

    const saveProfile = async (e) => {
        e.preventDefault();
        let imageURL;
        try {
            if (profileImage !== null && (profileImage.type === "image/jpeg" || profileImage.type === "image/jpg" ||
                profileImage.type === "image/png")) {
                const image = new FormData();
                image.append("file", profileImage);
                image.append("cloud_name", cloudName);
                image.append("upload_preset", uploadPreset);
                // for (let pair of image.entries()) {
                //     console.log(pair[0]+ ', ' + pair[1]);
                // }

                // Save Image to Cloudinary.com
                const response = await fetch("https://api.cloudinary.com/v1_1/rezacloud/image/upload", {
                    method: "post",
                    body: image
                });
                const imageData = await response.json();
                // console.log(imageData);
                imageURL = imageData.url.toString();
            }
            // Save Profile to MongoDB
            const userData = {
                name: profile.name,
                phone: profile.phone,
                bio: profile.bio,
                photo: profileImage ? imageURL : profile.photo
            }
            dispatch(updateUser(userData));

        } catch (error) {
            toast.error(error.message);
        }
    };

    useLayoutEffect(() => {
        if (user) setProfile({
            ...profile,
            name: user.name,
            email: user.email,
            phone: user.phone,
            photo: user.photo,
            bio: user.bio,
            role: user.role,
            isVerified: user.isVerified
        });
    }, [user]);

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setProfile({...profile, [name]: value}); // Dynamic assign
    };

    return (
        <>
            {isLoading && <Loader/>}
            {!profile.isVerified && <Notification/>}
            <section>
                <div className="container">
                    <PageMenu/>
                    <h2>Profile Page</h2>
                    <div className="flex justify-center items-center">
                        <Card cardClass={"w-full max-w-[400px] p-4 border border-[#030b6b]"}>
                            {!isLoading && user && (
                                <>
                                    <div className="w-full bg-[#1f93ff] p-4 flex justify-center items-center mb-4 [&_img]:w-[200px] [&_img]:h-[200px] [&_img]:border-2 [&_img]:border-white [&_img]:rounded-full [&_h3]:text-white [&_h3]:text-[2rem] [&_h3]:text-center">
                                        <div>
                                            <img src={imagePreview === null ? user?.photo : imagePreview}
                                                 alt="profile-image"/>
                                            <h3>Role: {profile?.role}</h3>
                                        </div>
                                    </div>
                                    <form onSubmit={saveProfile} className="[&_label]:block [&_label]:text-[1.4rem] [&_label]:font-medium [&_input[type='text']]:block [&_input[type='number']]:block [&_input[type='file']]:block [&_input[type='email']]:block [&_select]:block [&_textarea]:block [&_input[type='password']]:block [&_input]:text-[1.6rem] [&_input]:font-light [&_input]:p-4 [&_input]:my-4 [&_input]:mx-auto [&_input]:w-full [&_input]:border [&_input]:border-[#777] [&_input]:rounded [&_input]:outline-none [&_select]:text-[1.6rem] [&_select]:font-light [&_select]:p-4 [&_select]:my-4 [&_select]:mx-auto [&_select]:w-full [&_select]:border [&_select]:border-[#777] [&_select]:rounded [&_select]:outline-none [&_textarea]:text-[1.6rem] [&_textarea]:font-light [&_textarea]:p-4 [&_textarea]:my-4 [&_textarea]:mx-auto [&_textarea]:w-full [&_textarea]:border [&_textarea]:border-[#777] [&_textarea]:rounded [&_textarea]:outline-none">
                                        <p>
                                            <label htmlFor="image">Change Photo: </label>
                                            <input type="file" accept='image/*' name='image'
                                                   onChange={handleImageChange}/>
                                        </p>
                                        <p>
                                            <label htmlFor="name">Name: </label>
                                            <input type="text" name='name' value={profile?.name}
                                                   onChange={handleInputChange}/>
                                        </p>
                                        <p>
                                            <label htmlFor="email">Email: </label>
                                            <input type="email" name='email' value={profile?.email}
                                                   onChange={handleInputChange} disabled/>
                                        </p>
                                        <p>
                                            <label htmlFor="phone">Phone: </label>
                                            <input type="text" name='phone' value={profile?.phone}
                                                   onChange={handleInputChange}/>
                                        </p>
                                        <p>
                                            <label htmlFor="bio">Bio: </label>
                                            <textarea name="bio" value={profile?.bio}
                                                      onChange={handleInputChange} id="#" cols="30" rows="10"/>
                                        </p>
                                        <button className='text-[1.6rem] font-medium text-white px-2 py-1.5 mx-[5px] mr-0 mb-0 border border-transparent rounded-md cursor-pointer flex justify-center items-center transition-all duration-300 shadow-lg w-full bg-[#007bff] hover:bg-[#504acc]'>Update Profile</button>
                                    </form>
                                </>
                            )}
                        </Card>
                    </div>
                </div>
            </section>
        </>
    );
};

export const UserName = () => {
    const user = useSelector(selectUser);
    const userName = user?.name || "...";
    return (
        <>
            <p className='text-white'
               style={{borderRight: "2px solid greenYellow", paddingRight: "2rem"}}>Hi, {shortenText(userName, 14)}</p>
        </>
    );
};

export default Profile;