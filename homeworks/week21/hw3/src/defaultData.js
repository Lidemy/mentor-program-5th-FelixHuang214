export const formData = [
  {
    title: "暱稱",
    name: "nickname",
    type: "text",
    necessary: true,
  },
  {
    title: "電子郵件",
    name: "email",
    type: "text",
    necessary: true,
  },
  {
    title: "手機號碼",
    name: "phone",
    type: "text",
    necessary: true,
  },
  {
    title: "報名類型",
    name: "radio",
    type: "radio",
    radioContents: ["躺在床上用想像力實作", "趴在地上滑手機找現成的"],
    necessary: true,
  },
  {
    title: "怎麼知道這個活動的",
    name: "active",
    type: "text",
    description: "",
    necessary: true,
  },
  {
    title: "其他",
    name: "else",
    type: "text",
    description: "對活動的一些建議",
    necessary: false,
  },
];

export const initialInputValue = {
  nickname: {
    value: "",
  },
  email: {
    value: "",
  },
  phone: {
    value: "",
  },
  radio: {
    value: "",
  },
  active: {
    value: "",
  },
  else: {
    value: "",
  },
};
