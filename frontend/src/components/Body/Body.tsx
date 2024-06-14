import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const StyledPaper = styled(Paper)(({ theme }) => ({
    position: 'relative',
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(6),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: 'url(https://irkutsk.bonodono.ru/upload/iblock/6e4/r6i33u22yi2gqqy65nbc3cpkgo8488sn.jpg)',
    width: '100%',
    height: '800px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

const Overlay = styled('div')(({ theme }) => ({
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
}));

const Body = () => {
    return (
        <StyledPaper>
            <Overlay>
                <Typography variant="h2" component="h1" gutterBottom>
                    Центр йоги «Гармония движения»
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Здоровье и хорошее настроение вместе с нами
                </Typography>
                <Button variant="contained" sx={{ bgcolor: '#BC8F8F', color: '#fff' }}>
                    Записаться
                </Button>
            </Overlay>
        </StyledPaper>
    );
};

export default Body;
