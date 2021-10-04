import React from 'react';
import { constructNetwork } from '../network';
import './NetworkTree.css';

function renderTreeElement(element, elementListRenderer) {
  const extra = [];
  element.ancestors.forEach(
    (ancestor) => extra.push(renderTreeElement(ancestor, elementListRenderer)),
  );
  const jsxContent = elementListRenderer(element.data.id).jsx;

  if (element.ancestors.length === 0) {
    return (
      <li>
        <span className="tf-nc"><span className="node-text">{jsxContent}</span></span>
      </li>
    );
  }
  return (
    <li>
      <span className="tf-nc"><span className="node-text">{jsxContent}</span></span>
      <ul>
        {extra}
      </ul>
    </li>
  );
}

function getTreeArray(network, elementListRenderer) {
  const items = [];
  network.forEach((element) => {
    items.push(renderTreeElement(element, elementListRenderer));
  });
  return items;
}

function NetworkTree({ entities, sources, elementListRenderer }) {
  const network = constructNetwork(entities, sources);
  return (
    <div className="tf-tree tf-ancestor-tree">
      <ul>
        {getTreeArray(network, elementListRenderer)}
      </ul>
    </div>
  );
}

export default NetworkTree;
