import React from 'react';
import { Home, Building2, Ruler, HardHat, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
    {
        icon: <Home className="w-10 h-10 text-white" />,
        title: 'Residential Construction',
        description: 'Custom homes built to perfection. We handle everything from foundation to finishing touches.',
        color: 'bg-blue-600'
    },
    {
        icon: <Building2 className="w-10 h-10 text-white" />,
        title: 'Commercial Projects',
        description: 'Office buildings, retail spaces, and industrial facilities designed for business success.',
        color: 'bg-orange-600'
    },
    {
        icon: <Ruler className="w-10 h-10 text-white" />,
        title: 'Architectural Design',
        description: 'Comprehensive planning and design services to bring your unique vision to life.',
        color: 'bg-purple-600'
    },
    {
        icon: <HardHat className="w-10 h-10 text-white" />,
        title: 'Renovations',
        description: 'Transforming existing spaces with modern upgrades and structural improvements.',
        color: 'bg-green-600'
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

const Services = () => {
    return (
        <section id="services" className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary blur-3xl"></div>
                <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-secondary blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 md:mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-secondary font-bold tracking-wider uppercase text-xs md:text-sm"
                    >
                        What We Do
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-primary mt-2 mb-4 md:mb-6"
                    >
                        Our Services
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
                    >
                        Delivering excellence across every sector of the construction industry with precision and passion.
                    </motion.p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            className="group bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 ${service.color} opacity-5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500`}></div>

                            <div className={`${service.color} w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:rotate-6 transition-transform duration-300`}>
                                {service.icon}
                            </div>

                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                            <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">
                                {service.description}
                            </p>

                            <a href="#contact" className="inline-flex items-center text-secondary font-semibold group-hover:translate-x-2 transition-transform text-sm md:text-base">
                                Learn More <ArrowRight className="ml-2 w-4 h-4" />
                            </a>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
