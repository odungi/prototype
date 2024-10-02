import moment from "moment";
import styled from "styled-components";
import { useState } from "react";
import Swal from "sweetalert2";
import Modal from "styled-react-modal";
import DatePicker from "react-datepicker";

const AccountModal = ({ isOpen, toggleModal, accountId, accountList }) => {
  const account = accountList.find((list) => list.id === 1);
  console.log(account);
  const [openEdit, setOpenEdit] = useState(false);
  const [date, setDate] = useState(new Date(account.date));
  const [checkedInputs, setCheckedInputs] = useState(account.category);
  const [category, setCategory] = useState(String(account.type));
  const [price, setPrice] = useState(account.price);
  const [memo, setMemo] = useState(account.memo);

  function toggleEditModal() {
    setOpenEdit(!openEdit);
  }

  const changeRadio = (e) => {
    if (e.target.checked) {
      setCheckedInputs(e.target.id);
    }
  };

  function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
  }

  function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, "");
  }

  function inputNumberFormat(e) {
    setPrice(e.target.value);
    e.target.value = comma(uncomma(e.target.value));
  }

  const realPrice = Number(String(price).split(",").join(""));
  const commaPrice = comma(uncomma(account.price));
  const selecDate = moment(date).format("YYYY-MM-DD");

  const editAccount = () => {
    const id = account.id;
    const data = {
      type: category,
      price: realPrice,
      memo: memo,
      date: selecDate,
    };
  };

  const deleteAccount = () => {
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#55A349",
      cancelButtonText: "취소",
      cancelButtonColor: "#ddd",
      confirmButtonText: "확인",
    }).then((result) => {
      Swal.fire({
        title: "삭제가 완료되었습니다",
        icon: "success",
        showConfirmButton: false,
        timer: 1300,
        color: "#black",
        padding: "20px",
        width: "400px",
        height: "200px",
      });
    });
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <Wrap>
        <TopWrap>
          <Day>
            {openEdit ? (
              <SDatePicker
                selecDate={date}
                onChange={(date) => {
                  setDate(date);
                }}
                dateFormat="M월 d일"
                value={date}
              />
            ) : (
              moment(account.date).format("M월 D일")
            )}
          </Day>
        </TopWrap>
        <ContentWrap>
          {openEdit ? (
            <>
              <ContentLabel>금액</ContentLabel>
              <div>
                <PriceInput
                  defaultValue={commaPrice}
                  type="text"
                  maxLength="12"
                  onChange={(e) => {
                    inputNumberFormat(e);
                  }}
                />
                <WonT>원</WonT>
              </div>
            </>
          ) : (
            <>
              <ContentLabel>금액</ContentLabel>

              <Price>
                {account.category === "수입"
                  ? String(account.price).replace(
                      /(\d)(?=(?:\d{3})+(?!\d))/g,
                      "$1,"
                    )
                  : String(account.price).replace(
                      /(\d)=(?:\d{3})+(?!\d)/g,
                      "$1,"
                    )}
                원
              </Price>
            </>
          )}
        </ContentWrap>
        {openEdit ? (
          <ContentWrap>
            <ContentLabel>분류</ContentLabel>
            <CategoryWrap>
              <Label>
                <FormCheckLeft
                  type="radio"
                  id="수입"
                  name="radioButton"
                  onChange={changeRadio}
                  value={checkedInputs}
                  defaultChecked={account.category === "수입" ? true : false}
                />
                <FormCheckText category="수입">수입</FormCheckText>
              </Label>
              <Label>
                <FormCheckLeft
                  type="radio"
                  id="지출"
                  name="radioButton"
                  onChange={changeRadio}
                  value={checkedInputs}
                  defaultChecked={account.category === "지출" ? true : false}
                />
                <FormCheckText category="지출">지출</FormCheckText>
              </Label>
            </CategoryWrap>
          </ContentWrap>
        ) : (
          <ContentWrap>
            <ContentLabel>분류</ContentLabel>
            <CategoryWrap>
              <Label>
                <FormCheckLeft
                  type="radio"
                  id="수입"
                  name="radio"
                  defaultChecked={account.category === "수입" ? true : false}
                />
                <FormCheckText category="수입">수입</FormCheckText>
              </Label>
              <Label>
                <FormCheckLeft
                  type="radio"
                  id="지출"
                  name="radio"
                  defaultChecked={account.category === "지출" ? true : false}
                />
                <FormCheckText category="지출">지출</FormCheckText>
              </Label>
            </CategoryWrap>
          </ContentWrap>
        )}
        {openEdit ? (
          <>
            <ContentWrap>
              <ContentLabel>품목</ContentLabel>
              {checkedInputs === "" && (
                <Selec onChange={(e) => setCategory(e.target.value)}>
                  <option value="">분류을 먼저 선택해주세요</option>{" "}
                </Selec>
              )}
              {checkedInputs === "수입" && (
                <Selec
                  onChange={(e) => setCategory(e.target.value)}
                  defaultValue={String(account.type)}
                >
                  <option value="">품목을 선택해주세요</option>
                  <option value="0">농산물 판매</option>
                  <option value="1">정부보조금</option>
                  <option value="2">기타수입</option>
                </Selec>
              )}

              {checkedInputs === "지출" && (
                <Selec
                  onChange={(e) => setCategory(e.target.value)}
                  defaultValue={String(account.type)}
                >
                  <option value="">품목을 선택해주세요</option>
                  <option value="3">비료</option>
                  <option value="4">종자/종묘</option>
                  <option value="5">농약</option>
                  <option value="6">농기계</option>
                  <option value="7">기타 농자재</option>
                  <option value="8">유통비 및 판매 경비</option>
                  <option value="9">고용노동비</option>
                  <option value="10">임차료</option>
                  <option value="11">수도광열비</option>
                  <option value="12">기타 지출</option>
                </Selec>
              )}
            </ContentWrap>
          </>
        ) : (
          <ContentWrap>
            <ContentLabel>품목</ContentLabel>
            <BottomWrap>
              <WhereToUseType>
                {account.type === 0 && "농산물 판매"}
                {account.type === 1 && "정부보조금"}
                {account.type === 2 && "기타수입"}
                {account.type === 3 && "비료"}
                {account.type === 4 && "종자/종묘"}
                {account.type === 5 && "농약"}
                {account.type === 6 && "농기계"}
                {account.type === 7 && "기타 농자재"}
                {account.type === 8 && "유통비 및 판매 경비"}
                {account.type === 9 && "고용노동비"}
                {account.type === 10 && "임차료"}
                {account.type === 11 && "수도광열비"}
                {account.type === 12 && "기타 지출"}{" "}
              </WhereToUseType>
            </BottomWrap>
          </ContentWrap>
        )}

        {openEdit ? (
          <ContentWrap>
            <ContentLabel>메모</ContentLabel>
            <MemoInput
              defaultValue={account.memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="메모를 입력해주세요"
            />
          </ContentWrap>
        ) : (
          <ContentWrap>
            <ContentLabel>메모</ContentLabel>
            <MemoBox>
              <Memo>{account.memo}</Memo>
            </MemoBox>
          </ContentWrap>
        )}
        {openEdit ? (
          <BtnWrap>
            <DoneBtn
              onClick={() => {
                editAccount();
              }}
            >
              작성 완료
            </DoneBtn>
            <CancelBtn onClick={toggleModal}>취소</CancelBtn>
          </BtnWrap>
        ) : (
          <BtnWrap>
            <ModifiBtn onClick={toggleEditModal}>수정하기</ModifiBtn>
            <CancelBtn
              onClick={() => {
                deleteAccount();
              }}
            >
              삭제하기
            </CancelBtn>
            <CancelBtn onClick={toggleModal}>닫기</CancelBtn>
          </BtnWrap>
        )}
      </Wrap>
    </StyledModal>
  );
};

