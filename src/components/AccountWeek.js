import moment from "moment";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import AccountListModal from "./AccountListModal";
import AccountModal from "./AccountModal";

const AccountWeek = ({ currentAccount_list, accountList, yearMonth }) => {
  const [checkedInputs, setCheckedInputs] = useState("전체");
  const [accountId, setAccountId] = useState(1);

  const [isOpen, setOpen] = useState(false);
  const [isOpenList, setOpenList] = useState(false);

  function toggleModel(id) {
    setOpen(!isOpen);
    setAccountId(id);
  }

  function MonthListToggleMode() {
    setOpen(!isOpenList);
  }

  const [scrollPosition, setScrollPosition] = useState(0);
  const upadteScroll = () => {
    setScrollPosition(window.screenY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", upadteScroll);
  });

  const changeRadio = (e) => {
    if (e.target.checked) {
      setCheckedInputs(e.target.id);
    }
  };

  const filteredCategory =
    currentAccount_list !== undefined &&
    currentAccount_list.filter((v) => v.category === checkedInputs);
  const filterMonth =
    accountList &&
    accountList.filter(
      (v) =>
        (v =
          moment(v.date).format("YYYY-MM") ===
          yearMonth?.year + "-" + yearMonth?.month)
    );
  const filterIncome =
    filterMonth && filterMonth.filter((v) => v.category === "수입");
  const filteredIncomePrice =
    filterIncome &&
    filterIncome.map((v) => {
      return v.price;
    });

  const IncomeSum = filteredIncomePrice.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  const filteredExpense =
    filterMonth && filterMonth.filter((v) => v.category === "지출");
  const filteredExpensePrice =
    filteredExpense &&
    filteredExpense.map((v) => {
      return v.price;
    });
  const ExpenseSum = filteredExpensePrice.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  const month = moment(yearMonth.year + "-" + yearMonth.month).format("M");

  return (
    <Wrap>
      <MonthAccountBox>
        <TopWrap>
          <MonthTitle>{month}월 결산</MonthTitle>
          <ShowMoreBtn
            onClick={() => {
              MonthListToggleMode();
            }}
          >
            더보기
          </ShowMoreBtn>
        </TopWrap>
        <BodyWrap>
          <CategoryA>수입</CategoryA>
          <PriceNum>
            {"+" +
              String(IncomeSum).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,") +
              "원"}
          </PriceNum>
        </BodyWrap>
        <BodyWrap>
          <CategoryB>지출</CategoryB>
          <PriceNum>
            {"-" +
              String(ExpenseSum).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,") +
              "원"}
          </PriceNum>
        </BodyWrap>
      </MonthAccountBox>
      <Title>최근 내역</Title>
      <CategoryWrap>
        <Label>
          <FormCheckLeft
            type="radio"
            id="전체"
            name="radioButton"
            onChange={changeRadio}
            value={checkedInputs}
            defaultChecked
          />
          <FormCheckText>전체</FormCheckText>
        </Label>
        <Label>
          <FormCheckLeft
            type="radio"
            id="수입"
            name="radioButton"
            onChange={changeRadio}
            value={checkedInputs}
          />
          <FormCheckText>수입</FormCheckText>
        </Label>
        <Label>
          <FormCheckLeft
            type="radio"
            id="지출"
            name="radioButton"
            onChange={changeRadio}
            value={checkedInputs}
          />
          <FormCheckText>지출</FormCheckText>
        </Label>
      </CategoryWrap>
      <>
        <AccountBoxWrap scrollPosition={scrollPosition}>
          {currentAccount_list !== undefined &&
          currentAccount_list.length === 0 ? (
            <NoticeWrap>
              <NoticeT>최근 거래내역이 없습니다</NoticeT>
            </NoticeWrap>
          ) : null}
          {currentAccount_list !== undefined && checkedInputs === "전체"
            ? currentAccount_list.map((list, accountId) => {
                return (
                  <AccountBox key={list.id}>
                    <BoxTopWrapB>
                      <BoxTopWrap>
                        <Day>{moment(list.date).format("M월 D일")}</Day>

                        <Category category={list.category}>
                          {list.category === "수입" ? "수입" : "지출"}
                        </Category>
                      </BoxTopWrap>
                      <DotWrap
                        onClick={() => {
                          toggleModel(list.id);
                        }}
                      >
                        <Dot />
                        <Dot />
                        <Dot />
                      </DotWrap>
                    </BoxTopWrapB>

                    <PriceNum>
                      {list.category === "수입"
                        ? // 수입이면 + , 지출이면 - 붙이고 숫자에 콤마넣기
                          "+" +
                          String(list.price).replace(
                            /(\d)(?=(?:\d{3})+(?!\d))/g,
                            "$1,"
                          ) +
                          "원"
                        : "-" +
                          String(list.price).replace(
                            /(\d)(?=(?:\d{3})+(?!\d))/g,
                            "$1,"
                          ) +
                          "원"}
                    </PriceNum>
                    <WhereTo>사용처</WhereTo>
                    <BottomWrap>
                      <WhereToUseType>
                        {list.type === 0 && "농산물 판매"}
                        {list.type === 1 && "정부보조금"}
                        {list.type === 2 && "기타수입"}
                        {list.type === 3 && "비료"}
                        {list.type === 4 && "종자/종묘"}
                        {list.type === 5 && "농약"}
                        {list.type === 6 && "농기계"}
                        {list.type === 7 && "기타 농자재"}
                        {list.type === 8 && "유통비 및 판매 경비"}
                        {list.type === 9 && "고용노동비"}
                        {list.type === 10 && "임차료"}
                        {list.type === 11 && "수도광열비"}
                        {list.type === 12 && "기타 지출"}
                      </WhereToUseType>
                    </BottomWrap>
                  </AccountBox>
                );
              })
            : currentAccount_list !== undefined &&
              filteredCategory.map((list, id) => {
                return (
                  <AccountBox
                    key={list.id}
                    onClick={() => {
                      toggleModel(list.id);
                    }}
                  >
                    <BoxTopWrapB>
                      <BoxTopWrap>
                        <Day>{moment(list.date).format("M월 D일")}</Day>

                        <Category category={list.category}>
                          {list.category === "수입" ? "수입" : "지출"}
                        </Category>
                      </BoxTopWrap>
                      <DotWrap
                        onClick={() => {
                          toggleModel(list.id);
                        }}
                      >
                        <Dot />
                        <Dot />
                        <Dot />
                      </DotWrap>
                    </BoxTopWrapB>

                    <PriceNum>
                      {list.category === "수입"
                        ? // 수입이면 + , 지출이면 - 붙이고 숫자에 콤마넣기
                          "+" +
                          String(list.price).replace(
                            /(\d)(?=(?:\d{3})+(?!\d))/g,
                            "$1,"
                          ) +
                          "원"
                        : "-" +
                          String(list.price).replace(
                            /(\d)(?=(?:\d{3})+(?!\d))/g,
                            "$1,"
                          ) +
                          "원"}
                    </PriceNum>
                    <WhereTo>사용처</WhereTo>
                    <BottomWrap>
                      <WhereToUseType>
                        {list.type === 0 && "농산물 판매"}
                        {list.type === 1 && "정부보조금"}
                        {list.type === 2 && "기타수입"}
                        {list.type === 3 && "비료"}
                        {list.type === 4 && "종자/종묘"}
                        {list.type === 5 && "농약"}
                        {list.type === 6 && "농기계"}
                        {list.type === 7 && "기타 농자재"}
                        {list.type === 8 && "유통비 및 판매 경비"}
                        {list.type === 9 && "고용노동비"}
                        {list.type === 10 && "임차료"}
                        {list.type === 11 && "수도광열비"}
                        {list.type === 12 && "기타 지출"}
                      </WhereToUseType>
                    </BottomWrap>
                  </AccountBox>
                );
              })}
        </AccountBoxWrap>

        {isOpen && (
          <AccountModal
            isOpen={isOpen}
            toggleModal={toggleModel}
            accountId={accountId}
            accountList={accountList}
          />
        )}

        {isOpenList && (
          <AccountListModal
            accountList={accountList}
            isOpenList={isOpenList}
            MonthListToggleModal={MonthListToggleMode}
            month={month}
            ExpenseSum={ExpenseSum}
            IncomeSum={IncomeSum}
            yearMonth={yearMonth}
          />
        )}
      </>
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: 0px;

  @media only screen and (max-width: 760px) {
    padding: 30px 0px;
    margin-right: 20px;
  }
`;

const MonthAccountBox = styled.div`
  max-width: 300px;
  width: 90%;
  margin-bottom: 20px;
  margin-left: 40px;
  margin-top: 20px;
  height: auto;
  padding: 10px 10px 16px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  position: relative;
  @media only screen and (max-width: 760px) {
    max-width: 760px;
    width: 96%;
  }
`;

const TopWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  font-weight: 700;
`;

const BodyWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0px;
  @media only screen and (max-width: 760px) {
    margin: 8px 0px;
  }
`;

const MonthTitle = styled.div`
  font-size: 24px
  font-weight: 700;
  margin-bottom: 20px
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  margin-left: 50px;
`;

const ShowMoreBtn = styled.div`
  font-size: 11px;
  color: #8e8f93;
  cursor: pointer;
  margin: 4px 8px;
  @media only screen and (max-width: 760px) {
    font-size: 13px;
  }
`;

const NoticeWrap = styled.div`
  margin-top: 10px;
`;

const NoticeT = styled.span`
  font-size: 14px;
  color: #8e8f93;
  padding-top: 20px;
  @media only screen and (max-width: 760px) {
    font-size: 16px;
  }
`;

const CategoryA = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2px 10px 4px 10px;
  background: #d7edf9;
  border-radius: 100px;
  font-size: 12px;
  color: #39a4e0;
  @media only screen and (max-width: 760px) {
    font-size: 16px;
  }
`;

const CategoryB = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2px 10px 4px 10px;
  background: #facccc;
  border-radius: 100px;
  font-size: 12px;
  color: #ec4646;
  @media only screen and (max-width: 760px) {
    font-size: 16px;
  }
`;

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 50px;
`;

const FormCheckText = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px 12px 6px 12px;
  background: transparent;
  border: 1px solid #bfbfbf;
  border-radius: 100px;
  width: auto;
  height: 16px;
  margin-right: 8px;
  margin-bottom: 14px;
  font-size: 14px;
  cursor: pointer;
  color: black;
  &:hover {
    font-weight: 700;
    border: 1px solid #02113b;
  }
  @media only screen and (max-width: 760px) {
    font-size: 16px;
    padding: 6px 15px 8px 15px;
    margin-right: 12px;
  }
`;

const FormCheckLeft = styled.input.attrs({ type: "radio" })`
  &:checked {
    display: inline-block;
    background: none;
    text-align: center;
    display: none;
  }
  &:checked + ${FormCheckText} {
    font-weight: 700;
    border: 1px solid #02113b;
  }
  display: none;
`;

const Label = styled.label`
  justify-content: center;
`;

const boxFade = keyframes`
  0% {
    opacity: 0;
    transform: translateY(5%);
 
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AccountBoxWrap = styled.div`
  width: 100%;
  padding-right: 70px;
  padding-left: 2px;
  height: 454px;
  padding-bottom: 10px;
  margin-left: 50px;
  overflow: scroll;
  animation: ${boxFade} 1s;
  ::-webkit-scrollbar {
    display: none;
  }
  @media only screen and (max-width: 760px) {
    margin-bottom: 60px;
  }
`;

const AccountBox = styled.div`
  max-width: 300px;
  margin-left: 50px;
  width: 90%;
  height: auto;
  padding: 10px 10px 16px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  margin: 0px 0px 10px 0px;
  position: relative;
  @media only screen and (max-width: 760px) {
    max-width: 760px;
    width: 95%;
  }
`;

const Day = styled.span`
  font-size: 18px;
  font-weight: bold;
  @media only screen and (max-width: 760px) {
    font-size: 22px;
  }
`;

const BoxTopWrap = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Category = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2px 10px 4px 10px;
  margin-left: 10px;
  background: ${(props) => (props.category === "수입" ? "#d7edf9" : "#FACCCC")};
  border-radius: 100px;
  font-size: 11px;
  color: ${(props) => (props.category === "수입" ? "#39a4e0" : "#EC4646")};
  @media only screen and (max-width: 760px) {
    font-size: 14px;
  }
`;

const PriceNum = styled.span`
  font-size: 20px;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 10px;
  @media only screen and (max-width: 760px) {
    font-size: 24px;
  }
`;

const WhereTo = styled.span`
  font-size: 14px;
  color: #02113b;
  margin: 8px 0px;
`;

const WhereToUseType = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2px 10px 4px 10px;
  background: transparent;
  border: 1px solid #bfbfbf;
  border-radius: 100px;
  font-size: 14px;
  margin-bottom: 4px;
  color: #616161;
`;

const BottomWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 6px;
`;

const BoxTopWrapB = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const DotWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 8px;
`;

const Dot = styled.div`
  width: 2.4px;
  height: 2.4px;
  background-color: black;
  border-radius: 100px;
  margin-bottom: 2px;
`;

export default AccountWeek;
