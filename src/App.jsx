import React from 'react';
import { Layout } from 'antd';

import Homepage from './components/Homepage';

import store from './store';
import { Provider } from 'react-redux';

import './css/style.min.css';
import 'antd/dist/antd.css';

const { Header, Footer, Content } = Layout;

const App = () => (
  <Provider store={store}>
    <Layout>
      <Header className='header-container'>
        <div className='header-title'>Dispex</div>
        <div className='header-subtitle'>Test Assignment</div>
      </Header>
      <Content className='main-wrapper'>
        <Homepage />
      </Content>
      <Footer className='footer-container'>
        <div className='footer-title'>Dispex Test Assignment. 2021.</div>
      </Footer>
    </Layout>
  </Provider>
);

export default App;
