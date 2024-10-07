'use client'
Assi
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchResponse = async () => {
        setLoading(true);
        const res = await fetch('/api/message/response', {
            method: 'POST',
            body: JSON.stringify({ content: "I need to solve the equation `3x + 11 = 14`. Can you help me?" }),
            headers: { 'Content-Type': 'application/json' },
        });

        const reader = res.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let done = false;

        while (!done) {
            const { value, done: isDone } = await reader.read();
            done = isDone;
            if (value) {
                setResponse((prev) => prev + decoder.decode(value));
            }
        }

        setLoading(false);
    };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
            <button onClick={fetchResponse}>Get Answer</button>
            {loading ? <p>Loading...</p> : <p>{response}</p>}
        </div>
    </main>
  );
}
