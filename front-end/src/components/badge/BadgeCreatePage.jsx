import React, { useState, useRef } from 'react'
import { Row, Col, InputGroup, Card, Form, Button } from 'react-bootstrap'
import { app } from '../../firebaseInit'
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';


const BadgeCreatePage = () => {
    const [file, setFile] = useState('');
    const [url, setUrl] = useState('');
    const [form, setForm] = useState({
        badge_name: '',
        badge_text: '',
        badge_req: '',
        badge_img: url
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

    const onUploadImg = async () => {
        if (file.byte === null) return;
        if (!window.confirm("이미지를 추가하시겠습니까?")) return;
        try {
            const uuid = uuidv4().split('-')[0]
            const fileRef = ref(storage, `/badge/${uuid}`);
            const snapshot = await uploadBytes(fileRef, file.byte); // 파일 업로드
            const img = await getDownloadURL(snapshot.ref); // 업로드 완료 후 다운로드 URL 가져오기
            setUrl(img)
            alert("이미치 추가 완료!");
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const onInsertBadge = async () => {
        if (!file || file.byte === null) return;
        if (!window.confirm("이미지를 추가하고 뱃지를 등록하시겠습니까?")) return;
        try {
            // 이미지 업로드
            const uuid = uuidv4().split('-')[0];
            const fileRef = ref(storage, `/badge/${uuid}`);
            const snapshot = await uploadBytes(fileRef, file.byte); // 파일 업로드
            const img = await getDownloadURL(snapshot.ref); // 업로드 완료 후 다운로드 URL 가져오기
            setUrl(img);

            // 뱃지 등록
            await axios.post(`/badge/insert`, {
                badge_name,
                badge_text,
                badge_req,
                badge_img: img
            });
            alert('뱃지 등록 완료');
            window.location.href = "/badge/list.json";
        } catch (error) {
            console.error("Error uploading image or inserting badge:", error);
            alert("이미지 업로드 또는 뱃지 등록에 실패했습니다.");
        }
    };


    return (
        <div>
            <h1>뱃지생성페이지</h1>
            <Row className='justify-content-center'>
                <Col xs={4} md={6} lg={8}>
                    <Card>
                        <Card.Header>
                            <div>
                                뱃지만들기
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col className='justify-content-center text-center px-0 py-0'>
                                    <div className='my-3'>
                                        <img src={file.name || "/image/plus.png"} style={{ width: "10rem", height: "10rem", cursor: "pointer" }} onClick={() => refFile.current.click()} />
                                        <input ref={refFile} type="file" onChange={onChangeFile} style={{ display: "none" }} />
                                    </div>
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
                                    <Button className='me-2' onClick={onInsertBadge}>뱃지생성하기</Button>
                                    <Button>수정취소</Button>
                                </div>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default BadgeCreatePage