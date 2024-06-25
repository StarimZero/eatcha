import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { InputGroup, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const PassModal = () => {
    const uid = sessionStorage.getItem("uid");

    const [form, setForm] = useState({
        upass: '',
        npass: '',
        cpass: ''
    })

    const onChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const onClickSave = async () => {
        //현재 비밀번호와 일치하는지 체크
        const res = await axios.get(`/member/user?uid=${uid}`)
        console.log(res.data)
        if (res.data.member_user_password !== upass) {
            alert("현재 비밀번호가 일치하지 않습니다!")
            return;
        }
        //현재비밀번호와 새비밀번호가 같은지 체크
        if (npass === upass) {
            alert("현재 비밀번호와 다르게 설정해주십시오!")
            return;
        }
        //새비밀번호하고 비밀번호확인하고 같은지 체크
        if (npass !== cpass) {
            alert("새비밀번호가 일치하지 않습니다!")
            return;
        }
        //새비밀번호 업데이트
        if (!window.confirm("비밀번호를 변경하시겠습니까?")) return;
        await axios.post('/member/pass', { uid, password: npass })
        alert("비밀번호 변경완료!")
        sessionStorage.clear();
        window.location.href = "/member/login";
    }


    const { upass, npass, cpass } = form;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="success" onClick={handleShow}>
                비밀번호 변경
            </Button>

            <Modal
                show={show}
                style={{ top: '30%' }}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>비밀번호 변경</Modal.Title>
                </Modal.Header>
                <Modal.Body className='justify-content-center my-5 mypage userLogin'>
                    <form>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text >현재비밀번호</InputGroup.Text>
                            <Form.Control name='upass' value={upass} type='password' onChange={onChangeForm} />
                        </InputGroup>
                        <InputGroup className='mb-2 '>
                            <InputGroup.Text>새 비밀번호</InputGroup.Text>
                            <Form.Control name='npass' value={npass} type='password' onChange={onChangeForm} />
                        </InputGroup>
                        <InputGroup className='mb-2 '>
                            <InputGroup.Text >비밀번호확인</InputGroup.Text>
                            <Form.Control name='cpass' value={cpass} type='password' onChange={onChangeForm} />
                        </InputGroup>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={onClickSave}>저장</Button>
                    <Button variant="secondary" onClick={handleClose}>
                        취소
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default PassModal