'use strict';


/////CONSTRUCTOR - OBJECT CALLED STORE
var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
var cookieTotalsPerHour = [];

function Store(storeName, minCustomersEachHour, maxCustomersEachHour, avgCookiePerCustomer) {
    this.storeName = storeName;
    this.minCustomersEachHour = minCustomersEachHour;
    this.maxCustomersEachHour = maxCustomersEachHour;
    this.avgCookiePerCustomer = avgCookiePerCustomer;
    this.totalCookies = 0;
    this.cookiesEachHour = [];
    this.customersEachHour = [];
    this.generateCustomersEachHour();
    this.generateCookiesBakedEachHour();
}

/////PROTOTYPE METHODS
debugger;
Store.prototype.generateCustomersEachHour = function() {
    for (var i = 0; i < hours.length; i++) {
        var customerPerHour = randomNumber(this.minCustomersEachHour, this.maxCustomersEachHour);
        this.customersEachHour.push(customerPerHour);
    }
}

Store.prototype.generateCookiesBakedEachHour = function() {
    for (var i = 0; i < hours.length; i++) {
        var bakeCookiesPerHour = Math.ceil(this.customersEachHour[i] * this.avgCookiePerCustomer);
        this.cookiesEachHour.push(bakeCookiesPerHour);
        this.totalCookies += bakeCookiesPerHour;
        cookieTotalsPerHour.push(this.totalCookies[i]);
    }
}

Store.prototype.render = function(table) {
    var trEl = document.createElement('tr');
    table.appendChild(trEl);

    var tdEl = document.createElement('td');
    tdEl.textContent = this.storeName;
    trEl.appendChild(tdEl);

    for (var i = 0; i < hours.length; i++) {
        tdEl = document.createElement('td');
        tdEl.textContent = this.cookiesEachHour[i];
        trEl.appendChild(tdEl);
    }
    var tdEl = document.createElement('td');
    tdEl.textContent = this.totalCookies;
    trEl.appendChild(tdEl);

    console.log(this.totalCookies);
}
var table = document.getElementById('table');
var stores = [];
stores.push(new Store('Seattle', 23, 65, 6.3));
stores.push(new Store('Tokyo', 3, 24, 1.2));
stores.push(new Store('Dubai', 11, 38, 3.7));
stores.push(new Store('Paris', 20, 38, 2.3));
stores.push(new Store('Lima', 2, 16, 4.6));

renderHeader();
renderStores();
renderFooter();

function renderStores() {
    for (var i = 0; i < stores.length; i++) {
        stores[i].render(table);
    };
}

function renderHeader() {
    //////creating location before the written array values
    var trEl = document.createElement('tr');
    var thEl = document.createElement('th');
    thEl.textContent = 'Location';
    trEl.appendChild(thEl);
    table.appendChild(trEl);

    //////for loop to show the array values
    for (var i = 0; i < hours.length; i++) {
        var thEl = document.createElement('th');
        thEl.textContent = hours[i];
        trEl.appendChild(thEl);
    }
    /////creating total after the array values
    thEl = document.createElement('th');
    thEl.textContent = 'Total';
    trEl.appendChild(thEl);
}

function renderFooter() {
    var totalFooterCookies = createFooterCookieTotals();
    console.log(totalFooterCookies);
    var trEl = document.createElement('tr');
    var tdEl = document.createElement('td');
    tdEl.textContent = 'Hourly Totals';
    trEl.appendChild(tdEl);
    table.appendChild(trEl);

    for (var i = 0; i < totalFooterCookies.length; i++) {
        var tdEl = document.createElement('td');
        tdEl.textContent = totalFooterCookies[i];
        trEl.appendChild(tdEl);
    }
    console.log(totalFooterCookies)
}

function createFooterCookieTotals() {
    var totalCookiesPerHour = [];
    console.log(Store.cookiesEachHour);
    var allStoresTotalCookies = 0;
    for (var i = 0; i < hours.length; i++) {
        var hourCookieTotal = 0;
        for (var j = 0; j < stores.length; j++) {
            hourCookieTotal += stores[j].cookiesEachHour[i]
            console.log(hourCookieTotal);
        }
        totalCookiesPerHour.push(hourCookieTotal)
        allStoresTotalCookies += hourCookieTotal;
    }
    totalCookiesPerHour.push(allStoresTotalCookies);
    return totalCookiesPerHour;
}
///////array to hold all instances
var newStores = [];
//////access the form
var formEl = document.getElementById('form');

///// put a listener on the form - event(submit, callback function)
formEl.addEventListener('submit', function(event) {
    event.preventDefault();
    var newStoreName = event.target.storeName.value;
    var newMinCustomers = parseInt(event.target.minimumCustomersPerHour.value);
    var newMaxCustomers = parseInt(event.target.maximumCustomersPerHour.value);
    var newAverageCookies = parseInt(event.target.averageCookiesPerSale.value);

    table.innerHTML = '';

    stores.push(new Store(newStoreName, newMinCustomers, newMaxCustomers, newAverageCookies));
    console.log('made it here');


    renderHeader();
    renderStores();
    renderFooter();
});

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function addElement(childElType, childContent, parentEl) {
    var childEl = document.createElement(childElType);
    childEl.textContent = childContent;
    parentEl.appendChild(childEl);
};
