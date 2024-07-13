"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
 
const HomePage = () => {
  const [weatherData, setWeatherData] = useState([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';	
	const apiId = '&appid=68bbaa3e81a9e699219c7a3119228fb9&units=imperial';

  
  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}${'London'}${apiId}`);
      const data = await response.json();
      setWeatherData(data);
      setIsLoading(false);

      console.log(weatherData);
    };
    fetchWeatherData();
  }, []);

  console.log(weatherData);

  const handleCreate = async (e) => {
    router.push("create")
  };

  const handleUpdate = async (id) => {
    router.push("update")
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      
      const response = await fetch('/api/weather', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      setIsLoading(false);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmDelete = (id) => {
    setShowConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div>

          <h1 className="pl-5">Home Page</h1>
          <button className="text-white m-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto p-5 py-2.5 text-center " onClick={() => handleCreate()}>Create</button>
          
          { weatherData && <ul className="w-[500px] mx-auto pt-20 flex flex-col gap-2">
              <li key={weatherData.id} className="flex flex-col gap-2">
                <p>City: {weatherData.name}</p>
                <p>Temperature: {weatherData?.main?.temp}°C</p>
                <p>Humidity: {weatherData?.main?.humidity}%</p>
                <button onClick={() => handleUpdate(weatherData.id)}>Update</button>
                <button onClick={() => handleConfirmDelete(weatherData.id)}>
                  Delete
                </button>
                
                {showConfirmation && (
                  <div>
                    <p>
                      Are you sure you want to delete weatherData data for{" "}
                      {weatherData.name}?
                    </p>
                    <button onClick={() => handleDelete(weatherData.id)}>
                      Delete
                    </button>
                    <button onClick={handleCancelDelete}>Cancel</button>
                  </div>
                )}
                
              </li>
          </ul>}
          
       

       
    </div>
  );
};

export default HomePage;