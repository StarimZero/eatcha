import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Grid, Box, Typography } from '@mui/material';

const Top10Slider = () => {
    const [list, setList] = useState([]);

    // 데이터 호출 함수
    const callAPI = async () => {
        try {
            const res = await axios.get(`/restaurant/list/toplist`);
            console.log(res.data);
            setList(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // 컴포넌트 마운트 시 데이터 호출
    useEffect(() => {
        callAPI();
    }, []);

    return (
        <Box sx={{ width: '100%', margin: 'auto', padding: 2 }}>
            {list.length > 0 ? (
                <Grid container spacing={2}> {/* spacing={2} 추가하여 각 아이템 사이에 여백 추가 */}
                    <Grid item xs={12} sm={6} md={6}>
                        {list[0] && (
                            <Card sx={{ position: 'relative', boxShadow: 'none', borderRadius: '0', overflow: 'hidden' }}>
                                <Box sx={{ position: 'relative', width: '100%', height: '31rem' }}>
                                    <img
                                        src={list[0].restaurant_thumb}
                                        alt={list[0].restaurant_name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            display: 'block',
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: 10,
                                            left: 10,
                                            backgroundColor: 'rgba(0, 0, 0, 0.8)', // 배경색을 좀 더 투명하게
                                            color: 'white',
                                            padding: '16px 24px',
                                            borderRadius: '12px',
                                            fontSize: '16px',
                                            fontWeight: 'bold', // 폰트 두께를 bold로 설정
                                        }}
                                    >
                                       1
                                    </Box>
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 10,
                                            right: 10,
                                            backgroundColor: 'rgba(0, 0, 0, 0.8)', // 배경색을 좀 더 투명하게
                                            color: 'white',
                                            padding: '8px 12px',
                                            borderRadius: '12px',
                                            fontSize: '16px',
                                            fontWeight: 'bold', // 폰트 두께를 bold로 설정
                                            textAlign: 'center', // 텍스트 정렬
                                            maxWidth: '80%', // 최대 너비 설정
                                            whiteSpace: 'nowrap', // 텍스트가 한 줄로 유지되도록
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis', // 텍스트가 넘칠 경우 생략 부호 표시
                                        }}
                                    >
                                        {list[0].restaurant_name}
                                    </Box>
                                </Box>
                            </Card>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Grid container spacing={2}> {/* spacing={2} 추가하여 각 아이템 사이에 여백 추가 */}
                            {list.slice(1, 3).map((item, index) => (
                                <Grid item xs={6} key={item.restaurant_id}>
                                    <Card sx={{ position: 'relative', boxShadow: 'none', borderRadius: '0', overflow: 'hidden' }}>
                                        <Box sx={{ position: 'relative', width: '100%', height: '15rem', mb: 2 }}> {/* mb: 2 추가하여 마진 추가 */}
                                            <img
                                                src={item.restaurant_thumb}
                                                alt={item.restaurant_name}
                                                style={{
                                                    width: '100%',
                                                    height: '15rem',
                                                    objectFit: 'cover',
                                                    display: 'block',
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 10,
                                                    left: 10,
                                                    backgroundColor: 'rgba(0, 0, 0, 0.8)', // 배경색을 좀 더 투명하게
                                                    color: 'white',
                                                    padding: '16px 24px',
                                                    borderRadius: '12px',
                                                    fontSize: '16px',
                                                    fontWeight: 'bold', // 폰트 두께를 bold로 설정
                                                }}
                                            >
                                                {index + 2}
                                            </Box>
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 10,
                                                    right: 10,
                                                    backgroundColor: 'rgba(0, 0, 0, 0.8)', // 배경색을 좀 더 투명하게
                                                    color: 'white',
                                                    padding: '8px 12px',
                                                    borderRadius: '12px',
                                                    fontSize: '16px',
                                                    fontWeight: 'bold', // 폰트 두께를 bold로 설정
                                                    textAlign: 'center', // 텍스트 정렬
                                                    maxWidth: '80%', // 최대 너비 설정
                                                    whiteSpace: 'nowrap', // 텍스트가 한 줄로 유지되도록
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis', // 텍스트가 넘칠 경우 생략 부호 표시
                                                }}
                                            >
                                                {item.restaurant_name}
                                            </Box>
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid container spacing={2}> {/* spacing={2} 추가하여 각 아이템 사이에 여백 추가 */}
                            {list.slice(3, 5).map((item, index) => (
                                <Grid item xs={6} key={item.restaurant_id}>
                                    <Card sx={{ position: 'relative', boxShadow: 'none', borderRadius: '0', overflow: 'hidden' }}>
                                        <Box sx={{ position: 'relative', width: '100%', height: '15rem', mb: 2 }}> {/* mb: 2 추가하여 마진 추가 */}
                                            <img
                                                src={item.restaurant_thumb}
                                                alt={item.restaurant_name}
                                                style={{
                                                    width: '100%',
                                                    height: '15rem',
                                                    objectFit: 'cover',
                                                    display: 'block',
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 10,
                                                    left: 10,
                                                    backgroundColor: 'rgba(0, 0, 0, 0.8)', // 배경색을 좀 더 투명하게
                                                    color: 'white',
                                                    padding: '16px 24px',
                                                    borderRadius: '12px',
                                                    fontSize: '16px',
                                                    fontWeight: 'bold', // 폰트 두께를 bold로 설정
                                                }}
                                            >
                                                {index + 4}
                                            </Box>
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 10,
                                                    right: 10,
                                                    backgroundColor: 'rgba(0, 0, 0, 0.8)', // 배경색을 좀 더 투명하게
                                                    color: 'white',
                                                    padding: '8px 12px',
                                                    borderRadius: '12px',
                                                    fontSize: '16px',
                                                    fontWeight: 'bold', // 폰트 두께를 bold로 설정
                                                    textAlign: 'center', // 텍스트 정렬
                                                    maxWidth: '80%', // 최대 너비 설정
                                                    whiteSpace: 'nowrap', // 텍스트가 한 줄로 유지되도록
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis', // 텍스트가 넘칠 경우 생략 부호 표시
                                                }}
                                            >
                                                {item.restaurant_name}
                                            </Box>
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            ) : (
                <Typography>Loading...</Typography>
            )}
        </Box>
    );
};

export default Top10Slider;
