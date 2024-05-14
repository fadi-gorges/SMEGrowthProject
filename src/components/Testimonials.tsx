import React from 'react';

const testimonials = [
    {
        name: "Annette Dockerty",
        position: "Program Lead, SME Engagement, UTS",
        quote: "Using this platform I estimate a saving of 6-8 hours a week spent finding and filtering businesses to better target with the opportunities UTS can offer to help SMEs scale and grow."
    },
    {
        name: "Placeholder Name",
        position: "Position",
        quote: "Using this platform I estimate a saving of 6-8 hours a week spent finding and filtering businesses to better target with the opportunities UTS can offer to help SMEs scale and grow."
    },
    {
        name: "John Doe",
        position: "Program Lead, SME Engagement, UTS",
        quote: "Using this platform I estimate a saving of 6-8 hours a week spent finding and filtering businesses to better target with the opportunities UTS can offer to help SMEs scale and grow."
    }
];

const Testimonials = () => {
    return (
        <div className="py-12">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="p-6 shadow-md rounded-lg">
                            <p className="text-sm">{testimonial.quote}</p>
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