import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Login } from "./Login";
import { SplashPage } from "./SplashPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/session";
import { Signup } from "./Signup";
import { HomePage } from "./homepage";
import { Editor } from "./editor";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <SplashPage />
        </Route>
        <Route path="/login" exact={true}>
          <Login />
        </Route>
        <Route path="/sign-up" exact={true}>
          <Signup />
        </Route>
        <ProtectedRoute path="/documents" exact={true}>
          <HomePage />
        </ProtectedRoute>
        <ProtectedRoute path="/documents/:documentId" exact={true}>
          <Editor />
        </ProtectedRoute>
        <Route>404 Not Found</Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
