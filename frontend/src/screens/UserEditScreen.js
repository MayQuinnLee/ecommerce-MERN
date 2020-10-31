import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const UserEditScreen = ({ history, match }) => {
  const userId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (!user || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    } else {
      history.push('/')
    }
  }, [dispatch, history, userInfo, userId, user])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUserProfile(userId, { name, email, isAdmin }))
  }

  return (
    <>
      <FormContainer>
        <Link to='/admin/userlist' className='btn btn-light my-3' >Go back
    </Link>

        <h2>Update User</h2>
        {loading
          ? (<Loader />)
          : error
            ? (<Message variant='danger'>{error}</Message>)
            : (
              <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control type='name' placeholder={'Enter username'} value={name} onChange={e => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type='email' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='isAdmin'>
                  <Form.Label>Admin user</Form.Label>
                  <Form.Check type='checkbox' checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)}
                  ></Form.Check>
                </Form.Group>

                <Button type='submit' variant='primary'>Update</Button>

              </Form>
            )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
