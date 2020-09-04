import React, {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components/macro';
import {projectsInfo} from "../../../../textContent/TextContent";


const Wrapper = styled.div`
  text-align: left;
  font-family: 'Relative-Book';
  font-size: 17px;
  position: relative;
  padding-bottom: 7%;
`;

const InvisibleTextForSize = styled.div`
  opacity: 0
`;

const VisibleText = styled.div<{$role: string}>`
  opacity: 1;
  position: absolute;
  color: ${props => props.$role === 'pros' ? 'rgba(255, 255, 255, 0.6)' : 'red'}
`;

type PropsType = {
    visible: boolean,
    currentText: string,
    role: string
}

const ProsAndConsTyping: React.FC<PropsType> = ({visible, currentText, role}) => {

    const [text, setText] = useState<string>('');

    const typeText = () => {
        if (text === ''){
            setTimeout(() => setText(currentText.substring(0, text.length + 1)), role === 'pros' ? 1000 : 1200)
        } else setText(currentText.substring(0, text.length + 1));
    };
    const deleteText = () => {
        if (text === '') return
        setText(currentText.substring(0, text.length - 1));
    }

    useEffect(() => {
        let timer: number
        if (visible) timer = setTimeout(() => typeText(), 10)
        if (!visible) timer = setTimeout(() => deleteText(), 2)
        return () => clearTimeout(timer)
    });

    return (
        <Wrapper>
            <VisibleText $role={role}>
                {text}
            </VisibleText>
            <InvisibleTextForSize>
                {currentText}
            </InvisibleTextForSize>
        </Wrapper>
    )
}

export default React.memo(ProsAndConsTyping)