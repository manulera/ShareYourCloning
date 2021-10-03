import React from 'react';
import './App.css';
import QuickNetwork from './components/QuickNetwork';
import SequenceEditor from './components/SequenceEditor';

function App() {
  const [state, setState] = React.useState({ data: false });
  React.useEffect(() => {
    setState({ data: true });
  }, []);
  return (
    <div className="App">
      <header className="App-header" />
      <div>
        <SequenceEditor {...{ data: state.data }} />
        {/* <QuickNetwork /> */}
      </div>
    </div>
  );
}

export default App;
