import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <>
      <Header />
      <Container>
        <main className="py-3">
          <HomeScreen />
        </main>
      </Container>
      <Footer />
    </>
  );
};

export default App;