const StyledModal = Modal.styled`
max-width: 300px;
width: 90%;
background-color: white;
border-radius: 10px;
padding: 30px;
@media only screen and (max-width: 760px) {
  width: 80%;
  padding: 20px;
}
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Day = styled.span`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const PriceInput = styled.input`
  width: 120px;
  height: 28px;
  background: #fafafa;
  box-shadow: inset 0px 0px 3px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  border: none;
  padding-left: 10px;
  font-size: 16px;
  &:focus {
    outline: 0.5px solid #bfbfbf;
  }
`;

const WonT = styled.span`
  font-size: 16px;
  margin-left: 6px;
`;

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const ContentWrap = styled.span`
  display: flex;
  flex-direction: column;
  margin: 10px 0px;
`;

const ContentLabel = styled.span`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const FormCheckText = styled.span`
  width: 44px;
  height: 22px;
  font-size: 13px;
  padding-bottom: 4px;
  border-radius: 100px;
  background: transparent;
  border: 1px solid #cccccc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  color: #cccccc;
  cursor: pointer;
  &:hover {
    color: ${({ category }) => (category === "수입" ? "#39A4E0" : "#EC4646")};
    background-color: ${({ category }) =>
      category === "수입" ? "#D7EDF9" : "#FACCCC"};
    font-weight: 700;
    border: 1px solid
      ${({ category }) => (category === "수입" ? "#D7EDF9" : "#FACCCC")};
  }
