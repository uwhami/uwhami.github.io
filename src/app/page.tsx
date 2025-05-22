"use client"

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Head from "next/head";
import Experience from "@/components/Experience";
import Project from "@/components/Projects";
import About from "@/components/About";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

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
                <Hero />

                {/* About Section */}
                <About/>

                {/* Experience Section */}
                <Experience/>

                {/* Projects Section */}
                <Project/>

                <Skills />

                {/* Contact Section */}
                {/*<Contact />*/}

            </main>

            {/* Footer */}
            <footer className="py-6 text-center text-gray-500 pb-15">
                <p>&copy; 2025 DAJEONG KIM. All rights reserved.</p>
                <p>Thank you for visiting my portfolio ❤️</p>
            </footer>
        </div>
    );
}
