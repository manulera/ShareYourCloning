export function findAncestors(element, entities, sources) {
  const ancestors = [];
  if (element.kind === 'source') {
    const ancestorEntities = entities.filter((entity) => element.input.includes(entity.id));
    ancestorEntities.forEach((entity) => {
      const thisTreeElement = { data: entity, ancestors: [] };
      thisTreeElement.ancestors = findAncestors(thisTreeElement.data, entities, sources);
      ancestors.push(thisTreeElement);
    });
  }
  if (element.kind === 'entity') {
    // There should be only one
    const ancestorSources = sources.filter((source) => element.id === source.output);
    ancestorSources.forEach((source) => {
      const thisTreeElement = { data: source, ancestors: [] };
      thisTreeElement.ancestors = findAncestors(thisTreeElement.data, entities, sources);
      ancestors.push(thisTreeElement);
    });
  }
  return ancestors;
}

export function constructNetwork(entities, sources) {
  const network = [];

  // To construct the network, we start by the elements of DNA that are not input for anything
  // and the sources that have no output
  entities.forEach((entity) => {
    const entityIsInput = sources.reduce((result, source) => result
          || source.input.includes(entity.id), false);
    if (!entityIsInput) {
      const thisTreeElement = { data: entity, ancestors: [] };
      thisTreeElement.ancestors = findAncestors(thisTreeElement.data, entities, sources);
      network.push(thisTreeElement);
    }
  });

  sources.forEach((source) => {
    if (source.output === null) {
      const thisTreeElement = { data: source, ancestors: [] };
      thisTreeElement.ancestors = findAncestors(thisTreeElement.data, entities, sources);
      network.push(thisTreeElement);
    }
  });

  return network;
}
