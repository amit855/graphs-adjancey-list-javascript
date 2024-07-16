class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1].push(vertex2);
    this.adjacencyList[vertex2].push(vertex1);
  }

  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
      (v) => v !== vertex2
    );
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
      (v) => v !== vertex1
    );
  }

  removeVertex(vertex) {
    while (this.adjacencyList[vertex].length) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
  }

  depthFirstRecursive(startingVertex) {
    const finalResult = [];
    const visitedVertex = {};
    const adjacencyList = this.adjacencyList;

    (function dfs(vertex) {
      if (!vertex) return null;
      visitedVertex[vertex] = true;
      finalResult.push(vertex);
      adjacencyList[vertex].forEach((neighbour) => {
        if (!visitedVertex[neighbour]) return dfs(neighbour);
      });
    })(startingVertex);

    return finalResult;
  }

  depthFirstItterative(startingVertex) {
    const stack = [startingVertex];
    const finalResult = [];
    const visitedVertex = {};
    let currentVertex;

    visitedVertex[startingVertex] = true;

    while (stack.length) {
      currentVertex = stack.pop();
      finalResult.push(currentVertex);
      this.adjacencyList[currentVertex].forEach((neighbour) => {
        if (!visitedVertex[neighbour]) {
          visitedVertex[neighbour] = true;
          stack.push(neighbour);
        }
      });
    }

    return finalResult;
  }

  breadthFirst(start) {
    const queue = [start];
    const result = [];
    const visited = {};
    let currentVertex;
    visited[start] = true;

    while (queue.length) {
      currentVertex = queue.shift();
      result.push(currentVertex);

      this.adjacencyList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }
    return result;
  }
}

let g = new Graph();

// ----BASIC----
// g.addVertex("Dallas");
// g.addVertex("Tokyo");
// g.addVertex("Aspen");
// g.addVertex("Los Angeles");
// g.addVertex("Hong Kong");
// g.addEdge("Dallas", "Tokyo");
// g.addEdge("Dallas", "Aspen");
// g.addEdge("Hong Kong", "Tokyo");
// g.addEdge("Hong Kong", "Dallas");
// g.addEdge("Los Angeles", "Hong Kong");
// g.addEdge("Los Angeles", "Aspen");
// ----END OF BASIC----

g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");

g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("C", "E");
g.addEdge("D", "E");
g.addEdge("D", "F");
g.addEdge("E", "F");
// g.depthFirstRecursive("A")
console.log(g.depthFirstRecursive("A"));
console.log(g.depthFirstItterative("A"));

//          A
//        /   \
//       B     C
//       |     |
//       D --- E
//        \   /
//          F
