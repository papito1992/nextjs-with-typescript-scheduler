import * as React from 'react';
import Image from 'next/image'
import {Card} from "@mui/material";
import Box from "@mui/material/Box";

// src={"https://source.unsplash.com/random"}
export default function HomeBanner() {
  return (

    <div style={{position: "relative", width: "100%", paddingBottom: "20%"}}>
      <Image alt="Mountains"
             src="https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=730&q=80"
        // width="0"
        // height="0"
        //      sizes="100vw"
             fill
             sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
             style={{
               // width: '100%',
               // height: 'auto',
               objectFit: 'cover'
             }}
      />
    </div>
  );
}
