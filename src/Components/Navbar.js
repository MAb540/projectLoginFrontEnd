import React,{Fragment} from 'react'
import {Link, useHistory} from 'react-router-dom';
import { useStore } from '../store';

import './nav.css';

function Navbar() {

    const isLoggedIn = useStore((state) => state.isLoggedIn);

    const setIsLoggedIn = useStore(state => state.setIsLoggedIn);
    const history = useHistory();

    const handleLogout = ()=>{
        localStorage.removeItem('valid');
        setIsLoggedIn(false);
        history.push('/');
    }
    
    return (
        <nav>

            <div className="navbar-brand">
                <Link to="/">Home</Link>
            </div>

            <div>
                <ul>
                    {/* <li><Link to="/signup">SignUp</Link></li>
                    <li><Link to="/login">Login</Link></li>    */}

                    {isLoggedIn ?  
                <Fragment>

                  <li><Link to="#" className="p-4" onClick={handleLogout}>Logout</Link></li>

                </Fragment>
                :
                <Fragment>  
                    <li><Link to="/signup" >SignUp</Link></li>
                    <li><Link to="/login" >Login</Link></li>
                </Fragment>
                }

                </ul>    
            </div>    

        </nav>
    )
}

export default Navbar
