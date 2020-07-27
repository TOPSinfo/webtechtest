import * as React from 'react'
import { RootState } from '../store'
import { connect } from 'react-redux'
import { setList, editQuestion, loadMoreQuestion, deleteQuestion } from '../store/session/actions'
import { QuestionReducer } from '../store/session/reducers'
import { ThunkDispatch } from 'redux-thunk'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';

type QuestionList = {
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
}

interface State {
}

interface OwnProps {
}

interface DispatchProps {
  setList: () => void,
  editQuestion: (data: QuestionList) => void,
  loadMoreQuestion: () => void,
  deleteQuestion: (question: string) => void
}

interface StateProps {
  questionReducer: QuestionReducer
}

type Props = StateProps & OwnProps & DispatchProps

class List extends React.Component<Props, State> {

  constructor(prop:Props) {
    super(prop)
    this.state = {
    }
  }

  componentDidMount() {
    this.props.setList()
  }

  loadMore = () => {
    console.log('---load more')
    this.props.loadMoreQuestion();
  }

  edit = (currentQue: QuestionList) => {
    console.log('----edit que', currentQue)
    this.props.editQuestion(currentQue);
  }

  deleteQuestion = (deleteQue: string) => {
    console.log('----delete que', deleteQue)
    this.props.deleteQuestion(deleteQue)
  }

  render() {
    console.log('this.props', this.props)
    return (
        <div>
        <Card style={{'margin': '15Px', 'textAlign': 'center'}}>
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
            {this.props.questionReducer.isLoading && <CircularProgress style={{'padding': '30px'}}/>}
            {this.props.questionReducer && this.props.questionReducer.listQuestion.map((que: any) => (
              <Card style={{'margin': '15Px', 'textAlign': 'left'}}>
                <CardContent>
                    <GridList cols={3}>
                      <GridListTile style={{'height': 'auto'}} cols={2}>
                        <p dangerouslySetInnerHTML={ { __html: `Question: ${que.question}` } }></p>
                        <p>Category: {que.category}</p>
                        <p>Difficulty: {que.difficulty}</p>
                      </GridListTile>
                      <GridListTile cols={1} style={{'textAlign': 'center'}}>
                        <Button
                          variant="outlined"
                          size="medium" color="primary"
                          style={{'margin': '20px'}}
                          onClick={() => this.edit(que)}
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
        </div>
    )
  }
}

const mapStateToProps = (states: RootState, ownProps: OwnProps): StateProps => {
  return {
    questionReducer: states.session.questionReducer
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => {
  return {
    setList: async () => {
      await dispatch(setList())
    },
    editQuestion: async (data) => {
        await dispatch(editQuestion(data))
    },
    loadMoreQuestion: async () => {
        await dispatch(loadMoreQuestion())
    },
    deleteQuestion: async (question) => {
        await dispatch(deleteQuestion(question))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)