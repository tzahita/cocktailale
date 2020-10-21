import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { PageTransition } from "@steveeeie/react-page-transition";
import ProtectedRoute from '../common/rotectedRout/rotectedRout'
import { AppContext } from "./appContext";
import http from '../services/http';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import Home from '../home/home';
import About from '../about/about';
import Lost from '../404/404';
import Signup from '../signup/signup';
import BizSignup from '../bizsignup/bizsignup';
import Signin from '../signin/signin';
import Signout from '../signout/signout';
import GetStarted from '../getStarted/getStarted';
import Mycards from '../mycards/mycards';
import Feed from '../feed/feed';
import Me from '../me/me';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userService from '../services/userService';
import CreateCard from '../createCard/createCard';
import CardDisplay from '../cardDisplay/cardDisplay';
import EditCard from '../editCard/editCard';

export function Routes() {
  const { preset, enterAnimation, exitAnimation } = useContext(AppContext);

  return (
    <>
      <Route
        render={({ location }) => (
          <PageTransition
            preset={preset}
            transitionKey={location.pathname}
            enterAnimation={enterAnimation}
            exitAnimation={exitAnimation}
          >
            <Switch location={location}>
            <Route path="/about" component={About}/>
            <ProtectedRoute path="/feed" component={Feed}/>
            <ProtectedRoute path="/create-card" biz={true} component={CreateCard}/>
            <ProtectedRoute path="/edit-card/:id" biz={true} component={EditCard}/>
            <ProtectedRoute exact path="/card/display/:id" component={CardDisplay}/>
            <ProtectedRoute path="/me" component={Me}/>
            <Route path="/signout" component={Signout}/>
            <Route path="/getStarted" component={GetStarted}/>
            <Route path="/biz-signup" component={BizSignup}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/signin" component={Signin}/>
            <ProtectedRoute path="/my-cards" biz={true} component={Mycards}/>
            <Route exact path="/" data={this.state.data} component={Home}/>
            <Route path="*" >
              <Redirect to="/" />
            </Route>
            </Switch>
          </PageTransition>
        )}
      />
    </>
  );
}
