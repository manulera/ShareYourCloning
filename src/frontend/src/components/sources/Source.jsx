import React from 'react';
import SourceFile from './SourceFile';
import SourceGenBank from './SourceGenBank';
import SourceRestriction from './SourceRestriction';

// TODO
// You should be able to chose based on the input. No input -> only file or request
// An input -> no file nor request, but the others yes

function Source({ source, updateSource, getEntityFromId }) {
  function onChange(event) {
    const newSource = {
      ...source,
      type: event.target.value,
    };
    updateSource(newSource);
  }
  let specificSource = null;
  if (source.type !== null) {
    if (source.type === 'file') {
      specificSource = <SourceFile {...{ source, updateSource }} />;
    }
    if (source.type === 'restriction') {
      specificSource = <SourceRestriction {...{ source, updateSource, getEntityFromId }} />;
    }
    if (source.type === 'genbank_id') {
      specificSource = <SourceGenBank {...{ source, updateSource, getEntityFromId }} />;
    }
  }
  return (
    <div>
      <label htmlFor="select_source">
        Choose a source<br/>
        <select value={source.type} onChange={onChange} id="select_source">
          <option value=" " />
          <option value="file">file</option>
          <option value="restriction">restriction</option>
          <option value="genbank_id">GenBank ID</option>
        </select>
      </label>
      {specificSource}
    </div>
  );
}

export default Source;
