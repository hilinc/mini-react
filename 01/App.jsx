// The JSX pragma is a type of compiler preprocessor directive that tells the compiler how to handle the file. `'use strict'` is also a kind of pragma.
// There are two ways to customize the JSX pragma:
// 1. Configure Babel plugin options.
// 2. Manually add the JSX pragma comment at the beginning of each module.
// This project adopts the second approach.

/**@jsx React.createElement */
import React from "./core/React";

// we haven't implemented function components in version 01, so App.jsx can only be a React element.
const App = <div>Hello World</div>;

export default App;
