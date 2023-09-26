import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { fetchData } from '../services/fetchData';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import { theme } from '../view/materialTheme';
import { Grid } from '@mui/material';

const useStyles = makeStyles({
  root: {
    margin: 'auto',
    padding: '40px',
    maxWidth: '100%',
    backgroundColor: '#f0f0ec'
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
    return <div>
      <Typography variant="h4">
        Loading NASA data
      </Typography>
      </div>;
  }

  const { title, url, explanation, date } = data;

  return (
      <Paper className={classes.root}>
        <Typography variant="h4">
        Astronomy Picture of the Day
      </Typography>
      <Typography variant="subtitle1" style={{ padding:'10px'}} >
        {title}
      </Typography>
      <ImageContainer>
        <img className={classes.image} src={url} alt={title} />
      </ImageContainer>
      <Typography variant="body1" style={{ padding:'10px'}} >
        {explanation}
      </Typography>
      <Grid container justifyContent={'left'}>
        <Grid item>
        <Typography variant="body1" style={{fontWeight: 'bold', padding:'10px'}} >
        For date: {date}
      </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Data;
