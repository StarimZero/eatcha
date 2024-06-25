import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Card, Col, Button, InputGroup, Form } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';

const SearchPassPage = () => {
    const location = useLocation();
    const search = new URLSearchParams(location.search)
    const findid = search.get("findid")
    const [findPass, setFindPass] = useState("");
    console.log(findid);
    const [form, setform] = useState({
        uid: 'seop',
        name: '김인섭',
        phone: '01041110342'
    })
    const { name, phone, uid } = form;

    const onChangeForm = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    //온클릭이벤트
    const onFindPass = async (name,phone,uid) =>{
        const res = await axios.post('/member/find/pass',{uid,name,phone})
        if (res.data === "") {
            alert("회원정보가 일치하지 않습니다")
            return;
        } else {
            setFindPass(res.data.member_user_password);
        }
    }
    useEffect(() => { console.log(findPass) }, [findPass])
    return (
        <div>
            <h3>비밀번호찾기</h3>
            <Row>
                <Col>
                    <Card>
                        {findid ?
                            <InputGroup>
                                <InputGroup.Text className='justify-content-center ' >아이디</InputGroup.Text>
                                <Form.Control name="uid" value={findid} readOnly/>
                            </InputGroup>
                            :
                            <InputGroup>
                                <InputGroup.Text className='justify-content-center ' >아이디</InputGroup.Text>
                                <Form.Control name="uid" value={uid} onChange={onChangeForm} />
                            </InputGroup>
                        }

                        <InputGroup className='h-25'>
                            <InputGroup.Text className=' justify-content-center '>이름</InputGroup.Text>
                            <Form.Control name="name" value={name} onChange={onChangeForm} />
                        </InputGroup >
                        <InputGroup>
                            <InputGroup.Text className='justify-content-center ' >전화번호</InputGroup.Text>
                            <Form.Control name="phone" value={phone} onChange={onChangeForm} />
                        </InputGroup>

                        <Button className='w-100 mt-2 btn-warning' onClick={()=>onFindPass(uid,name,phone)}>비밀번호찾기</Button>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default SearchPassPage