import React from 'react'
import { useStore } from '../store';

function Home() {


    const isLoggedIn = useStore((state) => state.isLoggedIn);

    console.log(isLoggedIn);

    return (
        <div style={{textAlign: 'center', margin:'2rem', padding:'1rem'}}>   

            <h3>Welcome to Login Pro</h3>

                Home Screen


            {isLoggedIn ? <h1>This is shown when you are logged In</h1> :
            
                null
            }


        </div>
    )
}

export default Home
