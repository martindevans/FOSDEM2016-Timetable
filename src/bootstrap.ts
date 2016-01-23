/// <reference path="../typings/react/react.d.ts" />

import * as React from 'react';
import {Main} from './Main/main';

React.render(React.createElement(Main, { xcal: "/xcal" }), document.getElementById('main'));
