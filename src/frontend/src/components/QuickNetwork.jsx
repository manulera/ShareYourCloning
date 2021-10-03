import React from 'react';
import './QuickNetwork.css';

function findAncestors(element, nodes, operations) {
  const ancestors = [];
  if (element.type === 'operation') {
    const ancestorNodes = nodes.filter((node) => element.input.includes(node.id));
    ancestorNodes.forEach((node) => {
      const thisTreeElement = { data: node, ancestors: [] };
      thisTreeElement.ancestors = findAncestors(thisTreeElement.data, nodes, operations);
      ancestors.push(thisTreeElement);
    });
  }
  if (element.type === 'node') {
    // There should be only one
    const ancestorOperations = operations.filter((operation) => element.id === operation.output);
    ancestorOperations.forEach((operation) => {
      const thisTreeElement = { data: operation, ancestors: [] };
      thisTreeElement.ancestors = findAncestors(thisTreeElement.data, nodes, operations);
      ancestors.push(thisTreeElement);
    });
  }
  return ancestors;
}

function renderTreeElement(element) {
  const extra = [];
  element.ancestors.forEach((ancestor) => extra.push(renderTreeElement(ancestor)));
  if (element.ancestors.length === 0) {
    return (
      <li>
        <span className="tf-nc"><span className="node-text">{element.data.id}</span></span>
      </li>
    );
  }
  return (
    <li>
      <span className="tf-nc"><span className="node-text">{element.data.id}</span></span>
      <ul>
        {extra}
      </ul>
    </li>
  );
}

function constructNetwork(nodes, operations) {
  const network = [];

  // To construct the network, we start by the elements of DNA that are not input for anything
  nodes.forEach((node) => {
    const nodeIsInput = operations.reduce((result, operation) => result
        || operation.input.includes(node.id), false);
    if (!nodeIsInput) {
      const thisTreeElement = { data: node, ancestors: [] };
      thisTreeElement.ancestors = findAncestors(thisTreeElement.data, nodes, operations);
      network.push(thisTreeElement);
    }
  });
  return network;
}

function QuickNetwork() {
  const [nodes, setNodes] = React.useState([
    { type: 'node', id: '1a', info: 'This is the 1a' },
    { type: 'node', id: '2a', info: 'This is the 2a' },
    { type: 'node', id: '3a', info: 'This is the 3a' },
    { type: 'node', id: '1b', info: 'This is the 3b' },
    { type: 'node', id: 'mixed', info: 'This is the mixed' },
  ]);
  const [operations, setOperations] = React.useState([
    {
      type: 'operation', id: 'import_1a', input: [], output: '1a',
    },
    {
      type: 'operation', id: 'import_1b', input: [], output: '1b',
    },
    {
      type: 'operation', id: '1a>2a', input: ['1a'], output: '2a',
    },
    {
      type: 'operation', id: '2a>3a', input: ['2a'], output: '3a',
    },
    {
      type: 'operation', id: 'mix', input: ['3a', '1b'], output: 'mixed',
    },
  ]);

  const network = constructNetwork(nodes, operations);
  console.log('helloworld', network);

  const items = [];
  network.forEach((element) => {
    items.push(renderTreeElement(element));
  });
  console.log('helloworld', items);
  return (
    <div className="tf-tree tf-ancestor-tree">
      <ul>
        {items}
      </ul>
    </div>
  );
}

export default QuickNetwork;
