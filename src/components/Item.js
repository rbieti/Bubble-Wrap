export default Item;
function Item()
{
    var itemName = 'NoItemName';
    var itemPrice = 0.00;
    var itemOffers = [];
    var owner = 'NoItemOwner';
    var description = 'NoDescription';
    var tag = [];
   
    this.toString = function()
    {
        return 'item: ' + itemName + '\nprice: ' + itemPrice + '\noffers: '+ itemOffers + '\nowner: ' + owner + '\ndescription: ' + description;
    }

}
