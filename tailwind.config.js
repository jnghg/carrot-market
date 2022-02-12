module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  //darkMode: "media" -- 컴퓨터 환경설정에 따름 or "class" 브라우저에서 직접설정 필요
  plugins: [require("@tailwindcss/forms")],
};
