import React, { Component } from 'react';
import { patchArticleVotes } from '../api';

class Voter extends Component {
  state = {
    voteChange: 0,
    err: null
  };

  updateVotes = (article_id, inc_votes) => {
    this.setState((currentState) => {
      return {
        voteChange: currentState.voteChange + inc_votes
      };
    });
    patchArticleVotes(article_id, inc_votes).catch((err) => {
      this.setState((currentState) => {
        return {
          voteChange: currentState.voteChange - inc_votes,
          err: err
        };
      });
    });
  };

  render() {
    const { article_id, votes } = this.props;
    const { voteChange, err } = this.state;

    if (err) {
      return <h4>Voting Unavailable At This Time</h4>;
    } else {
      return (
        <section>
          <button onClick={() => this.updateVotes(article_id, 1)}>+</button>
          <p> {votes + voteChange}</p>
          <button onClick={() => this.updateVotes(article_id, -1)}>-</button>
        </section>
      );
    }
  }
}

export default Voter;
