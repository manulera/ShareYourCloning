import { updateEditor, CircularView, LinearView } from 'open-vector-editor';
import React from 'react';
import axios from 'axios';
import { convertToTeselaJson } from '../../sequenceParsers';
import store from '../../store';

function SourceRestriction({ source, updateSource, getEntityFromId }) {
  const [waitingMessage, setWaitingMessage] = React.useState('');
  const [enzymeList, setEnzymeList] = React.useState('');
  const [outputList, setOutputList] = React.useState([]);
  const [selectedOutput, setSelectedOutput] = React.useState(0);

  // Function called to update the value of enzymeList
  const onChange = (event) => setEnzymeList(event.target.value);
  // Functions called to move between outputs of a restriction reaction
  const incrementSelectedOutput = () => setSelectedOutput((selectedOutput + 1) % outputList.length);
  const decreaseSelectedOutput = () => setSelectedOutput((selectedOutput + 1) % outputList.length);

  const onSubmit = (event) => {
    event.preventDefault();
    const requestData = {
      ...source,
      restriction_enzymes: [enzymeList],
      input: [getEntityFromId(source.input[0]).sequence],
    };
    axios.post(`${process.env.REACT_APP_BACKEND_URL}step`, requestData)
      .then((resp) => {
        setOutputList(resp.data.output_list);
      })
      .catch((reason) => console.log(reason));
  };
  let editor = null;
  if (outputList.length) {
    const editorName = `editor_${source.id}`;
    const editorProps = {
      editorName,
      isFullscreen: false,
      annotationVisibility: {
        reverseSequence: false,
        cutsites: false,
      },
    };

    const seq = convertToTeselaJson(outputList[selectedOutput]);
    editor = seq.circular ? <CircularView {...editorProps} /> : <LinearView {...editorProps} />;
    updateEditor(store, editorName, {
      sequenceData: seq,
      annotationVisibility: {
        reverseSequence: false,
        cutsites: false,
      },
    });
  }

  return (
    <div>
      <h3 className="header-nodes">Write the enzyme names as csv</h3>
      <form onSubmit={onSubmit}>
        <input type="text" value={enzymeList} onChange={onChange} />
        <button type="submit">Submit</button>
      </form>
      <div>{waitingMessage}</div>
      {editor}
      {/* TODO: move this to the upstream component */}
      <div>
        <button onClick={incrementSelectedOutput} type="button">{'<<'}</button>
        <button onClick={decreaseSelectedOutput} type="button">{'>>'}</button>
      </div>
    </div>
  );
}

export default SourceRestriction;
