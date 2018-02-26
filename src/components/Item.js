export default Item;
function Item()
{
    var itemName = 'NoItemName';
    var itemPrice = 0.00;
    var itemOffers = [];
    var owner = 'NoItemOwner';
    var description = 'NoDescription';
    var tag = [];
   
    this.setAll = function(newItemName, newItemPrice, newItemOffers, newOwner, newDescription, newTag)
    {
        itemName = newItemName;
        itemPrice = newItemPrice;
        itemOffers = newItemOffers;
        owner = newOwner;
        description = newDescription;
        tag : {'NoTags','NoTags2'};
    }
    this.toString = function()
    {
        return 'item: ' + itemName + '\nprice: ' + itemPrice + '\noffers: '+ itemOffers + '\nowner: ' + owner + '\ndescription: ' + description + '\ntag: ' + tag;
    }

}
