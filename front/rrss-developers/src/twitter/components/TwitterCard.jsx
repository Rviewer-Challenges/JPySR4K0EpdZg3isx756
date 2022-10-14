import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'

const TwitterCard = ({ tweets }) => {
  console.log(tweets)
  return (
    <Card>
      <ListGroup>
        <Card.Body>
          <Card.Title>{tweets.username}</Card.Title>
          <Card.Subtitle className='m-2' >{tweets.description}</Card.Subtitle>
          <Card.Subtitle className='m-2'>Followers:<strong>{tweets.followers}</strong></Card.Subtitle>
          {tweets.tweets.map((tw) => {
            return (
              <ListGroup.Item key={tw._id}>{tw.text}</ListGroup.Item>
            )
          })
          }
        </Card.Body>
      </ListGroup>
    </Card>
  )
}

export default TwitterCard