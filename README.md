# Expense Tracker

This web application has been designed to allow users to track their expenditures monthly. It gives an overview of the total money spend for category and two simple graphs give the user a visual rappresentation to see where most of their money go every month. Its very simple to use and interactive, the graphs will filter if clicked to give more control to the user. There is also a help button to give a full instruction on how to use the app.
 
## UX
Everyone that has a budget can run into difficoulties overspending, this app will allow the user to keep track of their monthly expenses by giving a visual overview of the money spent and the possibility to add or save as they wish. It should appeal to a broad range of users and its so easy to use that even a 5 years old would be able to interact with it.
In the initial stage of the development a simple dashboard mock up was drawn and you can see it [here](https://github.com/luigilangella/milestone-project-3/blob/master/media/Expense%20Tracker.png). As the development took place more pages were added and the logic to link them to the database was implemented, this required regular manual testing to make sure all the parts of the app worked and the user would find easy to navigate through the application.

## Features

The main page of the project is a dashboard which will display all the categories of the expenditures and two graphs to give a visual sense of the numbers.
There is a navigation bar that will take you to the other pages where you can add a new category, then add a new expence, edit the categories or delete them all together. In any case the user is re-directed to the main dashboard when the updated data will be displayed.
 
### Features Left to Implement
- In the future i would like to add a calendar to be able to edit the expenses by date aswell giving the user more control of the tracker ore a idefinite period of time. The possibility for the user to use decimal figures in the add expense form as for now you can only input integers.

## Technologies Used

- [HTML5](https://it.wikipedia.org/wiki/HTML5)
    - The project uses semantic html5 to display a nice interface to the user.
- [materialize](https://materializecss.com/)
    - The use of this framework by Google allowed me to style the project with ease and make it responsive to all devices size.
- [JQuery](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation and allows materialize snippets of cose to work.
- [DC.js](https://dc-js.github.io/dc.js/)
    - Dc.js together with D3  and crossfilter is used in this project to display the graphs, fetching data from a database, storing them in a JSON file.
- [MongoDB](https://www.mongodb.com/cloud/atlas)
    - Mongo DB Atlas was the database of choice for this project.


## Testing

All the relevant testing for this app has been done manually with trial and error.
1. Testing the database.
    - I've submitted through the app a series of requests to the database like add remove, delete and update and checked that the result was updated in MongoDB collection.
2. Testing the redirect function for the pages with forms.
    - I made sure that the forms completed and submitted would then redirect the user to the correct page and all the informations on the page been updated correctly.
3. Loading the JSON file correctly for storing the data from the database.
    - I've used stack overflow to find the solution to this problem and used a snippet that would allow the app to load the file when run so to display the graphs correctly.
4. Graph refresh when data changes.
    - This is a bug that i resolved with the help of stack overflow again, i updated the app.config file allowing the browser to not store the json file in the cache, so that at every change in the data when the user is redirected to the main page the data updates and the graphs too.
5. Fillng the forms with the correct information.
    - I've manually tested this feature by trying to input wrong values in the forms and they all try to help the user by dening to put in the wrong info and indicating which one to use. The form that updates the expenses only accepts integers at the moment and i will work on changing the code to be able to take decimal numbers to as the user can only input rounded up figures in the add expense form.

## Deployment

The app is hosted on github where you can find all the commits during the development process [here](https://github.com/luigilangella/milestone-project-3).
The prefered deployment platform used is Heroku and you can try the app [here](https://expense-tracker-luigi.herokuapp.com/)


## Credits

Big thank you to my mentor for the guidance, Stack overflow is an invaluable source to fix bugs, materialize with its snippets out of the box is great to create responsive views. 

### Acknowledgements

- This app is for educational use only.