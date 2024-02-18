// Create a text type element.
// In React, text is also considered a lightweight element, but compared to ordinary DOM elements, it only contains a `nodeValue` property and an empty `children` array.
// This is because text nodes do not contain child elements.
function createTextNode(nodeValue) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue,
      children: [],
    },
  };
}

// A very core part of React, it is responsible for creating a React element.
// This process involves dealing with the element's type, properties, and children.
// Children can be strings, numbers, or other React elements.
// For strings and numbers, we convert them into text type elements through the `createTextNode` function for uniform processing.
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => (typeof child === "string" || typeof child === "number" ? createTextNode(child) : child)),
    },
  };
}

// First, create the corresponding DOM node based on the type of the element.
// For text elements, use `document.createTextNode` to create the node;
// for other types of elements, use `document.createElement`.
// Subsequently, all properties except for `children` are directly assigned to the created DOM node. Finally, recursively render the children and attach them to the current DOM node.
function render(element, container) {
  const dom = element.type === "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(element.type);

  Object.keys(element.props).forEach(key => {
    if (key !== "children") dom[key] = element.props[key];
  });

  element.props.children.forEach(child => render(child, dom));

  container.append(dom);
}

const React = {
  createElement,
  render,
};

export default React;
