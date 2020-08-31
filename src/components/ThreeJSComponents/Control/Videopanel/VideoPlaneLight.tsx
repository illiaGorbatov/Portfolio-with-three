import React from "react";


const VideoPlaneLight: React.FC = () => {

    return (
        <rectAreaLight args={[0xffffff, 1, 20, 10]} rotation={[0, Math.PI, 0]} />
    )
}

export default React.memo(VideoPlaneLight)