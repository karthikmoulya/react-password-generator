import { useState } from 'react';
import usePasswordGenerator from './hooks/use-password-generator';
import PasswordStrengthIndicator from './components/StrengthChecker';
import Button from './components/Button';
import Checkbox from './components/Checkbox';

function App() {
  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: 'Include Uppercase Letters', state: false },
    { title: 'Include Lowercase Letters', state: false },
    { title: 'Include Numbers', state: false },
    { title: 'Include Symbols', state: false },
  ]);

  const [copied, setCopied] = useState(false);

  const handleCheckBoxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  return (
    <div className='container'>
      {password && (
        <div className='header'>
          <div className='title'>{password}</div>
          <Button
            customClass='copyBtn'
            onClick={handleCopy}
            text={copied ? 'Copied' : 'Copy'}
          />
        </div>
      )}
      <div className='charLength'>
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
          type='range'
          min='4'
          max='20'
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>
      <div className='checkboxes'>
        {checkboxData.map((checkbox, idx) => {
          return (
            <Checkbox
              key={idx}
              onChange={() => handleCheckBoxChange(idx)}
              checked={checkbox.state}
              title={checkbox.title}
            />
          );
        })}
      </div>
      <PasswordStrengthIndicator password={password} />
      {errorMessage && <div className='errorMessage'>{errorMessage}</div>}
      <Button
        customClass='generateBtn'
        onClick={() => {
          generatePassword(checkboxData, length);
        }}
        text='Generate Password'
      />
    </div>
  );
}

export default App;
