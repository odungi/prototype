import { useState } from "react";
import styled from "styled-components";

export default function ToolBar(props) {
  const [click, setClick] = useState(false);

  const { date } = props;

  const navigate = (action) => {
    props.onNavigate(action);
    if (!click) setClick(true);
    else setClick(false);
  };
  return (
    <ToolbarWrap>
      <Btn type="button" onClick={navigate.bind(null, "PREV")}>
        <TriangleIconL />
      </Btn>
      <YearMonthTitle className="rbc-toolbar-label">
        {`${date.getFullYear()}년 ${date.getMonth() + 1}월`}
      </YearMonthTitle>
      <Btn type="button" onClick={navigate.bind(null, "NEXT")}>
        <TriangleIconR />
      </Btn>
    </ToolbarWrap>
  );
}

const ToolbarWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 20px;
  align-items: center;
`;
const YearMonthTitle = styled.span`
  font-size: 24px;
  font-weight: 700;
  margin: 0px 12px;
  margin-bottom: 4px;
`;

const Btn = styled.button`
  width: 20px;
  height: 20px;
  background: #55a349;
  border: none;
  border-radius: 100%;
  position: relative;
  &:hover {
    background-color: #22631c;
  }
`;
const TriangleIconL = styled.div`
  width: 0;
  height: 0;
  color: white;
  border-bottom: 3.5px solid transparent;
  border-top: 3.5px solid transparent;
  border-left: 5.5px solid white;
  border-right: 5.5px solid transparent;
  position: absolute;
  right: 8px;
  top: 6px;
  transform: rotate(180deg);
`;

const TriangleIconR = styled.div`
  width: 0;
  height: 0;
  color: white;
  position: absolute;
  right: 1px;
  top: 6px;
  border-bottom: 3.5px solid transparent;
  border-top: 3.5px solid transparent;
  border-left: 5.5px solid white;
  border-right: 5.5px solid transparent;
`;
