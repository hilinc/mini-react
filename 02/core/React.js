// Function to create a text element. This is used for text nodes in the React element tree.
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

// The render function initializes the work for the rendering process by setting up the root of the work to be done.
function render(element, container) {
  console.info("element, container", element, container);
  // Set the next work unit to render the specified element into the container.
  nextWorkOfUnit = {
    dom: container, // The DOM node where the element should be rendered.
    props: {
      children: [element], // The initial element to render is set as a child.
    },
  };
}

// Placeholder for the next unit of work to be performed. It will be used by the fiber architecture.
let nextWorkOfUnit = null;

// The workLoop function iterates over units of work as long as there's time left in the frame, or until there are no more units of work.
function workLoop(deadline) {
  let shouldYield = false;
  while (nextWorkOfUnit && !shouldYield) {
    nextWorkOfUnit = performUnitOfWork(nextWorkOfUnit); // Perform work on the current unit and get the next unit.
    shouldYield = deadline.timeRemaining() < 1; // Check if the frame's time is running out.
  }
  requestIdleCallback(workLoop); // Schedule the next work loop.
}

// Performs work on a given fiber unit. It involves creating a DOM node if necessary, appending it, setting properties, and preparing children fibers.
function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDOMNode(fiber.type); // Create a DOM node for the fiber if it doesn't have one.
    if (fiber.parent) {
      fiber.parent.dom.append(fiber.dom); // Append the newly created node to its parent.
    }
    updateProps(fiber.dom, fiber.props); // Set the properties on the DOM node.
  }
  genChildrenQueue(fiber); // Prepare the children of the current fiber.

  // Return the next unit of work. This could be a child, a sibling, or an uncle.
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

// Creates a DOM node based on the type of the fiber (either an element or a text node).
function createDOMNode(type) {
  if (type === "TEXT_ELEMENT") {
    return document.createTextNode("");
  }
  return document.createElement(type);
}

// Updates the properties of a DOM node based on the fiber's props.
function updateProps(dom, props) {
  Reflect.ownKeys(props).forEach(key => {
    if (key === "style") {
      Object.keys(props.style).forEach(styleKey => {
        dom.style[styleKey] = props.style[styleKey];
      });
    } else if (key === "children") {
      props.children.forEach(child => {
        render(child, dom);
      });
    } else {
      dom[key] = props[key];
    }
  });
}

// Converts the children of a fiber into a linked list structure, setting up the child and sibling relationships.
function genChildrenQueue(fiber) {
  let prevChild = null;
  fiber.props.children.forEach((child, index) => {
    const newFiber = {
      type: child.type,
      props: child.props,
      dom: null,
      parent: fiber,
      child: null,
      sibling: null,
    };
    if (index === 0) {
      fiber.child = newFiber; // The first child is directly linked to the parent.
    } else {
      prevChild.sibling = newFiber; // Subsequent children are linked as siblings.
    }
    prevChild = newFiber;
  });
}

// Starts the work loop at an appropriate time, leveraging the browser's idle periods.
requestIdleCallback(workLoop);

const React = {
  createElement,
  render,
};

export default React;
