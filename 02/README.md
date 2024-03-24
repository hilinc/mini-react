# lesson 02

## what I learned today?

1. To execute tasks more efficiently, we split the tasks into smaller tasks. By using the browser's requestIdleCallback API, we can split the tasks into smaller tasks and execute them when the browser is idle, thereby improving performance.
2. By implementing a fiber architecture to simulate React's workflow, we can better understand React's internal mechanism.

## what problems did I encounter?

I encountered a problem when converting a tree into a linked list. I did not correctly assign newFiber to prevChild, which caused an error in execution.

## How to solve it?

I reviewed the video and recorded the implementation ideas, and then re-implemented it.

## If there is a time-consuming task that blocks the main thread, causing subsequent requestIdleCallback to fail to execute, how to solve it?

Firstly, we can split this time-consuming task into multiple small tasks, and then execute these small tasks in requestIdleCallback, so as to avoid blocking the main thread and improve the performance of the application.

Secondly, we can use Web Workers to execute time-consuming tasks in the background, so as to avoid blocking the main thread and improve the performance of the application.

Lastly, we can use the browser's requestAnimationFrame API to execute tasks when the browser is idle, so as to avoid blocking the main thread and improve the performance of the application.
