import MainPage from "./views/mainPage";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import './css/header.css'
import {useMediaQuery} from "react-responsive";
import MainTabletPage from "./views/mainMobilePage";
import MainMobilePage from "./views/mainMobilePage";
import RegistrationPage from "./views/registration";

const App = () => {
    const isDesktop = useMediaQuery({
        query: "(min-width: 1153px)"
    });

    const isTablet = useMediaQuery({
        query: "(min-width: 744px) and (max-width: 1152)"
    });

    const isMobile = useMediaQuery({
        query: "(max-width: 743px)"
    });

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
            {
                isDesktop ?
                    <Route path="/" exact element={<MainPage />}/> : (
                    // <Route path="/" exact element={<RegistrationPage />}/> : (
                    isTablet ?
                        <Route path="/" exact element={<MainTabletPage />} /> :
                        <Route path="/" exact element={<MainMobilePage />} /> )
            }
            {/*<Route path="/" exact element={<RegistrationPage />}/>*/}
            {/*<Route path="/point/:pointId" exact component={PointDetails}/>*/}
            {/*<Route>404 not found</Route>*/}
            <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
