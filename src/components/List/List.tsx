import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listQue, editQue } from "../question.action";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
// import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

interface Props {
  listQue?: Function,
  editQue?: Function,
  questionList?: any,
  question?: Object
};

// interface rootState {
//   questionList: any,
//   question: Object
// }

let questionList = [{"category":"Sports","type":"multiple","difficulty":"medium","question":"At which bridge does the annual Oxford and Cambridge boat race start?","correct_answer":"Putney","incorrect_answers":["Hammersmith","Vauxhall ","Battersea"]},{"category":"Sports","type":"multiple","difficulty":"medium","question":"With which team did Michael Schumacher make his Formula One debut at the 1991 Belgian Grand Prix?","correct_answer":"Jordan","incorrect_answers":["Benetton","Ferrari","Mercedes"]},{"category":"Sports","type":"multiple","difficulty":"medium","question":"What cricketing term denotes a batsman being dismissed with a score of zero?","correct_answer":"Duck","incorrect_answers":["Bye","Beamer","Carry"]},{"category":"Sports","type":"multiple","difficulty":"medium","question":"Which team was the 2015-2016 NBA Champions?","correct_answer":"Cleveland Cavaliers","incorrect_answers":["Golden State Warriors","Toronto Raptors","Oklahoma City Thunders"]},{"category":"Sports","type":"multiple","difficulty":"medium","question":"Which team was the 2014-2015 NBA Champions?","correct_answer":"Golden State Warriors","incorrect_answers":["Cleveland Cavaliers","Houston Rockets","Atlanta Hawks"]},{"category":"Sports","type":"multiple","difficulty":"medium","question":"What is the exact length of one non-curved part in Lane 1 of an Olympic Track?","correct_answer":"84.39m","incorrect_answers":["100m","100yd","109.36yd"]},{"category":"Sports","type":"multiple","difficulty":"medium","question":"Who won the 2015 College Football Playoff (CFP) National Championship? ","correct_answer":"Ohio State Buckeyes","incorrect_answers":["Alabama Crimson Tide","Clemson Tigers","Wisconsin Badgers"]},{"category":"Sports","type":"multiple","difficulty":"medium","question":"Which sport is NOT traditionally played during the Mongolian Naadam festival?","correct_answer":"American Football","incorrect_answers":["Wrestling","Archery","Horse-Racing"]},{"category":"Sports","type":"multiple","difficulty":"medium","question":"Which NBA player won Most Valuable Player for the 1999-2000 season?","correct_answer":"Shaquille O&#039;Neal","incorrect_answers":["Allen Iverson","Kobe Bryant","Paul Pierce"]},{"category":"Sports","type":"multiple","difficulty":"medium","question":"Which Formula 1 driver switched teams in the middle of the 2017 season?","correct_answer":"Carlos Sainz Jr.","incorrect_answers":["Daniil Kvyat","Jolyon Palmer","Rio Haryanto"]}]

export class List extends Component<Props, {}> {

  // Before the component mounts, we initialise our state
  componentWillMount() {
  }

  // After the component did mount, we set the state each second.
  async componentDidMount() {
    // await this.props.listQue();
  }

  loadMore = () => {
    console.log('---load more')
    // this.props.listQue();
  }

  editQuestion = (currentQue: Object) => {
    console.log('----edit que', currentQue)
    // this.props.editQue(currentQue);
  }

  deleteQuestion = (deleteQue: String) => {
    console.log('----delete que', deleteQue)
  }

  // render will know everything!
  render() {
    // const classes = useStyles();
    console.log('this.propssss', this.props)
    return ( <div>
      <Card style={{'margin': '15Px'}}>
        <CardContent>
          <GridList cellHeight={160} cols={3}>
            <GridListTile style={{'height': 'auto'}} cols={1}>
              <p>Questions</p>
            </GridListTile>
            <GridListTile style={{'height': 'auto', 'textAlign': 'right'}} cols={2}>
              <Button variant="outlined" size="medium" color="primary" onClick={() => this.loadMore()}>
                Load more questions
              </Button>
            </GridListTile>
          </GridList>
          {questionList && questionList.map((que: any) => (
            <Card style={{'margin': '15Px'}}>
              <CardContent>
                  <GridList cols={3}>
                    <GridListTile style={{'height': 'auto'}} cols={2}>
                      <p>Question: {que.question}</p>
                      <p>Category: {que.category}</p>
                      <p>Difficulty: {que.difficulty}</p>
                    </GridListTile>
                    <GridListTile cols={1} style={{'textAlign': 'center'}}>
                      <Button
                        variant="outlined"
                        size="medium" color="primary"
                        style={{'margin': '20px'}}
                        onClick={() => this.editQuestion(que)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="medium" color="primary"
                        style={{'margin': '20px'}}
                        onClick={() => this.deleteQuestion(que.question)}
                      >
                        Delete
                      </Button>
                    </GridListTile>
                  </GridList>
              </CardContent>
            </Card>
          ))}
        </CardContent>
        </Card>
      </div>)
  }
}

const mapStateToProps = ({ question }:any) => ({
  questionList: question.list
});

// function mapStateToProps(question: rootState): rootState {
//   console.log('props here is', question)
//   // let questionList = question['list']
//   return question;
// }

const mapDispatchToProps = {
  listQue,
  editQue
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
