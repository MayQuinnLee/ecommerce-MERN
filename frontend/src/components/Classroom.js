import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';

const Classroom = ({ classroom }) => {
  return (
    <Card className="my-3 p-3 rounded">

      <Link to={`/classroom/${classroom._id}`}>
        <Card.Img src={classroom.image} variant="top"></Card.Img>
      </Link>

      <Card.Body>

        <Link to={`/classroom/${classroom._id}`}>
          <Card.Title as='div' >
            <strong>{classroom.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={classroom.rating}
            text={`${classroom.numReviews} reviews`} />
        </Card.Text>

        <Card.Text className='py-3' as='h3'>${classroom.price}</Card.Text>

      </Card.Body>
    </Card>
  )
}

export default Classroom
