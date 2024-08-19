import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Grid, Typography, Card, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import MapPage from './MapPage';
import ReviewPage from './ReviewPage';
import ListPage from '../menu/ListPage';

const ReadPage = () => {
    const [avg, setAvg] = useState('');
    const [info, setInfo] = useState({});
    const { restaurant_id } = useParams();
    const {
        restaurant_name = '',
        restaurant_phone = '',
        restaurant_type = '',
        restaurant_url = '',
        restaurant_x = '',
        restaurant_y = '',
        restaurant_time = '',
        restaurant_etcinfo = '',
        restaurant_address1 = '',
        restaurant_address2 = '',
        restaurant_avgprice = '',
        restaurant_thumb = '',
        restaurant_category = ''
    } = info;

    const callAPI = async () => {
        try {
            const res = await axios.get(`/restaurant/read/${restaurant_id}`);
            const res2 = await axios.get(`/restaurant/avg/${restaurant_id}`);
            setAvg(res2.data.avg);
            setInfo(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        callAPI();
    }, [restaurant_id]);

    const onClickDelete = async () => {
        if (!window.confirm(`${restaurant_id}를 삭제하시겠습니까?`)) return;
        try {
            const res = await axios.post(`/restaurant/delete/${restaurant_id}`);
            if (res.data.result === 1) {
                alert("식당정보를 삭제하였습니다.");
                callAPI();
            } else {
                alert("무엇인가 문제가있습니다.");
            }
        } catch (error) {
            console.error('Error deleting restaurant:', error);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Card sx={{ padding: 3 }}>
                <Typography variant="h4" gutterBottom>
                    {restaurant_name}
                </Typography>
                <Box sx={{ mb: 2, textAlign: 'center' }}>
                    <img
                        src={restaurant_thumb || "http://via.placeholder.com/300x300"}
                        alt={restaurant_name}
                        style={{ width: '30rem', borderRadius: '8px' }}
                    />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <ReviewPage restaurant_id={restaurant_id} type={restaurant_type} category={restaurant_category} />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6">상세 정보</Typography>
                    <TableContainer component={Card}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>항목</TableCell>
                                    <TableCell>정보</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>주소</TableCell>
                                    <TableCell>{`${restaurant_address1} ${restaurant_address2}`}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>영업시간</TableCell>
                                    <TableCell>{restaurant_time || "?"}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>평균가격</TableCell>
                                    <TableCell>{restaurant_avgprice || "-"} 원</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>기타정보</TableCell>
                                    <TableCell>{restaurant_etcinfo || "-"}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>네이버</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="text"
                                            color="primary"
                                            onClick={() => window.open(restaurant_url, '_blank')}
                                        >
                                            {restaurant_url || "-"}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" gutterBottom>메뉴</Typography>
                    <Box mb={2}>
                        <Link to={`/menu/insert/${restaurant_id}`} style={{ textDecoration: 'none' }}>
                            <Button variant="outlined" color="success" size="small" sx={{ mr: 1 }}>
                                메뉴등록하기
                            </Button>
                        </Link>
                        <Button variant="outlined" color="error" size="small">
                            메뉴 삭제하기
                        </Button>
                    </Box>
                    <ListPage />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" gutterBottom>매장위치</Typography>
                    <MapPage />
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                    <Button variant="outlined" color="error" onClick={onClickDelete} sx={{ mr: 1 }}>
                        식당삭제하기
                    </Button>
                    <Link to={`/restaurant/update/${restaurant_id}`} style={{ textDecoration: 'none' }}>
                        <Button variant="outlined" color="warning">
                            식당 수정하기
                        </Button>
                    </Link>
                </Box>
            </Card>
        </Container>
    );
};

export default ReadPage;
