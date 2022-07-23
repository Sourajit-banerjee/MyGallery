import Layout from "./components/Layout";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import ActivateAccount from "./components/auth/ActivateAccount";
import Home from "./components/Home";
import { isAuth } from "./helpers/auth";
import User from "./components/User";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Layout>
          <Home />
        </Layout>
      </Route>
      <Route path="/login" exact>
        <Layout>
          <Login />
        </Layout>
      </Route>
      <Route path="/user" exact>
        <Layout>
        <User/>
        </Layout>
      </Route>
      <Route path="/register" exact>
        <Layout>
          <Register />
        </Layout>
      </Route>
      <Route path="/forgot-password" exact>
        <Layout>
          <ForgotPassword/>
        </Layout>
      </Route>
      <Route path="/mygallery" exact>
        <Layout>
          <User/>
        </Layout>
      </Route>
      <Route path="/auth/activate/:id" exact>
        <Layout>
          <ActivateAccount />
        </Layout>
      </Route>
      <Route path="/auth/password/reset/:id" exact>
        <Layout>
          <ResetPassword/>
        </Layout>
      </Route>
      <Route path="*">
        <Layout>
          <NotFound />
        </Layout>
      </Route>
    </Switch>
  );
}

export default App;
