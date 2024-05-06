/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react'
import userImage from "../Images/user.png";

function Qr_search() {
    const [value, setValue] = useState(""); 

    // Sample user details (replace with actual data)
    const user = {
      name: "Abhishek Kumar Gupta",
      age: 22,
      college: "Example University",
      place: "New York City",
      work: "Software Engineer",
      socialMedia: {
        twitter: "@johndoe",
        instagram: "@johndoe",
        linkedin: "linkedin.com/in/johndoe"
        // You can add more social media handles as needed
      },
      image: "xckl"
    };

    const handleMouseMove = (e) => {
        const card = e.target.closest(".interactive-card");
        if (!card) return;
        const cardRect = card.getBoundingClientRect();
        const offsetX = e.clientX - cardRect.left;
        const offsetY = e.clientY - cardRect.top;
        const xAxis = (cardRect.width / 2 - offsetX) / 10;
        const yAxis = (cardRect.height / 2 - offsetY) / 10;
        card.style.transition = "none"; // Disable transition during mouse movement
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${-yAxis}deg)`;
    };

    const handleMouseLeave = (e) => {
        const card = e.target.closest(".interactive-card");
        if (!card) return;
        card.style.transition = "transform 0.5s ease"; // Add transition back when mouse leaves
        card.style.transform = "rotateY(0deg) rotateX(0deg)";
    };

    return (
        <>
            <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5 interactive-card"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}>
                <img className="w-32 h-32 rounded-full mx-auto" src={userImage} alt="Profile picture"/>
                <h2 className="text-center text-2xl font-semibold mt-3">{user.name}</h2>
                <p className="text-center text-gray-600 mt-1">{user.work}</p>
                <div className="flex justify-center mt-5">
                    {Object.entries(user.socialMedia).map(([platform, handle]) => (
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                        <a href="#" className="text-blue-500 hover:text-blue-700 mx-3" key={platform}>{platform}</a>
                    ))}
                </div>
                <div className="mt-5">
                    <h3 className="text-xl font-semibold">Bio</h3>
                    <p className="text-gray-600 mt-2">{user.name} is a {user.work} with over {user.age} years of experience. He graduated from {user.college} and currently resides in {user.place}.</p>
                </div>
            </div>
        </>
    )
}

export default Qr_search
