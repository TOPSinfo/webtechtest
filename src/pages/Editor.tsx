import * as React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { RootState } from '../store'
import { addQuestion, updateQuestion } from '../store/session/actions'
import { QuestionReducer } from '../store/session/reducers'

type QuestionList = {
	category: string,
	type: string,
	difficulty: string,
	question: string,
	correct_answer: string,
	incorrect_answers: string[]
}

interface State {
	isEdit: boolean,
	question: string;
	ans1: string,
	ans2: string,
	isCorrect1: boolean,
	isCorrect2: boolean,
	isError: boolean,
	errMsg: string,
	updateQue: string
}

interface OwnProps {
}

interface DispatchProps {
	addQuestion: (data: QuestionList) => void,
	updateQuestion: (updateQue: string, data: QuestionList) => void
}

interface StateProps {
	questionReducer: QuestionReducer
}

type Props = StateProps & OwnProps & DispatchProps

let initialState = {
	isEdit: false,
	question: '',
	ans1: '',
	ans2: '',
	isCorrect1: false,
	isCorrect2: false,
	isError: false,
	errMsg: '',
	updateQue: ''
}

class Login extends React.Component<Props, State> {

	constructor(prop: Props) {
		super(prop)
		this.state = initialState
	}

	componentWillReceiveProps(nextProps: any) {
		if (nextProps && nextProps.questionReducer.currentQuestion) { 
			let currentQue = nextProps.questionReducer.currentQuestion;
			this.setState({
				isEdit: true,
				question: currentQue.question,
				ans1: currentQue.correct_answer,
				isCorrect1: true,
				ans2: currentQue.incorrect_answers[0],
				isCorrect2: false,
				updateQue: currentQue.question
			})
		}
	}

	handleChange = (event: any) => {
		this.setState({ [event.target.name]: event.target.value } as State);
	};

	handleChecked = (event: any) => {
		this.setState({ [event.target.name]: event.target.checked, isError: false, errMsg: '' } as State);
	}

	handleSubmit = () => {
		let state = this.state;
		if (state.isCorrect1 && state.isCorrect2) {
			this.setState({ isError: true, errMsg: 'Atleast one option should be incorrect' })
		} else if (!state.isCorrect1 && !state.isCorrect2) {
			this.setState({ isError: true, errMsg: 'Atleast one option should be correct' })
		} else {
			this.setState({ isError: false, errMsg: '' })
			let correctAns: string, incorrectAns: string;
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
			// this.props.addQuestion(addData);
			if (this.state.isEdit) {
				this.props.updateQuestion(this.state.updateQue, addData);
			} else {
				this.props.addQuestion(addData)
			}
			this.setState({...initialState})
		}
	}

	render() {
		console.log('this.props', this.state)
		return (
			<div>
				<Card style={{ 'margin': '15Px' }}>
					<ValidatorForm
						ref="form"
						onSubmit={this.handleSubmit}
						onError={errors => console.log(errors)}
					>
						<CardContent>

							<GridList className={'height: auto'} cols={3}>
								<GridListTile style={{ 'height': 'auto' }} rows={1} cols={2}>
									<p>Question</p>
								</GridListTile>
								<GridListTile style={{ 'width': '100%', 'height': 'auto' }} cols={3}>
									<TextValidator
										id="bootstrap-input" multiline
										rowsMax={4}
										style={{ 'width': '100%', 'height': 'auto' }}
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
								<GridListTile style={{ 'height': 'auto' }} rows={1} cols={2}>
									<p>Answer</p>
								</GridListTile>
								<GridListTile style={{ 'height': 'auto' }} rows={1} cols={1}>
									<p>isCorrect</p>
								</GridListTile>
							</GridList>
							<GridList className={'height: auto'} cols={3}>
								<GridListTile style={{ 'height': 'auto', 'paddingRight': '15px' }} rows={1} cols={2}>
									<TextValidator
										id="bootstrap-input"
										rowsMax={4}
										style={{ 'width': '100%', 'height': 'auto' }}
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
								<GridListTile style={{ 'height': 'auto' }} rows={1} cols={1}>
									<Checkbox
										name="isCorrect1"
										checked={this.state.isCorrect1}
										onChange={(e) => this.handleChecked(e)}
										color="primary"
									/>
								</GridListTile>
							</GridList>
							<GridList className={'height: auto'} cols={3}>
								<GridListTile style={{ 'height': 'auto', 'paddingRight': '15px' }} rows={1} cols={2}>
									<TextValidator
										id="bootstrap-input"
										style={{ 'width': '100%', 'height': 'auto' }}
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
								<GridListTile style={{ 'height': 'auto' }} rows={1} cols={1}>
									<Checkbox
										name="isCorrect2"
										checked={this.state.isCorrect2}
										onChange={(e) => this.handleChecked(e)}
										color="primary"
									/>
									{
										this.state.isError &&
										<p style={{ 'color': '#f44336' }}>
											{this.state.errMsg}
										</p>
									}
								</GridListTile>
							</GridList>
						</CardContent>
						<CardContent>
							<GridList id="addAnsGrid" cols={3}>
								<GridListTile style={{ 'textAlign': 'center', 'height': 'auto' }} rows={1} cols={3}>
									<Button variant="outlined" type="submit">{this.state.isEdit ? 'Edit' : 'Add'}</Button>
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
		addQuestion: async (data) => {
			await dispatch(addQuestion(data))
		},
		updateQuestion: async (que, data) => {
			await dispatch(updateQuestion(que, data))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)