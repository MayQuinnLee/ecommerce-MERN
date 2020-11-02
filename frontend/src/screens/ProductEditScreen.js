import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails, updateProduct } from '../actions/productActions'
import FormContainer from '../components/FormContainer'

const ProductEditScreen = ({ history, match }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [imageError, setImageError] = useState('')
  const [description, setDescription] = useState('')
  const [instructor, setInstructor] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0)
  const [slotsAvailable, setSlotsAvailable] = useState(0)


  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productDetails = useSelector(state => state.productDetails)
  const { product, loading, error } = productDetails

  const productUpdate = useSelector(state => state.productUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (!product || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setCategory(product.category)
        setDescription(product.description)
        setInstructor(product.instructor)
        setImage(product.image)
        setSlotsAvailable(product.slotsAvailable)
      }
    } else {
      history.push('/')
    }
  }, [dispatch, history, userInfo, productId, product])

  const types = ['image/jpeg', 'image/png'];

  const imageUploadHandler = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setImage(selected);
      setImageError('');
    } else {
      setImage(null);
      setImageError('Please select an image file (png or jpeg)');
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProduct(productId,
      {
        name,
        price,
        category,
        description,
        instructor,
        image,
        slotsAvailable
      }
    ))
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
                  <Form.Control type='number' placeholder='Enter Price' value={price} onChange={e => setPrice(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='category'>
                  <Form.Label>Category</Form.Label>
                  <Form.Control type='text' placeholder='Enter Category' value={category} onChange={e => setCategory(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control type='text' placeholder='Enter Description' value={description} onChange={e => setDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='instructor'>
                  <Form.Label>Instructor</Form.Label>
                  <Form.Control type='text' placeholder='Enter Instructor' value={instructor} onChange={e => setInstructor(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='slotsAvailable'>
                  <Form.Label>Slots Available</Form.Label>
                  <Form.Control type='number' placeholder='Enter Slots Available' value={slotsAvailable} onChange={e => setSlotsAvailable(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='image'>
                  <Form.File id='imageUpload' label='Image' onChange={(e) => imageUploadHandler} />
                </Form.Group>

                <Button type='submit' variant='primary' className='my-3'>Update</Button>

                {errorUpdate ?
                  (<Message variant='danger'>{errorUpdate}</Message>)
                  : successUpdate ?
                    (<Message>Updated!</Message>)
                    : loadingUpdate ?
                      (<Loader />)
                      : (<></>)
                }

              </Form>
            )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
