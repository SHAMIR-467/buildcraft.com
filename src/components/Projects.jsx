import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Modern Skyline Tower",
    category: "Commercial",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    size: "large",
  },
  {
    id: 2,
    title: "Eco-Friendly Residence",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    size: "small",
  },
  {
    id: 3,
    title: "Urban Office Complex",
    category: "Commercial",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    size: "small",
  },
  {
    id: 4,
    title: "Luxury Penthouse",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    size: "large",
  },
  {
    id: 5,
    title: "Industrial Warehouse",
    category: "Industrial",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    size: "small",
  },
  {
    id: 6,
    title: "Community Center",
    category: "Public",
    image:
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    size: "small",
  },
  {
    id: 7,
    title: "Corporate Headquarters",
    category: "Commercial",
    image:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    size: "small",
  },
  {
    id: 8,
    title: "Modern Villa",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    size: "small",
  },
  {
    id: 9,
    title: "Glass Office Building",
    category: "Commercial",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    size: "large",
  },
  {
    id: 10,
    title: "Public Library",
    category: "Public",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    size: "small",
  },
  {
    id: 11,
    title: "Manufacturing Plant",
    category: "Industrial",
    image:
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    size: "small",
  },
  {
    id: 12,
    title: "Contemporary Home",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    size: "small",
  },
  {
    id: 13,
    title: "Shopping Mall Complex",
    category: "Commercial",
    image:
      "https://images.unsplash.com/photo-1519643381401-22c77e60520e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    size: "small",
  },
  {
    id: 14,
    title: "City Hall",
    category: "Public",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    size: "large",
  },
  {
    id: 15,
    title: "Beachfront Property",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    size: "small",
  },
  {
    id: 16,
    title: "Tech Campus",
    category: "Commercial",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    size: "small",
  },
  {
    id: 17,
    title: "Storage Facility",
    category: "Industrial",
    image:
      "https://images.unsplash.com/photo-1565008576549-57569a49371d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    size: "small",
  },
  {
    id: 18,
    title: "Municipal Stadium",
    category: "Public",
    image:
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    size: "small",
  },
  {
    id: 19,
    title: "Mountain Retreat",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    size: "small",
  },
  {
    id: 20,
    title: "High-Rise Apartments",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    size: "large",
  },
];

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const categories = [
    "All",
    "Commercial",
    "Residential",
    "Industrial",
    "Public",
  ];

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16">
          <div className="mb-8 md:mb-0 w-full md:w-auto">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-secondary font-bold tracking-wider uppercase text-xs md:text-sm"
            >
              Portfolio
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-primary mt-2"
            >
              Featured Projects
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 w-full md:w-auto"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                  filter === cat
                    ? "bg-primary text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className={`group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer ${
                  project.size === "large" ? "md:col-span-2" : ""
                }`}
              >
                <div className="relative h-64 md:h-80 w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6 md:p-8 md:translate-y-4 group-hover:translate-y-0">
                  <div className="transform md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    <span className="text-accent font-semibold text-xs md:text-sm uppercase tracking-wider mb-2 block">
                      {project.category}
                    </span>
                    <div className="flex justify-between items-end">
                      <h3 className="text-white text-xl md:text-3xl font-bold">
                        {project.title}
                      </h3>
                      <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-white hover:text-primary transition-colors text-white">
                        <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 md:mt-16 text-center">
          <a
            href="#contact"
            className="inline-block border-2 border-primary text-primary font-bold py-2 px-6 md:py-3 md:px-8 rounded-full hover:bg-primary hover:text-white transition-all duration-300 text-sm md:text-base"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
