# lesson 03

## what I learned today?

1. In lesson 2, we render each fiber node immediately after processing it. This may lead to users seeing a blank page for a long time or a incomplete page. To solve this problem, we commit the whole vdom tree for rendering after the last vdom node is processed.
2. Learned how to process function components.

## what problems did I encounter?

1. The vdom is not being rendered in the browser after change the commit strategy.

## How to solve it?

1. I found that the problem was that the root.child is undefined. I forgot to set the root.child to the first child of the root. After fixing this, the vdom was rendered in the browser.
