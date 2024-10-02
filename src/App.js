import styled, { keyframes } from "styled-components";
import "./App.css";
import CustomCalendar from "./CustomCalendar";
import { useState } from "react";
import AccountWeek from "./components/AccountWeek";
import AccountWrite from "./components/AccountWrite";

const accountList = [
  {
    date: "2024-10-02",
    price: 900000,
    category: "수입",
    type: 2,
    memo: "안녕하세요",
    id: 1,
  },
  {
    date: "2024-10-04",
    price: 800000,
    category: "지출",
    type: 5,
    memo: "바이",
    id: 1,
  },
  {
    date: "2024-10-09",
    price: 9000,
    category: "지출",
    type: 5,
    memo: "바이",
    id: 1,
  },
  {
    date: "2024-10-07",
    price: 500000,
    category: "수입",
    type: 1,
    memo: "바이",
    id: 1,
  },
  {
    date: "2024-10-05",
    price: 5000,
    category: "지출",
    type: 4,
    memo: "바이",
    id: 1,
  },
];

const App = () => {
  const yearMonth = { year: "2024", month: "10" };
  const [isOpen, setOpen] = useState(false);

  function toggleModal(id) {
    setOpen(!isOpen);
  }

  console.log(yearMonth.year);

  return (
    <div className="floating-window">
      <div className="window-header">
        <div className="window-title">가계부</div>
        <div className="window-controls">
          <div className="window-minimize"></div>
          <div className="window-maximize"></div>
          <div className="window-close"></div>
        </div>
      </div>
      <div className="window-contnet">
        <div className="calendar">
          <Wrap>
            <CalendarWrap>
              <CustomCalendar accountList={accountList} />
              <AddAccountBtn
                onClick={() => {
                  toggleModal();
                }}
              >
                + 기록하기
              </AddAccountBtn>
            </CalendarWrap>
            <CuurentListWrap>
              <AccountWeek
                currentAccount_list={accountList}
                accountList={accountList}
                yearMonth={yearMonth}
              />
            </CuurentListWrap>
            {isOpen && (
              <AccountWrite isOpen={isOpen} toggleModal={toggleModal} />
            )}
          </Wrap>
        </div>
      </div>
    </div>
  );
};

const boxFadeB = keyframes`
  0% {
  opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const boxFadeC = keyframes`
  0% {
    transform: scale(1, 1);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);

  }
  100% {
    transform: scale(1.2, 1.2);
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.15);
  }
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: 1fr minmax(600px, 780px) 25% 1fr;
  grid-template-rows: 10px minmax(640px, 740px) 1fr;
  justify-content: center;
  flex-flow: wrap;
  row-gap: -10px;
  column-gap: 26px;
  margin-bottom: 50px;
  @media only screen and (max-width: 1220px) {
    grid-template-columns: 1fr minmax(600px, 720px) 24% 1fr;
  }
  @media only screen and (max-width: 760px) {
    grid-template-columns: 1fr 95% 1fr;
    grid-template-rows: 70px minmax(610px, 700px) auto 1fr;
  }
`;

const CalendarWrap = styled.div`
  padding: 30px 30px 36px 30px;
  background: #ffffff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  grid-column: 2 / 3;
  grid-row: 2 / 3;
  position: relative;
  @media only screen and (max-width: 760px) {
    padding: 20px 10px 20px 10px;
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    margin-top: 10px;
    border-radius: 0px;
    width: 100%;
    margin-left: -10px;
  }
`;

const CuurentListWrap = styled.div`
  grid-column: 3 / 4;
  grid-row: 2 / 3;
  border-left: 1px solid #dddddd;
  @media only screen and (max-width: 760px) {
    grid-column: 2 / 3;
    grid-row: 3 / 4;
    border-left: none;
  }
`;

const AddAccountBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 18px;
  width: auto;
  height: 26px;
  background: #55a349;
  border: none;
  border-radius: 50px;
  color: white;
  font-size: 14px;
  position: absolute;
  top: 36px;
  right: 30px;
  cursor: pointer;
  &:hover {
    background-color: #22631c;
  }
  @media only screen and (max-width: 760px) {
    right: 16px;
    top: 30px;
  }
`;

const Info = styled.div`
  width: 240px;
  height: 60px;
  border-radius: 8px;
  position: absolute;
  position: fixed;
  right: 190px;
  bottom: 100px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  animation: ${boxFadeB} 1s;
  z-index: 10;
  @media only screen and (max-width: 760px) {
    bottom: 120px;
    right: 150px;
  }
`;

const Icon = styled.div`
  width: 80px;
  height: 80px;
  background-image: url(${(props) => props.Image});
  background-position: center 30%;
  background-size: cover;
  position: fixed;
  bottom: 90px;
  right: 70px;
  z-index: 10;
  border-radius: 100px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);

  cursor: pointer;
  &:hover {
    animation: ${boxFadeC} 2s;
    background-image: url(${(props) => props.chickenIcon});
  }
  @media only screen and (max-width: 760px) {
    display: none;
  }
`;

const Emoji = styled.div`
  font-size: 20px;
  margin-right: 4px;
`;

export default App;
