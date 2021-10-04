import React from 'react';

function SourceFile({ source, updateSource }) {
  const [waitingMessage, setWaitingMessage] = React.useState('');
  const onChange = (event) => {
    const files = Array.from(event.target.files);
    setWaitingMessage('Loading your file');
    const reader = new FileReader();
    reader.onload = (eventFileRead) => {
      setWaitingMessage(null);
      updateSource({
        ...source,
        file_extension: files[0].type,
        file_content: eventFileRead.target.result,
      });
    };
    reader.readAsText(files[0]);
  };
  return (
    <div>
      <h3 className="header-nodes">Submit a file</h3>
      <p>Ideally a '.gb' or '.dna' file with annotations, but will also take FASTA</p>
      <input type="file" onChange={onChange} />
      <div>{waitingMessage}</div>
    </div>
  );
}

export default SourceFile;
