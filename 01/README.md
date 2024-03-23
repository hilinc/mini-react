# lesson 01

## what I learned today?

1. how to implement React and ReactDOM from scratch.
2. how to implement React's createElement and render methods.
3. how to support jsx format files, treat all files as ECMAScript modules (ES Module).

## what problems did I encounter?

1. I put the "children" in the same level with "props" in the "createElement" method, but it should be in the "props" object.

## How to solve it?

1. I did my own research with ChatGPT and google and finally found the solution.

## what else did I learn from this lesson?

1. I learned how to use vite to compile the jsx format files to ECMAScript modules.
2. I learned that the `children` are placed under props rather than as a peer to props primarily for the following reasons:

   2.1. Consistency and Simplification of the Data Structure: Placing children under props maintains the consistency of the data structure of element objects (i.e., React elements). This approach simplifies the logic for handling elements since all properties, including children, can be accessed and managed through the props object. This design reduces the complexity of the data structure, making operations on elements more direct and uniform.

   2.2. Facilitating the Handling of Children: In React's design philosophy, a component's children are considered part of the component's interface, similar to other properties, and are passed through the component's props. Having children as part of props makes the passing and handling of children consistent with other properties, making it easier for developers to use and understand.

   2.3. Flexibility: By placing children in props, React can handle children more flexibly. For example, it allows developers to pass any number of children to a component, including values of basic types, React elements, or functions, as part of props. This flexibility is one of the foundations of React's powerful features.

   2.4. Compatibility: This design also leaves room for future development in React. Keeping all data passed to a component, including children, under the props object, makes it easier for React to introduce new features and changes in future versions without breaking existing code structures or increasing migration costs.

## If there is too many nodes in the react virtual dom tree, what will happen?

1. The performance of the application will be affected. The more nodes in the virtual DOM tree, the more time it takes to perform diffing and reconciliation, which can slow down the rendering process and make the application less responsive. This can lead to performance issues, such as slow rendering, unresponsive user interfaces, and increased memory consumption.
