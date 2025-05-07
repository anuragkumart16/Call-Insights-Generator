import React, { useState } from "react";
import SplashScreen from "./components/organisms/SplashScreen/SplashScreen";
import Error from "./components/organisms/Error/Error";
import Home from "./components/organisms/Home/Home";

function App() {
  const [error, setError] = useState(false);
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <>
      {error ? (
        <Error
          errorTitle={errorTitle}
          errorMessage={errorMessage}
          setErrorTitle={setErrorTitle}
          setErrorMessage={setErrorMessage}
        />
      ) : (
        <>
          {showSplashScreen ? (
            <SplashScreen
              setter={setShowSplashScreen}
              errorSetter={setError}
              errorTitle={setErrorTitle}
              errorMessage={setErrorMessage}
            />
          ) : <Home/>}
        </>
      )}
    </>
  );
}

export default App;
