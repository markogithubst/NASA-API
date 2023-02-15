import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { fetchData } from './services/fetchData';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import { theme } from './view/materialTheme';
import backgroundImage from '../src/images/backgoundImage.jpg';

const useStyles = makeStyles({
  root: {
    margin: '20px auto',
    padding: '40px',
    maxWidth: '100%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'black',
    opacity: 0.9
  },
  image: theme.image,
  title: theme.title,
  text: theme.text
});

const ImageContainer = styled.div`
  text-align: center;
  img {
    border-radius: 30px;
  }
`;

function Data() {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}`, setData, setError);
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>Loading NASA data</div>;
  }

  const { title, url, explanation } = data;

  return (
      <Paper className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        {title}
      </Typography>
      <ImageContainer>
        <img className={classes.image} src={url} alt={title} />
      </ImageContainer>
      <Typography variant="body1" className={classes.text}>
        {explanation}
      </Typography>
    </Paper>
  );
}

export default Data;
