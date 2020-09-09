import React, {useEffect, useState} from 'react';
import styled, {css, keyframes} from 'styled-components/macro';
import {animatedSkillsStack} from "../../../textAndPrijectsInfo/TextContent";

const blink = keyframes`
  0% {
    opacity:1;
  }
  49% {
    opacity:1;
  }
  50% {
    opacity:0;
  }
  100% {
    opacity:0;
  }
`;

const complexMixin = css`&::after {
      content: '';
      display: inline-block;
      margin-left: 3px;
      background-color: black;
      animation-name: ${blink};
      animation-duration: 0.5s;
      animation-iteration-count: infinite;
      height: 24px;
      width: 8px;
  }`;

const Wrapper = styled.div<{$visible: boolean}>`
  text-align:center;
  font-family: 'Relative-Book';
  font-weight: bold;
  color: black;
  letter-spacing: 2px;
  font-size: 25px;
  ${props => props.$visible && complexMixin}
`;

type PropsType = {
    visible: boolean,
}

const TextTypingElement: React.FC<PropsType> = ({visible}) => {

    const textArray = animatedSkillsStack;

    const [text, setText] = useState<string>('');
    const [isDeleting, setDeleting] = useState<boolean>(false);
    const [loopNumber, setLoopNumber] = useState<number>(0);
    const [typingSpeed, setTypingSpeed] = useState<number>(150);

    const handleType = () => {
        const i = loopNumber % textArray.length;
        const fullText = textArray[i];

        if (visible) {
            if (isDeleting) {
                setText(fullText.substring(0, text.length - 1));
                setTypingSpeed(30)
            } else {
                setText(fullText.substring(0, text.length + 1));
                setTypingSpeed(150)
            }

            if (!isDeleting && text === fullText) {
                setTimeout(() => setDeleting(true), 500);
            } else if (isDeleting && text === '') {
                setDeleting(false)
                setLoopNumber(loopNumber + 1)
            }
        } else {
            setText(fullText.substring(0, text.length - 1));
            setTypingSpeed(30)
            if (text === '') return
        }
    };

    useEffect(() => {
        let timer: number
        timer = setTimeout(() => handleType(), typingSpeed)
        return () => clearTimeout(timer)
    });


    return (
        <Wrapper $visible={visible}>
            {text}
        </Wrapper>
    )
}

export default React.memo(TextTypingElement)