import React, {useEffect, useState} from 'react';
import styled from 'styled-components/macro';
import {animatedBigSkillsStack} from "../../../../textContent/TextContent";


const Wrapper = styled.div`
  text-align: left;
  font-family: 'Relative-Book';
  color: red;
  letter-spacing: 2px;
  font-size: 15px;
  position: relative;
`;

const InvisibleTextForSize = styled.div`
  opacity: 0
`;

const VisibleText = styled.div`
  opacity: 1;
  position: absolute;
`;

type PropsType = {
    visible: boolean,
}

const TechnologiesTextTyping: React.FC<PropsType> = ({visible}) => {

    const [text, setText] = useState<string>('');

    const typeText = () => {
        if (text === '') {
            setTimeout(() => setText(animatedBigSkillsStack.substring(0, text.length + 1)), 1200)
        } else setText(animatedBigSkillsStack.substring(0, text.length + 1));
    };
    const deleteText = () => {
        if (text === '') return
        setText(animatedBigSkillsStack.substring(0, text.length - 1));
    }

    useEffect(() => {
        let timer: number
        if (visible) timer = setTimeout(() => typeText(), 15)
        if (!visible) timer = setTimeout(() => deleteText(), 3)
        return () => clearTimeout(timer)
    });

    return (
        <Wrapper>
            <VisibleText>
                {text}
            </VisibleText>
            <InvisibleTextForSize>
                {animatedBigSkillsStack}
            </InvisibleTextForSize>
        </Wrapper>
    )
}

export default React.memo(TechnologiesTextTyping)