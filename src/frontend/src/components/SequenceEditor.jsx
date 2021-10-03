import React, { useEffect } from 'react';
import 'open-vector-editor/umd/main.css';
import { CircularView,LinearView, updateEditor,  } from 'open-vector-editor';
import { fastaToJson } from 'bio-parsers';
import store from '../store';

function SequenceEditor({ data }) {
  const editorProps = {
    editorName: 'PlasmidEditor',
    isFullscreen: false,
    annotationVisibility: {
      reverseSequence: false,
      cutsites: false,
    },
  };
  const seq = fastaToJson('ACGT');
  const editor = <LinearView {...editorProps} />;
  updateEditor(store, 'PlasmidEditor', {
    sequenceData: seq,
    annotationVisibility: {
      reverseSequence: false,
      cutsites: false,
    },
  });
  if (data === true) {
    return (
      <div>
        Hello
        {console.log('This one', store)}
        {editor}
      </div>
    );
  }

  return (
    <div />
  );
}

export default SequenceEditor;
