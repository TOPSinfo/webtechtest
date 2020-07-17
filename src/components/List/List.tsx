import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listQue } from "../question.action";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

interface Props {
  listQue?: any,
  questionList?: any,
  question?: Object
};

interface State {
  question: Object
}

interface rootState {
  listQue: any,
  questionList: any,
  question: Object
}

export class List extends React.Component<Props, State> {

  // Before the component mounts, we initialise our state
  componentWillMount() {
  }

  // After the component did mount, we set the state each second.
  async componentDidMount() {
    // await this.props.listQue();
  }

  // render will know everything!
  render() {
    // const classes = useStyles();
    return <div>
        {this.props.questionList.map((que: Object) => (
            <GridList cellHeight={160} cols={3}>
                <GridListTile cols={2}>
                  que['que']
                  que['category']
                  que['difficulty']
                </GridListTile>
                <GridListTile cols={1}>
                  <Button variant="outlined" size="medium" color="primary">
                    Medium
                  </Button>
                  <Button variant="outlined" size="medium" color="primary">
                    Medium
                  </Button>
                </GridListTile>
          </GridList>
        ))}
      </div>
  }
}

// const mapStateToProps = ({ question : any }) => ({
//   questionList: question.list
// });

function mapStateToProps(props: Props): Props {
  console.log('props here is', props)
  return props;
}

const mapDispatchToProps = {
  listQue
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
