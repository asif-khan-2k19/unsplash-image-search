/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { saveAs } from "file-saver";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://api.unsplash.com/search/photos";
const perPage = 24;

function App() {
  const [query, setQuery] = useState(localStorage.getItem("query") || "");
  const [currentQuery, setCurrentquery] = useState(query);
  const [imageStatus, setImagestatus] = useState("Search to get Images");
  const [images, setImages] = useState(JSON.parse(localStorage.getItem("images")) || []);
  const [page, setPage] = useState(parseInt(localStorage.getItem("page")) || 1);
  const [totalPages, setTotalpages] = useState(10);
 
  
  useEffect(() => {
    fetchImages();
  }, [page]);

    
  const fetchImages = useCallback(async () => {
    try {
      if (query) {
        if (currentQuery !== query) {
          setPage(1);
          setCurrentquery(query);
        }
        const result = await axios.get(
          `${API_URL}?query=${query}&per_page=${perPage}&page=${page}&client_id=${import.meta.env.VITE_API_KEY}`
        );
        setImages(result.data.results);
        setImagestatus(result.data.results.length ? "" : "No images found...");
        setTotalpages(result.data.total_pages);
        localStorage.setItem("query", query);
        localStorage.setItem("images", JSON.stringify(result.data.results));
        localStorage.setItem("page", page.toString());
      }
    } catch (error) {
      console.log(error);
    }
  }, [query, page]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchImages();
  };

  return (
    <>
      {/* Main body */}
      <div className="w-full h-dvh bg-zinc-900 text-white">
        {/* Search Bar */}
        <div className="w-full h-26 text-white p-6 flex justify-center">
          <form className="w-full flex justify-center" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search image..."
              className="bg-zinc-800 outline-none border-2 border-zinc-700 rounded-md w-3/4 p-3 "
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              value={query}
            />
            <button
              type="submit"
              className="bg-blue-500 rounded-md w-28 p-3 mx-3 text-center cursor-pointer inline-block"
            >
              Search
            </button>
          </form>
        </div>
        {/* Images section */}
        <div className="w-full bg-zinc-900 min-h-lvh py-6 px-10 flex flex-wrap gap-2 justify-center">
          {images.length && 1 ? (
            images.map((image) => (
              <div key={image.id} className="group image w-80 h-48 bg-zinc-800 rounded-lg overflow-hidden relative">
                
                <button onClick={() => {saveAs(image.urls.full, image.slug)}} className="scale-0 group-hover:scale-100 absolute bottom-0 right-0 m-3 cursor-pointer transition duration-300 bg-zinc-900 p-2 rounded-lg z-10"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg></button>
                <Link to={`/image/${image.id}`}>
                  <img
                  src={image.urls.small}
                  className="peer w-full h-full object-cover hover:brightness-75 transition duration-200 hover:scale-110 focus:scale-150"
                  ></img>
                </Link>
              </div>
            ))
          ) : (
            <h1 className="text-white">{imageStatus}</h1>
          )}
        </div>
        {images.length > 0 && (
          <div className="w-full flex gap-4 justify-center py-5 bg-zinc-900">
            {page > 1 && (
              <button
                className="bg-blue-500 px-5 py-3 rounded-3xl w-32"
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                Previous
              </button>
            )}
            {page < totalPages  && (
              <button
                className="bg-blue-500 px-5 py-3 rounded-3xl w-32"
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                Next
              </button>
            )}
          </div>
        )}
        {/* Footer */}
        <div className="bg-zinc-900 text-center py-4 relative bottom-0 w-full">
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
    </>
  );
}

export default App;