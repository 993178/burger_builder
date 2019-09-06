const aux = (props) => props.children;

export default aux; // is dus verouderd, zie MLR's uitleg hieronder

/* 

How to Replace <Aux> with <Fragment> or <>
UPDATE:  2018 > October;   If you install React 16.3+,  <> .... </> works.

Replace all occurrences of  <Aux> .... </Aux>  with  <> .... </>.

Then,  delete the Aux imports & the Aux file (if relevant,  delete the Aux folder).

--------------------------------------------------------------------------------------------------------------------------------------------------- 

Hi,  The <Fragment> Component completely replaces the <Aux> Component.

Remove all references of Aux. 

Note:  Update to React version 16.6+: 

npm install react@^16.8.1 react-dom@^16.8.1     Mac:  prefix sudo 

or:  point your command-line to your app folder:  npm update        Mac:  prefix sudo 

Also update your Node version to:  10.15.1+      https://nodejs.org/en/ 

--------------------------------------------------------------------------------------------------------------------------------------------------- 

The Aux folder & Aux.js file should not be used. 

There is no Fragment.js file.   Instead Fragment is imported from react.

So,  no additional packages to install. 

PROBLEM:   aux,  con,  nul,  ... is a Windows MS-DOS device driver name,

and cannot be used as a folder or file name. 

--------------------------------------------------------------------------------------------------------------------------------------------------- 

Instructions:

#1)  import React, {Component, Fragment} from 'react';    If a Component is also used.    or 

            import React, {Fragment} from 'react';    If no Component is used.    or 

           const Fragment = React.Fragment;  or 

           For direct instance (tag) access,  use:    <React.Fragment> ....</React.Fragment> 

#2)   <Fragment> replaces <Aux> in each affected .js file. 

#3)  Remove import Aux from '../../hoc/Aux/Aux';. 

Remove the Aux import from all relevant .js files. 

Remove the actual Aux.js file. 

Affected files:  Layout.js,  Modal.js,  OrderSummary.js,  SideDrawer.js,  withErrorHandler.js 

Or,  perform a project wide (only) search. 

I replaced all of my <Aux> Components with <Fragment> Components.   My app works.     MLR 

---------------------------------------------------------------------------------------------------------------------------------------------------

EXTRA  INFORMATION: 

<Fragment>,  <> & <Aux> are not made from a DOM node.

DOM elements (like a <div>) are.   It's not a big savings,  but,  "why not!!!".

Resource:  https://reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html 

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

 The only attribute (at this time) <Fragment> accepts is key.

<> .... </>  syntax does not accept attributes.

Not even the key attribute.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Short-syntax: https://reactjs.org/docs/fragments.html#short-syntax

<> .... </>  doesn't require an additional import. 

Just use:  import React from 'react';

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

https://reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html#keyed-fragments 

https://reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html#jsx-fragment-syntax

==================================================================================
*/