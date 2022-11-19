import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout} from 'antd';
import CustomHeader from "./components/CustomHeader";
import {GlobalContextProvider} from "./contexts/globalContext";
import {GameContextProvider} from "./contexts/gameContext";
import NotFound from "./pages/NotFound";
import Main from "./pages/main/Main";
import Game from "./pages/Game";
import GameComplete from "./pages/gameComplete/GameComplete";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import CustomAlert from "./components/alert/CustomAlert";
const {Content} = Layout;


const App = () => {

  return (
      <BrowserRouter>
          <Layout>
              <GlobalContextProvider>
                <CustomHeader/>
                  <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, background: '#55C5FF'}}>
                      <CustomAlert/>
                    <GameContextProvider>
                        <Routes>
                            <Route path={'*'} element={<NotFound/>}/>
                            <Route path={'/'} element={<Main/>}/>
                            <Route path={'game'} element={<Game/>}/>
                            <Route path={'game-complete'} element={<GameComplete/>}/>
                            <Route path={'sign-in'} element={<SignIn/>}/>
                            <Route path={'sign-up'} element={<SignUp/>}/>
                            <Route path={'profile'} element={<Profile/>}/>
                        </Routes>
                    </GameContextProvider>
                </Content>
              </GlobalContextProvider>
          </Layout>
      </BrowserRouter>
  );
};

export default App;



