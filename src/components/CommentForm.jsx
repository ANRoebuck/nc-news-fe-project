import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/CommentForm.css'

class CommentForm extends Component {

    state = {
        newComment: '',
    };

    render() {

        const { cancelAddComment } = this.props;

        return (
            <div>
                <label for="NewCommentForm">
                    Write a comment...
                </label>
                <form
                    className="NewCommentForm"
                    id="NewCommentForm"
                    onSubmit={this.handleSubmit}
                >
                    <input
                        className="NewCommentInput"
                        type="text"
                        value={this.state.newComment}
                        id="NewCommentInput"
                        onChange={this.handleChange}>
                    </input>

                    <button
                        className="NewCommentCancelButton"
                        type="button"
                        id="CancelAddComment"
                        onClick={cancelAddComment}
                    >
                        Cancel
                    </button>

                    <button
                        className="NewCommentSubmitButton"
                        type="submit"
                    >
                        Submit
                    </button>

                </form>
            </div>
        );
    };

    handleChange = event => {
        const { value } = event.target;
        this.setState({ newComment: value })
    };

    handleSubmit = event => {
        event.preventDefault();
        const { sendComment, currentUser } = this.props;
        const comment = {
            body: this.state.newComment,
            username: currentUser
        }
        sendComment(comment);
    };

};

CommentForm.propTypes = {

};

export default CommentForm;