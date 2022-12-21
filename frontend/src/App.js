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
      {/* delete route above later */}
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
        <ProtectedRoute>
          <Route path="/documents" exact={true}>
            <HomePage sx={{ width: "100%" }} />
          </Route>
        </ProtectedRoute>
        <ProtectedRoute>
          <Route path="/documents/:documentId" exact={true}>
            {"document text editor"}
          </Route>
        </ProtectedRoute>
        <Route>404 Not Found</Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
