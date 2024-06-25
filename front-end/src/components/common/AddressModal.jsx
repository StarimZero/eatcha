import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DaumPostcodeEmbed from 'react-daum-postcode';


const AddressModal = ({setForm, form}) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const onComplete =async (e) => {
    console.log(e)
    const address=e.buildingName ? `${e.address}(${e.buildingName})` : e.address;
    const url= `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`;
    const config={
      headers : {"Authorization" : "KakaoAK 89e3021ad2846184fd12b67daf705b0f"}
            }
    const res=await axios.get(url, config);
    console.log(address, res.data.documents[0].x, res.data.documents[0].y)
    setForm({...form, restaurant_address1:address, restaurant_x:res.data.documents[0].x, restaurant_y:res.data.documents[0].y});
    handleClose();
}


  return  (
    <>
      <Button variant="primary" onClick={handleShow}>주소검색 </Button>

      <Modal
        style={{top:"10%"}}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>주소검색</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DaumPostcodeEmbed onComplete={onComplete}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddressModal