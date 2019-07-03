# basic-marketplace-challenge

The project is divided in two main folders: *client* and *server*.

## server ##
Here is where the backend lives.

### model ###
As I didn't want to use a database, I set up a _model_ folder with all the data needed. Here we have the available discounts (with some helpful functions) and items for the marketplace, in JSON format.

### routes ###
All the different endpoints for basket related operations. There is a map with all the baskets. I know it may not be his perfect place, but as I said, no DBAs!

### controller ###
There is only one controller and it does just a sumple task: *calculate basket total price* based on the discounts model.

### index.js ###
Entry point for the entire application

## client ##
This folder is much more simple. It only has an _index.html_ that is served by the server, and some styles and basic AngularJS.
