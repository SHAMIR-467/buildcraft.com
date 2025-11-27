import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Layout,
  Maximize,
  Home,
  Settings,
  Download,
  Loader2,
  AlertCircle,
  Wand2,
} from "lucide-react";

const FloorPlanGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const canvasRef = useRef(null);

  const [formData, setFormData] = useState({
    width: "40",
    length: "60",
    bedrooms: "3",
    bathrooms: "2",
    floors: "1",
    style: "Modern",
    details: "",
  });

  const styles = [
    "Modern",
    "Traditional",
    "Minimalist",
    "Industrial",
    "Farmhouse",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const drawRoom = (ctx, x, y, width, height, label, isStyled) => {
    // Draw room rectangle
    ctx.fillStyle = isStyled ? "#f9fafb" : "#ffffff";
    ctx.fillRect(x, y, width, height);
    ctx.strokeStyle = "#374151";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);

    // Draw label
    ctx.fillStyle = "#1f2937";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, x + width / 2, y + height / 2);

    // Draw dimensions
    ctx.font = "10px Arial";
    ctx.fillStyle = "#6b7280";
    ctx.fillText(
      `${Math.round(width / 10)}' × ${Math.round(height / 10)}'`,
      x + width / 2,
      y + height / 2 + 15
    );
  };

  const drawDoor = (ctx, x, y, isVertical) => {
    ctx.strokeStyle = "#f97316";
    ctx.lineWidth = 3;
    ctx.beginPath();
    if (isVertical) {
      ctx.arc(x, y, 15, 0, Math.PI / 2);
    } else {
      ctx.arc(x, y, 15, -Math.PI / 2, 0);
    }
    ctx.stroke();
  };

  const drawWindow = (ctx, x, y, length, isVertical) => {
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 4;
    ctx.beginPath();
    if (isVertical) {
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + length);
    } else {
      ctx.moveTo(x, y);
      ctx.lineTo(x + length, y);
    }
    ctx.stroke();
  };

  const generateFloorPlan = () => {
    setLoading(true);
    setError("");

    // Simulate loading delay
    setTimeout(() => {
      try {
        const canvas = canvasRef.current;
        if (!canvas) {
          throw new Error("Canvas not available");
        }

        const ctx = canvas.getContext("2d");
        const canvasWidth = 800;
        const canvasHeight = 600;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // Clear canvas with white background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Calculate scale (10 pixels per foot)
        const scale = 10;
        const houseWidth = parseInt(formData.width) * scale;
        const houseLength = parseInt(formData.length) * scale;

        // Center the floor plan
        const offsetX = (canvasWidth - houseWidth) / 2;
        const offsetY = (canvasHeight - houseLength) / 2;

        // Draw outer walls
        ctx.strokeStyle = "#1f2937";
        ctx.lineWidth = 4;
        ctx.strokeRect(offsetX, offsetY, houseWidth, houseLength);

        const bedrooms = parseInt(formData.bedrooms);
        const bathrooms = parseInt(formData.bathrooms);
        const isModern =
          formData.style === "Modern" || formData.style === "Minimalist";

        // Layout calculations
        const roomPadding = 20;

        // Living area (open concept for modern styles)
        const livingWidth = isModern ? houseWidth * 0.6 : houseWidth * 0.5;
        const livingHeight = houseLength * 0.5;
        drawRoom(
          ctx,
          offsetX + roomPadding,
          offsetY + roomPadding,
          livingWidth - roomPadding * 2,
          livingHeight - roomPadding * 2,
          isModern ? "Living & Dining" : "Living Room",
          isModern
        );

        // Kitchen
        const kitchenWidth = houseWidth - livingWidth;
        const kitchenHeight = livingHeight * 0.6;
        drawRoom(
          ctx,
          offsetX + livingWidth + roomPadding,
          offsetY + roomPadding,
          kitchenWidth - roomPadding * 2,
          kitchenHeight - roomPadding * 2,
          "Kitchen",
          true
        );

        // Bathroom 1
        const bathWidth = kitchenWidth;
        const bathHeight = livingHeight - kitchenHeight;
        drawRoom(
          ctx,
          offsetX + livingWidth + roomPadding,
          offsetY + kitchenHeight + roomPadding,
          bathWidth - roomPadding * 2,
          bathHeight - roomPadding * 2,
          "Bathroom",
          true
        );

        // Bedrooms
        const bedroomAreaHeight = houseLength - livingHeight;
        const bedroomWidth = houseWidth / Math.max(bedrooms, 2);

        for (let i = 0; i < bedrooms; i++) {
          drawRoom(
            ctx,
            offsetX + i * bedroomWidth + roomPadding,
            offsetY + livingHeight + roomPadding,
            bedroomWidth - roomPadding * 2,
            bedroomAreaHeight - roomPadding * 2,
            `Bedroom ${i + 1}`,
            i % 2 === 0
          );
        }

        // Additional bathroom if needed
        if (bathrooms > 1) {
          const bath2Width = bedroomWidth;
          const bath2Height = bedroomAreaHeight * 0.4;
          drawRoom(
            ctx,
            offsetX + roomPadding,
            offsetY + livingHeight + bedroomAreaHeight - bath2Height,
            bath2Width - roomPadding * 2,
            bath2Height - roomPadding,
            "Bath 2",
            true
          );
        }

        // Draw doors
        drawDoor(ctx, offsetX + livingWidth / 2, offsetY, false);
        drawDoor(ctx, offsetX + livingWidth, offsetY + livingHeight / 2, true);
        drawDoor(
          ctx,
          offsetX + livingWidth + kitchenWidth / 2,
          offsetY + kitchenHeight,
          false
        );

        for (let i = 0; i < bedrooms; i++) {
          drawDoor(
            ctx,
            offsetX + i * bedroomWidth + bedroomWidth / 2,
            offsetY + livingHeight,
            false
          );
        }

        // Draw windows
        const windowLength = 40;
        drawWindow(ctx, offsetX + 50, offsetY, windowLength, false);
        drawWindow(
          ctx,
          offsetX + houseWidth - 50,
          offsetY,
          windowLength,
          false
        );
        drawWindow(ctx, offsetX, offsetY + 50, windowLength, true);
        drawWindow(ctx, offsetX + houseWidth, offsetY + 50, windowLength, true);

        // Add title and details
        ctx.fillStyle = "#1f2937";
        ctx.font = "bold 20px Arial";
        ctx.textAlign = "left";
        ctx.fillText(`${formData.style} Floor Plan`, 20, 30);
        ctx.font = "14px Arial";
        ctx.fillStyle = "#6b7280";
        ctx.fillText(
          `${formData.width}' × ${formData.length}' | ${bedrooms} Bed | ${bathrooms} Bath | ${formData.floors} Floor`,
          20,
          55
        );

        // Add legend
        const legendY = canvasHeight - 80;
        ctx.font = "12px Arial";
        ctx.fillStyle = "#1f2937";
        ctx.fillText("Legend:", 20, legendY);

        // Door legend
        ctx.strokeStyle = "#f97316";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(30, legendY + 20, 10, -Math.PI / 2, 0);
        ctx.stroke();
        ctx.fillStyle = "#6b7280";
        ctx.fillText("Door", 50, legendY + 25);

        // Window legend
        ctx.strokeStyle = "#3b82f6";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(100, legendY + 20);
        ctx.lineTo(130, legendY + 20);
        ctx.stroke();
        ctx.fillText("Window", 140, legendY + 25);

        // Convert canvas to image
        const imageUrl = canvas.toDataURL("image/png");
        setGeneratedImage(imageUrl);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }, 1000);
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    generateFloorPlan();
  };

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-orange-600 font-bold tracking-wider uppercase text-sm"
          >
            AI Powered
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mt-2"
          >
            AI Floor Plan Generator
          </motion.h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Transform your ideas into visual blueprints instantly. Enter your
            requirements below and let our AI architect design your dream
            layout.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 lg:col-span-1 h-fit"
          >
            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Width (ft)
                  </label>
                  <div className="relative">
                    <Maximize className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="number"
                      name="width"
                      value={formData.width}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Length (ft)
                  </label>
                  <div className="relative">
                    <Maximize className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 transform rotate-90" />
                    <input
                      type="number"
                      name="length"
                      value={formData.length}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Beds
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Baths
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Floors
                  </label>
                  <input
                    type="number"
                    name="floors"
                    value={formData.floors}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Architectural Style
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {styles.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, style: s }))
                      }
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        formData.style === s
                          ? "bg-orange-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Details
                </label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  placeholder="e.g., Large kitchen island, open concept, garage..."
                  className="w-full px-4 py-2 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500 h-24 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-gray-800 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" /> Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2" /> Generate Floor Plan
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Result Display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden min-h-[600px] flex flex-col">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center space-x-2">
                  <Layout className="text-orange-600" />
                  <h3 className="font-bold text-gray-800">
                    Generated Blueprint
                  </h3>
                </div>
                {generatedImage && (
                  <a
                    href={generatedImage}
                    download={`floorplan-${formData.style}.png`}
                    className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </a>
                )}
              </div>

              <div className="flex-1 flex items-center justify-center p-8 bg-gray-50/30 relative">
                {error && (
                  <div className="text-center max-w-md">
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center justify-center mb-4">
                      <AlertCircle className="w-6 h-6 mr-2" />
                      <span className="font-medium">Generation Failed</span>
                    </div>
                    <p className="text-gray-600">{error}</p>
                  </div>
                )}

                {!generatedImage && !loading && !error && (
                  <div className="text-center text-gray-400">
                    <Layout className="w-24 h-24 mx-auto mb-4 opacity-20" />
                    <p className="text-lg">
                      Enter details and click generate to see your floor plan
                      here
                    </p>
                  </div>
                )}

                {loading && (
                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-8">
                      <div className="absolute inset-0 border-4 border-orange-200 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 border-4 border-orange-600 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">
                      Designing your space...
                    </h4>
                    <p className="text-gray-500">
                      AI is analyzing dimensions and generating layout
                    </p>
                  </div>
                )}

                {generatedImage && (
                  <motion.img
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    src={generatedImage}
                    alt="Generated Floor Plan"
                    className="max-w-full max-h-[600px] object-contain rounded-lg shadow-lg"
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hidden canvas for generating floor plans */}
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </section>
  );
};

export default FloorPlanGenerator;
