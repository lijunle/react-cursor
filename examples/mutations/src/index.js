import $ from 'jquery';
import _ from 'underscore';
import React from 'react';
import { Cursor } from '../../..';
import App from './App';

function getShortUID() {
    return ('0000' + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4);
}

const cursor =  Cursor.build({
    list: [
        {
            key: getShortUID(),
            name: 'Luke Skywalker'
        },
        {
            key: getShortUID(),
            name: 'Yoda'
        },
        {
            key: getShortUID(),
            name: 'Darth Vader'
        }
    ]
});

cursor.init(() => React.render(<App cursor={cursor} />, document.getElementById('root')));
