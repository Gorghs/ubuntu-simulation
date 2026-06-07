import React from 'react'

export default function BackgroundImage(props) {
    const bg_images = {
        "wall-1": "./images/wallpapers/wall-1.webp",
        "wall-2": "./images/wallpapers/wall-2.webp",
        "wall-3": "./images/wallpapers/wall-3.webp",
        "wall-4": "./images/wallpapers/wall-4.webp",
        "wall-5": "./images/wallpapers/wall-5.webp",
        "wall-6": "./images/wallpapers/wall-6.webp",
        "wall-7": "./images/wallpapers/wall-7.webp",
        "wall-8": "./images/wallpapers/wall-8.webp",
    };

    const isDrosteWall = props.img === "wall-2";
    if (!isDrosteWall) {
        return (
            <div style={{ backgroundImage: `url(${bg_images[props.img]})`, backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", backgroundPosition: "center bottom" }} className="bg-ubuntu-img absolute -z-10 top-0 right-0 overflow-hidden h-full w-full">
            </div>
        );
    }

    return (
        <div className="absolute -z-10 top-0 right-0 overflow-hidden h-full w-full bg-black">
            {/* Base Layer: Minecraft Village Cabin */}
            <div
                id="droste-layer-base"
                style={{
                    backgroundImage: `url(./images/wallpapers/droste-1.png)`,
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center bottom",
                    transform: 'scale(1)',
                    opacity: 1.0,
                    transformOrigin: '50% 65%', // Anchor zoom origin to 65% vertically to target the door opening center
                    willChange: 'transform, opacity',
                }}
                className="bg-ubuntu-img absolute top-0 right-0 overflow-hidden h-full w-full"
            />
            {/* Next Layer: Still Building Island */}
            <div
                id="droste-layer-next"
                style={{
                    backgroundImage: `url(./images/wallpapers/droste-7.png)`,
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center bottom",
                    transform: 'scale(0.9)',
                    opacity: 0.0,
                    transformOrigin: '50% 50%',
                    willChange: 'transform, opacity',
                }}
                className="bg-ubuntu-img absolute top-0 right-0 overflow-hidden h-full w-full"
            />
        </div>
    );
}
