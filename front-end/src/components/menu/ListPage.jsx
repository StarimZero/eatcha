import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';

const ListPage = () => {

    const [menus, setMenus] = useState([]);
    const {restaurant_id} = useParams();
 

    const callAPI = async () => {
        const res = await axios.get(`/menu/list/${restaurant_id}`)
        console.log(res.data);
        setMenus(res.data);
    }

    useEffect(()=>{
        callAPI();
    },[])

    const onClickDelete = async (menu) => {
        if(!window.confirm(`${menu.menu_id}를 삭제하시겠습니까?`)) return;
        //삭제하기
        const res = await axios.post(`/menu/delete/${menu.menu_id}`);
        console.log(res.data.result)
        if(res.data.result===1){
            alert("메뉴를 삭제하였습니다.")
            callAPI();
        }else{
            alert("무엇인가 문제가있습니다...")
        }
      }

  return (
    <Container>
        <Row>
            <Col>
                <Table>
                    <thead>
                        <tr>
                            <td>mid</td>
                            <td>메뉴이름</td>
                            <td>메뉴가격</td>
                            <td>수정하기</td>
                            <td>삭제</td>
                        </tr>
                    </thead>
                    <tbody>
                        {menus.map(menu=>
                        <tr key={menu.menu_id}>
                            <td>{menu.menu_id}</td>
                            <td>{menu.menu_name}</td>
                            <td>{menu.menu_price}</td>
                            <td><Link to={`/menu/update/${menu.menu_id}`}><Button variant='outline-primary'>수정</Button></Link></td>
                            <td><Button variant='outline-danger' onClick={()=>onClickDelete(menu)}>삭제</Button></td>
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