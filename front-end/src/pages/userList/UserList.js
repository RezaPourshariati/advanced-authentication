import './UserList.scss';
import PageMenu from "../../components/pageMenu/PageMenu";
import UserStats from "../../components/userStats/UserStats";
import Search from "../../components/search/Search";
import {FaTrashAlt} from "react-icons/fa";
import ChangeRole from "../../components/changeRole/ChangeRole";
import {useDispatch, useSelector} from "react-redux";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import {useEffect, useState} from "react";
import {deleteUser, getUsers, selectUser} from "../../redux/features/auth/authSlice";
import {shortenText} from "../profile/Profile";
import {Spinner} from "../../components/loader/Loader";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import {FILTER_USERS, selectUsers} from "../../redux/features/auth/filterSlice";
import ReactPaginate from "react-paginate";


const UserList = () => {
    useRedirectLoggedOutUser("/login"); // Custom Hook
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const {users, isLoading, isLoggedIn, isSuccess, message} = useSelector(state => state.auth);
    const filteredUsers = useSelector(selectUsers);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const removeUser = async (id) => {
        await dispatch(deleteUser(id));
        dispatch(getUsers());
    };

    const confirmDelete = (id) => {
        confirmAlert({
            title: 'Delete User',
            message: 'Are you sure to delete this user?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => removeUser(id)
                },
                {
                    label: 'Cancel',
                    onClick: () => alert('Click Ok')
                }
            ]
        });
    };

    useEffect(() => {
        dispatch(FILTER_USERS({users, search}));
    }, [dispatch, users, search]);


    // -------------- Begin Pagination
    const itemsPerPage = 5;
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);

    const currentItems = filteredUsers.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;
        // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };
    // -------------- End Pagination

    return (
        <>
            <section>
                <div className="container">
                    <PageMenu/>
                    <UserStats/>

                    <div className="user-list">
                        {isLoading && <Spinner/>}
                        <div className="table">
                            <div className="--flex-between">
                                <span>
                                    <h3>All Users</h3>
                                </span>
                                <span><Search value={search} onChange={(e) => setSearch(e.target.value)}/></span>
                            </div>

                            {/* Table */}
                            {!isLoading && users.length === 0 ? (<p>No user found...</p>) : (
                                <table>
                                    <thead>
                                    <tr>
                                        <th>S/N</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Change Role</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {currentItems.map((user, index) => {
                                        const {_id, name, email, role} = user;
                                        return (
                                            <tr key={_id}>
                                                <td>{index + 1}</td>
                                                <td>{shortenText(name, 14)}</td>
                                                <td>{email}</td>
                                                <td>{role}</td>
                                                <td><ChangeRole id={_id} email={email}/></td>
                                                <td>
                                                    <span className='icon'><FaTrashAlt size={20} color={"#c81d25"}
                                                                                       onClick={() => confirmDelete(_id)}/></span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            )}
                            <hr color='greenyellow'/>
                        </div>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="Next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="Prev"
                            renderOnZeroPageCount={null}
                            containerClassName="pagination"
                            pageLinkClassName="page-num"
                            previousLinkClassName="page-num"
                            nextLinkClassName="page-num"
                            activeLinkClassName="activePage"
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default UserList;