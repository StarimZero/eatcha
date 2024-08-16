import React, { useState, useRef, useEffect } from 'react'
import { Row, Col, InputGroup, Card, Form, Button } from 'react-bootstrap'
import { app } from '../../firebaseInit'
import { ref, uploadBytes, getDownloadURL, getStorage, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const BadgeUpdatePage = () => {
    const { key } = useParams();
    const navi = useNavigate();
    const callAPI = async () => {
        const res = await axios.get(`/badge/read/${key}`)
        console.log(res.data)
        setForm(res.data)
    }
    useEffect(() => { callAPI() }, [])

    const [file, setFile] = useState('');
    const [url, setUrl] = useState('');
    const [form, setForm] = useState({
        badge_name: '',
        badge_text: '',
        badge_req: '',
        badge_img: ''
    })
    const refFile = useRef();

    const storage = getStorage(app)
    const { badge_name, badge_text, badge_req, badge_img } = form

    const onChangeFile = (e) => {
        setFile({
            name: URL.createObjectURL(e.target.files[0]),
            byte: e.target.files[0]
        })
    }

    const onChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const onclickback = () => {
        navi(-1);
    }

    const onUpdateBadge = async () => {
        let img = badge_img; // 초기 이미지는 기존 이미지로 설정

        // 파일이 선택되었을 때만 업로드 수행
        if (file!=='') {
            const uuid = uuidv4().split('-')[0]
            const fileRef = ref(storage, `images/${uuid}`);
            const snapshot = await uploadBytes(fileRef, file.byte); // 파일 업로드
            img = await getDownloadURL(snapshot.ref); // 업로드된 이미지의 URL 가져오기

             // 새로운 이미지 업로드가 성공한 후 기존 이미지 삭제
             if (badge_img) {
                const oldImageRef = ref(storage, badge_img);
                await deleteObject(oldImageRef).catch((error) => {
                    console.error('기존 이미지 삭제 실패:', error);
                });
            }

            setUrl(img);
        }

        // API 호출하여 뱃지 정보 업데이트
        const res = await axios.post(`/badge/update`, {
            badge_name,
            badge_text,
            badge_req,
            badge_img: img, // 변경된 이미지 URL 또는 기존 이미지 URL
            badge_key: key
        });

        if (res.data.result === 1) {
            // 업데이트가 성공했을 때
            alert('뱃지가 성공적으로 수정되었습니다.');
            navi(-1);  // 이전 페이지로 이동
        } else {
            // 업데이트 중에 오류가 발생했을 때
            alert('뱃지 수정에 실패했습니다. 다시 시도해 주세요.');
        }

    }
    return (
        <div>
            <h1>뱃지수정페이지</h1>
            <Row className='justify-content-center'>
                <Col xs={6} md={8} lg={10}>
                    <Card>
                        <Card.Header>
                            <div>
                                뱃지만들기
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col className='justify-content-center text-center px-0 py-0'>
                                    <img src={file.name||badge_img} style={{ width: "10rem", height: "10rem", cursor: "pointer" }} onClick={() => refFile.current.click()} />
                                    <input ref={refFile} type="file" onChange={onChangeFile} style={{ display: "none" }} />
                                    <InputGroup className='mb-2'>
                                        <InputGroup.Text>뱃지번호</InputGroup.Text>
                                        <Form.Control name="badge_key" value={form.badge_key} readOnly />
                                    </InputGroup>
                                    <InputGroup className='mb-2'>
                                        <InputGroup.Text>뱃지이름</InputGroup.Text>
                                        <Form.Control name="badge_name" value={form.badge_name} onChange={onChangeForm} />
                                    </InputGroup>
                                    <InputGroup className='mb-2'>
                                        <InputGroup.Text>뱃지내용</InputGroup.Text>
                                        <Form.Control name="badge_text" value={form.badge_text} onChange={onChangeForm} />
                                    </InputGroup>
                                    <InputGroup className='mb-2'>
                                        <InputGroup.Text>필요조건</InputGroup.Text>
                                        <Form.Control name="badge_req" value={form.badge_req} onChange={onChangeForm} />
                                    </InputGroup>
                                </Col>
                                <div className='text-center mt-2'>
                                    <Button className='me-2' onClick={onUpdateBadge}>수정하기</Button>
                                    <Button onClick={onclickback}>수정취소</Button>
                                </div>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default BadgeUpdatePage