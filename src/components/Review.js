export default Review;

function Review() {
    var rating = 0;
    var comment = "No Comment";

    this.toString = function() {
        return 'rating: ' + rating + '\nComment: ' + comment;
    }
}