`;

const FormCheckLeft = styled.input.attrs({ type: "radio" })`
  &:checked {
    color: ${({ id }) => (id === "수입" ? "#39A4E0" : "#EC4646")};
    background-color: ${({ id }) => (id === "수입" ? "#D7EDF9" : "#FACCCC")};
    font-weight: 700;
    border: 1px solid ${({ id }) => (id === "수입" ? "#D7EDF9" : "#FACCCC")};
  }
  &:checked + ${FormCheckText} {
    color: ${({ id }) => (id === "수입" ? "#39A4E0" : "#EC4646")};
    background-color: ${({ id }) => (id === "수입" ? "#D7EDF9" : "#FACCCC")};
    font-weight: 700;
    border: 1px solid ${({ id }) => (id === "수입" ? "#D7EDF9" : "#FACCCC")};
  }
  display: none;
`;

const Label = styled.label``;

const Selec = styled.select`
  width: 170px;
  background-color: white;
  height: 30px;
  border-radius: 10px;
  border: 1px solid #bfbfbf;
  padding-left: 10px;
  font-size: 14px;
  &:focus {
    outline: 0.5px solid #bfbfbf;
  }
`;

const Price = styled.span`
  font-size: 20px;
`;

const Memo = styled.span`
  width: 100%;
  font-size: 14px;
  margin-left: 6px;
`;

const MemoInput = styled.textarea`
  border: 1px solid #bfbfbf;
  border-radius: 6px;
  height: 60px;
  padding: 6px;
  font-size: 16px;
  &::placeholder {
    font-size: 14px;
  }
  &:focus {
    outline: 0.5px solid #bfbfbf;
  }
`;

const MemoBox = styled.div`
  width: 100%;
  border: 1px solid #bfbfbf;
  border-radius: 6px;
  min-height: 60px;
  height: auto;
  padding: 6px 0px 6px 0px;
`;

const BottomWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 6px;
`;

const WhereToUseType = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2px 10px 4px 10px;
  background: transparent;
  border: 1px solid #bfbfbf;
  border-radius: 100px;
  font-size: 12px;
  margin-bottom: 4px;
  color: #616161;
`;

const SDatePicker = styled(DatePicker)`
  font-family: "Noto Sans KR", sans-serif;
  width: 110px;
  height: 26px;
  font-size: 24px;
  font-weight: bold;
  /* border-radius: 10px; */
  border: none;
  border-bottom: 1px solid #bfbfbf;
  border-radius: 0;
  text-align: center;
  padding-bottom: 4px;
  &:focus {
    outline: none;
    border-bottom: 1px solid black;
  }
`;

const BtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 26px;
`;

const DoneBtn = styled.button`
  padding: 6px 16px;
  height: 30px;
  background: #55a349;
  border-radius: 6px;
  color: white;
  border: 1px solid #55a349;
  font-size: 13px;
  cursor: pointer;
  &:hover {
    background: #22631c;
    border: 1px solid #22631c;
  }
`;

const ModifiBtn = styled.button`
  padding: 6px 10px;
  height: 30px;
  background-color: transparent;
  border-radius: 6px;
  color: #616161;
  border: 1px solid #bfbfbf;
  margin-left: 8px;
  font-size: 13px;
  cursor: pointer;
  &:hover {
    background: #55a349;
    color: white;
    border: 1px solid #55a349;
  }
`;

const CancelBtn = styled.button`
  padding: 6px 10px;
  height: 30px;
  background-color: transparent;
  border-radius: 6px;
  color: #616161;
  border: 1px solid #bfbfbf;
  margin-left: 8px;
  font-size: 13px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

export default AccountModal;
