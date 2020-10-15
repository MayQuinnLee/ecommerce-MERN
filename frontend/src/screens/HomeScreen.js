import React from 'react';
import { Row, Col } from 'react-bootstrap';
import classes from '../classes';
import Classroom from '../components/Classroom';

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Classes</h1>
      <Row>
        {classes.map(classroom => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Classroom classroom={classroom} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
