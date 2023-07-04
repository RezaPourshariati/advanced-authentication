import {useState} from "react";
import Card from "../../components/card/Card";
import profileImage from '../../assets/avatarr.png';
import './Profile.scss';
import PageMenu from "../../components/pageMenu/PageMenu";

const initialState = {
    name: 'Reza',
    email: 'reza@gmail.com',
    phone: '',
    bio: '',
    photo: '',
    role: '',
    isVerified: false
};

const Profile = () => {
    const [profile, setProfile] = useState(initialState);

    const handleImageChange = () => {

    };

    const handleInputChange = () => {

    }

    return (
        <>
            <section>
                <div className="container">
                    <PageMenu/>
                    <h2>Profile Page</h2>
                    <div className="--flex-center profile">
                        <Card cardClass={"card"}>
                            <>
                                <div className="profile-photo">
                                    <div>
                                        <img src={profileImage} alt="profile-image"/>
                                        <h3>Role: Subscriber</h3>
                                    </div>
                                </div>
                                <form>
                                    <p>
                                        <label htmlFor="image">Change Photo: </label>
                                        <input type="file" accept='image/*' name='image' onChange={handleImageChange}/>
                                    </p>
                                    <p>
                                        <label htmlFor="name">Name: </label>
                                        <input type="text" name='name' value={profile.name}
                                               onChange={handleInputChange}/>
                                    </p>
                                    <p>
                                        <label htmlFor="email">Email: </label>
                                        <input type="email" name='email' value={profile.email}
                                               onChange={handleInputChange} disabled/>
                                    </p>
                                    <p>
                                        <label htmlFor="phone">Phone: </label>
                                        <input type="text" name='phone' value={profile.phone}
                                               onChange={handleInputChange}/>
                                    </p>
                                    <p>
                                        <label htmlFor="phone">Bio: </label>
                                        <textarea name="bio" value={profile.phone}
                                                  onChange={handleInputChange} id="#" cols="30" rows="10"></textarea>
                                    </p>
                                    <button className='--btn --btn-primary --btn-block'>Update Profile</button>
                                </form>
                            </>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Profile;