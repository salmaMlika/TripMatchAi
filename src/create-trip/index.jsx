import React, { useEffect, useState } from 'react';
import { budgetOptions, travelWithOptions,activityOptions, AI_PROMPT } from "../constants/options";
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash', 
    generationConfig: { responseMimeType: 'application/json' }
  });
  
  
  const chatSession = model.startChat({
    generationConfig: { responseMimeType: 'application/json' }
  });

function CreateTrip() {
   const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const[formData,setFormData]=useState([]);
  const [openDailog,setOpenDialog]=useState(false);
const handleInputChange = (name, value) => {

    setFormData({
      ...formData,     
      [name]: value    
    });
  };


  useEffect(()=>{
    console.log('FormData:', formData);

  },[formData])


  const Login=useGoogleLogin({
    onSuccess:(codeResp)=>console.log(codeResp),
    onError:(error)=>console.log(error)
  })
 const OnGenerateTrips = async () => {
  const user= localStorage.getItem('user');
  if (!user){
    setOpenDialog(true)
    return ;
  }
  try {
    if (!formData?.location || !formData?.traveler || !formData?.budget || !formData?.numbofdays) {
      toast("Please fill all details");
      return;
    }

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location)
      .replace('{days}', formData?.numbofdays)
      .replace('{travelers}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{days}', formData?.numbofdays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = result?.response?.text();
      
      console.log('AI Response:', responseText);
      

    console.log(result?.response?.text); // Utilise ?.
  } catch (error) {
    console.error('🔥 Error while generating trip:', error);
    toast("An error occurred while generating the trip.");
  }
};

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${value}`);
      const data = await res.json();
      setResults(data);
    } else {
      setResults([]);
    }
  };
    const handleSelect = (displayName) => {
    setQuery(displayName); 
    setResults([]); 
    handleInputChange("location", displayName); 
  };
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-5 mt-10'>
      <h2 className='font-bold text-3xl'> Tell us your travel preferences</h2>
<p className='mt-3 text-grey-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.

</p>
<div className='mt-20 flex flex-col gap-9'>
  <div><h2 className='text-xl my-3 font-medium'>What is your  destination of choice?
 </h2>
 <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a location..."
        className="border p-2 w-full rounded"
      />
      {results.length > 0 && (
        <ul className="absolute bg-white border w-full z-10 mt-1 rounded shadow max-h-60 overflow-y-auto">
          {results.map((place) => (
            <li
              key={place.place_id}
              onClick={() => handleSelect(place.display_name)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
  </div>
  <div>
            <h2 className='font-medium my-3 text-xl'> How many days are you planning to travell?
</h2>
<input placeholder='Ex.3' type="number"  
onChange={(e)=>handleInputChange('numbofdays',e.target.value)}
/>
</div>

        <div>
          <h2 className='font-medium my-3 text-xl'> What is Your Budget?

          </h2>
          <p className='mt-3 text-grey-500 text-xl'>The budget is exclusively allocated for activities and dining purposes.

          </p>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {
              budgetOptions.map((item, index) => (
                <div key={index} 
                onClick={(e)=>handleInputChange('budget',item.title)}
               className={`p-4 border cursor-pointer rounded-lg hover:shadow ${
  formData?.budget === item.title ? 'shadow-lg border-black' : ''
}`}
>
                  <h2 className='text-3xl'>{item.icon}</h2>
                  <h2 className='text-lg font-bold'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                </div>
              ))
            }
          </div>

        </div>
        <div>
          
        <h2 className='font-medium my-3 text-xl'> Who do you plan on traveling with on your next adventure?


</h2>
<div className='grid grid-cols-3 gap-5 mt-5'>
{
  travelWithOptions.map((item, index) => (
    <div key={index} 
                    onClick={(e)=>handleInputChange('traveler',item.title)}

className={`p-4 border cursor-pointer rounded-lg hover:shadow ${formData?.traveler==item.title? 'shadow-lg border-black' : ''}`} >
      <h2 className='text-3xl'>{item.icon}</h2>
      <h2 className='text-lg font-bold'>{item.title}</h2>
    </div>
  ))
}
</div>

</div>
    
<div className='my-10 justiify-end flex '>
  <Button onClick={OnGenerateTrips}>Generate Trip </Button>
</div>
<Dialog open={openDailog}>

  <DialogContent>
    <DialogHeader>
      <DialogDescription>
       <img src="/logo.svg"/>
       <h2 className="font-bold text-lg mt-7"> Sign in with Google</h2>
       <p> Sign in to the App with Google Authentication securely</p>
       <Button onClick={Login}
       
       className="w-full mt-5 flex gap-4 items-center"><FcGoogle className="h-7 w-7"/>
 Sign in with Google </Button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
</div>
    </div>
  )
}

export default CreateTrip
