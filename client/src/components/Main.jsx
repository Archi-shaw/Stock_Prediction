import Button from './Button'

const Main = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-slate-800 to-slate-950 px-6">
      
      <div className="max-w-3xl text-center backdrop-blur-lg bg-lime-950 p-10 rounded-2xl shadow-2xl border border-white/20">
        
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
        📊 Predict Stock Trends with AI 
        </h1>

        <p className="text-gray-300 text-lg leading-relaxed mb-8">
           Advanced LSTM-based forecasting using real market data.
           Analyze trends and make smarter investment decisions.
        </p>

        <Button 
          text="Explore Dashboard" 
          class="bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded-lg transition duration-300 shadow-lg"
          url="/dashboard" 
        />

      </div>
      
    </div>
  )
}

export default Main
