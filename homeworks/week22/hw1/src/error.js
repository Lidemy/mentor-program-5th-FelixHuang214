const FORM_ERROR = {
  INVALID_EMAIL: {
    error: "INVALID_EMAIL",
    message: `
      請輸入大寫英文、小寫英文、數字及合法符號(_.-)
      首字母不可為數字或符號，符號不可連續出現，@ 之前不可有符號，
      後方域名：大小寫英文、數字 + "." + 大小寫英文字母
      ex: example@example.com
    `,
  },
  INVALID_PHONE: {
    error: "INVALID_PHONE",
    message: `
      請輸入正確的手機格式: 0912345678
    `,
  },
  EMPTY_CONTENT: {
    error: "EMPTY_CONTENT",
    message: `
      內容不可為空
    `,
  },
};

export { FORM_ERROR };
