'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

// This is custom interface for image

export default function Home() {
  const [inputPrompt, setInputPrompt] = useState('');
  const [audioFiles, setAudioFiles] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAudio, setCurrentAudio] = useState(null);
  const [currentlyPlayingUrl, setCurrentlyPlayingUrl] = useState(null); // Track currently playing audio URL

  const generateSpeech = async (e) => {
    e.preventDefault()
    console.log('Frontend -> var=inputPrompt: ', inputPrompt)
    try {
      const response = await axios.post("/api/texttospeech/create", {
        prompt: inputPrompt
      })
      // const responseData = response.data.urls
      // setImageUrls(responseData)
      // console.log('Frontend -> var=response: ', response)
      fetchAudioFiles()
    } catch (e) {
      console.log('Frontend -> error=Failed to create speech')
    }
  }
  
  const fetchAudioFiles = async () => {
    const response = await axios.get('/api/texttospeech/listofaudiofiles');
    const data = await response.data;
    setAudioFiles(data.files);
  };

  useEffect(() => {
    

    fetchAudioFiles();
  }, []);

  const handlePlay = (url) => {
    if (currentAudio && currentlyPlayingUrl === url) {
      // If the same audio is clicked, toggle pause/play
      if (isPlaying) {
          currentAudio.pause();
          setIsPlaying(false);
      } else {
          currentAudio.play();
          setIsPlaying(true);
      }
    } else {
        // Stop current audio and start new audio
        if (currentAudio) {
            currentAudio.pause(); // Pause existing audio if it's playing
        }
        
        const audio = new Audio(url);
        setCurrentAudio(audio);
        setCurrentlyPlayingUrl(url);
        audio.play();
        setIsPlaying(true);

        audio.onended = () => {
            setIsPlaying(false);
            setCurrentAudio(null);
            setCurrentlyPlayingUrl(null);
        };
        
    }
  };

  const handleStop = () => {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0; // Reset to start
        setCurrentAudio(null);
    }
  };

  const renderPlayPauseButton = (url) => {
    return (
        <button
            onClick={() => handlePlay(url)}
            className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 flex items-center"
        >
            <FontAwesomeIcon icon={isPlaying && currentlyPlayingUrl?.src === url ? faPause : faPlay} />
        </button>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div>
        <form onSubmit={generateSpeech} className="flex flex-col items-center">
            <input
                type="text"
                value={inputPrompt}
                onChange={(e) => { setInputPrompt(e.target.value)}}
                className="border rounded p-2 m-2s w-96 text-sm"
                placeholder="Enter your prompt"
            />
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 text-sm">
              Generate Voice        
            </button>
        </form>
        <ul>
          {audioFiles.map((file, index) => (
              <li key={index} className="flex items-center justify-between mb-2 p-2 bg-gray-100 rounded">
                  <span>{file.split('/').pop()}</span>
                  {renderPlayPauseButton(file)}
                  <button
                                onClick={handleStop}
                                className="bg-red-500 text-white py-1 px-3 ml-2 rounded hover:bg-red-600"
                            >
                                Stop
                            </button>
              </li>
          ))}
        </ul>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
