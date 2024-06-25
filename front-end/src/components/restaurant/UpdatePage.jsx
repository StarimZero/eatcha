import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Col, Card, Form, InputGroup } from 'react-bootstrap'
import AddressModal from '../common/AddressModal'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const UpdatePage = () => {

    const navi = useNavigate();
    const [form, setForm] = useState("");
    const [restaurant, setRestaurant] = useState("");
    const {restaurant_id} = useParams();
    
    
    
    
    const callAPI = async () => {
        const res = await axios.get(`/restaurant/read/${restaurant_id}`);
        console.log(res.data);
        setForm(res.data);
        setRestaurant(res.data);
    }

    useEffect(()=>{
        callAPI();
    },[])
    
    
    
    const onChangeForm = (e) => {
        setForm({...form, [e.target.name] : e.target.value});
    }

    const onClickUpdate = async () => {
        if(JSON.stringify(restaurant)===JSON.stringify(form)){
            alert("수정한내용이없습니다.")
            return;
        }else{
            if(!window.confirm("식당정보를 수정하시겠습니까?")) return;
            //수정하기
            const res = await axios.post(`/restaurant/update`, form);
            if(res.data.result===1){
                alert("식당정보수정완료")
                navi(`/restaurant/read/${restaurant_id}`);
            }else{
                alert("무엇인가 문제가 있습니다.")
                console.log(res.data.result)
            }
        } 
    }




  return (
    <Container>
    <Row className='justify-content-center mt-5'> 
        <Col lg={6}>
            <Card>
                <Card.Header>
                    <div className='text-center'>
                        <h1>식당 정보 수정하기</h1>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <InputGroup className='mb-2' >
                            <InputGroup.Text>식당이름</InputGroup.Text>
                            <Form.Control name='restaurant_name' value={form.restaurant_name} onChange={onChangeForm}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>식당분류</InputGroup.Text>
                            <Form.Select name='restaurant_type' value={form.restaurant_type} onChange={onChangeForm} >
                                <option value="0">분류를 선택하세요</option>
                                <option value="1">한식</option>
                                <option value="2">중식</option>
                                <option value="3">일식</option>
                                <option value="4">양식</option>
                            </Form.Select>
                        </InputGroup>
                        <InputGroup className='mb-2' >
                            <InputGroup.Text>운영시간</InputGroup.Text>
                            <Form.Control name='restaurant_time' value={form.restaurant_time} onChange={onChangeForm}/>
                        </InputGroup>
                        <InputGroup className='mb-2' >
                            <InputGroup.Text>평균비용</InputGroup.Text>
                            <Form.Control name='restaurant_avgprice' value={form.restaurant_avgprice} onChange={onChangeForm}/>
                        </InputGroup>
                        <InputGroup className='mb-2' >
                            <InputGroup.Text>기타정보</InputGroup.Text>
                            <Form.Control  name='restaurant_etcinfo' value={form.restaurant_etcinfo} onChange={onChangeForm}/>
                        </InputGroup>
                        <InputGroup className='mb-2' >
                            <InputGroup.Text>식당주소</InputGroup.Text>
                            <Form.Control name='restaurant_address1' value={form.restaurant_address1} onChange={onChangeForm}/>
                            <AddressModal/>
                        </InputGroup>
                        <InputGroup className='mb-2' >
                            <InputGroup.Text>상세주소</InputGroup.Text>
                            <Form.Control name='restaurant_address2' value={form.restaurant_address2} onChange={onChangeForm}/>
                        </InputGroup>
                        <InputGroup className='mb-2' >
                            <InputGroup.Text>식장전화</InputGroup.Text>
                            <Form.Control name='restaurant_phone' value={form.restaurant_phone} onChange={onChangeForm}/>
                        </InputGroup>
                        <InputGroup className='mb-2' >
                            <InputGroup.Text>지도링크</InputGroup.Text>
                            <Form.Control name='restaurant_url' value={form.restaurant_url} onChange={onChangeForm}/>
                        </InputGroup>
                        <InputGroup className='mb-2' >
                            <InputGroup.Text>엑스좌표</InputGroup.Text>
                            <Form.Control name='restaurant_x' value={form.restaurant_x} onChange={onChangeForm}/>
                        </InputGroup>
                        <InputGroup className='mb-2' >
                            <InputGroup.Text>와이좌표</InputGroup.Text>
                            <Form.Control name='restaurant_y'value={form.restaurant_y} onChange={onChangeForm}/>
                        </InputGroup>
                        <div className='text-end'>
                            <Button className='me-2'>다시쓰기</Button>
                            <Button onClick={onClickUpdate}>수정하기</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
</Container>
    
  )
}

export default UpdatePage