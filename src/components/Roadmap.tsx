import React from 'react';

const Roadmap = () => {
  return (
    <section id="roadmap" className="py-24 bg-flowai-beige">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="px-3 py-1 bg-flowai-black text-flowai-white text-sm font-medium rounded-full">
            Our Roadmap
          </span>
          <h2 className="mt-4">The Journey Ahead</h2>
          <p className="max-w-2xl mx-auto mt-4 text-gray-700">
            Explore our strategic roadmap, highlighting key milestones and future innovations.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -ml-1 h-full bg-gray-300 w-0.5"></div>

          {/* Roadmap Items */}
          <div className="flex flex-col gap-12">
            {/* Item 1 */}
            <div className="flex items-center justify-between w-full">
              <div className="w-1/2 text-right pr-8">
                <h3 className="text-xl font-bold mb-2">Phase 1: Foundation</h3>
                <p className="text-gray-600">
                  Establish core AI models and infrastructure.
                </p>
              </div>
              <div className="rounded-full bg-flowai-black text-white p-4 z-10 shadow-md">
                2024 Q1
              </div>
              <div className="w-1/2"></div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center justify-between w-full">
              <div className="w-1/2"></div>
              <div className="rounded-full bg-flowai-black text-white p-4 z-10 shadow-md">
                2024 Q2
              </div>
              <div className="w-1/2 text-left pl-8">
                <h3 className="text-xl font-bold mb-2">Phase 2: Expansion</h3>
                <p className="text-gray-600">
                  Expand AI capabilities and integrate new data sources.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-center justify-between w-full">
              <div className="w-1/2 text-right pr-8">
                <h3 className="text-xl font-bold mb-2">Phase 3: Innovation</h3>
                <p className="text-gray-600">
                  Introduce advanced AI features and custom solutions.
                </p>
              </div>
              <div className="rounded-full bg-flowai-black text-white p-4 z-10 shadow-md">
                2024 Q3
              </div>
              <div className="w-1/2"></div>
            </div>

            {/* Item 4 */}
            <div className="flex items-center justify-between w-full">
              <div className="w-1/2"></div>
              <div className="rounded-full bg-flowai-black text-white p-4 z-10 shadow-md">
                2024 Q4
              </div>
              <div className="w-1/2 text-left pl-8">
                <h3 className="text-xl font-bold mb-2">Phase 4: Optimization</h3>
                <p className="text-gray-600">
                  Optimize AI performance and enhance user experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
