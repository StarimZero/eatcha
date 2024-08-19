import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Card, Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RecomandSlider = () => {
    const [list, setList] = useState([]);
    const navi=useNavigate();
    // 데이터 호출 함수
    const callAPI = async () => {
        try {
            const res = await axios.get(`/restaurant/list/recomand`);
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

    // Slider 설정
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
    };

    return (
        <Box sx={{ width: '100%', margin: 'auto', padding: 2 }}>
            <Slider {...settings}>
                {list.map((l, index) => (
                    <Box key={l.restaurant_id} sx={{ padding: 1 }} onClick={()=>navi(`/restaurant/read/${l.restaurant_id}`)}>
                        <Card sx={{ cursor:"pointer" , position: 'relative', boxShadow: 'none', borderRadius: '8px', overflow: 'hidden' }}>
                            <Box sx={{ position: 'relative', width: '20rem', height: '15rem' }}>
                                <img
                                    src={l.restaurant_thumb}
                                    alt={l.restaurant_name}
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
                                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                        color: 'white',
                                        padding: '9px 15px',
                                        borderRadius: '12px',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {index + 1}
                                </Box>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 10,
                                        right: 35,
                                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                        color: 'white',
                                        padding: '12px 24px',
                                        borderRadius: '12px',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        maxWidth: '80%',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {l.restaurant_name}
                                </Box>
                            </Box>
                        </Card>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default RecomandSlider;
