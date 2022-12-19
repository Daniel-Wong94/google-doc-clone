import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "./Login";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import { Splash } from "./splash";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/session";
import { Signup } from "./Signup";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

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
      <NavBar />
      {/* delete route above later */}
      <Switch>
        <Route path="/" exact={true}>
          {/* <Splash /> */}
        </Route>
        <Route path="/login" exact={true}>
          {/* <LoginForm /> */}
          <Login />
        </Route>
        <Route path="/sign-up" exact={true}>
          {/* <SignUpForm /> */}
          <Signup />
        </Route>
        <ProtectedRoute>
          <Route path="/documents" exact={true}>
            {"home page with all documents"}
          </Route>
        </ProtectedRoute>
        <ProtectedRoute>
          <Route path="/documents/:documentId" exact={true}>
            {"document text editor"}
          </Route>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
