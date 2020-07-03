import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 196,
    maxHeight:315,
    minHeight:315,
    minWidth:196
  },
});

export default function ImgMediaCard(props) {
  const classes = useStyles();
  function checkimg(otherdata){
      if(otherdata===undefined){
        return null
      }
      return otherdata.imageLinks.thumbnail;

  }
  return (
    <Card className="each-card" className={classes.root}>{console.log(props.props)}
      <CardActionArea>
        <CardMedia
          component="img"
          alt={props.props.Name}
          height="140"
          image={checkimg(props.props.otherdata)}
          title={props.props.Name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.props.Name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
