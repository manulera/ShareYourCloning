import React from 'react';
import './App.css';
import { genbankToJson } from 'bio-parsers';
import NetworkTree from './components/NetworkTree';
import SequenceEditor from './components/SequenceEditor';
import Source from './components/sources/Source';
import executeSourceStep from './executeSourceStep';

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
