const path = require("path");

const config = {
  entry: "./src/main.jsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main.js",
    publicPath: "/build/"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader"
      },
      {
        test: /\.(jpg|gif|png|svg)$/,
        loader: "file-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
module.exports = config;
