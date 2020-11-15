import React, { useEffect } from 'react'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListScreen = ({ match, history }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products, page, pages } = productList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productDelete = useSelector(state => state.productDelete)
  const { success } = productDelete

  const productCreate = useSelector(state => state.productCreate)
  const { success: successCreate, createdProduct, error: errorCreate, loading: loadingCreate } = productCreate

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts('', pageNumber))

    } else {
      history.push('/')
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
      dispatch({ type: PRODUCT_CREATE_RESET })
    }

  }, [dispatch, history, userInfo, success, createdProduct, successCreate, pageNumber])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='btn-sm my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'> Create Product</i>
          </Button>
        </Col>
      </Row>
      {errorCreate && (<Message variant='danger'>{errorCreate}</Message>)}
      {loadingCreate && <Loader />}
      {loading
        ? (<Loader />)
        : error
          ? (<Message variant='danger'>{error}</Message>)
          : (
            <>
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>INSTRUCTOR</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <th>{product._id}</th>
                      <th>{product.name}</th>
                      <th>${product.price}</th>
                      <th>{product.category}</th>
                      <th>{product.instructor}</th>
                      <th>
                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                          <i className='fas fa-trash'></i>
                        </Button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </Table >
              <Paginate page={page} pages={pages} isAdmin={true} />
            </>)
      }
    </>
  )
}

export default ProductListScreen
