'use client'
// https://platform.openai.com/playground/assistants?assistant=asst_gl3Hd6zYMZ2d7k9hjy2rMIDH&thread=thread_OR8XiXN13gQtoTXOGNSw8zvf
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Home() {
  const [model, setModel] = useState('dall-e-2');
  const [numberOfImages, setNumberOfImages] = useState(1);
  const [quality, setQuality] = useState('standard');
  const [responseFormat, setResponseFormat] = useState('url');
  const [size, setSize] = useState('1024x1024');
  const [style, setStyle] = useState('vivid');
  const [userId, setUserId] = useState('');
  const [prompt, setPrompt] = useState('');
  const [imageUrls, setImageUrls] = useState([]); // State for storing image URLs
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadingImages, setLoadingImages] = useState([]); // Array to track loading states of new images

  // Fetch images from the public directory when the component mounts
  useEffect(() => {
      const fetchImages = async () => {
          try {
              const q = {sortBy: "created", order:"desc"}
              const response = await axios.get('/api/image/v2-getImageUrls', {params: q});
              setImageUrls(response.data.urls); // Set URLs from public directory
          } catch (error) {
              console.error('Error fetching images:', error);
          }
      };

      fetchImages();
  }, []); // Empty dependency array means this runs once when the component mounts

  const handleModelChange = (e) => {
    const selectedModel = e.target.value;
    setModel(selectedModel);

    // Set the number of images to 1 if the model is dall-e-3
    if (selectedModel === 'dall-e-3') {
        setNumberOfImages(1);
        setSize('1024x1024'); // Set size to default value for DALL-E 3
    } else {
        setSize('256x256'); // Set size to a default value for DALL-E 2
    }
  };

    const handleSubmit = async () => {
      const requestData = {
          prompt,
          model,
          n: model === 'dall-e-3' ? 1 : numberOfImages,
          quality: model === 'dall-e-3' ? quality : undefined,
          response_format: responseFormat,
          size: size,
          style: model === 'dall-e-3' ? style : undefined,
          user: userId,
      };
  
      setLoading(true); // Set loading state to true
      setImageUrls(prevUrls => [...prevUrls]); // Keep existing images
  
      const loadingCount = model === 'dall-e-3' ? 1 : numberOfImages; // Determine how many loading indicators to show
      setLoadingImages(Array(loadingCount).fill(true)); // Set loading indicators based on the number of images
  
      try {
          const response = await axios.post('/api/image/v2-create', requestData);
          setImageUrls(prevUrls => [...prevUrls, ...response.data.urls]); // Append new URLs
      } catch (error) {
          console.error('Error making API request:', error);
      } finally {
          setLoading(false); // Set loading state to false after request
          setLoadingImages([]); // Clear loading indicators
      }
  };
    const handleImageClick = (url) => {
        setSelectedImage(url); // Set the selected image for the popup
    };

    const handleClosePopup = () => {
        setSelectedImage(null); // Close the popup
    };

    const handleDownload = (url) => {
      window.open(url, '_blank'); // Open the image URL in a new tab
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="bg-teal-300 min-w-[240px] max-w-[300px] p-5">
                <h2 className="text-lg font-bold mb-4">Settings</h2>
                
                {/* Model Selection */}
                <select 
                    className="w-full mb-2 bg-white p-2 rounded shadow min-w-[150px] max-w-[100%]"
                    value={model}
                    onChange={handleModelChange}
                >
                    <option value="dall-e-2">dall-e-2</option>
                    <option value="dall-e-3">dall-e-3</option>
                </select>

                {/* Number of Images */}
                <select 
                    className="w-full mb-2 bg-white p-2 rounded shadow min-w-[150px] max-w-[100%]"
                    value={numberOfImages}
                    onChange={(e) => setNumberOfImages(Number(e.target.value))}
                    disabled={model === 'dall-e-3'} // Disable for dall-e-3
                >
                    {model === 'dall-e-2' && (
                        <>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </>
                    )}
                    {model === 'dall-e-3' && (
                        <option value="1">1</option>
                    )}
                </select>

                {/* Quality Selection (only for DALL-E 3) */}
                {model === 'dall-e-3' && (
                    <select 
                        className="w-full mb-2 bg-white p-2 rounded shadow min-w-[150px] max-w-[100%]"
                        value={quality}
                        onChange={(e) => setQuality(e.target.value)}
                    >
                        <option value="standard">Standard</option>
                        <option value="hd">HD</option>
                    </select>
                )}

                {/* Response Format */}
                <select 
                    className="w-full mb-2 bg-white p-2 rounded shadow min-w-[150px] max-w-[100%]"
                    value={responseFormat}
                    onChange={(e) => setResponseFormat(e.target.value)}
                >
                    <option value="url">URL</option>
                    <option value="b64_json">Base64 JSON</option>
                </select>

                {/* Size Selection */}
                <select 
                    className="w-full mb-2 bg-white p-2 rounded shadow min-w-[150px] max-w-[100%]"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                >
                    {model === 'dall-e-2' && (
                        <>
                            <option value="256x256">256x256</option>
                            <option value="512x512">512x512</option>
                            <option value="1024x1024">1024x1024</option>
                        </>
                    )}
                    {model === 'dall-e-3' && (
                        <>
                            <option value="1024x1024">1024x1024</option>
                            <option value="1792x1024">1792x1024</option>
                            <option value="1024x1792">1024x1792</option>
                        </>
                    )}
                </select>

                {/* Style Selection for DALL-E 3 */}
                {model === 'dall-e-3' && (
                    <select 
                        className="w-full mb-2 bg-white p-2 rounded shadow min-w-[150px] max-w-[100%]"
                        value={style}
                        onChange={(e) => setStyle(e.target.value)}
                    >
                        <option value="vivid">Vivid</option>
                        <option value="natural">Natural</option>
                    </select>
                )}
                
                {/* User ID Input */}
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="User ID (optional)"
                    className="w-full mb-2 bg-white p-2 rounded shadow min-w-[150px] max-w-[100%]"
                />
            </div>

            {/* Main content */}
            <div className="bg-gray-200 w-3/4 p-5 flex flex-col">
                {/* Submission Section */}
            <div className="flex items-center justify-center p-5 bg-white">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Text field"
                    className="border rounded-md p-2 w-full mx-2" // Set to full width
                />
                <button 
                    className="bg-blue-500 text-white rounded-md px-4 py-2"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Submit'}
                </button>
            </div>

            {/* Scrollable Result Section */}
            <div className="flex-grow overflow-auto p-5">
                <h2 className="font-bold mb-2">Result</h2>
                <div className="grid grid-cols-4 gap-4">
                    {imageUrls.map((url, index) => (
                        <div 
                            key={index} 
                            className="bg-blue-400 h-48 rounded-md overflow-hidden cursor-pointer"
                            onClick={() => handleImageClick(url)}
                        >
                            <img 
                                src={url} 
                                alt={`Generated Image ${index + 1}`} 
                                className="w-full h-full object-cover" 
                            />
                        </div>
                    ))}
                    {loadingImages.map((_, index) => (
                        <div key={`loading-${index}`} className="bg-gray-300 h-48 w-full rounded-md flex items-center justify-center">
                            <div className="spinner"></div>
                        </div>
                    ))}
                </div>
            </div>

                {/* Image Popup Modal */}
                {selectedImage && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 flex items-center justify-center">
                        <div className="relative bg-white p-5 rounded">
                            <button 
                                className="absolute top-2 right-2 text-gray-500"
                                onClick={handleClosePopup}
                            >
                                ✖️
                            </button>
                            <img 
                                src={selectedImage} 
                                alt="Selected" 
                                className="max-w-full max-h-[80vh]" 
                            />
                            <div className="flex justify-center mt-4">
                                <button 
                                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                                    onClick={() => handleDownload(selectedImage)} // Download button
                                >
                                    Download
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}