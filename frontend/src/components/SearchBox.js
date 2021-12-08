import React, { useState, useEffect } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import MicNoneIcon from '@mui/icons-material/MicNone';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment'; 
import OutlinedInput from '@mui/material/OutlinedInput';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'es-US'

export default function SearchBox(props) {

  const [name, setName] = useState('');
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    handleListen()
    // eslint-disable-next-line
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      setTimeout(() => {
        if(isListening){
          setIsListening(false);
        }
      }, 2500);

      mic.onend = () => {
        console.log('continuar..')
        mic.start()
      }


    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Microfono detenido')
      }
    }
    mic.onstart = () => {
      console.log('Microfono encendido')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setName(transcript.replace(/[&\\#,+()$~%.'":*?<>{}]/g, ""))
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }
  const handleChange = (event) => {
    setName(event.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    /*  <form className="search" onSubmit={submitHandler}>
       <div className="row">
        <input
           type="text"
           name="q"
           id="q"
           onChange={(e) => setName(e.target.value)}
           placeholder="Comience su búsqueda"
         /> 
           <button className="primary" type="submit">
               <i className="fa fa-search"></i>
           </button>
       </div>
     </form> */

    <FormControl sx={{ m: 0, width: '35ch' }} variant="filled">
      {/* <InputLabel htmlFor="filled-adornment-password">Password</InputLabel> */}
      <OutlinedInput
        color="primary" //focused
        type='text'
        value={name}
        onChange={handleChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={submitHandler}
              edge="end"
            >
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 35, m: 1.5 }} orientation="vertical" />
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setIsListening(prevState => !prevState)}
              /* onMouseDown={handleMouseDownPassword} */
              edge="end"
              className="primary"
            >
              {isListening ? <MicIcon /> : <MicNoneIcon />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
