import React, { Component } from 'react';
import { patchArticleVotes, patchCommentVotes } from '../api';

class Voter extends Component {
  state = {
    voteChange: 0,
    err: null,
    buttonDisabled: false
  };

  updateVoteChange(err, id, inc_votes) {
    this.setState((currentState) => {
      console.dir(err);
      return {
        voteChange: currentState.voteChange - inc_votes,
        err: err
      };
    });
  }

  updateVotes = (id, inc_votes) => {
    const { type } = this.props;
    console.log(type);
    this.setState((currentState) => {
      return {
        voteChange: currentState.voteChange + inc_votes
      };
    });

    type === 'article'
      ? patchArticleVotes(id, inc_votes).catch((err) =>
          this.updateVoteChange(err, id, inc_votes)
        )
      : patchCommentVotes(id, inc_votes).catch((err) =>
          this.updateVoteChange(err, id, inc_votes)
        );
  };

  render() {
    const { id, votes } = this.props;
    const { voteChange, err } = this.state;

    if (err) {
      return <h4>Voting Unavailable At This Time</h4>;
    } else {
      return (
        <section>
          <button
            onClick={() => this.updateVotes(id, 1)}
            disabled={this.state.voteChange > 0 ? true : false}
          >
            +
          </button>
          <p> {votes + voteChange}</p>
          <button
            onClick={() => this.updateVotes(id, -1)}
            disabled={this.state.voteChange < 0 ? true : false}
          >
            -
          </button>
        </section>
      );
    }
  }
}

export default Voter;
