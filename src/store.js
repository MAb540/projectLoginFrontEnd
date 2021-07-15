import create from 'zustand';


export const useStore = create(set =>({

    stateOfAuth:localStorage.getItem("stateOfAuth") != null ? localStorage.getItem("stateOfAuth") : false,
    setStateOfAuth:(isStateOfAuth)=>{
        localStorage.setItem("stateOfAuth",true);
        set(state =>({stateOfAuth:isStateOfAuth}));
    },

    loginUsername:  null, //localStorage.getItem("loginUsername") != null ? localStorage.getItem("loginUsername") : null,
    setloginUsername:(username=>{
        // localStorage.setItem("loginUsername",username);
        set(state=>({loginUsername:username}));
    }),

    isLoggedIn: localStorage.getItem("valid") ? true : false,
    setIsLoggedIn:(loginState)=>{
        set(state => ({isLoggedIn:loginState}));
    }



}))
