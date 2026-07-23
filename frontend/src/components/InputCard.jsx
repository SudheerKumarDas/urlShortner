
const InputCard = () => {
  return (
    <div>
        <section className="max-w-2xl mx-auto mt-32 mb-40 flex flex-col gap-2.5">
            <div className="flex justify-around items-center gap-2">
                <input 
                    type="text"
                    placeholder="Paste your long url here"
                    className="flex-1 bg-[#1b2233] text-white/80 placeholder-white/30 rounded-xl px-4 py-3.5 border border-white/5 focus:outline-none focus:ring-2 focus:ring-skyblue/50" 
                />
                <button
                    className="bg-blue-400 hover:bg-blue-600 transition text-white font-semibold rounded-xl px-8 py-3.5 whitespace-nowrap cursor-pointer"
                >Short Url</button>
            </div>
            <div className="flex justify-around items-center gap-2">
                <div
                    className="flex-1 bg-[#1b2233] text-white/80 placeholder-white/30 rounded-xl px-4 py-3.5 border border-white/5 focus:outline-none focus:ring-2 focus:ring-skyblue/50"    
                >Here is the short url generated </div>
                <button className="bg-blue-400 hover:bg-blue-600 transition text-white font-semibold rounded-xl px-8 py-3.5 whitespace-nowrap cursor-pointer">copy url</button>
            </div>
        </section>
    </div>
  )
}

export default InputCard