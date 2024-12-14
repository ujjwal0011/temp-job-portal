import React from "react";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"; // Ensure the correct path for the card component

const TopNiches = () => {
  const services = [
    {
      id: 1,
      service: "Software Development",
      description:
        "Innovative software development services to build, maintain, and upgrade applications, ensuring they meet the highest quality standards.",
    },
    {
      id: 2,
      service: "Web Development",
      description:
        "Comprehensive web development solutions from front-end design to back-end integration, delivering responsive and user-friendly websites.",
    },
    {
      id: 3,
      service: "Data Science",
      description:
        "Advanced data science services to analyze and interpret complex data, providing actionable insights and data-driven solutions.",
    },
    {
      id: 4,
      service: "Cloud Computing",
      description:
        "Reliable cloud computing services to manage, store, and process data efficiently, offering scalable and flexible cloud solutions.",
    },
    {
      id: 5,
      service: "DevOps",
      description:
        "DevOps services to streamline software development and operations, enhancing deployment efficiency and reducing time to market.",
    },
    {
      id: 6,
      service: "Mobile App Development",
      description:
        "Expert mobile app development for iOS and Android platforms, creating intuitive and engaging mobile experiences for your users.",
    },
  ];

  return (
    <section className="py-12 px-6 bg-gray-50">
      {/* Section Title */}
      <h3 className="text-center text-3xl font-semibold text-gray-800 mb-10">
        Top Niches
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((element) => (
          <Card key={element.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardContent className="p-6">
              <CardTitle className="text-xl font-bold text-gray-800">{element.service}</CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                {element.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TopNiches;
