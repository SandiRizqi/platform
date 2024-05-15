'use client';
import React from "react";
import { useState, useEffect } from "react";
import GciButton from "@/components/GciButton";
import GciTimeline from "@/components/GciTimeline";
import GciAvatar from "@/components/GciAvatar";
import { Container } from "@mui/material";
import axios from "axios";



export default function Home() {
  const [planet, setPlanet] = useState([])
  

  const getMosaic = async (url) => {
    axios
        .get(url)
        .then((res) => {
            const data = res.data.mosaics.filter((item) => item.datatype === "uint16");
            setPlanet((prevData) => [...prevData, ...data]);
            // Check if there's a next page of data to fetch
            if (res.data._links && res.data._links._next) {
                getMosaic(res.data._links._next); // Recursively fetch next page
            };
        })
        .catch(() => console.log("Something error with server"));

};


  useEffect(() => {
    getMosaic(`https://api.planet.com/basemaps/v1/mosaics?api_key=${process.env.NEXT_PUBLIC_PLANET_API_KEY}`);
  },[]);


  return (
    <>
      <Container sx={{padding: '1rem'}}>
        <GciButton color={"secondary"} variant={"contained"} isLoading>
          Button
        </GciButton>
        <br />
        <br />
        <GciTimeline marks={planet}/>
        <br />
        <br />
        <GciAvatar />
      </Container>
    </>
  );
}
