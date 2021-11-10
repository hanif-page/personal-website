module.exports = {
  mode: 'jit',
  purge: [
    './**/*.html'
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'my-white':"#FFFFFF",
        'my-black':"#333333", 
        'my-orange':"#FFC700",
        'my-gray':"#535353"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
