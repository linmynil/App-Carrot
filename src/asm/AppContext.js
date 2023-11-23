import { createContext, useState } from "react";

export const AppContext = createContext();
 export const AppContextProvider = (props) =>{
    const {children}=props;
    // data sử dụng chung
    const[isLogin,setisLogin] = useState(false); 
    const[isLogout,setisLogout] = useState(false); 
    const[infoUser,setinfoUser] = useState({}); //bypass login
    const[isUpdate,setisUpdate] = useState(false); 
    const[isReload,setisReload] = useState(false); 

    return (
      <AppContext.Provider value={{isLogin,setisLogin,infoUser,setinfoUser,isUpdate,setisUpdate,isLogout,setisLogout,isReload,setisReload}}>
         {children}
      </AppContext.Provider>
    )
    
 }
//  data,setdata