import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './containers/Home';

import { Layout, Menu } from 'antd';

import 'antd/dist/antd.css';
import Search from './containers/Search';
import Details from './containers/Details';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">
            <Link to="/">Home</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content>
          <Route path='/' exact component={Home} />
          <Route path='/weather/:woeid' exact component={Details} />
          <Route path='/search/:keyword' exact component={Search} />
        </Content>
        <Footer />
      </Layout>
    </BrowserRouter>

  );
}

export default App;
