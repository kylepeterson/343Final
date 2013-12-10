// doc ready function
$(function(){
    $.getJSON(url, function(apartmentData) {
        //sorts apartmentData by the "avg"
        sortObjArray(apartmentData, "avg");

        var template = $('.rank-name');
        var rankList = $('.rank-list');

        rankList.empty();

        //goes through the first 5 elements in the sort
        //array of apartmentData
        for (var i = 0; i < 5; i++) {
            var clone = template.clone();
            clone.html(apartmentData[i].name + ' - ' + apartmentData[i].avg);
            clone.removeClass('rank-name');
            clone.attr('data-rank', i);
            rankList.append(clone);
        }

        //pans the map to where the clicked top 5 apartment is at
        //and fills in the detail box
        $('.rank').click(function(){
            panWindow(apartmentData[this.getAttribute('data-rank')]);
            fillDetailBox(apartmentData[this.getAttribute('data-rank')]);
        });
    });
});

//sortObjArray sorts an array of objects by a property
function sortObjArray(objArray, propName) {
    if (!objArray.sort)
        throw new Error('The objArray parameter does not seem to be an array (no sort method)');

    //sort the array supplying a custom compare function
    objArray.sort(function(a,b) {
        
        //note: this compares only one property of the objects
        //see the optional step where you can add support for 
        //a secondary sort key (i.e., sort by another property)
        //if the first property values are equal
        if (a[propName] > b[propName])
            return -1;
        else if (a[propName] === b[propName])
            return 0;
        else
            return 1;
    });
}
