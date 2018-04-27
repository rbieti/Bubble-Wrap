import {
  FETCH_USERS
} from '../actions/types';

const INITIAL_STATE = {
  users: []
};
// DELETE THIS FILE
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USERS:
      const newReviews = state.reviews.map((review) => {
        // find user.key with reviewerKey
        const user = action.payload.users.find(user => user.key === review.reviewerKey);
        return { ...review, name: user.name, profileURL: user.profileURL };
      });
      return { ...state, reviews: newReviews };
    default:
      return state;
  }
}
