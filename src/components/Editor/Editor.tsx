import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateQuestion } from "../question.action";
// import {
//   fade,
//   withStyles,
// } from '@material-ui/core/styles';
// import InputBase from '@material-ui/core/InputBase';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

// import { Formik, Form, FormikProps } from ‘formik’
// import * as Yup from ‘yup’

//  custom input component
// const BootstrapInput = withStyles((theme) => ({
//   root: {
//     'label + &': {
//       marginTop: theme.spacing(3),
//     },
//   },
//   input: {
//     borderRadius: 4,
//     position: 'relative',
//     backgroundColor: theme.palette.common.white,
//     border: '1px solid #ced4da',
//     fontSize: 16,
//     width: '100%',
//     padding: '10px 12px',
//     marginRight: '20px',
//     marginBottom: '20px',
//     transition: theme.transitions.create(['border-color', 'box-shadow']),
//     // Use the system font instead of the default Roboto font.
//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//     '&:focus': {
//       boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
//       borderColor: theme.palette.primary.main,
//     },
//   },
// }))(InputBase);

interface Props {
  currentQue?: Object
}

interface State {
  question: string;
  ans1: string,
  ans2: string,
  isCorrect1: boolean,
  isCorrect2: boolean,
  isError: boolean,
  errMsg: string
}

export class Editor extends Component<Props,State> {
  constructor(props:any) {
    super(props);
    this.state = {
      question: '',
      ans1: '',
      ans2:'',
      isCorrect1: false,
      isCorrect2: false,
      isError: false,
      errMsg: ''
    }
  }
  // Before the component mounts, we initialise our state
  componentWillMount() {
  }

  // After the component did mount, we set the state each second.
  componentDidMount() {
    // if (this.props && this.props.currentQue) {
    //   let currentQue = this.props.currentQue;
    // // let currentQue = {
    // //   "category": "Sports",
    // //   "type": "multiple",
    // //   "difficulty": "medium",
    // //   "question": "At which bridge does the annual Oxford and Cambridge boat race start?",
    // //   "correct_answer": "Putney",
    // //   "incorrect_answers": [
    // //     "Hammersmith",
    // //     "Vauxhall ",
    // //     "Battersea"
    // //   ]
    // // };
    //   this.setState({question: currentQue.question,
    //     ans1: currentQue.correct_answer,
    //     isCorrect1: true,
    //     ans2: currentQue.incorrect_answers[0],
    //     isCorrect2: false
    //   })
    // }
  }

  handleChange = (event:any) => {
    this.setState({ [event.target.name] : event.target.value} as State);
  };

  handleChecked = (event: any) => {
    this.setState({ [event.target.name] : event.target.checked, isError: false, errMsg: ''} as State);
  }

  handleSubmit = () => {
    let state = this.state;
    console.log('---on submit')
    console.log('---isCorrect1', state.isCorrect1, typeof state.isCorrect1, '--isCorrect2', state.isCorrect2)
    if(state.isCorrect1 && state.isCorrect2) {
      this.setState({isError: true, errMsg: 'Atleast one option should be incorrect'})
      console.log('---both true')
    } else if (!state.isCorrect1 && !state.isCorrect2) {
      this.setState({isError: true, errMsg: 'Atleast one option should be correct'})
      console.log('----both false')
    } else {
      this.setState({isError: false, errMsg: ''})
      let correctAns:string, incorrectAns:string;
      if (state.isCorrect1) {
        correctAns = state.ans1
        incorrectAns = state.ans2
      } else {
        correctAns = state.ans2
        incorrectAns = state.ans1
      }
      let addData = {
        "category": "Sports",
        "type": "multiple",
        "difficulty": "medium",
        "question": state.question,
        "correct_answer": correctAns,
        "incorrect_answers": [
          incorrectAns
        ]
      };
      console.log('---add data object', addData)
      // if (this.props.currentQue) {
      //   this.props.updateQue(addData);
      // } else {
      //   this.props.addQue(addData)
      // }
    }
  }

  // render will know everything!
  render() {
    return (<div>
        <Card style={{'margin': '15Px'}}>
          <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmit}
              onError={errors => console.log(errors)}
          >
          <CardContent>
 
            <GridList className={'height: auto'} cols={3}>
                <GridListTile style={{'height': 'auto'}} rows={1} cols={2} component={'div'}>
                  <p>Question</p>
                </GridListTile>
                <GridListTile style={{'width': '100%', 'height': 'auto'}} cols={3}>
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
                </GridListTile>
            </GridList>
          </CardContent>
          <CardContent>
              <GridList className={'height: auto'} cols={3}>
                <GridListTile style={{'height': 'auto'}} rows={1} cols={2} component={'div'}>
                  <p>Answer</p>
                </GridListTile>
                <GridListTile style={{'height': 'auto'}} rows={1} cols={1} component={'div'}>
                  <p>isCorrect</p>
                </GridListTile>
              </GridList>
              <GridList className={'height: auto'} cols={3}>
                <GridListTile style={{'height': 'auto', 'paddingRight' : '15px'}} rows={1} cols={2}>
                  <TextValidator
                        id="bootstrap-input"
                        rowsMax={4}
                        style={{'width': '100%', 'height': 'auto'}}
                        onChange={(e) => this.handleChange(e)}
                        name="ans1"
                        value={this.state.ans1}
                        validators={['required']}
                        errorMessages={['Answer is required']}
                    />
                  {/* <BootstrapInput id="bootstrap-input" multiline
                    name="ans1"
                    rowsMax={4}
                    value={this.state.question}
                    style={{'width': '100%', 'height': 'auto'}}
                    onChange={(e) => this.handleChange(e)}
                    /> */}
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
                <GridListTile style={{'height': 'auto', 'paddingRight' : '15px'}} rows={1} cols={2}>
                  <TextValidator
                        id="bootstrap-input"
                        style={{'width': '100%', 'height': 'auto'}}
                        onChange={(e) => this.handleChange(e)}
                        name="ans2"
                        value={this.state.ans2}
                        validators={['required']}
                        errorMessages={['Answer is required']}
                    />
                  {/* <BootstrapInput id="bootstrap-input" multiline
                    name="ans2"
                    rowsMax={4}
                    value={this.state.question}
                    style={{'width': '100%', 'height': 'auto'}}
                    onChange={(e) => this.handleChange(e)}
                    /> */}
                </GridListTile>
                <GridListTile style={{'height': 'auto'}} rows={1} cols={1}>
                  <Checkbox
                    name="isCorrect2"
                    checked={this.state.isCorrect2}
                    onChange={(e) => this.handleChecked(e)}
                    color="primary"
                    />
                    {
                      this.state.isError && 
                      <p style={{'color': '#f44336'}}>
                        {this.state.errMsg}
                      </p>
                    }
                </GridListTile>
            </GridList>
          </CardContent>
          <CardContent>
            <GridList id="addAnsGrid" cols={3}>
                <GridListTile style={{'textAlign': 'center', 'height': 'auto'}} rows={1} cols={3}>
                  <Button variant="outlined" type="submit">Add</Button>
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
        </ValidatorForm>
      </Card>
    </div>)
  }
}

const mapStateToProps = ({ question }:any) => ({
  currentQue: question.current_que
});
 
const mapDispatchToProps = {
  updateQuestion
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);