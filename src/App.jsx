import React, { useCallback, useEffect, useState,  useRef } from "react";

const App = () => {
  const [length, setLength] = useState(8);

  const [number, setNumber] = useState(false);

  const [character, setCharacter] = useState(false);

  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy";

    if (number) str += "0123456789";

    if (character) str += "!@#$%^&*()*{}[]";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, number, character, setPassword]);

  useEffect(() => {
    passwordGenerator();
  },[length, number, character, setPassword])


 const copyPasswordToClipboard = useCallback(()=> {
  passwordRef.current?.select();
  // passwordRef.current?.setSelectionRange(0,5);  // set selection range length to 5
  window.navigator.clipboard.writeText(password);
 },[password])


  return (
    <>
      <div className="w-full h-36 max-w-md mx-auto shadow-md rounded-lg px-4  my-10 text-orange-500 bg-slate-500">
        <div className="text-2xl text-center text-white mb-3 ">
          Password Generator
        </div>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 w-full">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 "
            placeholder="password"
            readOnly
            ref={passwordRef}
          />

          <button 
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-600">
            copy
          </button>
        </div>

        <div className="flex text-sm gap-x-4">
        {/* slider */}
          <div className="flex items-center gap-x-1">
            <input 
            type="range"
            id="length" 
            min={6}
            max={20}
            value={length}
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label htmlFor="length">Length ({length})</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox" 
            name="number" 
            id="number"
            defaultChecked={number}
            onChange={() => {setNumber((prev) => !prev)}}
             />
             <label htmlFor="number">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox" 
            id="character"
            defaultChecked={character}
            onChange={() => {setCharacter((prev) => !prev)}}
             />
             <label htmlFor="character">Character</label>
          </div>

        </div>


      </div>
    </>
  );
};

export default App;
