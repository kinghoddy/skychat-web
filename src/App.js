import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';


import Layout from './component/Layout/Layout';
import Home from './container/Home/Home';
import User from './container/User/User';
import Messages from './container/Messages/Messages'


class App extends Component {
  render() {
    return (
      <BrowserRouter>

        <Layout>
          <Route path="/login" component={User} />
          <Route path="/home" component={Home} />
          <Route path="/messages" component={Messages} />
          {/* <Redirect from='/' to='/messages' /> */}
        </Layout>
      </BrowserRouter>
    )
  }
}

export default App