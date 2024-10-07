//https://platform.openai.com/playground/assistants?assistant=asst_gl3Hd6zYMZ2d7k9hjy2rMIDH&thread=thread_oE0r9nXJZEOkjisd4RMxTkIp

export default function Home() {
    return (
        <div className="bg-teal-400">
            {/* Hero Section */}
            <div className="h-64 bg-gray-300 mb-8 flex items-center justify-center text-center">
                <div>
                    <h1 className="text-5xl font-bold mb-2">Transform Your Ideas with Ugly Functioning AI</h1>
                    <p className="text-xl">Unleashing AI capabilities in image, text, and voice generation.</p>
                    <a href="#features" className="mt-4 bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-700">
                        Get Started
                    </a>
                </div>
            </div>
            
            <header className="p-8">
                <div className="text-left max-w-4xl mx-auto">
                    <h1 className="text-5xl font-bold mb-4">Ugly Functioning AI For Free</h1>
                    <p className="text-xl">All AI functions from image, text, and voice generations, but with ugly interface. Even worse on mobile 😍 Forget paying for nothing</p>
                </div>
            </header>
            
            <main className="bg-gray-300 p-8">
                <div className="flex justify-around mb-8">
                    <div className="flex flex-col items-center">
                        <h2 className="text-2xl font-semibold mb-2">🛠️ Functioning</h2>
                        <div className="bg-blue-400 w-48 h-32 mb-2"></div>
                    </div>

                    <div className="flex flex-col items-center">
                        <h2 className="text-2xl font-semibold mb-2">🪶 Lightweight</h2>
                        <div className="bg-blue-400 w-48 h-32 mb-2"></div>
                    </div>

                    <div className="flex flex-col items-center">
                        <h2 className="text-2xl font-semibold mb-2">⚡️ Faster</h2>
                        <div className="bg-blue-400 w-48 h-32 mb-2"></div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="text-center mb-8" id="features">
                    <h2 className="text-3xl font-bold mb-4">Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {["Text to Image", "Extract Prompt", "Text to Voice", "Chatbot", "Prompt Helper", "Copy Voice"].map((feature) => (
                            <a key={feature} href="/" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mx-auto w-48 text-center">
                                {feature}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Testimonials Section */}
                <div className="p-8">
                    <h2 className="text-3xl font-bold text-center mb-4">🗣️ What Our Users Say</h2>
                    <div className="bg-gray-200 p-4 rounded-md">
                        <p className="italic">"Oh, fantastic! Finally found the most complete AI tools. Too bad they’re wrapped in a design that looks like it was made by a colorblind toddler. What a treat!"</p>
                        <p className="font-bold text-right">- Anonymous User</p>
                    </div>
                    <div className="bg-gray-200 p-4 rounded-md">
                        <p className="italic">"Ah, the text-to-image tool works like a charm—too bad I feel like I've stepped into a clown's nightmare just trying to use it!"</p>
                        <p className="font-bold text-right">- Anonymous User</p>
                    </div>
                    <div className="bg-gray-200 p-4 rounded-md">
                        <p className="italic">"This text-to-image tool makes magic happen! Just wish the visuals of the site didn’t make me want to cry.

"</p>
                        <p className="font-bold text-right">- Anonymous User</p>
                    </div>
                </div>

                {/* FAQs Section */}
<div className="p-8">
    <h2 className="text-3xl font-bold text-center mb-4">🙋🏻 Frequently Asked Questions</h2>
    <div className="bg-gray-200 p-4 rounded-md">
        <p className="font-semibold">Q: What makes your text-to-image tool special?</p>
        <p>A: Oh, you know, just the sheer ability to conjure images from text. Who would’ve thought? It’s not like the dozens of other tools are doing the same thing or anything!</p>
        <div className="mb-4" />

        <p className="font-semibold">Q: How accurate is your chatbot?</p>
        <p>A: Accurate enough to make you question if you’re talking to a human or a very chatty toaster. It knows a lot—especially about why its design is so hideous.</p>
        <div className="mb-4" />

        <p className="font-semibold">Q: Can I really create realistic voiceovers with your voice generator?</p>
        <p>A: Absolutely! As real as that time you thought a bad karaoke night was a good idea. Just focus on the audio and try to ignore the visual horror of the website!</p>
        <div className="mb-4" />

        <p className="font-semibold">Q: Is your AI service user-friendly?</p>
        <p>A: User-friendly? That’s a strong word! It’s more like navigating a labyrinth built by a bored toddler. Good luck finding your way!</p>
        <div className="mb-4" />

        <p className="font-semibold">Q: What file formats do you support?</p>
        <p>A: We support all the “essential” formats—if you consider the last decade of technology essential. Old school is the new cool, right?</p>
        <div className="mb-4" />

        <p className="font-semibold">Q: How do your tools handle complex prompts?</p>
        <p>A: They handle complexity like a toddler handles scissors—all over the place but somehow still manage to get the job done… eventually!</p>
        <div className="mb-4" />

        <p className="font-semibold">Q: Is there a customer support option?</p>
        <p>A: Of course! Just reach out, and prepare for a delightful trip through the worst interface to talk to someone who might help—or just laugh at your misfortune!</p>
        <div className="mb-4" />

        <p className="font-semibold">Q: Can I use your services for commercial purposes?</p>
        <p>A: Sure! Nothing says “professional project” like using cutting-edge AI tools on a website designed to make your eyes bleed.</p>
        <div className="mb-4" />

        <p className="font-semibold">Q: How do I improve my user experience on your site?</p>
        <p>A: Simple! Just squint your eyes, tilt your head, and pray for clarity. Who needs sleek design when you’ve got sheer determination?</p>
        <div className="mb-4" />

        <p className="font-semibold">Q: What if I encounter a bug?</p>
        <p>A: Oh, just consider it a tiny adventure! Bugs are just features in disguise… or maybe they’re just poorly coded nightmares. Either way, enjoy the ride!</p>
    </div>
</div>
            </main>
            
            {/* Footer Section */}
            <footer className="text-center p-4">
                <p>Links</p>
                <p>Donate | Terms & Conditions | Privacy Policy | Contact Us</p>
                <p>@2024 by xxxx</p>
            </footer>
        </div>
    );
}