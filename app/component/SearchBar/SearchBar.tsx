import React, { useState, ChangeEvent } from 'react';
import { RiArrowDownSLine, RiSearchLine } from 'react-icons/ri';

interface SearchBarProps {
  onSearchPlace: (value: string) => void;
  onSearchLocation: (value: string) => void;
  onSearchSituation: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchLocation, onSearchPlace, onSearchSituation }) => {
  const [text, setText] = useState('');
  const [activeField, setActiveField] = useState<string>('Situation') 

  const handleIDChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setText(value);
  };
  const handleActiveFieldChange = (field: string) => {
    setActiveField(field);
  };



  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (activeField === 'Location') {
        onSearchLocation(text);
      } else if(activeField == 'Situation') {
        onSearchSituation(text);
      }
      else {
        onSearchPlace(text)
      }
      setText('')
    }
  };

  const handleSubmit = () =>{
   // console.log('SUBMIT')
    if (activeField === 'Location') {
        onSearchLocation(text);
      } else if(activeField == 'Situation') {
        onSearchSituation(text);
      }
      else {
        onSearchPlace(text)
      }
    setText('')
  }



  return (
    <div className="rounded-full p-4 w-full max-w-full text-white flex justify-center space-x-2">
      <div className="flex-1 relative flex items-center">
        <div className="relative border border-neutral-700  rounded-l-full">
          <select
            className="text-white bg-blue-500 text-xs md:text-base appearance-none border-none py-2 pl-3 pr-8 rounded-l-full"
            value={activeField}
            onChange={(e) => handleActiveFieldChange(e.target.value)}
          >
            <option className="bg-blue-500 p-2 text-xs md:text-base mt-2" value="Situation">Situasi</option>
            <option className="bg-blue-500 p-2 text-xs md:text-base mt-2" value="Location">Wilayah</option>
            <option className="bg-blue-500 p-2 text-xs md:text-base" value="Place">Tempat</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none text-gray-400 pr-2">
            <RiArrowDownSLine className="w-5 h-5" />
          </div>
        </div>
        <input
          type="text"
          id="certID"
          placeholder={`Apa etiket yang ingin kamu ketahui`}
          value={text}
          onChange={handleIDChange}
          onKeyDown={handleEnterPress}
          className="border border-neutral-700 text-xs md:text-base rounded-r-full w-full text-black pl-3 py-2 pr-8 bg-white"
        />
        <div onClick={handleSubmit} className="absolute  inset-y-0 right-0 flex items-center pr-2 pointer-events-auto text-gray-400">
          <RiSearchLine  />
        </div>
      </div>
    </div>
  );

};

export default SearchBar;