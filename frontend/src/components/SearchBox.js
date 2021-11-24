import React, { useState } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import { IconButton } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FilledInput from '@mui/material/FilledInput';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function SearchBox(props) {

  const [name, setName] = useState('');

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
        
         <OutlinedInput
           name="q"
           id="q"
           placeholder="Comience su búsqueda"
           onChange={(e) => setName(e.target.value)}
           startAdornment={
             <InputAdornment position="end">
               <IconButton color="primary" aria-label="upload picture" component="span" edge="end">
                 <MicIcon />
               </IconButton>
             </InputAdornment>
           }
         />
       </div>
       
       <div style="border: 1px solid #DDD;">
           <IconButton color="primary" aria-label="upload picture" component="span">
             <MicIcon/>
           </IconButton>
             <input style="border: none;"/>
         </div> 
     </form> */

    <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
      <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
      <FilledInput
        id="filled-adornment-password"
        type={true ? 'text' : 'password'}
        //value={"nose"}
        onChange={handleChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {true ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
