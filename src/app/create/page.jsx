"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {

    e.preventDefault();
    setIsLoading(true);
    const response = await fetch("/api/weather", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city, country }),
    });

    const data = await response.json()

    console.log(data);

    setIsLoading(false);
    setCity("");
    setCountry("");
    router.push("/");

  };

  return (
    <form class="max-w-sm mx-auto pt-5" onSubmit={handleSubmit}>
      <div class="mb-5">
        <label
          for="City"
          class="block mb-2 text-sm font-medium text-gray-900 "
        >
          City
        </label>
        <input
          onChange={(e) => setCity(e.target.value)}
          type="text"
          id="City"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 "
          placeholder="City"
          required
          value={city}
        />
      </div>
      <div class="mb-5">
        <label
          for="country"
          class="block mb-2 text-sm font-medium text-gray-900 "
        >
          Your password
        </label>
        <input
          onChange={(e) => setCity(e.target.value)}
          type="text"
          id="country"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
          required
          value={country}
        />
      </div>

      <button
        disabled={isLoading}
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        {isLoading ? "Loading..." : "Create"}
      </button>
    </form>
  );
};

export default Page;
