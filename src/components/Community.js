import BubbleLocation from '../components/BubbleLocation';

export default Community;
function Community() {
    var name = ""; //Name of community
    var users = []; //Array of users in a community
    var safeLocations = []; //Array of locations in community
    var campusSafety = "None"; //Name of campus safety?
    var admin = "NoOne"; //Name of admin?
    var totalPurchases = 0; //The total purchases in a community (used for calculating how much to give back)

    //Getters
    
    this.setAll = function (newName, newAdmin, newTotalPurchases, newCampusSafety) {
        name = newName;
        admin = newAdmin;
        totalPurchases = newTotalPurchases;
        campusSafety = newCampusSafety;
    }

    //Add a safe location to list of safe locations - will be arrays, not strings
    this.addLocation = function(newLatitude, newLongitude) {
       var safeLocation = new BubbleLocation();
       safeLocation["latitude"] = newLatitude;
       safeLocation["longitude"] = newLongitude;
       safeLocations.push(safeLocation);
    }

    this.addUser = function(newUser){
        users.push(newUser);
    }

    //remove safe location from list of safe locations - removes the specified location from the array
    this.removeLoaction = function(safeLoc) {
        
    }

    //to add a purchase to the pool of purchases for each community
    //This is so we know how much to give back to the community 
    this.addPurchase = function(newPurchase) {
        totalPurchases += newPurchase;
    }

    this.printUsers = function() {
        for (i=0; i<users.length; i++){
            var user = users[i];
            console.log(user["userName"]);
        }
    }

    this.toString = function() {
        console.log(name + "\n" + campusSafety + " " + admin + " " + totalPurchases + "\n");
        console.log(users2);
    }


}