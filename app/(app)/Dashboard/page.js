import React from 'react';

export default function DashboardContent() {
  return (
    <div className="p-6 bg-black text-white flex-1">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2 text-red-500">Section 1</h3>
          <p>Content for section 1 goes here.</p>
          {/* Example graph component */}
          {/* <GraphComponent data={dataForSection1} /> */}
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2 text-red-500">Section 2</h3>
          <p>Content for section 2 goes here.</p>
          {/* Example graph component */}
          {/* <GraphComponent data={dataForSection2} /> */}
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2 text-red-500">Section 3</h3>
          <p>Content for section 3 goes here.</p>
          {/* Example graph component */}
          {/* <GraphComponent data={dataForSection3} /> */}
        </div>
      </div>
    </div>
  );
}
