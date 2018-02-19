export default Item;
function Item()
{
    var itemName = 'NoItemName';
    var itemPrice = 0.00;
    var itemOffers = 0;
    var owner = 'NoItemOwner';
    var description = 'NoDescription';
    var tag = 'NoTags';
   
    function setAll(newItemName, newItemPrice, newItemOffers, newOwner, newDescription, newTag)
    {
        itemName = newItemName;
        itemPrice = newItemPrice;
        itemOffers = newItemOffers;
        owner = newOwner;
        description = newDescription;
        tag = newTag;
    }
    function toString()
    {
        return 'item: ' + itemName + '\nprice: ' + itemPrice + '\noffers: '+ itemOffers + '\nowner: ' + owner + '\ndescription: ' + description + '\ntag: ' + tag;
    }

    //setters
    function setItemName(newItemName)
    {
        itemName = newItemName;
    }
    function setItemPrice(newItemPrice)
    {
        itemPrice = newItemPrice;
    }
    function setItemOffers(newItemOffers)
    {
        itemOffers = newItemOffers;
    }
    function setOwner(newOwner)
    {
        owner = newOwner;
    }
    function setDescription(newDescription)
    {
        description = newDescription;
    }
    function setTag(newTag)
    {
        tag = newTag;
    }
    //getters
    function getItemName()
    {
        return itemName;
    }
    function getItemPrice()
    {
        return itemPrice;
    }
    function getItemOffers()
    {
        return itemOffers;
    }
    function getOwner()
    {
        return owner;
    }
    function getDescription(description)
    {
        return description;
    }
    function getTag()
    {
        return tag;
    }
    //return
    return {
        setAll: setAll,
        setItemName: setItemName,
        setItemPrice: setItemPrice,
        setItemOffers: setItemOffers,
        setOwner: setOwner,
        setDescription: setDescription,
        setTag: setTag,
        getItemName: getItemName,
        getItemPrice: getItemPrice,
        getItemOffers: getItemOffers,
        getOwner: getOwner,
        getDescription: getDescription,
        getTag: getTag,
        toString: toString
    };
   
}
