import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    marginRight: '20px',
    marginBottom: '20px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

interface Props {
  // props:Object
}

interface State {
  question: string;
  ans1: boolean,
  ans2: boolean
}

export class Editor extends Component<Props,State> {
  constructor(props:any) {
    super(props);
    this.state = {
      question: '',
      ans1: false,
      ans2: false
    }
  }
  // Before the component mounts, we initialise our state
  componentWillMount() {
  }

  // After the component did mount, we set the state each second.
  componentDidMount() {
  }

  handleChange = (tag:String, event:any) => {

    // this.setState({ [tag] : event.target.value});
  };
  // render will know everything!
  render() {
    return (<div>
        <Card className={'maxWidth: 345; '}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Question
            </Typography>
            <Typography>
              <BootstrapInput id="bootstrap-input" multiline
                rowsMax={4}
                value={this.state.question}
                onChange={(e) => this.handleChange('question', e)}
                />
            </Typography>
          </CardContent>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Answers
              <p>isCorrect</p>
            </Typography>
            <Typography>
              <BootstrapInput id="bootstrap-input" />
              <Checkbox
                checked={this.state.ans1}
                onChange={(e) => this.handleChange('ans1', e)}
                name="checkedB"
                color="primary"
              />
            </Typography>
            <Typography>
              <BootstrapInput id="bootstrap-input" />
              <Checkbox
                checked={this.state.ans2}
                onChange={(e) => this.handleChange('ans2', e)}
                name="checkedB"
                color="primary"
              />
            </Typography>

          </CardContent>
        {/* <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions> */}
      </Card>
    </div>)
  }
}