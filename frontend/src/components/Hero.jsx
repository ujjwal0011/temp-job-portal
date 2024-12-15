import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 mt-14">
      <div className="container mx-auto px-4">
        {/* Animated Heading */}
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Find Your Dream Job Today
        </motion.h1>

        {/* Animated Subheading */}
        <motion.h4
          className="text-xl md:text-2xl text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Connecting Talent with Opportunities Across the Nation for Every Skill
          Level
        </motion.h4>

        {/* Animated Card */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-white/10 backdrop-blur-lg border-none">
            <CardContent className="p-6">
              <p className="text-center text-lg">
                Explore a vast array of job listings in diverse industries. Whether
                you're a seasoned professional or just starting out, find the perfect
                role to advance your career. Our platform makes job searching easy and
                efficient, bringing you closer to your next big opportunity.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
