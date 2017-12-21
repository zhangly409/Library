import React from 'react';
import FeedbackList from '../components/FeedbackList';

class FeedbackListPage extends React.Component {
  render () {
    return (
      <div className="max-width">
      <FeedbackList {...this.props}/>
      </div>
    );
  }
}

export default FeedbackListPage;