import React,  { useState,useEffect }  from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Topbar from '../common/Topbar'
import { useNavigate } from 'react-router-dom';
import ApiService from '../../utils/ApiService';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function DashboardBook() {

  const [bookData, setBookData] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    getBookData()
  },[])

  const getBookData = async() => {
    try {
      let res = await ApiService.get('/books')
      // console.log(res);
      if(res.status === 200){
        setBookData(res.data)
      }
    } catch (error) {
      alert("data fetch failed")
    }
  }

  const handleDelete = async(id) => {
    try {
      let res = await ApiService.delete(`/books/${id}`)
      // console.log(res);
      if(res.status === 200){
        getBookData();
      }
    } catch (error) {
      alert("data removal failed")
    }
  }

  return <>
    <Topbar/>
    <Container>
      <Button className='mt-3' variant='primary' onClick={()=>navigate(`/add-book`)}>Add Book</Button>
      <Row className='d-flex justify-content-start flex-row'>
        {
          bookData.map((e,i)=>{
            return <>
              <div  style={{ width: 'max-content'}}>
              <Card className='mt-5' style={{ width: '25rem'}} key={i}>
                {/* <Card.Img variant="top" src={e.image} />  */}
                <Card.Body>
                  <Card.Title><strong>Title :</strong> {e.title}</Card.Title>
                  <Card.Text><strong>Author :</strong> {e.author}</Card.Text>
                  <Card.Text><strong>ISBN No :</strong> {e.isbnNum}</Card.Text>
                  <Card.Text><strong>Description :</strong> {e.description}</Card.Text>
                  <Card.Text><strong>Published At :</strong> {e.date}</Card.Text>
                  <Button variant="secondary" onClick={()=>navigate(`/edit-book/${e.id}`)}>Edit</Button>
                  &nbsp;
                  <Button variant="danger" onClick={()=>{handleDelete(e.id)}}>Delete</Button>
                </Card.Body>
              </Card>
              </div>
            </>
          })
        }
      </Row>
    </Container>
    
  </>
}

export default DashboardBook