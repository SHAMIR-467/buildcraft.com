import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Homeowner",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        content:
            "BuildCraft transformed our vision into reality. The attention to detail and dedication to quality was evident in every corner of our new home. Truly exceptional work!",
        rating: 5,
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "CEO, TechStart",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        content:
            "We needed a modern, sustainable office space delivered on a tight deadline. The team not only met the deadline but exceeded our expectations in design and functionality.",
        rating: 5,
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "Interior Designer",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        content:
            "As a designer, I'm picky about finishes. working with this construction team was a breeze. They understand craftsmanship and didn't cut any corners.",
        rating: 5,
    },
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="testimonials" className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-secondary font-bold tracking-wider uppercase text-sm"
                    >
                        Testimonials
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-primary mt-2"
                    >
                        What Our Clients Say
                    </motion.h2>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Background Decorative Elements */}
                    <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-gray-100">
                        <Quote size={120} className="transform rotate-180" />
                    </div>
                    <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 text-gray-100">
                        <Quote size={120} />
                    </div>

                    <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-50">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-gray-100 mb-6 shadow-lg">
                                    <img
                                        src={testimonials[currentIndex].image}
                                        alt={testimonials[currentIndex].name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex gap-1 mb-6 text-yellow-400">
                                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                        <Star key={i} fill="currentColor" size={20} />
                                    ))}
                                </div>

                                <p className="text-xl md:text-2xl text-gray-700 italic mb-8 leading-relaxed">
                                    "{testimonials[currentIndex].content}"
                                </p>

                                <div>
                                    <h4 className="text-lg font-bold text-gray-900">
                                        {testimonials[currentIndex].name}
                                    </h4>
                                    <p className="text-secondary font-medium">
                                        {testimonials[currentIndex].role}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Controls */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 -ml-4 md:-ml-12">
                            <button
                                onClick={prev}
                                className="p-3 rounded-full bg-white shadow-lg text-gray-600 hover:text-primary hover:scale-110 transition-all"
                            >
                                <ChevronLeft size={24} />
                            </button>
                        </div>
                        <div className="absolute top-1/2 -translate-y-1/2 right-0 -mr-4 md:-mr-12">
                            <button
                                onClick={next}
                                className="p-3 rounded-full bg-white shadow-lg text-gray-600 hover:text-primary hover:scale-110 transition-all"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-primary w-8" : "bg-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
