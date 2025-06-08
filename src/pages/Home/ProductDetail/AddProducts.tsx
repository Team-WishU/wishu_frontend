import React, { useState } from "react";
import Header from "../../../components/Header/Header";
import Select, { components } from "react-select";

const AddProducts = () => {
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const categoryOptions = [
    { value: "상의", label: "상의" },
    { value: "하의", label: "하의" },
    { value: "신발", label: "신발" },
    { value: "악세사리", label: "악세사리" },
    { value: "폰케이스", label: "폰케이스" },
  ];

  const tagOptions = [
    { value: "러블리", label: "러블리" },
    { value: "스트릿", label: "스트릿" },
    { value: "힙", label: "힙" },
    { value: "미니멀", label: "미니멀" },
    { value: "큐티", label: "큐티" },
    { value: "프리티", label: "프리티" },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    console.log({ image, category, title, brand, price, tags });
  };

  const CustomMenuList = (props: any) => {
    const isTag = props.selectProps.isMulti;
    return (
      <components.MenuList {...props}>
        {props.children}
        <div
          style={{
            padding: "12px",
            fontSize: "13px",
            color: "#bbb",
            borderTop: "1px solid #eee",
            textAlign: "center",
            whiteSpace: "pre-line",
          }}
        >
          {isTag ? "태그 선택하기" : "카테고리 선택하기"}
        </div>
      </components.MenuList>
    );
  };

  return (
    <>
      <Header />
      <div
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          padding: "0 20px 40px 20px",
        }}
      >
        <div style={{ width: "100%" }}>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "600",
              marginTop: "40px",
              marginBottom: "24px",
              textAlign: "left",
            }}
          >
            위시템 작성
          </h2>
          <hr
            style={{ marginBottom: "32px", borderColor: "#eee", width: "100%" }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}
          >
            {/* 이미지 업로드 영역 */}
            <div
              style={{
                width: "370px",
                height: "400px",
                borderRadius: "24px",
                backgroundColor: "#E5E5E5",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                flexShrink: 0,
              }}
            >
              <label htmlFor="imageUpload" style={{ cursor: "pointer" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      backgroundColor: "#000",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "28px",
                      fontWeight: "bold",
                    }}
                  >
                    ＋
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      color: "#222",
                      fontSize: "14px",
                      lineHeight: "1.6",
                    }}
                  >
                    파일을 선택하거나
                    <br />
                    여기로 끌어다 놓으세요.
                  </div>
                </div>
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />
            </div>

            {/* 오른쪽 입력 영역 */}
            <div style={{ flex: 1 }}>
              <div style={{ maxWidth: "360px", width: "100%" }}>
                <FormLabel text="카테고리" />
                <Select
                  options={categoryOptions}
                  placeholder="카테고리 선택하기"
                  value={categoryOptions.find((o) => o.value === category)}
                  onChange={(selected) => setCategory(selected?.value ?? "")}
                  styles={selectStyle}
                  components={{ MenuList: CustomMenuList }}
                />

                <FormLabel text="상품명" />
                <input
                  placeholder="상품명 추가"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={formInput}
                />

                <FormLabel text="브랜드명" />
                <input
                  placeholder="브랜드명 추가"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  style={formInput}
                />

                <FormLabel text="가격" />
                <input
                  placeholder="가격 추가"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={formInput}
                />

                <FormLabel text={`태그된 주제 (${tags.length}개)`} />
                <Select
                  isMulti
                  options={tagOptions}
                  placeholder="태그 선택하기"
                  value={tagOptions.filter((option) =>
                    tags.includes(option.value)
                  )}
                  onChange={(selectedOptions) =>
                    setTags(selectedOptions.map((option) => option.value))
                  }
                  styles={selectStyle}
                  components={{ MenuList: CustomMenuList }}
                />
              </div>

              <div
                style={{
                  width: "450px",
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "20px",
                }}
              >
                <button
                  onClick={handleSubmit}
                  style={{
                    backgroundColor: "#6A0DAD",
                    color: "#fff",
                    padding: "12px 32px",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  게시
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const FormLabel = ({ text }: { text: string }) => (
  <label
    style={{
      fontSize: "14px",
      color: "#555",
      marginBottom: "4px",
      display: "block",
    }}
  >
    {text}
  </label>
);

const formInput: React.CSSProperties = {
  width: "100%",
  maxWidth: "360px",
  boxSizing: "border-box",
  padding: "12px",
  marginBottom: "20px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const selectStyle = {
  control: (base: any) => ({
    ...base,
    minHeight: "44px",
    borderRadius: "10px",
    borderColor: "#ccc",
    fontSize: "14px",
    boxShadow: "none",
    paddingLeft: "12px",
    backgroundColor: "#fff",
    marginBottom: "20px",
    maxWidth: "800px",
    boxSizing: "border-box",
  }),
  menu: (base: any) => ({
    ...base,
    borderRadius: "16px",
    boxShadow: "0 6px 24px rgba(0, 0, 0, 0.06)",
    paddingTop: "4px",
    paddingBottom: "4px",
    zIndex: 10,
    overflow: "hidden",
  }),
  option: (base: any, { isFocused }: any) => ({
    ...base,
    backgroundColor: isFocused ? "#f7f7f7" : "#fff",
    color: "#222",
    fontWeight: 400,
    fontSize: "15px",
    padding: "12px 16px",
    cursor: "pointer",
  }),
  placeholder: (base: any) => ({
    ...base,
    color: "#bbb",
    fontSize: "14px",
    transform: "translateY(1px)",
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "#222",
    fontSize: "14px",
  }),
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    padding: "2px 6px",
  }),
  indicatorSeparator: () => ({ display: "none" }),
};

export default AddProducts;
