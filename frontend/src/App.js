import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Login } from "./Login";
import NavBar from "./components/NavBar";
// import { Splash } from "./splash";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/session";
import { Signup } from "./Signup";
import { HomePage } from "./homepage";
import { Box } from "@mui/material";
import { Editor } from "./Editor";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.session.user);

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
          <NavBar />
          {/* <Splash /> */}
        </Route>
        <Route path="/login" exact={true}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
            <Login />
          </Box>
        </Route>
        <Route path="/sign-up" exact={true}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
            <Signup />
          </Box>
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
