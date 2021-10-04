import axios from 'axios';
import React from 'react';

function SourceGenBank({ source, updateSource }) {
  const [waitingMessage, setWaitingMessage] = React.useState('');
  const [genBankId, setGenBankId] = React.useState('');

  // Function called to update the value of enzymeList
  const onChange = (event) => setGenBankId(event.target.value);

  const onSubmit = (event) => {
    event.preventDefault();
    setWaitingMessage('Requesting sequence to Genbank');
    const newSource = {
      ...source,
      genbank_id: genBankId,
    };
    axios.post(`${process.env.REACT_APP_BACKEND_URL}step`, newSource)
      .then((resp) => {
        setWaitingMessage(null);
        updateSource({ ...newSource, output_list: resp.data.output_list });
      })
      .catch((reason) => console.log(reason));
  };

  return (
    <div>
      <h3 className="header-nodes">Type a Genbank ID</h3>
      <p>For example: NM_001018957.2</p>
      <form onSubmit={onSubmit}>
        <input type="text" value={genBankId} onChange={onChange} />
        <button type="submit">Submit</button>
      </form>
      <div>{waitingMessage}</div>
    </div>
  );
}

export default SourceGenBank;
