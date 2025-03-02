
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowRight } from 'lucide-react';

const Roadmap = () => {
  // Data for pie chart
  const data = [
    { name: 'Phase 1: Foundation', value: 25, color: '#0ea5e9' },
    { name: 'Phase 2: Expansion', value: 25, color: '#14b8a6' },
    { name: 'Phase 3: Innovation', value: 25, color: '#6366f1' },
    { name: 'Phase 4: Optimization', value: 25, color: '#f97316' },
  ];

  const COLORS = ['#0ea5e9', '#14b8a6', '#6366f1', '#f97316'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-md border border-gray-100">
          <p className="font-bold">{payload[0].name}</p>
          <p className="text-gray-600">2024</p>
        </div>
      );
    }
    return null;
  };

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

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={150}
                    innerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                    animationDuration={1000}
                    className="hover:cursor-pointer"
                  >
                    {data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                        className="hover:opacity-90 transition-opacity"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-8">
              {/* Roadmap Items */}
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-1/2 -ml-0.5 h-full bg-gray-300 w-px"></div>

                {/* Roadmap Items */}
                <div className="flex flex-col gap-12">
                  {/* Item 1 */}
                  <div className="flex items-center justify-between w-full">
                    <div className="w-5/12 text-right pr-8">
                      <h3 className="text-xl font-bold mb-2">Phase 1: Foundation</h3>
                      <p className="text-gray-600">
                        Establish core AI models and infrastructure.
                      </p>
                    </div>
                    <div className="rounded-full bg-flowai-black text-white p-4 z-10 shadow-md hover:scale-105 transition-transform cursor-pointer">
                      2024 Q1
                    </div>
                    <div className="w-5/12"></div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-center justify-between w-full">
                    <div className="w-5/12"></div>
                    <div className="rounded-full bg-flowai-black text-white p-4 z-10 shadow-md hover:scale-105 transition-transform cursor-pointer">
                      2024 Q2
                    </div>
                    <div className="w-5/12 text-left pl-8">
                      <h3 className="text-xl font-bold mb-2">Phase 2: Expansion</h3>
                      <p className="text-gray-600">
                        Expand AI capabilities and integrate new data sources.
                      </p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-center justify-between w-full">
                    <div className="w-5/12 text-right pr-8">
                      <h3 className="text-xl font-bold mb-2">Phase 3: Innovation</h3>
                      <p className="text-gray-600">
                        Introduce advanced AI features and custom solutions.
                      </p>
                    </div>
                    <div className="rounded-full bg-flowai-black text-white p-4 z-10 shadow-md hover:scale-105 transition-transform cursor-pointer">
                      2024 Q3
                    </div>
                    <div className="w-5/12"></div>
                  </div>

                  {/* Item 4 */}
                  <div className="flex items-center justify-between w-full">
                    <div className="w-5/12"></div>
                    <div className="rounded-full bg-flowai-black text-white p-4 z-10 shadow-md hover:scale-105 transition-transform cursor-pointer">
                      2024 Q4
                    </div>
                    <div className="w-5/12 text-left pl-8">
                      <h3 className="text-xl font-bold mb-2">Phase 4: Optimization</h3>
                      <p className="text-gray-600">
                        Optimize AI performance and enhance user experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button className="btn-primary group inline-flex items-center">
              <span>Learn more about our roadmap</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
