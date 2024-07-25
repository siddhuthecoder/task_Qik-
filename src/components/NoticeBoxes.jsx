import React from 'react';

const NoticeBox = ({ title, description, buttonText ,bg}) => (
    <div className={`w-[100%] max-w-[350px] overflow-hidden mx-auto border rounded-md shadow-lg flex flex-col ps-3 my-2 `} style={{
        backgroundColor:bg
    }}>
        <div className="font-bold pt-5">{title}</div>
        <div className="text-zinc-600">{description}</div>
        <div className="w-full flex flex-row-reverse  items-center">
            <button className="px-3 py-1 bg-black my-2 me-2 text-[12px]  rounded-full text-white font-bold">View All</button>
        </div>
    </div>
);

const NoticeBoxes = () => {
    const noticeBoxes = [
        {
            title: "All Notices",
            description: "Keep track on all notifications",
            buttonText: "View All",
            bg: "#f0f4ff" // Light blue
        },
        {
            title: "Important Notices",
            description: "Check the important updates",
            buttonText: "View Important",
            bg: "#f9f4e7" // Light beige
        },
        {
            title: "System Alerts",
            description: "Stay informed on system alerts",
            buttonText: "View Alerts",
            bg: "#f4fff0" // Light green
        },
        
        // Add more objects as needed
    ];
    
    return (
        <div className="flex w-[100%] mx-auto items-center justify-evenely  flex-wrap">
            {noticeBoxes.map((box, index) => (
                <NoticeBox
                    key={index}
                    title={box.title}
                    description={box.description}
                    buttonText={box.buttonText}
                    bg={box.bg}
                    // className={`${index == noticeBoxes.length-1?"mb-[40px]":""}`}
                />
            ))}
            
        </div>
    );
};

export default NoticeBoxes;
