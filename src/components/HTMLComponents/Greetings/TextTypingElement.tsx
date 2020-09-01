import React, {useEffect, useState} from 'react';
import styled, {keyframes} from 'styled-components/macro';
import {animatedSkillsStack} from "../TextContent";

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

const Wrapper = styled.div`
  text-align:center;
  font-family: 'Relative-Book';
  color: red;
  letter-spacing: 2px;
  font-size: 20px;
  &::after {
      content: '';
      display: inline-block;
      margin-left: 3px;
      background-color: red;
      animation-name: ${blink};
      animation-duration: 0.5s;
      animation-iteration-count: infinite;
      height: 24px;
      width: 8px;
  }
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
    const [invisible, setInvisible] = useState<boolean>(false);

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
            if (text === '') setInvisible(true)
        }
    };

    useEffect(() => {
        let timer: number
        if (!invisible) timer = setTimeout(() => handleType(), typingSpeed)
        return () => clearTimeout(timer)
    });

    if (invisible) return null

    return (
        <Wrapper>
            {text}
        </Wrapper>
    )
}

export default TextTypingElement