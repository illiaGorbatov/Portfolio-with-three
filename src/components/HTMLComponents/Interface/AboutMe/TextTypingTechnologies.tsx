import React, {useEffect, useState} from 'react';
import styled from 'styled-components/macro';
import {animatedBigSkillsStack} from "../../../../textContent/TextContent";


const Wrapper = styled.div`
  text-align: left;
  font-family: 'Relative-Book';
  color: red;
  letter-spacing: 2px;
  font-size: 20px;
`;

type PropsType = {
    visible: boolean,
}

const TechnologiesTextTyping: React.FC<PropsType> = ({visible}) => {

    const [text, setText] = useState<string>('');

    const typeText = () => {
        setText(animatedBigSkillsStack.substring(0, text.length + 1));
    };
    const deleteText = () => {
        if (text === '') return
        setText(animatedBigSkillsStack.substring(0, text.length - 1));
    }

    useEffect(() => {
        let timer: number
        if (visible) timer = setTimeout(() => typeText(), 20)
        if (!visible) timer = setTimeout(() => deleteText(), 10)
        return () => clearTimeout(timer)
    });

    return (
        <Wrapper>
            {text}
        </Wrapper>
    )
}

export default React.memo(TechnologiesTextTyping)