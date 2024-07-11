import React from 'react';
import { Typography, Box } from '@mui/material';

const AboutYogacenter: React.FC = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', borderRadius: 2, maxWidth: 800, margin: '0 auto', textAlign: 'left' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Почему именно Студия йоги "Гармония движения"?
      </Typography>
      <Typography variant="h6" component="h3" gutterBottom>
        1. Комфорт.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Большое, светлое, уютное пространство с панорамными окнами, из которых открывается прекрасный вид.
      </Typography>
      <Typography variant="h6" component="h3" gutterBottom>
        2. Квалификация инструкторов.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Наши инструкторы, которые с любовью и большой погруженностью относятся к своему делу, постоянно обучаются и повышают свою квалификацию для безопасных, правильных и эффективных занятий.
      </Typography>
      <Typography variant="h6" component="h3" gutterBottom>
        3. Укрепление физического здоровья, гармония души и тела.
      </Typography>
      <Typography variant="body1">
        Систематические занятия в нашей студии способствуют значительному укреплению физических показателей вашего тела, развивается гибкость, сила, координация, мышцы приобретают тонус. Вы научитесь правильно дышать и расслабляться, что немаловажно для гармонии души и тела.
      </Typography>
    </Box>
  );
};

export default AboutYogacenter;
