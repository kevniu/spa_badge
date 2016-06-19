## SPABadge

Let's use JavaScript to make a decoupled single-page app version of BootBadge called SPABadge. The first version has a single cohort: DBC teachers and mentors.
Here's the (old version of) BootBadge: http://bootbadge.herokuapp.com/cohorts/63

For a given cohort, each student has a page that contains "badges" with a given catchphrase.
Visitors to the site can vote for their favorite badge on each student's page. The badges should appear from most popular at the top to least popular at the bottom.

### Directory structure
```
spa-badge-challenge/
---api/ (your Rails API code)
---app/ (your JavaScript application)
```

You can find the main page at `app/spa-badge.html`. Click the Sample Page link to see what a person's badge page should look like.

### Release 1

The app will have two servers, a front-end server and a back-end server. We will begin with the front-end. You can use the command `ruby -run -e httpd . -p 9000` to run your front-end server containing your static HTML files and your JavaScript. Access the server on `localhost:9000`. There is a sample API at `spa-badge-api.herokuapp.com`. 
#### Routes for sample API
```
GET /teachers --> show all teachers
GET /teachers/1 --> show teacher with ID 1, badges included
POST /badges --> create a new badge, expects phrase, votes, and teacher_id as parameters
POST /badges/vote --> vote for a badge. Expects one param called "vote_type" whose value can be "up" or "down"
```

Rules
- Has to be a JavaScript app that utilizes your miniQuery library
- You can add features to your miniQuery
- Only XHR (AJAX) requests to the server are allowed except for the initial app load
- jQuery is banned; any features you want from jQuery must be implemented in your miniQuery
- Frameworks and libraries such as Angular and React are banned
- There's an ban exception for templating libraries such as [Handlebars] (http://tutorialzine.com/2015/01/learn-handlebars-in-10-minutes/)
- All page navigation must be done through JS routing (see Considerations section)
- All DOM manipulation should take place on the client

Features
- Routing. http://myapp.com/#walker should show me Walker's page for example. Check out location.hash, window.onhashchange, and the pushState API for implementation ideas.
- Keeping track of votes. Use document.cookie to manage how many times a person has voted.

TodoMVC has helpful tips for patterns you could use in your app: https://github.com/tastejs/todomvc/tree/gh-pages/examples/vanillajs


### Release 2

Time to create the API. Your back-end server will **ONLY** serve JSON data. Your Rails application should have **ZERO** views. Run the back-end server using `rails server` once inside the `api` folder. `api/README.md` contains more information about setting up your back-end. 

Rules
- Data should be persisted on a [Rails API backend](http://apionrails.icalialabs.com/book/frontmatter). Your Rails app should not serve / have any erb or haml files
- Badges should be sorted by vote count

Features
- Security. Escape the user's input to avoid XSS attacks. http://www.veracode.com/security/xss. Rails might already take care of this for you. Try naming a badge "<script>alert('lol')</script>" and see what happens. 
