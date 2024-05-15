'use client'; // This makes sure the component is treated as a Client Component
import * as React from "react";
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card"; // Ensure paths are correct
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function MeetOurTeamCarousel() {
    const carouselRef = useRef<HTMLDivElement>(null); 
    const [carouselHeight, setCarouselHeight] = useState(0);

    useEffect(() => {
        if (carouselRef.current) {
            // Adjust the height dynamically based on the carousel content
            setCarouselHeight(carouselRef.current.offsetHeight);
        }
    }, [carouselRef]);

    const teamMembers = [
        { name: "Joseph Kizana", company: "Bachelor of Software Engineering", imgSrc: "/images/Joseph.jpg" },
        { name: "Siddhika Prasad", company: "Bachelor of Software Engineering", imgSrc: "/images/Siddhika.jpg" },
        { name: "Fadi Gorges", company: "Bachelor of Software Engineering", imgSrc: "/images/Fadi.jpg" },
        { name: "Peter Phuangthong", company: "Bachelor of Software Engineering", imgSrc: "/images/Peter.jpg" },
        { name: "Sejin (Denni) Um", company: "Bachelor of Information Technology", imgSrc: "/images/Denni.jpg" },
        { name: "Gifford Stefano", company: "Bachelor of Information Technology ", imgSrc: "/images/Gifford.jpg" },
        { name: "Matthew Ashley", company: "Bachelor of Software Engineering", imgSrc: "/images/Matthew.jpg" },
        { name: "Wilsen Lowell", company: "Bachelor of Information Technology", imgSrc: "/images/Wilsen.jpg" },
        { name: "Zayan Mohamed Salil", company: "Bachelor of Software Engineering", imgSrc: "/images/Zayan.jpg" },
        { name: "Jayden Faint", company: "Bachelor of Software Engineering", imgSrc: "/images/Jayden.jpeg" },
        { name: "Tristan Tran", company: "Bachelor of Software Engineering", imgSrc: "/images/Tristan.jpeg" },
        { name: "Anas Nounou", company: "Bachelor of Software Engineering", imgSrc: "/images/Anas.jpeg" },
        { name: "Lachlan Muffet", company: "Bachelor of Software Engineering", imgSrc: "/images/Lachlan.jpeg" },
        { name: "Anurag Majumder", company: "Bachelor of Software Engineering", imgSrc: "/images/Anurag.jpeg" }
        // Add more team members as needed
    ];

    return (
        <div style={{ position: 'relative', marginBottom: '120px' }} ref={carouselRef}>
            <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent>
                    {teamMembers.map((member, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3" style={{ padding: '0 20px' }}>
                            <div className="p-1" style={{ maxWidth: '500px', margin: '0 auto' }}>
                                <Card>
                                    <CardContent className="flex flex-col items-center justify-center pt-4">
                                        <div className="relative w-48 h-48 mb-4">
                                            <Image
                                                src={member.imgSrc}
                                                alt={member.name}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-lg"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <h3 className="text-lg font-bold">{member.name}</h3>
                                            <p className="text-sm text-gray-500">{member.company}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious 
                    style={{
                        position: 'absolute',
                        top: '50%', // Center vertically
                        left: '20px', // Place on the left edge
                        transform: 'translateY(-50%)', // Center vertically
                        zIndex: 1000 // Ensure it is above any overlaid content if needed
                    }} 
                />
                <CarouselNext 
                    style={{
                        position: 'absolute',
                        top: '50%', // Center vertically
                        right: '20px', // Place on the right edge
                        transform: 'translateY(-50%)', // Center vertically
                        zIndex: 1000 // Ensure it is above any overlaid content if needed
                    }} 
                />
            </Carousel>
            <div className="flex justify-center mt-4">
                <p className="italic text-sm sm:text-base text-gray-600">
                    Students from Software Development Studio at UTS, Autumn 2024.
                </p>
            </div>
        </div>
       
    );
}
