## Dependencies of JavaScript
**/package.json** file stores all the JavaScript dependencies required in this project
For more detail about package.json, please click (here)[https://docs.npmjs.com/files/package.json].

### "scripts"
"scripts" stores all the custom scripts used in this project
To use the one of the script, run 
```
npm run <your_script>
```
- "start": start webpack server and bundle front end code into one file
- "flas"

### "devDependencies"
All the dependencies here will not be downloaded if other project use your project as dependency.
- (Babel)[https://babeljs.io/]: JavaScript compiler which allows you run ES6 syntaxes.
- (Less)[http://lesscss.org/]: A language extension for CSS. css-loader/less-loader/style-loader compiles Less into JavaScript.
- (raw-loader)[https://github.com/webpack-contrib/raw-loader]: This allows you importing Json file into JavaScript.
- (react-hot-loader)[https://github.com/gaearon/react-hot-loader]: Tweak React components in real time so that you don't need to even refresh browser.
- (webpack)[https://webpack.js.org/]: Webpack will monitor update of JavaScript files, bundle JavaScript files into one. If you enter (http://localhost:8080/dist/bundle.js)[http://localhost:8080/dist/bundle.js] you can find bundled JavaScript file.

### "dependencies":
- (chart.js)[https://www.chartjs.org/]: Chart library used in Trend page.
- (highcharts)[https://www.highcharts.com/]: Canada map library. Also requires (highcharts-react-official)[https://github.com/highcharts/highcharts-react] at the same time. The Canada map data is stored in /static/lib/ca-all.js.
- (React)[https://reactjs.org/]: One of the most popular library for building web application.
- (Redux)[https://react-redux.js.org/]: A container (storage) for the web application. It requires 
- (React-Router)[https://reacttraining.com/react-router/]: Router for a single web application.
