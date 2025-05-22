"use client"

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Head from "next/head";
import Experience from "@/components/Experience";
import Project from "@/components/Projects";
import About from "@/components/About";

export default function Home() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <Head>
                <title>My Portfolio</title>
                <meta name="description" content="My Developer Portfolio" />
            </Head>


            <main className="pt-24 px-4 max-w-5xl mx-auto">
                {/* Hero Section */}
                <section className="mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={mounted ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-teal-400 text-lg">Hi, my name is</p>
                        <h2 className="text-4xl font-bold mt-2">Your Name</h2>
                        <p className="mt-4 text-lg text-gray-300">
                            I build things for the web.
                        </p>
                    </motion.div>
                </section>

                {/* About Section */}
                <About />

                {/* Experience Section */}
                <Experience />

                {/* Projects Section */}
                <Project />
                <section id="projects" className="mb-32">
                    <h3 className="text-2xl font-semibold mb-4 text-teal-400">Projects</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition">
                            <h4 className="text-xl font-semibold">Project One</h4>
                            <p className="text-gray-400 text-sm mt-1">Short project description here.</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition">
                            <h4 className="text-xl font-semibold">Project Two</h4>
                            <p className="text-gray-400 text-sm mt-1">Another project summary goes here.</p>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="mb-32 text-center">
                    <h3 className="text-2xl font-semibold mb-4 text-teal-400">Contact</h3>
                    <p className="text-gray-300 mb-4">Want to work together or say hello?</p>
                    <a
                        href="mailto:your@email.com"
                        className="inline-block bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg"
                    >
                        Say Hello
                    </a>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-6 text-center text-gray-500">
                <div className="flex justify-center space-x-4 mb-2">
                    <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">
                        <FaGithub size={20} />
                    </a>
                    <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer">
                        <FaLinkedin size={20} />
                    </a>
                </div>
                <p>&copy; 2025 Your Name. All rights reserved.</p>
            </footer>
        </div>
    );
}
