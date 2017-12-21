import React from 'react';
import FeedbackDetail from '../components/FeedbackDetail';

class FeedbackDetailPage extends React.Component {
  render () {
    return (
      <div className="max-width">
      <FeedbackDetail {...this.props}/>
      </div>
    );
  }
}

export default FeedbackDetailPage;