## Introduction
All the frontend files are under the **/static** folder. This is an React based (single page application)[https://en.wikipedia.org/wiki/Single-page_application].

## Entry file
Entry file is **/static/index.js**. In this file, after importing **less(CSS)**, importing **React Router Application**, and **Redux container**, merge all of them and display in a single DOM element. Then users can see the application via HTML file.

## Router
In single page application, URL in browser never changes. But this is confusing for users when switching between different pages. Thus we need a virtual router and **React-Router** is used in this project. The entry file of router of this application is **/static/scripts/router.jsx**.

## Storage
React can define *Virtual DOM*, also known as *React component*. This allows developers to reuse the components and easy to read and maintain different components. However, when communicating with different components, they do not know what to update if they require data from other components. Here **Redux** is used to manage global data, also known as **container**.

## Source code
- **/static/data/data_list.json**: This stores list of name of dataset when first time visiting the page.
- **/lib**: This directory manage all the dependencies which are independent from **NPM**.
- **/request**: Manage all the backend RESTful request in this file. You can easily find and make changes when API changes.
- **/scripts/**: Stores all the source code of React components. Please refer to the next sections. All the ``.jsx`` files are React component files.
- **/style**: All the less files are stored in this files. Dividing files into functions which is easy to read and maintain styling.

## "/scripts" directory
Redux is using MVC(Model-View-Controller) pattern. For more about Redux, please read instructions (here)[https://redux.js.org/introduction/getting-started].
- **/actions/**: This is equal to Controller that processing user actions into storage data.
- **/components/**: All the Views and components are defined in this folder. The app is divided by **header**,**menu**,**page** and **page** includes 4 sub pages: **aggregation**, **correlation**, **map** and **trend**. **/components/index.jsx** page controls switch between these 4 pages. There is also **/upload** page in this directory.
- **/reducers/**: Reducer is equal to Model which stores all global data and broadcast to the React components. In this project, the global variable is the list of name of dataset displayed in the left menu.
