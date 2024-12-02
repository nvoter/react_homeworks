import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from '../styles/ArticleAccordion.module.scss';

interface ArticleAccordionProps {
  title: string;
  content: string;
  isOdd: boolean;
}

const ArticleAccordion: React.FC<ArticleAccordionProps> = ({ title, content, isOdd }) => {
  return (
    <Accordion className={`${styles.accordion} ${isOdd ? styles.odd : styles.even}`}>
      <AccordionSummary expandIcon={<ExpandMoreIcon className={styles.icon}/>} className={styles.summary}>
        <Typography fontWeight={1000}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography className={styles.content}>{content}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default ArticleAccordion;