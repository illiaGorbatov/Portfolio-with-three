import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components/macro';
import {animated, useChain, useSprings, useTrail} from 'react-spring'
import {useStore} from "../../../utils/zustandStore";

const NavScreen = styled.div`
  position: absolute;
  top: 0;
  color: white;
  min-height: 100%;
  min-width: 100%;
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;
  z-index: 997;
`;

const BackgroundWrappers = styled(animated.div)`
  position: absolute;
  background-color: rgb(20, 20, 20);
  height: 100%;
`;

const WhiteStripes = styled(animated.div)`
  position: absolute;
  bottom: 0;
  background-color: blanchedalmond;
  width: 1px;
`;

const NavBar = styled.div`
  position: absolute;
  top: 50%;
  left: 70px;
  transform: translateY(-50%);
`;

const NavLink = styled(animated.div)`
  position: relative;
  font-weight: 300;
  font-size: 50px;
  margin-bottom: 10px;
`;

const Menu = styled.div`
  position: absolute;
  z-index: 999;
  top: 50%;
  transform: rotate(-90deg) translateY(-50%);
  left: 10px;
  color: white;
  font-size: 15px;
  display: flex;
  font-family: 'Relative-Book';
  cursor: pointer;
`;

const navBlocks = ['', '', '', '', ''];
const stripesBlock = ['', '', '', ''];
const navLinks = ['Home', 'Portfolio', 'About', 'Contacts'];

const config = {tension: 200, clamp: true};

const AboutMe: React.FC = () => {

    const setNavMenuState = useStore(state => state.setNavMenuState);
    const isNavMenuOpened = useStore(state => state.isNavMenuOpened);

    const [isMenuOpened, setMenuState] = useState(false);

    const switchNavMenuAfterAnimation = () => {
            setNavMenuState(!isNavMenuOpened)
    };

    const onMenuClickHandler = () => {
        setMenuState(!isMenuOpened)
    }

    const backgroundAnimRef = useRef(null);
    const backgroundAnim = useSprings(navBlocks.length, navBlocks.map((item, i) => ({
        ref: backgroundAnimRef,
        from: {
            width: 0,
            left: i * (window.innerWidth / 5)
        },
        to: {
            width: isMenuOpened ? window.innerWidth / 5 + 3 : 0
        },
        onRest: () => switchNavMenuAfterAnimation(),
        config
    })));

    const stripesAnimRef = useRef(null);
    const stripesAnim = useSprings(stripesBlock.length, stripesBlock.map((_, i) => ({
        ref: stripesAnimRef,
        from: {height: 0, left: (i + 1) * (window.innerWidth / 5)},
        left: (i + 1) * (window.innerWidth / 5),
        height: isMenuOpened ? window.innerHeight : 0,
        config
    })));

    const linksAppearingRef = useRef(null);
    const linksAppearing = useTrail(navLinks.length, {
        ref: linksAppearingRef,
        from: {left: -window.innerWidth/2},
        left: isMenuOpened ? 0 : -window.innerWidth/2,
        config
    });

    useChain(isMenuOpened ? ([backgroundAnimRef, stripesAnimRef, linksAppearingRef]) :
        [linksAppearingRef, stripesAnimRef, backgroundAnimRef], isMenuOpened ? [0, 0.5, 0.7] : [0, 0.2, 0.8]);

    return (
        <>
            <Menu onClick={onMenuClickHandler}>
                {isNavMenuOpened ? 'Close' : 'About Me'}
            </Menu>
            <NavScreen>
                {backgroundAnim.map((animations, i) =>
                    <BackgroundWrappers key={i} style={animations}/>
                )}
                {stripesAnim.map((animations, i) =>
                    <WhiteStripes key={i} style={animations}/>
                )}
                <NavBar>
                    {linksAppearing.map((animations, i) =>
                        <NavLink key={i} style={animations}>
                            {navLinks[i]}
                        </NavLink>
                    )}
                </NavBar>
            </NavScreen>
        </>
    )
};

export default React.memo(AboutMe);