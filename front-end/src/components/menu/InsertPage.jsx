import axios from 'axios';
import React, { useState } from 'react'
import { Card, Col, Container, InputGroup, Row, Form, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

const InsertPage = () => {


    const navi = useNavigate();
    const {restaurant_id} = useParams();
    const [form, setForm] = useState({
        restaurant_id : parseInt(`${restaurant_id}`),
        menu_name : "",
        menu_price : "",
        menu_profile_photo: "",
        menu_photo: "",
    })


    const onChangeForm = (e) => {
        setForm({...form, [e.target.name] : e.target.value});
    }

    const onSubmit = async (e) =>{
        e.preventDefault();

        if(form.menu_name=="" || form.menu_price===""){
            alert("필수사항을 적어주세요") 
        }else{
            if(!window.confirm("메뉴를 등록하시겠습니까?")) return;
            //식당인서트하기
            const res = await axios.post(`/menu/insert`, form);
            console.log(form);
            console.log(res.data);
            
            if(res.data.result===1){
                alert("등록이 완료되었습니다.")
                navi("/");
            }else{
                alert("무엇인가 문제가 있습니다.")
            }
        }
    }


  return (
    <Container>
        <Row className='my-5 justify-content-center'>
            <Col lg={5}>
                <Card>
                    <Card.Header>
                        <div className='text-center'>
                            <h3>식당메뉴등록하기</h3>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <form onSubmit={onSubmit}>
                            <InputGroup className='mb-2' >
                                <InputGroup.Text>식당번호</InputGroup.Text>
                                <Form.Control value={form.restaurant_id} name='restaurant_id' />
                            </InputGroup>
                            <InputGroup className='mb-2' >
                                <InputGroup.Text>메뉴이름</InputGroup.Text>
                                <Form.Control name='menu_name' value={form.menu_name} onChange={onChangeForm}/>
                            </InputGroup>
                            <InputGroup className='mb-2' >
                                <InputGroup.Text>메뉴가격</InputGroup.Text>
                                <Form.Control name='menu_price' value={form.menu_price} onChange={onChangeForm}/>
                            </InputGroup>
                            <InputGroup className='mb-2' >
                                <InputGroup.Text>대표사진</InputGroup.Text>
                                <input type="file" name='menu_profile_photo' value={form.menu_profile_photo} onChange={onChangeForm}/>
                            </InputGroup>
                            <InputGroup className='mb-2' >
                                <InputGroup.Text>음식사진</InputGroup.Text>
                                <input type="file" name='menu_photo' value={form.menu_photo} onChange={onChangeForm}/>
                            </InputGroup>
                            <hr/>
                            <div className='text-end'>
                                <Button className='me-3' variant='outline-danger'>취소하기</Button>
                                <Button variant='outline-primary' type='submit'>등록하기</Button>
                            </div>
                        </form>
                    </Card.Body>
                    
                </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default InsertPage