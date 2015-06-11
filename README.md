Copywrongs2
===========

# Local setup (ubuntu)

```
sudo apt-get install ruby ruby-dev
gem install jekyll
git clone git@github.com:Copywrongs-Gang/Copywrongs2.git copywrongs2
cd copywrongs2
jekyll serve --baseurl ''
```
open http://localhost:4000 in your browser

# how to add translations
- duplicate data/english.yml as data/*new_language_name*.yml 
- in that new file, translate all the texts after the ":" signs, preserving HTML code
- paste the file content into a yaml parser (https://yaml-online-parser.appspot.com/) to check for errors
- duplicate en/index.html as *new_language_code*/index.html and enter the new_language_name in the file instead of "english"
- add the language to the switcher in _layouts/default.html (or tell us to do so)
- send us a pull request or an email with your changes

# questions?
team SQUIGGLYMARK copywrongs.eu
