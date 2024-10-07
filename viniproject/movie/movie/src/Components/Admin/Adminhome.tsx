import React from 'react'
import { NavLink,Outlet } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import { logout } from "../../Action/Admin";














const Adminhome = () => {
    const [showSidebar, setShowSidebar] = React.useState(true);

  
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout() as any);
  };




  return (
    <div>
      <div className="flex min-h-screen bg-gray-100 ">
      {/* Sidebar */}
      <div className={`" hidden md:block w-64 bg-slate-600 shadow-md" ${showSidebar?"":"w-20"}`}>
        {showSidebar?<div>
        <div className=" flex ">
          <img
            src="/movies.png"
            alt=""
            className="w-24 h-24 bg-inherit mt-3 ml-3 rounded-full"
          />
          <div className="text-white text-center font-bold text-2xl p-4 mt-6">
          Movies
          </div>
        </div>
        <ul className="flex flex-col p-2 gap-2 mt-6">
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-500 text-white  rounded-md flex space-x-4 h-12 p-3"
                  : "text-white  rounded-md flex space-x-4 h-12 p-3"
              }
              end
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm200-80v-240H200v240h200Zm80 0h280v-240H480v240ZM200-520h560v-240H200v240Z" />
              </svg>
              <h3>Dashboard</h3> 
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/movielist"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-500 text-white  rounded-md flex gap-3 h-12 p-3"
                  : "text-white  rounded-md flex space-x-4 h-12 p-3"
              }
              end
            >
             <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M841-518v318q0 33-23.5 56.5T761-120H201q-33 0-56.5-23.5T121-200v-318q-23-21-35.5-54t-.5-72l42-136q8-26 28.5-43t47.5-17h556q27 0 47 16.5t29 43.5l42 136q12 39-.5 71T841-518Zm-272-42q27 0 41-18.5t11-41.5l-22-140h-78v148q0 21 14 36.5t34 15.5Zm-180 0q23 0 37.5-15.5T441-612v-148h-78l-22 140q-4 24 10.5 42t37.5 18Zm-178 0q18 0 31.5-13t16.5-33l22-154h-78l-40 134q-6 20 6.5 43t41.5 23Zm540 0q29 0 42-23t6-43l-42-134h-76l22 154q3 20 16.5 33t31.5 13ZM201-200h560v-282q-5 2-6.5 2H751q-27 0-47.5-9T663-518q-18 18-41 28t-49 10q-27 0-50.5-10T481-518q-17 18-39.5 28T393-480q-29 0-52.5-10T299-518q-21 21-41.5 29.5T211-480h-4.5q-2.5 0-5.5-2v282Zm560 0H201h560Z"/></svg>
             <h3>Movies</h3>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/viewuser"
              className={({ isActive }) =>
              isActive
                ? "bg-blue-500 text-white  rounded-md flex gap-3 h-12 p-3"
                : "text-white flex gap-3 h-12 p-3"
            }
            end
          
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/></svg>
              <h3>Users</h3>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/viewrating"
              className={({ isActive }) =>
              isActive
                ? "bg-blue-500 text-white  rounded-md flex gap-3 h-12 p-3"
                : "text-white flex gap-3 h-12 p-3"
            }
            end
          
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93ZM320-320v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T663-540L443-320H320Zm300-263-37-37 37 37ZM380-380h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/></svg>
              <h3>Rating</h3>
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/admin/feedbacks"
              className={({ isActive }) =>
              isActive
                ? "bg-blue-500 text-white  rounded-md flex gap-3 h-12 p-3"
                : "text-white flex gap-3 h-12 p-3"
            }
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M240-400h122l200-200q9-9 13.5-20.5T580-643q0-11-5-21.5T562-684l-36-38q-9-9-20-13.5t-23-4.5q-11 0-22.5 4.5T440-722L240-522v122Zm280-243-37-37 37 37ZM300-460v-38l101-101 20 18 18 20-101 101h-38Zm121-121 18 20-38-38 20 18Zm26 181h273v-80H527l-80 80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/></svg>
              <h3>Feedbacks</h3>
            </NavLink>
          </li> */}
          <li>
            <button onClick={logoutHandler}  className=" hover:bg-blue-500 text-white w-full text-left h-12 rounded-md p-3 flex gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M806-440H320v-80h486l-62-62 56-58 160 160-160 160-56-58 62-62ZM600-600v-160H200v560h400v-160h80v160q0 33-23.5 56.5T600-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h400q33 0 56.5 23.5T680-760v160h-80Z"/></svg>
              Logout
            </button >
          </li>
        </ul></div>:<ul className="flex flex-col p-2 gap-2 mt-6" >
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-500 text-white  rounded-md flex space-x-4 h-12 p-3"
                  : "text-white  rounded-md flex space-x-4 h-12 p-3"
              }
              end
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm200-80v-240H200v240h200Zm80 0h280v-240H480v240ZM200-520h560v-240H200v240Z" />
              </svg>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/movielist"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-500 text-white  rounded-md flex gap-3 h-12 p-3"
                  : "text-white  rounded-md flex space-x-4 h-12 p-3"
              }
              end
            >
             <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M841-518v318q0 33-23.5 56.5T761-120H201q-33 0-56.5-23.5T121-200v-318q-23-21-35.5-54t-.5-72l42-136q8-26 28.5-43t47.5-17h556q27 0 47 16.5t29 43.5l42 136q12 39-.5 71T841-518Zm-272-42q27 0 41-18.5t11-41.5l-22-140h-78v148q0 21 14 36.5t34 15.5Zm-180 0q23 0 37.5-15.5T441-612v-148h-78l-22 140q-4 24 10.5 42t37.5 18Zm-178 0q18 0 31.5-13t16.5-33l22-154h-78l-40 134q-6 20 6.5 43t41.5 23Zm540 0q29 0 42-23t6-43l-42-134h-76l22 154q3 20 16.5 33t31.5 13ZM201-200h560v-282q-5 2-6.5 2H751q-27 0-47.5-9T663-518q-18 18-41 28t-49 10q-27 0-50.5-10T481-518q-17 18-39.5 28T393-480q-29 0-52.5-10T299-518q-21 21-41.5 29.5T211-480h-4.5q-2.5 0-5.5-2v282Zm560 0H201h560Z"/></svg>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
              isActive
                ? "bg-blue-500 text-white  rounded-md flex gap-3 h-12 p-3"
                : "text-white  rounded-md flex space-x-4 h-12 p-3"
            }
            end
          
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/></svg>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/viewrating"
              className={({ isActive }) =>
              isActive
                ? "bg-blue-500 text-white  rounded-md flex gap-3 h-12 p-3"
                : "text-white  rounded-md flex space-x-4 h-12 p-3"
            }
            end
          
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93ZM320-320v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T663-540L443-320H320Zm300-263-37-37 37 37ZM380-380h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/></svg>
            </NavLink>
          </li>
 
          <li>
            <NavLink to='/'  className=" hover:bg-blue-500 text-white w-full text-left h-12 rounded-md p-3 flex gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M806-440H320v-80h486l-62-62 56-58 160 160-160 160-56-58 62-62ZM600-600v-160H200v560h400v-160h80v160q0 33-23.5 56.5T600-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h400q33 0 56.5 23.5T680-760v160h-80Z"/></svg>
            </NavLink >
          </li>
        </ul>}
      </div>
      {/* Main Content Area + Navbar */}
      <div className="flex-1 flex flex-col sticky z-50">
        <nav className="bg-white shadow-md h-16 flex items-center justify-between px-6">
          <div className=" flex space-x-2" onClick={()=>setShowSidebar(!showSidebar)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
              className='hidden md:block'
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
            <span className="text-lg font-semibold">Admin Panel</span>
          </div>
          {/* <div>
            <button className="text-gray-800 hover:bg-gray-200 p-2 rounded-md">
              Profile
            </button>
          </div> */}
        </nav>
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>

      <div className="md:hidden fixed inset-x-0 bottom-0 bg-slate-700 text-white flex justify-around items-center h-16 shadow-md z-50">
                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                        isActive ? 'text-blue-400' : 'text-white'
                    }
                    end
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="currentColor"
                    >
                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm200-80v-240H200v240h200Zm80 0h280v-240H480v240ZM200-520h560v-240H200v240Z" />
                    </svg>
                    <span className="text-sm">Dashboard</span>
                </NavLink>
                <NavLink
                    to="/admin/addmovie"
                    className={({ isActive }) =>
                        isActive ? 'text-blue-400' : 'text-white'
                    }
                    end
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="currentColor"
                    >
                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm200-80v-240H200v240h200Zm80 0h280v-240H480v240ZM200-520h560v-240H200v240Z" />
                    </svg>
                    <span className="text-sm">Movies</span>
                </NavLink>
                <NavLink
                    to="/admin/users"
                    className={({ isActive }) =>
                        isActive ? 'text-blue-400' : 'text-white'
                    }
                    end
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="currentColor"
                    >
                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm200-80v-240H200v240h200Zm80 0h280v-240H480v240ZM200-520h560v-240H200v240Z" />
                    </svg>
                    <span className="text-sm">Users</span>
                </NavLink>
                <button className="hover:text-blue-400 flex flex-col items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#FFFFFF"
                    >
                        <path d="M806-440H320v-80h486l-62-62 56-58 160 160-160 160-56-58 62-62ZM600-600v-160H200v560h400v-160h80v160q0 33-23.5 56.5T600-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h400q33 0 56.5 23.5T680-760v160h-80Z" />
                    </svg>
                    <span className="text-sm">Logout</span>
                </button>
            </div>
    </div>
    </div>
  )
}

export default Adminhome
