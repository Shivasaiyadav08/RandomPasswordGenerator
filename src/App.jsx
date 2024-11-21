import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setlength] = useState(20);
  const [number, setnumber] = useState(false);
  const [symbols, setsymbols] = useState(false);
  const [password, setpassword] = useState("");
  
  const reff=useRef()

  const PasswordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) {
      str += "0123456789"
    }
    if (symbols) {
      str += "!@#$%^&*()_+"
    }
    for (let i = 0; i < length; i++) {
      const vaL = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(vaL)
    }
    setpassword(pass)
  }, [length, number, symbols])

  const copytoclipboard = () => {
    navigator.clipboard.writeText(password);
    reff.current.select()
  }
  useEffect(() => {
    PasswordGenerator()
  }, [length, number, symbols])


  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          ref={reff}
          readOnly
        />
        <button onClick={copytoclipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
            min={8}
            max={20}
            onChange={(e) => setlength(e.target.value)}
          />
          <label htmlFor="leng
          ">lenght : {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={number}
            onChange={() => {
              setnumber((prev) => !prev)
            }
            }
          />
          <label htmlFor="numbers">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
            defaultChecked={symbols}
            onChange={() => {
              setsymbols((prev) => !prev)
            }}
          />
          <label htmlFor="characters">Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
