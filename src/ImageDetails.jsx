/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { saveAs } from "file-saver";

const API_URL = "https://api.unsplash.com/photos";

function ImageDetails() {
  const parameter = useParams();
  // const parameter = useParams() || localStorage.getItem("id");
  const id = parameter.id || localStorage.getItem("id");
  // console.log(id)
  // console.log("localstoraged", localStorage.getItem("id") )
  // const [data, setData] = useState( [] || JSON.parse(localStorage.getItem("data")));
  // const [imageUrl, setImageurl] = useState( "" || localStorage.getItem("imageUrl"));
  
  const [data, setData] = useState([]);
  const [imageUrl, setImageurl] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/${id}?client_id=${import.meta.env.VITE_API_KEY}&query=bird`
      );
      setData(response.data);
      setImageurl(response.data.urls.full)
      console.log(response.data)
      console.log("data", data)
      localStorage.setItem("imageUrl", response.data.urls.full);
      localStorage.setItem("data", JSON.stringify(response.data));
      localStorage.setItem("id", id);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    fetchData();
  }, [imageUrl])

  return <>
    {/* Main body */}
    <div className="w-full h-dvh bg-zinc-900 text-white">
        <a href="/" className="fixed inline-flex gap-1 items-center left-0 top-0 m-6 text-blue-500"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg> Back</a>
        {/* Images section */}
        <div className="w-full bg-zinc-900 h-svh py-6 px-10 flex flex-wrap gap-2 justify-center">
          
          <div className="h-4/5 w-full flex flex-col items-center object-contain rounded-lg">
            <img src={imageUrl} className="h-full rounded-lg object-contain" alt={data.slug} />
            <button onClick={() => {saveAs(imageUrl, data.slug)}} className=" cursor-pointer bg-zinc-800 flex gap-3 justify-center mt-3 p-4 rounded-lg w-3/4"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg><h1>Download</h1></button>
          </div>            
          
        </div>
        {/* Footer */}
        <div className="bg-zinc-900 text-center py-2 absolute bottom-0  w-full">
          Copyright &copy; <i>Mohammad Asif Khan</i> <br />
          
          <div className="socials flex gap-4 my-4 justify-center ">
            <a href="https://www.instagram.com/asif_khan.psd">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/asif-khan-2k22">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://github.com/asif-khan-2k19">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
          </div>
          
        </div>
      </div>
  </>;
}

export default ImageDetails;
