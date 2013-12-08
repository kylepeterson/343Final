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

$(function(){
    $.getJSON(url, function(apartmentData) {
        sortObjArray(apartmentData, "avg");

        var template = $('.rank-name');
        var rankList = $('.rank-list');

        rankList.empty();

        for (var i = 0; i < 5; i++) {
            var clone = template.clone();
            clone.html('<a href="#">' + apartmentData[i].name + '</a> - ' + apartmentData[i].avg);
            clone.removeClass('rank-name');
            clone.addClass('rank');
            rankList.append(clone);
        }
    });

});


    

 /*   $.each(entries, function(){
        var clone = template.clone();
        clone.html(this.name);

        clone.removeClass('rank-name');
        rankList.append(clone);
    });*/
