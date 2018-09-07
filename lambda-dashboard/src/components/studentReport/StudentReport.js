import React, { Component } from 'react';
import ProgressBar from '../progressBar/ProgressBar';
import axios from 'axios';


class StudentReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentName: 'Student Name',
      currentSection: 'Student Section',
      projectManager: 'Project Manager',
      submittedSprints: 0,
      passedSprints: 0,
      isFetched: false
    }
  }
  fetchStudentReport = () => {
    axios
      .post('http://127.0.0.1:8000/api/studentReport', {username: this.state.username, password: this.state.password})
      .then(response => {
        localStorage.setItem('token', response.data.key);
        localStorage.setItem('msg', this.state.username);
        this.props.onClickLogin( this.state.username );

      })
      .catch(err => {
        this.setState({username: '', password: ''});
      });
  };

  componentDidMount() {
    this.setState({studentName: this.props.studentName,
      currentSection: this.props.currentSection,
      projectManager: this.props.projectManager,
      passedSprints: this.props.passedSprints,
      submittedSprints: this.props.submittedSprints,
      isFetched: true
    })

  }

  render() { 

    return (
      <div className={this.props.className}>
        <div className="App-title">
          Student Name : {this.state.studentName}
        </div>
        <div className="App-title">
          Current Section: {this.state.currentSection}
        </div>
        <div className="App-title">
          Project Manager: {this.state.projectManager}
        </div>
        {this.state.isFetched && <ProgressBar currentValue={this.state.submittedSprints} icon={this.props.icon} maxValue={this.state.passedSprints} completionLabel={'Sprint Pass Rate: '} />}
    </div>
    )
  }
}
 
export default StudentReport;
