import React from 'react';

const testimonials = [
  {
    name: "Annette Dockerty",
    position: "Program Lead, SME Engagement, UTS",
    quote: "“Using this platform I estimate a saving of 6-8 hours a week spent finding and filtering businesses to better target with the opportunities UTS can offer to help SMEs scale and grow.”"
  },
  {
    name: "David Harding",
    position: "Executive Director Business NSW",
    quote: "“Small and medium sized enterprises are the heartbeat of the Australian economy. Accurately and quickly identifying those businesses with the right leadership, product and market opportunity is at the centre of our strategy to assist in broader economic growth.”"
  },
  {
    name: "Dr Mateus Oliveira Silva",
    position: "Program Advisor, CSIRO SME Connect",
    quote: "“There is demand for streamlining collaborative partnerships between academia and top-ranked SMEs in target sectors, which will generate value for the Australian economy.”"
  }
];

const Testimonials = () => {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Increased gap */}
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-8 shadow-lg rounded-lg flex flex-col justify-between text-left" style={{ backgroundColor: 'white' }}> {/* Increased padding and shadow for depth */}
              <p className="text-lg mb-6 text-pretty">{testimonial.quote}</p> {/* Larger text for quotes */}
              <div className="mt-4">
                <p className="text-xl font-semibold">{testimonial.name}</p> {/* Larger text for names */}
                <p className="text-sm text-gray-500">{testimonial.position}</p> {/* Adjusted text size for positions */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;



//             <div key={index} className="p-6 shadow-md rounded-lg flex flex-col justify-between" style={{ backgroundColor: 'white' }}>