import React from 'react';
import ArticleAccordion from './ArticleAccordion';
import { Stack, Container } from '@mui/material';

interface ArticleData {
  title: string;
  content: string;
}

const articles: ArticleData[] = [
  { title: 'Article 1', content: 'Amet aenean faucibus. Amet, tempus in sit arcu malesuada sit platea vitae amet, est. Amet, molestie in libero, hac urna nulla sit in sed mauris dictumst. Mollis mattis pellentesque dui et. Interdum morbi odio. Eleifend nunc nunc nec dictum mauris amet, ornare dapibus aenean integer elit. Est. Elit. Arcu lacinia quis, non dui amet, quis, non cursus id ornare augue in ut. Dolor cras ornare nec adipiscing libero, nisi orci, malesuada vitae consectetur ex. Sit cras malesuada morbi cursus habitasse imperdiet integer quam, lorem ipsum et nec sapien mattis ornare habitasse aenean venenatis vel odio. Ornare dui arcu vestibulum aenea.' },
  { title: 'Article 2', content: 'Malesuada sapien venenatis sapien id ornare ornare elit. Vel dictum. Et. Non lectus arcu efficitur dictum. Justo sed quis, dictumst. Nunc sodales ipsum urna lectus platea quam, vulputate risus leo, pulvinar mauris quis, platea nunc lorem aenean venenatis urna dictumst.' },
  { title: 'Article 3', content: 'Cursus lorem elit. Vitae molestie libero, aenean justo dictum. Nunc quis, sapien dapibus hac aenean in dictum amet, in urna pulvinar non et efficitur et in cras tortor, quam, non lectus et venenatis velit malesuada est. Odio. Arcu tortor, augue amet, sapien cras dapibus ex. Elit. Adipiscing tortor, cras nisi id consectetur eget interdum urna adipiscing dictum dictum ornare sit accumsan vestibulum hac ornare eleifend consectetur urna consectetur imperdiet e.' },
  { title: 'Article 4', content: 'Lacinia luctus efficitur nunc et vel elit. Dui id augue est. Eleifend ornare lectus ultricies. Tempus non quam, augue intege.' },
];

const ArticleList: React.FC = () => {
  return (
    <Container>
      <Stack spacing={2} marginBottom={5}>
        {articles.map((article, index) => (
          <ArticleAccordion key={index} title={article.title} content={article.content} isOdd={(index + 1) % 2 !== 0} />
        ))}
      </Stack>
    </Container>
  );
};

export default ArticleList;