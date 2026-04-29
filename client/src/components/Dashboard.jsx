import { useEffect, useState } from 'react'
import axiosInstance from './axiosInstance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {
  const [ticker, setTicker] = useState('')
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [plot, setPlot] = useState()
  const [ma100, setMA100] = useState()
  const [ma200, setMA200] = useState()
  const [prediction, setPrediction] = useState()
  const [mse, setMSE] = useState()
  const [rmse, setRMSE] = useState()
  const [r2, setR2] = useState()

  useEffect(() => {
    axiosInstance.get('/protected-view/').catch(() => {})
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await axiosInstance.post('http://127.0.0.1:8000/api/v1/predict/', { ticker })
      const backendRoot = 'http://127.0.0.1:8000/'

      setPlot(`${backendRoot}${response.data.plot_img}`)
      setMA100(`${backendRoot}${response.data.plot_100_dma}`)
      setMA200(`${backendRoot}${response.data.plot_200_dma}`)
      setPrediction(`${backendRoot}${response.data.plot_prediction}`)

      setMSE(response.data.mse)
      setRMSE(response.data.rmse)
      setR2(response.data.r2)

      if (response.data.error) setError(response.data.error)

    } catch (err) {
      setError("Something went wrong. Try again.", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5">

      {/* 🔍 Search Box */}
      <div className="max-w-xl mx-auto bg-white/5 p-6 rounded-xl backdrop-blur border border-white/10 shadow">
        <form onSubmit={handleSubmit} className="flex gap-3">
          
          <input
            type="text"
            placeholder="Enter stock ticker (e.g. AAPL)"
            className="flex-1 px-4 py-2 rounded-lg bg-transparent border border-gray-600 text-white focus:outline-none focus:border-blue-500"
            onChange={(e) => setTicker(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg text-white font-medium"
          >
            {loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin /> Loading
              </>
            ) : (
              "Predict"
            )}
          </button>

        </form>

        {error && <p className="text-red-400 mt-3">{error}</p>}
      </div>

      {/* 📊 Results */}
      {prediction && (
<div className="mt-10 sm:ml-32 flex flex-col justify-center items-center space-y-8">          
          <div className="grid md:grid-cols-2 gap-6">
            
            {plot && (
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h5 className="text-gray-300 mb-2">Stock Price</h5>
                <img src={plot} className="w-full rounded" />
              </div>
            )}

            {ma100 && (
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h5 className="text-gray-300 mb-2">100-Day MA</h5>
                <img src={ma100} className="w-full rounded" />
              </div>
            )}

            {ma200 && (
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h5 className="text-gray-300 mb-2">200-Day MA</h5>
                <img src={ma200} className="w-full rounded" />
              </div>
            )}

            {prediction && (
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h5 className="text-gray-300 mb-2">Prediction</h5>
                <img src={prediction} className="w-full rounded" />
              </div>
            )}

          </div>

          {/* 📈 Metrics */}
          <div className="grid md:grid-cols-3 gap-4 text-center">
            
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-gray-400 text-sm">MSE</p>
              <h4 className="text-white text-xl font-semibold">{mse}</h4>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-gray-400 text-sm">RMSE</p>
              <h4 className="text-white text-xl font-semibold">{rmse}</h4>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-gray-400 text-sm">R² Score</p>
              <h4 className="text-white text-xl font-semibold">{r2}</h4>
            </div>

          </div>

        </div>
      )}

    </div>
  )
}

export default Dashboard;



// import { useEffect, useState } from "react";
// import axiosInstance from "./axiosInstance";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// const Dashboard = () => {
//   const [ticker, setTicker] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     axiosInstance.get("/protected-view/").catch(() => {});
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await axiosInstance.post("/predict/", { ticker });
//       const root = import.meta.env.VITE_BACKEND_ROOT;

//       setData({
//         plot: root + res.data.plot_img,
//         ma100: root + res.data.plot_100_dma,
//         ma200: root + res.data.plot_200_dma,
//         prediction: root + res.data.plot_prediction,
//         mse: res.data.mse,
//         rmse: res.data.rmse,
//         r2: res.data.r2,
//       });
//     } catch {
//       alert("Error fetching prediction");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#0b1120] text-white">

//       {/* 🔥 Sidebar */}
//       <aside className="w-64 bg-[#111827] p-5 border-r border-gray-800">
//         <h2 className="text-xl font-bold mb-6">📊 Predictor</h2>

//         <nav className="space-y-3">
//           <p className="text-gray-400">Dashboard</p>
//           <p className="text-gray-500">Analytics</p>
//           <p className="text-gray-500">Settings</p>
//         </nav>
//       </aside>

//       {/* 🔥 Main */}
//       <div className="flex-1 p-6">

//         {/* Topbar */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-semibold">Dashboard</h1>

//           <form onSubmit={handleSubmit} className="flex gap-2">
//             <input
//               placeholder="AAPL"
//               className="px-3 py-2 bg-gray-800 rounded-md outline-none"
//               onChange={(e) => setTicker(e.target.value)}
//               required
//             />
//             <button className="bg-blue-500 px-4 py-2 rounded-md">
//               {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Run"}
//             </button>
//           </form>
//         </div>

//         {/* Stats */}
//         {data && (
//           <>
//             <div className="grid grid-cols-3 gap-4 mb-6">
//               <Stat title="MSE" value={data.mse} />
//               <Stat title="RMSE" value={data.rmse} />
//               <Stat title="R² Score" value={data.r2} />
//             </div>

//             {/* Charts */}
//             <div className="grid grid-cols-2 gap-6">
//               <Chart title="Stock Price" src={data.plot} />
//               <Chart title="100 MA" src={data.ma100} />
//               <Chart title="200 MA" src={data.ma200} />
//               <Chart title="Prediction" src={data.prediction} />
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// const Stat = ({ title, value }) => (
//   <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
//     <p className="text-gray-400 text-sm">{title}</p>
//     <h2 className="text-xl font-bold mt-1">{value}</h2>
//   </div>
// );

// const Chart = ({ title, src }) => (
//   <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
//     <p className="text-gray-400 mb-2">{title}</p>
//     <img src={src} className="w-full rounded" />
//   </div>
// );

// export default Dashboard;