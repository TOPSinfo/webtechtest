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
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

// import { Formik, Form, FormikProps } from ‘formik’
// import * as Yup from ‘yup’
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
    width: '100%',
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
  ans1: string,
  ans2: string,
  isCorrect1: boolean,
  isCorrect2: boolean
}

export class Editor extends Component<Props,State> {
  constructor(props:any) {
    super(props);
    this.state = {
      question: '',
      // ans: [
      //   {
      //     ans1: '',
      //     isCorrect: false
      //   }
      // ],
      ans1: '',
      ans2:'',
      isCorrect1: false,
      isCorrect2: false
    }
  }
  // Before the component mounts, we initialise our state
  componentWillMount() {
  }

  // After the component did mount, we set the state each second.
  componentDidMount() {
  }

  handleChange = (event:any) => {
    this.setState({ [event.target.name] : event.target.value} as State);
  };

  handleChecked = (event: any) => {
    this.setState({ [event.target.name] : event.target.checked} as State);
  }

  handleSubmit = () => {
    // your submit logic
  }

  // render will know everything!
  render() {
    return (<div>
        <Card style={{'margin': '15Px'}}>
          <CardContent>
            <GridList className={'height: auto'} cols={3}>
                <GridListTile style={{'height': 'auto'}} rows={1} cols={2} component={'div'}>
                  <h2>Question</h2>
                </GridListTile>
                <GridListTile style={{'width': '100%', 'height': 'auto'}} cols={3}>
                {/* <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                    onError={errors => console.log(errors)}
                >
                    <TextValidator
                        id="bootstrap-input" multiline
                        rowsMax={4}
                        style={{'width': '100%', 'height': 'auto'}}
                        onChange={(e) => this.handleChange(e)}
                        name="question"
                        value={this.state.question}
                        validators={['required']}
                        errorMessages={['Question is required']}
                    />
                    <Button type="submit">Add</Button>
                </ValidatorForm> */}
                  <BootstrapInput id="bootstrap-input" multiline
                    name="question"
                    rowsMax={4}
                    value={this.state.question}
                    style={{'width': '100%', 'height': 'auto'}}
                    onChange={(e) => this.handleChange(e)}
                    />
                </GridListTile>
            </GridList>
          </CardContent>
          <CardContent>
              <GridList className={'height: auto'} cols={3}>
                <GridListTile style={{'height': 'auto'}} rows={1} cols={2} component={'div'}>
                  <h2>Answer</h2>
                </GridListTile>
                <GridListTile style={{'height': 'auto'}} rows={1} cols={1} component={'div'}>
                  <h2>isCorrect</h2>
                </GridListTile>
              </GridList>
              <GridList className={'height: auto'} cols={3}>
                <GridListTile style={{'height': 'auto'}} rows={1} cols={2}>
                {/* <ValidatorComponent> */}
                  <BootstrapInput id="bootstrap-input" multiline
                    name="ans1"
                    rowsMax={4}
                    value={this.state.question}
                    style={{'width': '100%', 'height': 'auto'}}
                    onChange={(e) => this.handleChange(e)}
                    />
                {/* </ValidatorComponent> */}
                </GridListTile>
                <GridListTile style={{'height': 'auto'}} rows={1} cols={1}>
                  <Checkbox
                    name="isCorrect1"
                    checked={this.state.isCorrect1}
                    onChange={(e) => this.handleChecked(e)}
                    color="primary"
                  />
                </GridListTile>
            </GridList>
            <GridList className={'height: auto'} cols={3}>
                <GridListTile style={{'height': 'auto'}} rows={1} cols={2}>
                  <BootstrapInput id="bootstrap-input" multiline
                    name="ans2"
                    rowsMax={4}
                    value={this.state.question}
                    style={{'width': '100%', 'height': 'auto'}}
                    onChange={(e) => this.handleChange(e)}
                    />
                </GridListTile>
                <GridListTile style={{'height': 'auto'}} rows={1} cols={1}>
                  <Checkbox
                    name="isCorrect2"
                    checked={this.state.isCorrect2}
                    onChange={(e) => this.handleChecked(e)}
                    color="primary"
                  />
                </GridListTile>
            </GridList>
          </CardContent>
          <CardContent>
            <GridList id="addAnsGrid" cols={3}>
                <GridListTile style={{'textAlign': 'center', 'height': 'auto'}} rows={1} cols={3}>
                  <Button variant="outlined" onClick={() => { alert('clicked') }}>
                    Add
                  </Button>
                </GridListTile>
            </GridList>
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