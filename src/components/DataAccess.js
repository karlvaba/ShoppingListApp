import { useState, useEffect } from 'react';

/*
  Puts data into the json hosting server. Uses a PUT method, overrides all the data
  that is present in the bin. More info on the hosting site: https://jsonbin.io/
*/

export function update(data) {
    fetch('https://api.jsonbin.io/b/615e21759548541c29bf2c80', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
        .then(() => {
            console.log('fetch done');
        })
        .catch(err => {
            console.log(err);
        });
}
