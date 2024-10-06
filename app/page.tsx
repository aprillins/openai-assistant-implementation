'use client'
// https://platform.openai.com/playground/assistants?assistant=asst_gl3Hd6zYMZ2d7k9hjy2rMIDH&thread=thread_OR8XiXN13gQtoTXOGNSw8zvf
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  return (
    <div className="flex h-screen">
            {/* Sidebar */}
            <div className="bg-teal-300 min-w-[240px] max-w-[300px] p-5">
                <h2 className="text-lg font-bold mb-4">Settings</h2>
                {/* Model Selection */}
    <select className="w-full mb-2 bg-white p-2 rounded shadow min-w-[150px] max-w-[100%]">
        <option value="dall-e-2">dall-e-2</option>
        <option value="dall-e-3">dall-e-3</option>
    </select>

    {/* Number of Images */}
    <select className="w-full mb-2 bg-white p-2 rounded shadow min-w-[150px] max-w-[100%]">
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
    </select>

    {/* Quality Selection */}
    <select className="w-full mb-2 bg-white p-2 rounded shadow min-w-[150px] max-w-[100%]">
        <option value="standard">Standard</option>
        <option value="hd">HD</option>
    </select>

    {/* Response Format */}
    <select className="w-full mb-2 bg-white p-2 rounded shadow min-w-[150px] max-w-[100%]">
        <option value="url">URL</option>
        <option value="b64_json">Base64 JSON</option>
    </select>

    {/* Size Selection */}
    <select className="w-full mb-2 bg-white p-2 rounded shadow min-w-[150px] max-w-[100%]">
        <option value="1024x1024">1024x1024</option>
        <option value="512x512">512x512</option>
        <option value="256x256">256x256</option>
        <option value="1792x1024">1792x1024</option>
        <option value="1024x1792">1024x1792</option>
    </select>

    {/* Style Selection for DALL-E 3 */}
    <select className="w-full mb-2 bg-white p-2 rounded shadow min-w-[150px] max-w-[100%]">
        <option value="vivid">Vivid</option>
        <option value="natural">Natural</option>
    </select>
            </div>

            {/* Main content */}
            <div className="bg-gray-200 w-3/4 p-5 flex flex-col">
                {/* Submission Section */}
                <div className="mb-4 flex items-center justify-center bg-gray-200 p-2">
                    <input
                        type="text"
                        placeholder="Text field"
                        className="border rounded-md p-2 min-w-[600px] mx-2"
                    />
                    <button className="bg-blue-500 text-white rounded-md px-4 py-2">
                        Submit
                    </button>
                </div>

                {/* Scrollable Result Section */}
                <div className="flex-grow overflow-auto">
                    <h2 className="font-bold mb-2">Result</h2>
                    <div className="grid grid-cols-4 gap-4">
                        {/* Filling with random base64 images */}
                        {Array.from({ length: 20 }).map((_, index) => (
                            <div key={index} className="bg-blue-400 h-48 rounded-md overflow-hidden">
                                <img 
                                    src={`data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAIEAAABCAIAAACoVxQRAAAAAXNSR0IArs4c6QAAETlEQVRIS2NsYGBgAAABAAE4BqYAAAnzMDAE+Ug2gAAMWSwBoAAAAAABvAwEAAHizMDAEAAAABCIY6lAjwAAAAAElFTkSuQmCC`}
                                    alt={`Box ${index + 1}`} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>  );
}
