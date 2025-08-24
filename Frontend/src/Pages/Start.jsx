import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function TripzzyLanding() {
  const [showContent, setShowContent] = useState(false);
  const [carLeft, setCarLeft] = useState(-50);
  const [carStage, setCarStage] = useState(0);
  const [carOpacity, setCarOpacity] = useState(0);
  const [lettersVisible, setLettersVisible] = useState([]);

  const carRef = useRef(null);
  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;

  useEffect(() => {
    const showLetters = () => {
      [..."Tripzzy"].forEach((_, i) => {
        setTimeout(() => {
          setLettersVisible((prev) => [...prev, i]);
        }, 200 * i);
      });
    };

    const animateCar = () => {
      setTimeout(() => {
        setCarOpacity(1);
        setCarLeft(0);
        setCarStage(1);
        setTimeout(() => {
          setCarLeft(180);
          setCarStage(2);
          setTimeout(() => {
            setCarLeft(windowWidth);
            setTimeout(() => {
              setShowContent(true);
            }, 1500);
          }, 400);
        }, 300);
      }, 200 * 7 + 300);
    };

    showLetters();
    animateCar();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-cover bg-center filter blur-md brightness-50" style={{ backgroundImage: `url('/api/placeholder/1920/1080')` }} />

      {/* Loading Overlay */}
      {!showContent && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black">
          <div className="text-6xl font-bold text-yellow-400 flex gap-1">
            {[..."Tripzzy"].map((char, i) => (
              <span
                key={i}
                className={`transition-all duration-300 transform ${lettersVisible.includes(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              >
                {char}
              </span>
            ))}
          </div>
          <div
            ref={carRef}
            className="absolute top-[100px] w-[50px] h-[20px] bg-yellow-400 rounded-md z-50"
            style={{
              left: `${carLeft}px`,
              opacity: carOpacity,
              transition: carStage === 2 ? "all 1.5s ease-in" : "all 0.3s ease",
              transform: carStage === 1 ? "translateY(-20px)" : carStage === 2 ? "translateY(-5px)" : "translateY(0px)"
            }}
          >
            <div className="absolute top-[-10px] left-[10px] w-[30px] h-[15px] bg-yellow-400 rounded-t-md" />
            <div className="absolute bottom-[-5px] left-[5px] w-[10px] h-[10px] bg-gray-800 rounded-full shadow-[25px_0_0_#333]" />
          </div>
        </div>
      )}

      {/* Main Content */}
      {showContent && (
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 bg-black/50">
          {/* Small Logo */}
          <div className="absolute top-4 left-4 text-xl font-bold text-yellow-400 bg-black/60 px-4 py-2 rounded-full shadow-lg">
            Tripzzy
          </div>

          <div className="text-6xl font-bold text-white drop-shadow mb-10">Tripzzy</div>
          <div className="text-xl mb-6 transition-all duration-500 opacity-100 translate-y-0">
            Make your trip easy
          </div>
          <Link to="/login" className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-full uppercase tracking-wide hover:bg-yellow-300 transition-all duration-300 transform hover:translate-y-1">
            Book Now
          </Link>
          <Link to="/captain-login" className="mt-4 px-6 py-3 border-2 border-yellow-400 text-yellow-400 font-bold rounded-full uppercase tracking-wide hover:bg-yellow-400 hover:text-black transition-all duration-300">
            Captain Login
          </Link>

          <div className="flex gap-6 mt-12 opacity-100 transition-all duration-500">
            <div className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/20 w-48">
              <h3 className="font-semibold text-lg mb-2">Fast Booking</h3>
              <p className="text-sm">Book your ride in seconds</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/20 w-48">
              <h3 className="font-semibold text-lg mb-2">Premium Cars</h3>
              <p className="text-sm">Luxury fleet at your service</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/20 w-48">
              <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
              <p className="text-sm">Always ready to assist you</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
