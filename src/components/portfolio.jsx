import React, { useEffect, useState, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  VillaModel,
  ModernHouseModel,
  MinecraftModernHouseModel,
  HouseModel,
  Building3DModel,
} from "./models";

// Portfolio models data with metadata
// Build model URLs (use Vite import.meta.url to resolve from src/assets)
const portfolioModels = [
  {
    id: 1,
    name: "Modern Villa",
    description: "Luxury modern villa with contemporary design",
    modelUrl: new URL("../assets/villa.glb", import.meta.url).href,
    component: VillaModel,
    category: "Residential",
  },
  {
    id: 2,
    name: "Modern House",
    description: "Elegant modern house design with clean lines",
    modelUrl: new URL("../assets/modern_house.glb", import.meta.url).href,
    component: ModernHouseModel,
    category: "Residential",
  },
  {
    id: 3,
    name: "Minecraft Modern House",
    description: "Creative blocky modern house inspired design",
    modelUrl: new URL("../assets/minecraft_modern_house.glb", import.meta.url)
      .href,
    component: MinecraftModernHouseModel,
    category: "Creative",
  },
  {
    id: 4,
    name: "Classic House",
    description: "Traditional house with modern touches",
    modelUrl: new URL("../assets/house.glb", import.meta.url).href,
    component: HouseModel,
    category: "Residential",
  },
  {
    id: 5,
    name: "3D Building",
    description: "Multi-story modern commercial building",
    modelUrl: new URL("../assets/3d_building.glb", import.meta.url).href,
    component: Building3DModel,
    category: "Commercial",
  },
];

function Portfolio() {
  const [_isARSupported, _setIsARSupported] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const checkARSupport = async () => {
      if (typeof navigator !== "undefined" && "xr" in navigator) {
        try {
          const supported = await navigator.xr.isSessionSupported(
            "immersive-ar"
          );
          _setIsARSupported(supported);
        } catch (err) {
          console.error("Error checking AR support:", err);
          _setIsARSupported(false);
        }
      } else if (typeof window !== "undefined" && window.WebXRPolyfill) {
        _setIsARSupported(true); // Polyfill available
      } else {
        _setIsARSupported(false);
      }
    };

    checkARSupport();
  }, []);

  const modelRef = useRef(null);

  // helper: wait until model-viewer custom element is registered
  function waitForModelViewer(timeout = 3000) {
    return new Promise((resolve) => {
      if (customElements && customElements.get("model-viewer"))
        return resolve(true);
      const start = Date.now();
      const iv = setInterval(() => {
        if (customElements && customElements.get("model-viewer")) {
          clearInterval(iv);
          resolve(true);
        } else if (Date.now() - start > timeout) {
          clearInterval(iv);
          resolve(false);
        }
      }, 100);
    });
  }

  // Try to programmatically start AR; different model-viewer versions expose different APIs
  async function tryStartAR(el) {
    if (!el) return false;
    // wait for element to be ready
    await new Promise((r) => setTimeout(r, 200));
    const methods = ["enterAR", "activateAR", "showAR", "requestAR"];
    for (const m of methods) {
      try {
        // Some methods return a promise
        if (typeof el[m] === "function") {
          const res = el[m]();
          if (res && typeof res.then === "function") await res;
          return true;
        }
      } catch {
        // ignore and try next
      }
    }

    // Fallback: try to find the generated AR button and click it
    try {
      const btn =
        el.shadowRoot && el.shadowRoot.querySelector("button[slot=ar-button]");
      if (btn) {
        btn.click();
        return true;
      }
    } catch {
      // ignore
    }
    return false;
  }

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-white via-orange-50 to-sky-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            3D Model Portfolio
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Explore our collection in 3D. Tap "View in AR" on supported devices
            to see models in your real environment.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioModels.map((item) => (
            <div
              key={item.id}
              onClick={async () => {
                // open overlay and attempt AR
                setSelected(item);
                const ready = await waitForModelViewer(3000);
                if (!ready) return;
                // small delay to allow element to mount
                setTimeout(async () => {
                  const el = document.getElementById("ar-overlay-model");
                  if (el) await tryStartAR(el);
                }, 300);
              }}
              className="cursor-pointer bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Canvas Preview with R3F model */}
              <div className="relative w-full h-80 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="w-full h-full">
                  <Canvas
                    shadows
                    dpr={[1, 1.5]}
                    camera={{ position: [0, 1, 3], fov: 45 }}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <ambientLight intensity={0.6} />
                    <directionalLight
                      position={[5, 10, 7]}
                      intensity={0.8}
                      castShadow
                    />
                    <Suspense fallback={null}>
                      {item.component
                        ? React.createElement(item.component, {
                            scale: [0.9, 0.9, 0.9],
                          })
                        : null}
                    </Suspense>
                  </Canvas>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow">
                  <span className="text-xs font-semibold text-orange-600">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Card Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>

                <div className="mt-4">
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      setSelected(item);
                      const ready = await waitForModelViewer(3000);
                      if (!ready) return;
                      setTimeout(async () => {
                        const el = document.getElementById("ar-overlay-model");
                        if (el) await tryStartAR(el);
                      }, 300);
                    }}
                    className="w-full px-4 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition text-sm font-medium"
                  >
                    View in AR
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fullscreen AR overlay (opened when a card is clicked) */}
        {selected && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6">
            <div
              className="relative w-full max-w-3xl h-[80vh] rounded-xl overflow-hidden shadow-2xl"
              style={{
                // light navy tint at 10% opacity to improve contrast against model
                background: "rgba(15,23,42,0.1)",
                // If you prefer light gray instead, use: background: 'rgba(243,244,246,0.1)'
              }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 left-4 z-40 bg-white/90 rounded-full p-2 shadow"
                aria-label="Close AR"
              >
                ✕
              </button>

              <model-viewer
                id="ar-overlay-model"
                ref={modelRef}
                src={selected.modelUrl}
                alt={selected.name}
                ar
                ar-modes="webxr scene-viewer quick-look"
                camera-controls
                touch-action="pan-y"
                auto-rotate
                exposure="1"
                style={{
                  width: "100%",
                  height: "100%",
                  background: "transparent",
                }}
              >
                <button
                  slot="ar-button"
                  className="absolute bottom-6 right-6 px-4 py-2 bg-orange-600 text-white rounded-full shadow-lg"
                >
                  View in AR
                </button>
              </model-viewer>
            </div>
          </div>
        )}

        {/* AR Info Footer */}
        <div className="mt-16 p-6 bg-white/60 rounded-xl backdrop-blur-sm border border-orange-100">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              📱 AR Experience
            </h3>
            <p className="text-gray-700 text-sm">
              <strong>Android:</strong> Chrome with ARCore support |{" "}
              <strong>iOS:</strong> Safari 13+ with AR Quick Look |{" "}
              <strong>Desktop:</strong> Rotate and zoom with mouse
            </p>
            <p className="text-gray-600 text-xs mt-2">
              Tap "View in AR" on your mobile device to place models in your
              real environment. Move around to explore from all angles!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
