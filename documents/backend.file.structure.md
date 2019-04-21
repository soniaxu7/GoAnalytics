## Entry file
**/main.py** is the entry file of the Flask application. When there is the first front end request from user, Flask send HTML template **/template/index.html** to the frontend as a single page application. All the other requrests are done using JSON instead of requesting the whole page.

Whenever app received RESTful request, the Flask matches URL and after running the funtion, it returns data. If you don't define **static folder** or **api**, backend will not allow users to access any backend resource.

## Source code
All the other backend code is in **/goa** directory, which is short for GoAnalytics. You can defined any file structure based on the logic. For now there is a correlation related function in **/goa/process/gorim.py**.
