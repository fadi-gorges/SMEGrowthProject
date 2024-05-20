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
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-6 shadow-md rounded-lg flex flex-col justify-between">
              <p className="text-sm mb-4">{testimonial.quote}</p>
              <div className="mt-4">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-xs text-gray-500">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
