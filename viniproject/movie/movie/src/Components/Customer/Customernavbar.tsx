import React ,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../../Action/User';


const Customernavbar = () => {
    const [navBackground, setNavBackground] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  
    const changeBackground = () => {
      if (window.scrollY >= 80) {
        setNavBackground(true);
      } else {
        setNavBackground(false);
      }
    };
  
  
    const toggleMobileMenu = () => {
      setMobileMenuOpen(!mobileMenuOpen);
    };
  
    useEffect(() => {
      window.addEventListener("scroll", changeBackground);
      return () => {
        window.removeEventListener("scroll", changeBackground);
      };
    }, []);
    
    const user = JSON.parse(localStorage.getItem('userInfo') || '{}');
 

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout() as any);
    }
    

  return (
    <div>
        <div className=" m-0 p-0">
    <nav
      className={`fixed w-full z-10 top-0 left-0 transition-all duration-300 ease-in-out ${
        navBackground ? "bg-gradient-to-r from-purple-200 via-lime-200 to-rose-300" : "bg-gradient-to-r from-lime-200 to-cyan-300"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/customer" className="text-red-700 text-2xl font-bold font-serif">
              Movie Rating
            </a>
          </div>
          {/* Desktop Menu */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8 mt-4">
            <button
               onClick={handleLogout}
              className="text-red-700 text-xl hover:text-red-500 transition duration-300 font-serif"
            >
              Logout
            </button>
            {/* <a
              href="/login"
              className="text-red-700 text-xl hover:text-red-500 transition duration-300 font-serif"
            >
              Login
            </a> */}
            <Link to={"/profile"} className="text-red-700 text-xl hover:text-red-500 transition duration-300 font-serif">
              <img src={`http://localhost:9000/uploads/customer/${user.image}`} alt=""  className=' rounded-full max-h-10 w-10'/>
              </Link>
          </div>
          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-green-600 focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-blue-600">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="/register"
              className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-500"
            >
              Register
            </a>
            <a
              href="/login"
              className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-500"
            >
              Login
            </a>
          </div>
        </div>
      )}
    </nav>
    <div className="">

    </div>

    </div>
    </div>
  )
}

export default Customernavbar
