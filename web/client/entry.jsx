'use strict';

import 'styles/main.scss';

import React from 'react/addons';
import ReadlineIOMain from 'components/ReadlineIOMain/ReadlineIOMain.jsx';

let pageId = document.location.pathname.split('/')[1] || "index";
React.render(<ReadlineIOMain pageId={pageId}/>, document.body);
