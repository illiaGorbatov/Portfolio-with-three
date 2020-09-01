import React from "react";


const VideoPlaneLight: React.FC = () => {

    return (
        <rectAreaLight args={[0xffffff, 1, 14, 7]} rotation={[0, Math.PI, 0]} />
    )
}

export default React.memo(VideoPlaneLight)