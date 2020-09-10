import React, {useCallback, useEffect} from 'react';
import styled from 'styled-components/macro';
import {animated, useSpring, useSprings} from 'react-spring';
import {useDispatch} from "react-redux";
import {actions} from "../../../store/InterfaceReducer";

const Wrapper = styled(animated.div)`
  background-color: #353535;
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: grid;
  place-items: center;
  z-index: 999;
  overflow: hidden;
`;

const LettersWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  max-width: 500px;
`;

const SingleLetterWrapper = styled.div`
  overflow: hidden;
`;

const SingleLetter = styled(animated.div)`
  color: white;
  font-size: 50px;
  text-transform: uppercase;
  font-family: 'Made Evolve Sans Light EVO';
`;

const loading = 'loading'.split('');


const Preloader: React.FC = () => {

    const dispatch = useDispatch();

    const [springs, setSprings] = useSprings(7, i => ({
        y: '-100%',
    }));

    const [wrapperAnimation, setWrapperAnimation] = useSpring(() => ({
        height: '100vh'
    }));

    const loadStateCheck = useCallback(() => {
        if (document.readyState === 'complete') {
            setSprings(i => ({
                cancel: true,
            })).then(() => setSprings(i => ({
                y: '0%',
                delay: i * 200
            }))).then(() => setWrapperAnimation({
                height: '0vh', delay: 1200
            })).then(() => dispatch(actions.setLoadedState()))
        } else setSprings(i => ({
            to: async next => {
                await next({y: '0%', delay: i * 200});
                await next({y: '100%', delay: 900});
                await next({y: '-100%', immediate: true, delay: (7 - i) * 200});
            },
        })).then(() => loadStateCheck())
    }, [setWrapperAnimation, setSprings, dispatch]);


    useEffect(() => {
        setSprings(i => ({
            to: async next => {
                await next({y: '0%', delay: i * 200});
                await next({y: '100%', delay: 900});
                await next({y: '-100%', immediate: true, delay: (7 - i) * 200});
            },
        })).then(() => loadStateCheck())
    }, [setSprings, loadStateCheck])

    return (
        <Wrapper style={wrapperAnimation}>
            <LettersWrapper>
                {springs.map((spring, i) =>
                    <SingleLetterWrapper key={i}>
                        <SingleLetter style={spring}>
                            {loading[i]}
                        </SingleLetter>
                    </SingleLetterWrapper>
                )}
            </LettersWrapper>
        </Wrapper>

    )
}

export default React.memo(Preloader)