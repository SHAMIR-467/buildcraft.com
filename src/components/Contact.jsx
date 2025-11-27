import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
    const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('submitting');
        // Simulate API call
        setTimeout(() => {
            setFormStatus('success');
            setTimeout(() => setFormStatus('idle'), 3000);
        }, 1500);
    };

    return (
        <section id="contact" className="py-16 md:py-24 bg-gray-900 text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-800/30 skew-x-12 transform translate-x-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-secondary font-bold tracking-wider uppercase text-xs md:text-sm mb-2 block">
                            Get in Touch
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
                            Let's Build Your Vision
                        </h2>
                        <p className="text-gray-400 text-base md:text-lg mb-8 md:mb-10 leading-relaxed">
                            Ready to start your next project? Contact us today for a
                            consultation and quote. Our team of experts is ready to bring your
                            vision to life with precision and excellence.
                        </p>

                        <div className="space-y-6 md:space-y-8">
                            {[
                                { icon: Phone, title: "Phone", value: "+1 (555) 123-4567" },
                                {
                                    icon: Mail,
                                    title: "Email",
                                    value: "info@buildcraft.com",
                                },
                                {
                                    icon: MapPin,
                                    title: "Office",
                                    value:
                                        "123 Construction Ave, Suite 100, Builder City, BC 90210",
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 + 0.3 }}
                                    className="flex items-start space-x-4 group"
                                >
                                    <div className="bg-gray-800 p-3 md:p-4 rounded-xl group-hover:bg-secondary transition-colors duration-300 shrink-0">
                                        <item.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl font-semibold mb-1 text-white group-hover:text-secondary transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm md:text-base max-w-xs">
                                            {item.value}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-3xl p-6 md:p-10 text-gray-900 shadow-2xl relative mt-8 lg:mt-0"
                    >
                        <h3 className="text-xl md:text-2xl font-bold mb-6">
                            Send us a message
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    required
                                    type="email"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="Tell us about your project..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={formStatus !== "idle"}
                                className={`w-full font-bold py-3 md:py-4 rounded-xl transition-all flex items-center justify-center space-x-2 ${formStatus === "success"
                                        ? "bg-green-500 text-white"
                                        : "bg-primary hover:bg-blue-900 text-white hover:shadow-lg hover:-translate-y-1"
                                    }`}
                            >
                                {formStatus === "idle" && (
                                    <>
                                        <span>Send Message</span>
                                        <Send className="w-5 h-5" />
                                    </>
                                )}
                                {formStatus === "submitting" && (
                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                )}
                                {formStatus === "success" && (
                                    <>
                                        <span>Message Sent!</span>
                                        <CheckCircle className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
