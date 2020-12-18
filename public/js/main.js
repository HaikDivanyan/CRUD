'use strict';

async function getData() {
    const url = "http://localhost:3000/armenia";
    const url2 = "http://localhost:3000/person-names/5f9208235d99702e4092374f";
    const url3 = "http://localhost:3000/people-names";

    const res = await fetch(url3, { method: 'GET' });
    var data = await res.json();

    console.log(data);
    

    for (let i = 0; i < data.length; i++) {
        var h = document.createElement('h1');
        var t = document.createTextNode(data[i].surname + " | ");
        document.body.appendChild(h);
        h.appendChild(t);
        var t = document.createTextNode(data[i].name);
        document.body.appendChild(h);
        h.appendChild(t);
    }
}