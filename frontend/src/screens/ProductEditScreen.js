import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'
import FormContainer from '../components/FormContainer'

const ProductEditScreen = ({ history, match }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [images, setImages] = useState('')
  const [description, setDescription] = useState('')
  const [instructor, setInstructor] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [slotsAvailable, setSlotsAvailable] = useState('')
  const [rating, setRating] = useState('')
  const [numReviews, setNumReviews] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productDetails = useSelector(state => state.productDetails)
  const { product, loading, error } = productDetails

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (!product || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setImages(product.images)
        setDescription(product.description)
        setInstructor(product.instructor)
        setCategory(product.category)
        setPrice(product.price)
        setSlotsAvailable(product.slotsAvailable)
        setRating(product.rating)
        setNumReviews(product.numReviews)
      }
    } else {
      history.push('/')
    }
  }, [dispatch, history, userInfo, productId, product])

  const submitHandler = (e) => {
    e.preventDefault()
    // dispatch(updateUser(userId, { name, email, isAdmin }))
  }

  return (
    <>
      <FormContainer>
        <Link to='/admin/productlist' className='btn btn-light my-3' >Go back
    </Link>

        <h2>Update Product</h2>
        {loading
          ? (<Loader />)
          : error
            ? (<Message variant='danger'>{error}</Message>)
            : (
              <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type='name' placeholder='Enter Name' value={name} onChange={e => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='price'>
                  <Form.Label>Price</Form.Label>
                  <Form.Control type='text' placeholder='Enter Price' value={price} onChange={e => setPrice(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='my-3'>Update</Button>

              </Form>
            )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
