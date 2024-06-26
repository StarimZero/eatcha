import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Table, Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';


const ListPage = () => {

    
    const [restaurant, setRestaurant] = useState([]);


    const callAPI = async () => {
        const res = await axios.get("/restaurant/list")
        console.log(res.data)
        setRestaurant(res.data);
      }
  
      useEffect(()=>{
        callAPI();
      },[])

      const onClickDelete = async (restaurant_id) => {
        if(!window.confirm(`${restaurant_id}를 삭제하시겠습니까?`)) return;
        //삭제하기
        const res = await axios.post(`/restaurant/delete/${restaurant_id}`);
        console.log(res.data.result)
        if(res.data.result===1){
            alert("식당정보를 삭제하였습니다.")
            callAPI();
        }else{
            alert("무엇인가 문제가있습니다.")
        }
      }



  return (
    <Container>
        <Row className='justify-content-center'>
            <Col lg={10}>
                <h1 className='text-center mb-5'>전체식당리스트</h1>
                <Table>
                    <thead>
                        <tr>
                            <td>식당id</td>
                            <td>식당이름</td>
                            <td>식당주소</td>
                            <td>뭐꼬</td>
                            <td>타입</td>
                            <td>식당삭제</td>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurant.map(info=>
                            <tr key={info.restaurant_id}>
                                <td>{info.restaurant_id}</td>
                                <td><Link to={`/restaurant/read/${info.restaurant_id}`}>{info.restaurant_name}</Link></td>
                                <td>{info.restaurant_address1}</td>
                                <td>{info.restaurant_avgprice}</td>
                                <td>{info.restaurant_type}</td>
                                <td><Button size='sm' variant='outline-danger' onClick={()=>onClickDelete(info.restaurant_id)}>삭제하기</Button></td>
                            </tr>
                        )}

                    </tbody>
                </Table>
            </Col>
        </Row>
    </Container>
  )
}

export default ListPage