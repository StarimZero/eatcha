import axios from 'axios'
import React, { useState } from 'react'
import { Row, Col, InputGroup, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const JoinPage = () => {
    const navi = useNavigate();
    const [form, setform] = useState({
        uid: '',
        name: '',
        password: '',
        checkPassword:'',
        phone: '',
        gender: '',
        birth: '',
    })
    const { uid, name, password, phone, gender, birth, checkPassword } = form;
    const onChangeForm = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }

    //중복체크버튼


    /*회원가입버튼 */
    const onClickInsert = async () => {
        if(password!==checkPassword){
            alert("비밀번호가 일치하지 않습니다")
        }else{
            await axios.post(`/member/insert`, form)
            alert("회원 가입 완료!")
            navi("/member/login");
        }
       
    }
    

    return (
        <div className='text-center'>
            <h1>회원가입페이지</h1>
            <Row className='justify-content-center'>
                <Col xs={6}>
                    <InputGroup className='joinbox'>
                        <InputGroup.Text className='justify-content-center'>아이디</InputGroup.Text>
                        <Form.Control name="uid" value={uid} onChange={onChangeForm}/>
                        <Button>중복체크</Button>
                    </InputGroup >
                    <InputGroup className='joinbox'>
                        <InputGroup.Text className='justify-content-center'>비밀번호</InputGroup.Text>
                        <Form.Control name="password" value={password} onChange={onChangeForm} />
                    </InputGroup >
                    <InputGroup className='joinbox'>
                        <InputGroup.Text className='justify-content-center'>비밀번호확인</InputGroup.Text>
                        <Form.Control name="checkPassword" value={checkPassword} onChange={onChangeForm}/>
                    </InputGroup >
                    <InputGroup className='joinbox'>
                        <InputGroup.Text className='justify-content-center'>이름</InputGroup.Text>
                        <Form.Control name="name" value={name} onChange={onChangeForm}/>
                    </InputGroup >
                    <InputGroup className='joinbox'>
                        <InputGroup.Text className='justify-content-center'>전화번호</InputGroup.Text>
                        <Form.Control name="phone" value={phone} onChange={onChangeForm}/>
                    </InputGroup >
                    <InputGroup className='joinbox'>
                        <InputGroup.Text className='justify-content-center'>성별</InputGroup.Text>
                        <Form.Check
                            type="radio"
                            name="gender"
                            id="1"
                            label="남자"
                            value={1}
                            onChange={onChangeForm}
                        />
                        <Form.Check
                            type="radio"
                            name="gender"
                            id="2"
                            label="여자"
                            value={2}
                            onChange={onChangeForm}
                        />
                    </InputGroup >
                    <InputGroup className='joinbox'>
                        <InputGroup.Text className='justify-content-center'>생년월일</InputGroup.Text>
                        <Form.Control type="date" name="birth" value={birth} onChange={onChangeForm}/>

                    </InputGroup >
                    <div>
                        <Button onClick={()=>onClickInsert()}>회원가입하기</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default JoinPage