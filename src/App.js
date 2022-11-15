
import './App.css';
import {React,useState} from 'react'
import {Container,Paper,Typography,TextField,FormControlLabel,Radio,MenuItem,FormGroup,Checkbox,Button,Grid} from "@mui/material"
import { useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  patientName: yup.string().required({pattern:/^[A-Za-z]+$/}).min(3).max(120),
  dateofbirth: yup.date().required(),
  date:yup.date().required(),
  doctors:yup.string().required().min(3).max(120),
  consulatationcharges:yup.number().required(),
  height:yup.number().required(),
  blood:yup.number().required(),
  weight:yup.number().required(),
  temp:yup.number().required(),
 
});
function App() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode:"onChange",
    resolver: yupResolver(schema),
  });
  const init={
    patientName:"",
    dateofbirth:"",
    date:"",
    doctors:"",
    consulatationcharges:"",
    height:"",
    blood:"",
    weight:"",
    temp:"",
    terms:"",
  }
  const [input,setInput]=useState(init)
  const handleChange=(e)=>{
      const {name,value}=e.target
      setInput({...input,[name]:value})
  }
  const onSubmit = (data) => {
      const now= new Date();
  if(data.terms !==true ){
    alert("Please Accept Terms and Conditions")
  }else if(data.dateofbirth > now){
    alert("Enter valid Date Of Birth")
  }else if(data.date < now){
    alert("Enter Valid Appointment Date")
  }else{
    alert("Registered Succeesfully")
  }
  setInput(init)
   console.log(data);
   }
  return (
    <div className="App">
      <Container>
         <Paper  elevation={5} sx={{height:870,width:650,marginTop:3,marginBottom:2,marginLeft:30,textAlign:'center'}}>
           <Grid sx={{marginTop:2}}>
              <Grid className="test">
                <Typography variant="h5">Patient consultation Form</Typography>
              </Grid>
              <form onSubmit={handleSubmit(onSubmit)}>
                 <TextField name="Patient Name" variant="outlined" label="Patient Name"  {...register("patientName", { pattern: /^[A-Za-z]+$/})} sx={{marginTop:4,width:400}}/>
                 {errors.patientName && <p className="para">Please Enter the Name</p>}
                 {/* {errors.patientName.type.pattern && <p className="para">Name should not be Numeric</p>} */}
                 <Grid>
                  <Typography>Date Of Birth</Typography><br/>
                  <TextField type="date" sx={{width:400}} {...register("dateofbirth", { required: true})}/>
                  {errors.dateofbirth && <p className="para">Date Of Birth is Mandatory</p>}
                 </Grid>
                 <Grid>
                  
                  <Typography>Gender</Typography>
                  
                  <label> <Radio name="radio_button" value="male" {...register("male")}/>
                 Male</label>
                  <label> <Radio name="radio_button" value="female" {...register("female")}/>
                 Female</label>
                  <label> <Radio name="radio_button" value="others" {...register("others")}/>
                 Others</label>
                  
                 </Grid>
                 <Grid>
                  <Typography>Appointment Date</Typography><br/>
                  <TextField type="date" sx={{width:400}} {...register("date")}/>
                 
                 </Grid>
                 <TextField name="doctors" select label="Doctors"  {...register("doctors", { required: true})} sx={{marginTop:4,width:350}}>
                   <MenuItem value={"Dr.Harish"}>Dr.Harish</MenuItem>
                    <MenuItem value={"Dr.Suman"}>Dr.Suman</MenuItem>
                    <MenuItem value={"Dr.Aman"}>Dr.Aman</MenuItem>
                    <MenuItem value={"Dr.Devi"}>Dr.Devi</MenuItem>
                    <MenuItem value={"Dr.Ravi"}>Dr.Ravi</MenuItem>
                 </TextField><br/>
                 {errors.doctors && <p className="para">Select the Doctor</p>}
                 <TextField name="consulatationcharges" label="Consultation Charges" defaultValue="$"  sx={{marginTop:4,width:400}} {...register("consulatationcharges",{ pattern: /^[0-9.]+$/ })}/>
                 {errors.consulatationcharges && <p className="para">consulatation charges must be a number</p>}
                 <Grid>
                    <TextField label="Height" defaultValue="0" sx={{marginTop:4,width:100,marginLeft:10}} {...register("height", { pattern: /^[0-9.]+$/ })} />
                    {errors.height && <p className="para">Height must be a number</p>}
                    <TextField label="Blood" defaultValue="0" sx={{marginTop:4,width:100,marginLeft:4}} {...register("blood", { pattern: /^[0-9.]+$/ })}/>
                    {errors.blood && <p className="para">bp must be a number</p>}
                    <TextField label="Weight" defaultValue="0" sx={{marginTop:4,width:100,marginLeft:4}} {...register("weight", { pattern: /^[0-9.]+$/ })}/>
                    {errors.weight && <p className="para">Weight must be a number</p>}
                    <TextField label="Temp" defaultValue="0" sx={{marginTop:4,width:100,marginLeft:4}} {...register("temp", { pattern: /^[0-9.]+$/ })}/>
                    {errors.temp && <p className="para">Temperature must be a numeric value</p>}
                 </Grid>
                 <Grid>
                  <FormGroup sx={{marginLeft:15,marginTop:3}}>
                            <FormControlLabel control={<Checkbox/>} name="terms" label="I Have read and agree to the terms*" size="small"  sx={{margintop:3}} {...register("terms", { required: true})}/>
                            {errors.terms && <p className="para">please accecept terms and conditions</p>}
                            
                  </FormGroup>
                 </Grid>
                 <Button variant="contained" color="primary" sx={{height:45,marginTop:3}} type="submit">REGISTER</Button>
              </form>
           </Grid>
         </Paper>
      </Container>
    </div>
  );
}

export default App;
