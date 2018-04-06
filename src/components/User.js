export default User;
import Review from '../components/Review';

function User() {
    var profilePicture = 'NoImage'; //profile is a string url
    var userName = 'NoName'; //userName is a string of the user's name
    var rating = 0.00; //rating is the users individual rating based on all of his or her reviews
    var numTransactions = 0.00; //number of transactions the user has made
    var bubbleCommunity = 'NoCommunity'; //string of the community that the user is in
    var reviews = []; //is an array of objects in which the each review has a rating and a string review
    var purchaseHistory = []; //array of items that that the user has purchased
    var sellHistory = []; //array of items that the user has sold
    var strikeCount = 0; //the number of strikes the user has in which a certain amount can result in him or her being banned
    
    this.createUser = function (profilePicture, userName, rating, numTransactions, bubbleCommunity, reviews, purchaseHistory, sellHistory, strikeCount)
    {
        this.profilePicture = profilePicture;
        this.userName = userName;
        this.rating = rating;
        this.numTransactions = numTransactions;
        this.bubbleCommunity = bubbleCommunity;
        this.reviews = reviews;
        this.purchaseHistory = purchaseHistory;
        this.sellHistory = sellHistory;
        this.strikeCount = strikeCount;
    }

    //strike count these functions add or remove strikes from the user
    this.addStrike = function(){
        strikeCount = StrikeCount++;
    }
    this.removeStrike = function(){
        strikeCount = StrikeCount--;
    }

    //appending to arrays
    this.addReview = function(reviewRating, reviewComment){
        var review = new Review();
        review.setReview(reviewRating, reviewComment);
        reviews.push(review);
    }
    //console print
    this.consolePrintReview = function()
    {
        for (i=0; i<reviews.length; i++)
        {
            var help = reviews[i];
            for (let attribute in help) {
                console.log[attribute];
            }
            console.log(help["comment"]);
            console.log(help["rating"]);
        }
    }
    this. addSellHistory = function(){
    }
    
    


}