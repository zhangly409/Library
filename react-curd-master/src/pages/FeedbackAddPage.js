import React from 'react';
import FeedbackAdd from '../components/FeedbackAdd';

class FeedbackAddPage extends React.Component {
  render () {
    return (
      <div className="max-width">
      <FeedbackAdd {...this.props}/>
      </div>
    );
  }
}

export default FeedbackAddPage;