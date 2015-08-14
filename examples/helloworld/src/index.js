import React from 'react';
import App from './App';
import _ from 'underscore';
import { Cursor } from '../../..';

const cursor = Cursor.build({
  very: {
    deeply: {
      nested: {
        counts: _.range(400).map(function () { return 0; })
      }
    }
  }
});

cursor.init(() => React.render(<App cursor={cursor} />, document.getElementById('root')));
