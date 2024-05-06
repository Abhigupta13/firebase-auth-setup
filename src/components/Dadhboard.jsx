/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import userImage from "../Images/user.png";
import { logOut,auth,db } from "../Firebase";
import {Link,useNavigate} from "react-router-dom"
import {query,collection,getDocs,where} from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth";


function Dashboard() {
  const [name, setName] = useState("");
const [user,loading,error]=useAuthState(auth);
let navigate=useNavigate();
useEffect(()=>{
  if(loading) return;
  if (!user) navigate("/")
  fetchUser();
},[user,loading])
const fetchUser=async()=>{
  try {
    const q=query(collection(db,"users"),where("uid","==",user?.uid))
    const doc=await getDocs(q);
    console.log(doc.docs[0]);
    const data=doc.docs[0].data()
    console.log(data);
    setName(data.name);
  } catch (error) {
    console.log(error.message);
  }
}


  // Sample user details (replace with actual data)
  // const user = {
  //   name: "Abhishek Kumar Gupta",
  //   age: 22,
  //   college: "Example University",
  //   place: "New York City",
  //   work: "Software Engineer",
  //   socialMedia: {
  //     twitter: "@johndoe",
  //     instagram: "@johndoe",
  //     linkedin: "linkedin.com/in/johndoe"
  //     // You can add more social media handles as needed
  //   },
  //   image: "xckl"
  // };

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
    <div className="container mx-auto px-4 mt-16">
       <button onClick={logOut}>Log Out</button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First card: User details */}
        <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5 interactive-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}>
          <img className="w-32 h-32 rounded-full mx-auto" src={userImage} alt="Profile picture"/>
          <h2 className="text-center text-2xl font-semibold mt-3">{name}</h2>
          {/* <p className="text-center text-gray-600 mt-1">{user.work}</p> */}
          {/* <div className="flex justify-center mt-5">
            {Object.entries(user.socialMedia).map(([platform, handle]) => (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a href="#" className="text-blue-500 hover:text-blue-700 mx-3" key={platform}>{platform}</a>
            ))}
          </div> */}
          <div className="mt-5">
            <h3 className="text-xl font-semibold">Bio</h3>
            {/* <p className="text-gray-600 mt-2">{value} is a {user.work} with over {user.age} years of experience. He graduated from {user.college} and currently resides in {user.place}.</p> */}
          </div>
         
        </div>

        {/* Second card: QR Code */}
        <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5 interactive-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}>
          <div className="flex flex-col items-center">
            {name && (
              <QRCode
                title="User QR Code"
                value={name}
                size={240}
              />
            )}
            <h1 className="mt-4 text-lg font-bold">Know user details by scanning this QR</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
