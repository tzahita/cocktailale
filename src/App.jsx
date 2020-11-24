import http from './components/services/http';
import { apiUrl } from './config.json';
import React, { Component } from 'react';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Home from './components/home/home';
import About from './components/about/about';
import Lost from './components/404/404';
import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import Signup from './components/signup/signup';
import BizSignup from './components/bizsignup/bizsignup';
import Signin from './components/signin/signin';
import Signout from './components/signout/signout';
import GetStarted from './components/getStarted/getStarted';
import Mycards from './components/mycards/mycards';
import Feed from './components/feed/feed';
import Me from './components/me/me';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userService from './components/services/userService';
import CreateCard from './components/createCard/createCard';
import CardDisplay from './components/cardDisplay/cardDisplay';
import EditCard from './components/editCard/editCard';
import ProtectedRoute from './components/common/rotectedRout/rotectedRout';
import { PageTransition } from '@steveeeie/react-page-transition';
import Manage from './components/manage/manage';

class App extends Component {
  state = {
    user: null,
    data: {
      email: '',
    },
    showNav:false
  };


  componentDidMount = async () => {
    document.documentElement.style.setProperty('--animate-duration', '1s');
    const currentUser = userService.getCurrentUser();
    this.setState({ user: currentUser });
    const {data} = { ...this.state, biz: false };

    try {
      const user = await http.get(`${apiUrl}/users/me`, currentUser);
      data.email = user.data.email;
      data.name = user.data.name;
      data.ClAdmin = user.data.ClAdmin;
      this.setState({ data: data });
    } catch (e) {
      if (e.response && e.response.status === 400) {
        this.setState({ errors: { email: 'Unexpected Error' } });
      }
    }
  };

  render() {
        return (
      <div className="App d-flex flex-column min-vh-100">
        <ToastContainer />
        <header>
        {this.props.location.pathname !== '/' && <Navbar user={this.state.user} data={this.state.data} biz={false}/>}
        </header>
        <main className="container-fluid flex-fill">
          <Switch>
            <Route path="/about" component={About}/>
            <ProtectedRoute path="/feed" component={Feed}/>
            <ProtectedRoute path="/create-card" biz={true}  component={CreateCard}/>
            <ProtectedRoute path="/manage/" biz={true} user={this.state.user} ClAdmin={true} component={Manage}/>
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
            {/* <Route path="*" >
              <Redirect to="/" />
            </Route> */}
          </Switch>
        </main>
        <footer>
          {this.props.location.pathname !== '/' && <Footer/>}
        </footer>
      </div>
    );
  }
}

export default App;
