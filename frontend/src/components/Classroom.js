import React from 'react';
import { Card } from 'react-bootstrap';

const Classroom = ({ classroom }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <a href={`/classroom/${classroom._id}`}>
        <Card.Img src={classroom.image} variant="top"></Card.Img>
        <Card.Body>
          <a href={`/classroom/${classroom._id}`}>
            <Card.Title as='div' >
              <strong>{classroom.name}</strong>
            </Card.Title>
            <Card.Text as='div'>
              <div className='my-3'>
                {classroom.rating} from {classroom.numReviews} reviews
              </div>
            </Card.Text>
            <Card.Text as='h3'>${classroom.price}</Card.Text></a>
        </Card.Body>
      </a>
    </Card>
  )
}

export default Classroom
