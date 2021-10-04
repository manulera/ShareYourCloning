import React from 'react';
import './App.css';
import { genbankToJson } from 'bio-parsers';
import NetworkTree from './components/NetworkTree';
import SequenceEditor from './components/SequenceEditor';
import Source from './components/sources/Source';
import executeSourceStep from './executeSourceStep';

/**
 * Generate a list of objects, where every object has:
 * id: the id of an entity in the 'entities' state array
 * jsx: jsx containing a representation of each entity (in this case graphical representation)
 *    of the DNA molecule
 * @param {Array<entity>} entities array of entities
 * @param {function} addSource passing down the function addSource, so that in the entities that are
 *                        not the input of anything (at the bottom of the tree), there is a button
 *                        to add a new source.
 * @returns the mentioned list
 */
function buildElementListEntities(entities, addSource) {
  const out = [];
  entities.forEach((entity) => {
    out.push({
      id: entity.id,
      jsx: <div><SequenceEditor {...{ entity, addSource }} /></div>,
    });
  });
  return out;
}

/**
 * Generate a list of objects, where every object has:
 * id: the id of an source in the 'sources' state array
 * jsx: jsx containing a representation of each source
 * @param {Array<source>} sources 
 * @param {function} updateSource 
 * @param {*} getEntityFromId 
 * @returns 
 */
function buildElementListSources(sources, updateSource, getEntityFromId) {
  const out = [];
  sources.forEach((source) => {
    out.push({
      id: source.id,
      jsx: <div><Source {...{ source, updateSource, getEntityFromId }} /></div>,
    });
  });
  return out;
}

function App() {
  const [entities, setEntities] = React.useState([]);
  const [sources, setSources] = React.useState([{
    id: 1, input: [], output: null, type: null, kind: 'source',
  }]);

  const updateOrCreateEntity = (newEntity, newSource) => {
    // If any of the entities comes from that source, we delete it
    const newEntities = entities.filter((entity) => entity.id !== newSource.output);
    // We add the new entity
    newEntities.push(newEntity);
    setEntities(newEntities);
  };

  const updateSource = (newSource) => {
    executeSourceStep(newSource, updateOrCreateEntity);
    setSources(sources.map((source) => (source.id === newSource.id ? newSource : source)));
  };

  const getEntityFromId = (id) => entities.filter((entity) => entity.id === id)[0];
  const addSource = (inputEntity) => setSources(sources.concat([
    {
      id: 3, input: [inputEntity.id], output: null, type: null, kind: 'source',
    },
  ]));

  // Here we make an array of objects in which each one has the id, and the jsx that will go
  // into each node in the tree.
  const elementList = buildElementListEntities(entities, addSource).concat(
    buildElementListSources(sources, updateSource, getEntityFromId),
  );
  const elementListRenderer = (id) => elementList.find((element) => element.id === id);

  return (
    <div className="App">
      <header className="App-header" />
      <div>
        <NetworkTree {...{ entities, sources, elementListRenderer }} />
      </div>
    </div>
  );
}

export default App;
