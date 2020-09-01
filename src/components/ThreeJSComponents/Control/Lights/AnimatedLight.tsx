import React from "react";

const AnimatedLight = () => {

    return(
        <pointLight position={[0, 1, 50]} intensity={1} distance={150} color="#90E0EF"/>
    )
}

export default React.memo(AnimatedLight)