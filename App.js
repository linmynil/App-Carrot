import React from 'react';
import {
  SafeAreaView,
  Text,
} from 'react-native';
import ItemListNew from './src/asm/ItemListNew';
import ListNew from './src/asm/ListNew';
import { NavigationContainer } from '@react-navigation/native';

// import Hello from './src/Hello';
// import Welcome from './src/Welcome';
import Tinhtoan from './src/Tinhtoan';

import Xoso from './src/Xoso';
import Login from './src/asm/Login';
import Signup from './src/asm/Signup';
import Profile from './src/asm/Profile';
import NewsDetail from './src/asm/NewsDetail';
import { AppContextProvider } from './src/asm/AppContext';
import AppNavigator from './src/asm/AppNavigator';

// const Hello = () => {
//   return (
//     <SafeAreaView>
//       <Text>Hello word</Text>
//     </SafeAreaView>
//   );
// };

const App = () => {
  // let ten1 = "MinhLy"ss
  // ten1 = "MyLinh"
  return (

    // <SafeAreaView>
    //     <Tinhtoan></Tinhtoan>
    //     {/* <Xoso></Xoso> */}
    //  </SafeAreaView>
    // {/* <Hello></Hello> */}
    // {/* <Welcome name = {ten1} old={19} address={'HCM'}/> */}


    <AppContextProvider>
      <NavigationContainer >
        <AppNavigator></AppNavigator>
      </NavigationContainer>
    </AppContextProvider>

    // <Login></Login>
    // <Signup></Signup>
    // <Profile></Profile>
    // <ListNew></ListNew>
    // <NewsDetail></NewsDetail>
  );
};

export default App;