import React,  { useState,useEffect }  from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Topbar from '../common/Topbar'
import { useNavigate } from 'react-router-dom';
import ApiService from '../../utils/ApiService';
import Button from 'react-bootstrap/Button';
import { Table } from 'react-bootstrap';
// import Card from 'react-bootstrap/Card';

function DashboardAuthor() {

  const [authorData, setAuthorData] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    getAuthorData()
  },[])

  const getAuthorData = async() => {
    try {
      let res = await ApiService.get('/authors')
      // console.log(res);
      if(res.status === 200){
        setAuthorData(res.data)
      }
    } catch (error) {
      alert("data fetch failed")
    }
  }

  const handleDelete = async(id) => {
    try {
      let res = await ApiService.delete(`/authors/${id}`)
      // console.log(res);
      if(res.status === 200){
        getAuthorData();
      }
    } catch (error) {
      alert("data removal failed")
    }
  }

  return <>
    <Topbar/>
    <Container>
      <Button className='mt-3' variant='primary' onClick={()=>navigate(`/add-author`)}>Add Author</Button>
      <Row className='d-flex justify-content-start flex-row'>
      <div className='mt-3'>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Author Name</th>
                    <th>Author DOB</th>
                    <th>Author Bio</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    authorData.map((e,i)=>{
                      return <>
                        <tr key={i}>
                          <td>{i+1}</td>
                          <td>{e.name}</td>
                          <td>{e.date}</td>
                          <td>{e.bio}</td>
                          <td>
                            <Button variant='secondary' onClick={()=>navigate(`/edit-author/${e.id}`)}>Edit</Button>
                            &nbsp;
                            <Button variant='danger' onClick={()=>{handleDelete(e.id)}}>Delete</Button>
                          </td>
                        </tr>
                      </>
                    })
                  }
                </tbody>
              </Table>
            </div>
      </Row>
    </Container>
    
  </>
}

export default DashboardAuthor