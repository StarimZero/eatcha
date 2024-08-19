import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Container, TextField, Button, Box, Grid, Card, CardContent, CardMedia, Typography, } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { Link, useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
const TotalPage = () => {
    const uid = sessionStorage.getItem("uid")
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState([]);
    const [page, setPage] = useState(1);
    const [word, setWord] = useState('');
    const toInsert = () => {
        navigate(`/restaurant/insert`);
    }

    const callAPI = async () => {
        const res = await axios.get("/restaurant/list")
        console.log("sssssssssssssssssssssssssss", res.data)
        setRestaurant(res.data);
    }

    useEffect(() => {
        callAPI();
    }, [])

    const onClickSearch = async (e) => {
        e.preventDefault();
        setPage(1);
        await callAPI();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onClickSearch(e); // e를 전달
        }
    };

    return (
        <Container>
            <div className='mt-3'>
                <Box sx={{ mb: 3, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                label="검색어"
                                variant="outlined"
                                value={word}
                                onChange={(e) => setWord(e.target.value)}
                                onKeyDown={handleKeyDown} // Enter 키 입력 처리
                                sx={{ mr: 2, width: '500px' }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon
                                                onClick={onClickSearch}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                    </Box>
                    <Box>
                        {uid === 'admin' &&
                            <div>
                                <Button onClick={toInsert} className='m-3'>식당정보등록하기</Button>
                            </div>
                        }
                    </Box>
                </Box>
            </div>
            <Grid container spacing={4} justifyContent="center">
                {restaurant.map((info, index) => (
                    <Grid item key={index} lg={3}>
                        <Card sx={{ maxWidth: 345, cursor: "pointer" }} onClick={() => navigate(`/restaurant/read/${info.restaurant_id}`)} >
                            <CardMedia
                                component="img"
                                alt={info.restaurant_name}
                                height="150"
                                image={info.restaurant_thumb || "http://via.placeholder.com/300x150"}
                                sx={{ objectFit: 'cover' }}
                            />
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography gutterBottom variant="h6" component="div" className='ellipsis'>
                                        {info.restaurant_name.length > 8
                                            ? `${info.restaurant_name.substring(0, 8)}...`
                                            : info.restaurant_name}
                                    </Typography>
                                    <Box className='mb-3' textAlign="right">
                                        <StarIcon style={{ color: "orange" }} /> {(info.avg / 2).toFixed(1)}
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default TotalPage