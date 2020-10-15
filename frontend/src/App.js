import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen.js';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Header />
      <Container>
        <main className="py-3">
          <Route path='/' component={HomeScreen} exact />
          <Route path='/classroom/:id' component={ProductScreen} />
        </main>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
